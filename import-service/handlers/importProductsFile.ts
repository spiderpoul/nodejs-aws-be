import AWS from "aws-sdk";
import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import {
    BUCKET_NAME as BUCKET,
    BUCKET_REGION,
    UPLOADED_FOLDER,
} from "../constants";
import { processError, processResponse } from "../utils";

export const importProductsFile: APIGatewayProxyHandler = async (
    event,
    _context
) => {
    const { name } = event.queryStringParameters;

    const s3 = new AWS.S3({
        region: BUCKET_REGION,
        signatureVersion: "v4",
    });

    const params = {
        Bucket: BUCKET,
        Key: `${UPLOADED_FOLDER}/${name}`,
        ContentType: "text/csv",
        Expires: 60,
    };

    return new Promise<APIGatewayProxyResult>((resolve, reject) => {
        s3.getSignedUrl("putObject", params, (error, url) => {
            if (error) reject(processError(error));

            resolve(processResponse(url));
        });
    });
};
