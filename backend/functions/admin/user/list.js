import handler from '../../util/handler';
import { dbGetUsers, dbGetUserShirts, dbGetUserSigns, dbGetUserShirtsSignsFilter, dbGetDonations } from '../../libs/queries-lib';

export const main = handler(async (event) => {
    console.log(event);
    const { type } = event.queryStringParameters;

    const response = await dbGetUsers(type);

    return response;
});

export const shirts = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const shirts = await dbGetUsers("shirt"); //users are in SK

    const shirtList = [];
    for (let item of shirts) {
        let type = item.SK.split("#")[0];
        let id = item.SK.split("#")[1];
        let userShirts = await dbGetUserShirts(type, id);
        shirtList.push({type, id, user: item, userShirts})
    }
    return shirtList;
});

export const signs = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);

    const signs = await dbGetUsers("sign"); //users are in SK

    const signList = [];
    for (let item of signs) {
        let type = item.SK.split("#")[0];
        let id = item.SK.split("#")[1];
        let userSigns = await dbGetUserSigns(type, id);
        signList.push({type, id, user:item, userSigns})
    }
    return signList;
});

export const shirtsFilter = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const { id } = event.pathParameters;
    const filter = id;

    const shirts = await dbGetUsers("shirt"); //users are in SK

    const shirtList = [];
    for (let item of shirts) {
        let type = item.SK.split("#")[0];
        let id = item.SK.split("#")[1];
        let userShirts;
        if (filter === 'all') {
            userShirts = await dbGetUserShirts(type, id);
        } else {
            userShirts = await dbGetUserShirtsSignsFilter(type, id, filter, 'shirt');
        }
        console.log("shirtsFilter: userShirts = ", userShirts)
        userShirts && shirtList.push({type, id, user: item, userShirts})
    }
    return shirtList;
});

export const signsFilter = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const { id } = event.pathParameters;
    const filter = id;

    const signs = await dbGetUsers("sign"); //users are in SK

    const signList = [];
    for (let item of signs) {
        let type = item.SK.split("#")[0];
        let id = item.SK.split("#")[1];
        let userSigns;
        if (filter === 'all') {
            userSigns = await dbGetUserSigns(type, id);
        } else {
            userSigns = await dbGetUserShirtsSignsFilter(type, id, filter, 'sign');
        }
        userSigns && signList.push({type, id, user:item, userSigns})
    }
    return signList;
});

export const donors = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);

    const donors = await dbGetUsers("donor");

    const donorList = [];
    for (let item of donors) {
        let id = item.SK;
        let donations = await dbGetDonations(id);
        donorList.push({id, user:item, donations})
    }
    return donorList;
});