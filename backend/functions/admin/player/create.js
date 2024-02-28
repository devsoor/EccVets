import handler from '../../util/handler';
import { dbCreatePlayer } from '../../libs/create-lib';

export const main = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const {fullName, emailAddress, teamID, phoneNumber} = JSON.parse(event.body);
    let response;

    response = await dbCreatePlayer(teamID, fullName, emailAddress, phoneNumber);
    return {statusCode: response.statusCode, data: response.data};
});
