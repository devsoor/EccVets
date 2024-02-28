import handler from '../../util/handler';
import { dbCreateProducts } from '../../libs/create-lib';
import { dbGetProducts } from '../../libs/queries-lib';
// import * as dotenv from 'dotenv';
// dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const main = handler(async (event) => {
    console.log(event);

    let currentProducts = await dbGetProducts();
	console.log("currentProducts = ", JSON.stringify(currentProducts, null, 2))
    if (currentProducts.length === 0) {
		const products = await stripe.products.list({ limit: 50, expand: ['data.default_price'] });
		console.log("stripe products = ", JSON.stringify(products, null, 2));
		const paymentLinks = await stripe.paymentLinks.list();
		// console.log("paymentLinks = ", paymentLinks)
		// console.log("stripe paymentLinks = ", JSON.stringify(paymentLinks, null, 2))
		// The payment link list does not show what products they are for, so
		// filter out price_id for each product first, and then get each line
		// item for payment links and from there you can attach the payment link 
		// to the price id to the product id and store in our db
		for (let index = 0; index < paymentLinks.data.length; index++ ) {
			// console.log("for loop paymentLinks.data[index] = ", paymentLinks.data[index])
			if (paymentLinks.data[index].active === true) {
				let lineItems = await stripe.paymentLinks.listLineItems(
					paymentLinks.data[index].id,
				);
				// console.log("for loop lineItems = ", JSON.stringify(lineItems, null, 2))

				let priceID = lineItems.data[0].price.id;
				// console.log("priceID = ", priceID)
				
				let paymentLink = paymentLinks.data[index].url;
				// console.log("paymentLink = ", paymentLink)

				let prodIndex = products.data.findIndex(product => product.default_price.id === priceID);

				products.data[prodIndex]["paymentLink"] = paymentLink;
			}
		}

		// console.log("NEW products = ", JSON.stringify(products, null, 2))

		await dbCreateProducts(products.data);
		currentProducts = await dbGetProducts();
    }
    return currentProducts;
});
