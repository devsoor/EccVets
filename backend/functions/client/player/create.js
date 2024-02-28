import handler from '../../util/handler';
import { dbCreatePlayers } from '../../libs/create-lib';

export const main = handler(async (event) => {
    console.log(event);
    
    const params = JSON.parse(event.body);
    let response;

    response = await dbCreatePlayers(params.players);
    return {statusCode: response.statusCode, data: response.data};
});
