import handler from '../../util/handler';
import { dbCreateEvent } from '../../libs/create-lib';

export const main = handler(async (event) => {
  console.log(event);
  
  const params = JSON.parse(event.body);
  let response;

  response = await dbCreateEvent(params);
  return {statusCode: response.statusCode, data: response.data};
});
