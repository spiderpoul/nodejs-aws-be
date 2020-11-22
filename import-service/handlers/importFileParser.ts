import { S3Handler } from "aws-lambda";
import AWS from "aws-sdk";
import csv from "csv-parser";
import "source-map-support/register";
import {
    BUCKET_NAME,
    BUCKET_REGION,
    PARSED_FOLDER,
    UPLOADED_FOLDER,
} from "../constants";

export const importFileParser: S3Handler = async (event, _context) => {
    const s3 = new AWS.S3({ region: BUCKET_REGION, signatureVersion: "v4" });

    for (const record of event.Records) {
        const recordKey = record.s3.object.key;

        const s3Stream = s3
            .getObject({ Bucket: BUCKET_NAME, Key: recordKey })
            .createReadStream();

        s3Stream
            .pipe(csv())
            .on("data", (data) => console.log(data))
            .on("end", async () => {
                console.log(`Copy from ${BUCKET_NAME}/${recordKey}`);

                await s3
                    .copyObject({
                        Bucket: BUCKET_NAME,
                        CopySource: `${BUCKET_NAME}/${recordKey}`,
                        Key: recordKey.replace(UPLOADED_FOLDER, PARSED_FOLDER),
                    })
                    .promise();

                console.log(
                    `Copied from ${BUCKET_NAME}/${recordKey.replace(
                        UPLOADED_FOLDER,
                        PARSED_FOLDER
                    )}`
                );

                await s3
                    .deleteObject({
                        Bucket: BUCKET_NAME,
                        Key: recordKey,
                    })
                    .promise();
            });
    }
};
