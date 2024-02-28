import handler from '../../util/handler';
import { dbGetTeamForType, dbGetUserEvents } from '../../libs/queries-lib';
import { dbUpdateTeams } from '../../libs/update-lib';

export const main = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
	const id = event.pathParameters.id; // teamID
    const { updatedRow } = JSON.parse(event.body);
    let response;

    // update team items based on type, PK:type#ID, SK:TEAM#ID
    const typeItem = await dbGetTeamForType(id, updatedRow.type);

    // get the event for this, if its golf then need to update that
    // update event for type, PK:EVENT#ID, SK:type#ID
    const userEvents = await dbGetUserEvents(typeItem.PK.split("#")[1], typeItem.type);
    const eventIDList = [];
    for (let userEvent of userEvents) {
        if (userEvent.category == "Golf") {
            eventIDList.push(userEvent.PK)
        }
    }

    response = await dbUpdateTeams(id, typeItem.PK, updatedRow, eventIDList);
    return response;
});
