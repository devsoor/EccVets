import * as dotenv from 'dotenv';
dotenv.config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const stripeCreateProduct = async(params) => {
    console.log("stripeCreateProduct: params = ", params);

    try{
        const product = await stripe.products.create({
            name: params.name,
            description: params.description,
            // default_price: params.price,
            // images: [params.icon],
            active: params.publish,
            unit_label: params.caption,
        });
    } catch(err) {
        console.log(err)
    }

}