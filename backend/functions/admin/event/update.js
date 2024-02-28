import handler from '../../util/handler';
import { dbUpdateEvent, dbUpdateEventPrice } from '../../libs/update-lib';

export const main = handler(async (event) => {
    console.log(event);
    const eventID = event.pathParameters.id;
    const params = JSON.parse(event.body);
    params.eventData["startDate"] = params.eventData["start"];
    params.eventData["endDate"] = params.eventData["end"];
    delete params.eventData["start"];
    delete params.eventData["end"];
    
    const response = await dbUpdateEvent(eventID, params.eventData);
    return {statusCode: response.statusCode, data: response.data};
});


export const eventPrice = handler(async (event) => {
    console.log(event);
    const eventID = event.pathParameters.id;
    const params = JSON.parse(event.body);
    
    const response = await dbUpdateEventPrice(eventID, params.role, params.roleID, params.price);
    return {statusCode: response.statusCode, data: response.data};
});
