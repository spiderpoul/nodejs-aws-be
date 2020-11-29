import { SQSHandler } from "aws-lambda";
import AWS from "aws-sdk";
import "source-map-support/register";
import {    
    BUCKET_REGION as REGION,    
} from "../../import-service/constants";
import { createProduct } from "../services";
import { CSVProduct } from "../models/db";

export const catalogBatchProcess: SQSHandler = async (event, _context, cb) => {
    const sns = new AWS.SNS({ region: REGION });
    const products = [];

    for (const record of event.Records) {
        try {
            const {
                count,
                description,
                imageurl,
                price,
                title,
            }: CSVProduct = JSON.parse(record.body);

            if (!count || !description || !price || !title) {
                throw new Error(
                    "invalid data record"
                );
            }

            const product = {
                description,
                imageUrl: imageurl,
                price: +price,
                title,
                count: +count,
            };

            products.push(product)
            console.log('Creating product', JSON.stringify(product))

            await createProduct(product);

        } catch {
            console.error(
                "catalogBatchProcess found invalid JSON record:",
                record.body
            );
            return;
        }
    }

    sns.publish(
        {
            Subject: "Products have been exported",
            Message: `This products have been created: ${products.map(({id}) => id).join(', ')}`,
            TopicArn: process.env.SNS_ARN,
        },
        () => {
            console.log("Send email");
        }
    );

};
