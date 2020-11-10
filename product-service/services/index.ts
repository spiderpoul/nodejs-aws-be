import { PRODUCTS_TABLE_NAME, STOCKS_TABLE_NAME } from "../constants";
import { performQuery, performQueryWithTransaction } from "../db";
import { Product } from "../models/db";

const productFields = ['id', 'title', 'description', 'price', 'count', 'imageUrl'];


export const getProducts = async (): Promise<Product[]> => {
  const query = `SELECT ${productFields} FROM ${PRODUCTS_TABLE_NAME} inner join ${STOCKS_TABLE_NAME} on id = product_id where count > 0;`;
  return performQuery<Product>(query);
}

export const getProductById = async (id: string): Promise<Product> => {
  const query = {
    text: `SELECT ${productFields} FROM ${PRODUCTS_TABLE_NAME} inner join ${STOCKS_TABLE_NAME} on id = product_id where id::TEXT = $1;`,
    values: [id]
  }
  const [product] = await performQuery<Product>(query);
  if (!product) {
    throw new Error(`Product not found`);
  }
  return product;
}

export const createProduct = async (productToCreate: Product) => {
  const productQuery = {
    text: `INSERT INTO
        ${PRODUCTS_TABLE_NAME}(title, description, price)
        VALUES($1, $2, $3) RETURNING *`,
    values: [
      productToCreate.title,
      productToCreate.description,
      productToCreate.price,
    ]
  };

  const createStock = (prevValues) => ({
    text: `INSERT INTO
        ${STOCKS_TABLE_NAME}(product_id, count)
        VALUES($1, $2) RETURNING count;`,
    values: [
      prevValues[0][0].id,
      productToCreate.count,
    ]
  })
  const result = await performQueryWithTransaction([productQuery, createStock]);
  const createdProduct: Product = result    
    .flat()
    .reduce((acc, item) => ({ ...acc, ...item }), {});

  return createdProduct;
}