import AWS from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { BUCKET_NAME as BUCKET, BUCKET_REGION, UPLOADED_FOLDER } from "../constants";
import { processError, processResponse } from "../utils";

export const importProductsFile: APIGatewayProxyHandler = async (
    event,
    _context
) => {
    const { name } = event.queryStringParameters;

    try {
        const s3 = new AWS.S3({
            region: BUCKET_REGION,
            signatureVersion: "v4",
        });

        const params = {
            Bucket: BUCKET,
            Key: `${UPLOADED_FOLDER}/${name}`         
        };

        const signedUrl = await s3.getSignedUrl("getObject", params);

        return processResponse(signedUrl);
    } catch (err) {
        return processError(err);
    }
};
