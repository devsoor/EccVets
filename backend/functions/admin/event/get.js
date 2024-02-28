import handler from '../../util/handler';
import { 
    dbGetEvent, 
    dbGetEventAttendees, 
    dbGetUserEvents,
    dbGetSponsorTeam,
    dbGetTeamPlayers
} from '../../libs/queries-lib';

export const main = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const eventID = event.pathParameters.id;

    const response = await dbGetEvent(eventID);
    response["start"] = response.startDate;
    response["end"] = response.endDate;
    delete response.startDate;
    delete response.endDate;
    return response;
});


export const attendees = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const eventID = event.pathParameters.id;

    const attendees = await dbGetEventAttendees(eventID);
    const response = {
        attendees, 
        totalAttendees: attendees.length,
        totalGuests: attendees.reduce(function(a,b){return a + b.numberOfGuests},0)
    }
    return response;
});


export const userEvents = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const id = event.pathParameters.id;
    const { type } = event.queryStringParameters;

    let eventID, eventDetail;
    const eventList = [];
    const events = await dbGetUserEvents(id, type);

    const eventIDList = [];

   if (events && events.length) {
       for (let indx = 0; indx < events.length; indx++) {
           eventID = events[indx]['PK'].split("#")[1];
           eventIDList.push(eventID);
           // get this event from the Event table
           eventDetail = await dbGetEvent(eventID);
           eventList.push({
               SK: eventDetail.SK, //eventID
               startDate: eventDetail.startDate, 
               endDate: eventDetail.endDate, 
               title: eventDetail.title,
               location: eventDetail.extendedProps.location,
            //    cost: events[indx]['category'] !== "Golf" && eventDetail.extendedProps.cost,
               price: events[indx]['category'] === "Golf" ? events[indx]['price'] : eventDetail.extendedProps.cost,
               package: events[indx]['category'] === "Golf" && events[indx]['package'],
               golfCart: events[indx]['category'] === "Golf" && events[indx]['golfCart'],
               team: events[indx]['category'] === "Golf" && events[indx]['team'],
               teamName: events[indx]['category'] === "Golf" && events[indx]['teamName'],
           });
       }
    
   }
    return eventList;
});
export const teamPlayers = handler(async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
    const teamID = event.pathParameters.id;
    const players = await dbGetTeamPlayers(teamID);
    return players;
});
