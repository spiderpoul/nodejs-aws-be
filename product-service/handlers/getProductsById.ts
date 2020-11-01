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

export const getProductsById: APIGatewayProxyHandler = async (event, _context) => {
  const {pathParameters: {productId}} = event;
  return {
    statusCode: 200,
    body: JSON.stringify({
      product: products.find(x => x.id.toString() === productId)
    }, null, 2),
  };
}
