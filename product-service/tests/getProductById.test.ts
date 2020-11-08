import { getProductById } from "../handlers/getProductById";
import { PRODUCTS } from "../models/db"

describe('getProductById', () => {
  it('should return product by id', async () => {  
    const productId = 1;
    const event: any = {
      pathParameters: { productId: `${productId}` }
    }

    const res = await getProductById(event, null, null) as any;

    expect(res.body).toEqual(JSON.stringify(PRODUCTS.find(x => x.id === productId)))
    expect(res.statusCode).toEqual(200)
  })

  it('should return 404 error if product not found by id', async () => {  
    const productId = 999;
    const event: any = {
      pathParameters: { productId: `${productId}` }
    }

    const res = await getProductById(event, null, null) as any;    
    expect(res.statusCode).toEqual(404)
  })
})