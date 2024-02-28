import handler from '../../util/handler';
import { dbDeletePlayer } from '../../libs/delete-lib';

export const main = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const id = event.pathParameters.id;
    const { teamID } = JSON.parse(event.body);

    const response = await dbDeletePlayer(id, teamID);
    return {statusCode: response.statusCode, data: response.data};
});
