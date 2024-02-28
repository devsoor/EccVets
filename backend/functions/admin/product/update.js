import handler from '../../util/handler';
import { stripeCreateProduct } from '../../libs/stripe-lib';

export const main = handler(async (event) => {
    console.log(event);
    const params = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: `Product Update Handler`,
  };
});
