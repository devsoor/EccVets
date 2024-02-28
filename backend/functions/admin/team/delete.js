import handler from '../../util/handler';
import { dbGetTeamForType, dbGetUserEvents } from '../../libs/queries-lib';
import { dbDeleteTeam } from '../../libs/delete-lib';

export const main = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
	const id = event.pathParameters.id; // teamID
    const { row } = JSON.parse(event.body);

    let response;

    // update team items based on type, PK:type#ID, SK:TEAM#ID
    const typeItem = await dbGetTeamForType(id, row.type);

    // get the event for this, if its golf then need to update that
    // update event for type, PK:EVENT#ID, SK:type#ID
    const userEvents = await dbGetUserEvents(typeItem.PK.split("#")[1], typeItem.type);
    const eventIDList = [];
    for (let userEvent of userEvents) {
        if (userEvent.category == "Golf") {
            eventIDList.push(userEvent.PK)
        }
    }
    response = await dbDeleteTeam(id, typeItem.PK, row, eventIDList);
    return response;
});