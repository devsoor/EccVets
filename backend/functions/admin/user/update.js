import handler from '../../util/handler';
import { dbOrderStatus, dbUpdateSponsor, dbUpdateCompanyLogo } from '../../libs/update-lib';

export const orderStatus = handler(async (event) => {
	console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
	const id = event.pathParameters.id;
    const params = JSON.parse(event.body);

	const response = await dbOrderStatus(id, params);
	return response;
});

export const sponsor = handler(async (event) => {
	console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
	const id = event.pathParameters.id;
    const params = JSON.parse(event.body);

	const response = await dbUpdateSponsor(id, params.row);
	return response;
});
export const logo = handler(async (event) => {
	console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);
	const id = event.pathParameters.id;
    const { logo } = JSON.parse(event.body);

	const response = await dbUpdateCompanyLogo(id, logo);
	return response;
});
