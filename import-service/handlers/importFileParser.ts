import { S3Handler } from "aws-lambda";
import AWS from "aws-sdk";
import csv from "csv-parser";
import util from "util";
import stream from "stream";
import "source-map-support/register";
import {
    BUCKET_NAME,
    BUCKET_REGION,
    PARSED_FOLDER,
    UPLOADED_FOLDER,
} from "../constants";

const pipeline = util.promisify(stream.pipeline);

export const importFileParser: S3Handler = async (event, _context) => {
    const s3 = new AWS.S3({ region: BUCKET_REGION, signatureVersion: 'v4' });

    for (const record of event.Records) {
        const recordKey = record.s3.object.key;

        const s3Stream = s3
            .getObject({ Bucket: BUCKET_NAME, Key: recordKey })
            .createReadStream();

        await pipeline(s3Stream, csv());

        await s3
            .copyObject({
                Bucket: BUCKET_NAME,
                CopySource: `${BUCKET_NAME}/${recordKey}`,
                Key: recordKey.replace(UPLOADED_FOLDER, PARSED_FOLDER),
            })
            .promise();

        await s3
            .deleteObject({
                Bucket: BUCKET_NAME,
                Key: recordKey,
            })
            .promise();
    }
};
