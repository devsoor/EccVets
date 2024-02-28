import handler from '../../util/handler';
import { dbDeleteEvent } from '../../libs/delete-lib';

export const main = handler(async (event) => {
    console.log(event);
    const eventID = event.pathParameters.id;

    const response = await dbDeleteEvent(eventID);
    return response;
});
