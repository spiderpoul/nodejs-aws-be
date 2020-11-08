import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { processError, processResponse } from '../utils';
import * as productService from '../services';

export const getProductById: APIGatewayProxyHandler = async (event, _context) => {
  const {pathParameters: {productId}} = event;  

  try {  
    return processResponse(await productService.getProductById(productId));
  } catch (err) {
    return processError(err)
  }
}
