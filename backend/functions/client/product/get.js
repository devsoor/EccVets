import handler from '../../util/handler';
import { dbGetProductsByType } from '../../libs/queries-lib';
// import * as dotenv from 'dotenv';
// dotenv.config()
// import {Stripe} from 'stripe';
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const main = handler(async (event) => {
    console.log(event);
    const type = event.pathParameters.type;
	// try{
	// 	const products = await stripe.products.search({
	// 	  query: `metadata[\"type\"]:\"${type}\"`,
	// 	  expand: ['data.default_price']
	// 	});
	// 	// const products = await stripe.products.list();
	// 	console.log("products = ", products)
	// 	return products;
	// } catch (err) {
	// 	console.log("stripe products get error: ", err);
	// 	return null;
	// }

	const products = await dbGetProductsByType(type);
	return products;
})
