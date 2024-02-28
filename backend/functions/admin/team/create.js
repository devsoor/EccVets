import handler from '../../util/handler';
import { dbCreateSponsor, dbCreateSponsorPackage, dbCreateUser, dbCreateUserPackage } from '../../libs/create-lib';
import { dbGetUserByEmail } from '../../libs/queries-lib';

export const main = handler(async (event) => {
    console.log(event);
    
    const params = JSON.parse(event.body);
    let response;
    const email = params.billingAddress.emailAddress.toLowerCase();
    const type = params.type;
    // see if the contact already exists
    const user = await dbGetUserByEmail(email, type);
    let id;
    if (user) {
        id = user.SK;
    } else {
        if (params.type.toUpperCase() === 'SPONSOR') {
            response = await dbCreateSponsor(params);
        } else {
            response = await dbCreateUser(type, params);
        }
        if (response.statusCode === 200) {
            id = response.data;
        } else {
            return {statusCode: 400, data: "FAIL"}
        }

    }
    if (type.toUpperCase() == 'SPONSOR') {
        response = await dbCreateSponsorPackage(id, params);
    } else {
        response = await dbCreateUserPackage(id, params);
    }
    return {statusCode: response.statusCode, data: response.data};
});
