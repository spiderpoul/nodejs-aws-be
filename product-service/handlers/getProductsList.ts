import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as services from '../services';
import { processError, processResponse } from '../utils';


export const getProductsList: APIGatewayProxyHandler = async (_event, _context) => {
  try {
    return processResponse(await services.getProducts());
  } catch (err) {
    return processError(err)
  }
}
