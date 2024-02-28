import handler from '../../util/handler';
import { dbGetProduct, dbGetProductsByType } from '../../libs/queries-lib';

export const main = handler(async (event) => {
  console.log(event);
  const id = event.pathParameters.id;
  const { category } = event.queryStringParameters;

  const product = await dbGetProduct(id, category);
  return product;
});

export const type = handler(async (event) => {
  console.log(event);
  const id = event.pathParameters.id;
  const products = await dbGetProductsByType(id);
  return products;
})