import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

const products = [
  {
    id: 1,
    title: 'Unicorn toy',
    description: 'Unicorn toy for your kid',
    price: 4000,
  },
  {
    id: 2,
    title: 'Cat toy',
    description: 'Cat toy for your kid',
    price: 4000,
  }
];

export const getProductsList: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      products,
    }, null, 2),
  };
}
