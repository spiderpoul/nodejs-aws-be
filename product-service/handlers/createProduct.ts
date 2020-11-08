import { APIGatewayEventDefaultAuthorizerContext, APIGatewayProxyEventBase } from 'aws-lambda';
import 'source-map-support/register';
import { processError, processResponse } from '../utils';
import { createProduct } from '../services';
import { Product } from '../models/db';

export default async (event: APIGatewayProxyEventBase<APIGatewayEventDefaultAuthorizerContext>) => {  
  console.log(event);

  try {
    const productToCreate: Product = JSON.parse(event.body);

    return processResponse(await createProduct(productToCreate));
  } catch (err) {
    return processError(err);
  }
}