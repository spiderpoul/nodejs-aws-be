import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { PRODUCTS } from '../models/db';
import { ServiceError } from '../models/serviceError';
import { processError, processResponse } from '../utils';

export const getProductById: APIGatewayProxyHandler = async (event, _context) => {
  const {pathParameters: {productId}} = event;  

  try {
    const product = PRODUCTS.find(x => x.id.toString() === productId);

    if(!product) {
      throw(new ServiceError(`Product not found`, 404));
    }
  
    return processResponse(product);
  } catch (err) {
    return processError(err)
  }
}
