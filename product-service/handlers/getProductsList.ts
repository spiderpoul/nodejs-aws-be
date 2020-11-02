import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { PRODUCTS } from '../models/db';
import { processError, processResponse } from '../utils';


export const getProductsList: APIGatewayProxyHandler = async (_event, _context) => {
  try {
    return processResponse(PRODUCTS);
  } catch (err) {
    return processError(err)
  }
}
