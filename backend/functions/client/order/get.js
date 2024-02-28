import handler from '../../util/handler';
import { dbGetOrder } from '../../libs/queries-lib';

export const main = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const orderID = event.pathParameters.id;

    const response = await dbGetOrder(orderID);
    return response;
});
