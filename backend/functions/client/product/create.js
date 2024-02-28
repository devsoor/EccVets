import handler from '../../util/handler';
import { 
    dbCreateSignBuyer, 
    dbCreateShirtBuyer, 
    dbCreateDonor, 
    dbCreateUser,
    dbCreateDonorCollection
} from '../../libs/create-lib';
import { dbGetUserByEmail } from '../../libs/queries-lib';

export const signBuyer = handler(async (event) => {
    console.log(event);
    
    const params = JSON.parse(event.body);
    let response;
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

    response = await dbCreateSignBuyer(id, type, params);
    return {statusCode: response.statusCode, data: response.data};
});

export const shirtBuyer = handler(async (event) => {
    console.log(JSON.stringify(event, null, 2));
    
    const params = JSON.parse(event.body);
    let response;
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
    response = await dbCreateShirtBuyer(id, type, params);
    return {statusCode: response.statusCode, data: response.data};
});

export const donor = handler(async (event) => {
    console.log(event);
    
    const params = JSON.parse(event.body);
    let response;
    const email = params.billingAddress.emailAddress.toLowerCase();
    const user = await dbGetUserByEmail(email, "DONOR");

    let id;
    if (user) {
        id = user.SK;
    } else {
        response = await dbCreateDonor(params);
        if (response.statusCode === 200) {
            id = response.data;
        } else {
            return {statusCode: 400, data: "FAIL"}
        }
    }

    response = await dbCreateDonorCollection(id, params);
    return {statusCode: response.statusCode, data: response.data};
});
