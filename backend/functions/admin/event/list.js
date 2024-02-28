import handler from '../../util/handler';
import { dbGetEvents, dbGetEventsFiltered } from '../../libs/queries-lib';

const cleanEvents = response => {
	const events = [];
    response.forEach(function(item) {
      item["textColor"] = item.color;
      item["start"] = item.startDate;
      item["end"] = item.endDate;
      delete item.startDate;
      delete item.endDate;
      events.push(item);
    });
	let sortedData = events.sort((a,b) => {return new Date(a.start) - new Date(b.start)});
    return sortedData;
}


export const main = handler(async (event) => {
    console.log(event);
    const { startDate, endDate, limit } = event.queryStringParameters;

    const response = await dbGetEvents(startDate, endDate);
    let slicedArray;;
    if (limit > 0) {
        slicedArray = response.slice(0,limit); 
    } else {
        slicedArray = response;
    }
	const sortedData = cleanEvents(slicedArray);
    return sortedData;
});

export const filter = handler(async (event) => {
    console.log(event);
    const { type, value } = event.queryStringParameters;
	const response = await dbGetEventsFiltered(type, value);
	const sortedData = cleanEvents(response);
    return sortedData;
});

