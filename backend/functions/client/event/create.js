import handler from '../../util/handler';
import { dbCreateUser, dbCreateUserEvent } from '../../libs/create-lib';
import { dbGetUserByEmail } from '../../libs/queries-lib';

export const main = handler(async (event) => {
    console.log(event);
    
    const params = JSON.parse(event.body);
    let response;
    
    // if this user already exists, then create the event for that user,
    // otherwise create a new user
    const email = params.billingAddress.emailAddress.toLowerCase();
    const type = params.type;
    const user = await dbGetUserByEmail(email, type);
    let id;
    if (user) {
        id = user.SK;
    } else {
        response = await dbCreateUser(type, params);
        if (response.statusCode === 200) {
            id = response.data;
        } else {
            return {statusCode: 400, data: "FAIL"}
        }
    }

    response = await dbCreateUserEvent(id, params);
    return {statusCode: response.statusCode, data: response.data};
});
