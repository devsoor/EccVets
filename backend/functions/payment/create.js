import handler from '../util/handler';
import * as dotenv from 'dotenv';
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const main = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const params = JSON.parse(event.body);
    const { amount } = params;
;    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            // payment_method_types: ['card', 'us_bank_account'],
            // payment_method_options: {
            //     us_bank_account: {
            //       financial_connections: {
            //         permissions: ['payment_method'],
            //       },
            //     },
            // },
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return paymentIntent.client_secret;
    } catch (error) {
        console.log("stripe.paymentIntents.create catch error = ", error)
        return { status: 500, error };
    }
});