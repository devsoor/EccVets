import handler from '../../util/handler';
import { 
    dbGetUser,
    dbGetUsers,
    dbGetUserShirts,
    dbGetUserSigns,
 } from '../../libs/queries-lib';

export const main = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const id = event.pathParameters.id;
    const { type } = event.queryStringParameters;

	const user = await dbGetUser(type, id);
	return user;
})


export const shirt = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const id = event.pathParameters.id;
    const { type } = event.queryStringParameters;

    const shirts = await dbGetUserShirts(type, id);
    return shirts;
});

export const sign = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const id = event.pathParameters.id;
    const { type } = event.queryStringParameters;

    const signs = await dbGetUserSigns(type, id);
    return signs;
});