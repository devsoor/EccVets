import handler from '../../util/handler';
import { stripeCreateProduct } from '../../libs/stripe-lib';
import * as dotenv from 'dotenv';
dotenv.config()

export const main = handler(async (event) => {
    console.log("PRODUCT create event: = ", event);
    const params = JSON.parse(event.body);
    await stripeCreateProduct(params);
    let response;

  return {
    statusCode: 200,
    body: `Product Create Handler`,
  };
});
