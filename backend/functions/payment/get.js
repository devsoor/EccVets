import handler from '../util/handler';
import * as dotenv from 'dotenv';
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const invoiceList = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    try {
        const invoices = await stripe.invoices.list({limit: 10});
        return ({statusCode: 200, data: invoices });
    } catch (error) {
        return ({statusCode: 400, error: error.message });
    }
});