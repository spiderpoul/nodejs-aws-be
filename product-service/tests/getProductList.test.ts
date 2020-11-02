import { getProductsList } from "../handlers/getProductsList"
import { PRODUCTS } from "../models/db"

describe('getProductsList', () => {
  it('should return list of products', async () => {    
    const res = await getProductsList(null, null, null) as any;
    expect(res.body).toEqual(JSON.stringify(PRODUCTS));
    expect(res.statusCode).toEqual(200);
  })
})