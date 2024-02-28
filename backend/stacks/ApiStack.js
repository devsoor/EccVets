import { Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import * as dotenv from 'dotenv';
dotenv.config()

export function ApiStack({ stack }) {
    const { userTable, eventTable, productTable, bucket } = use(StorageStack);

    const api = new Api(stack, "api", {
    defaults: {
		function: {
			bind: [userTable, eventTable, productTable, bucket],
			environment: {
				userTable: userTable.tableName,
				productTable: productTable.tableName,
				eventTable: eventTable.tableName,
				bucket: bucket.bucketName,
				STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
				ADMIN_EMAIL: process.env.ADMIN_EMAIL,
				INFO_EMAIL: process.env.INFO_EMAIL,
			},
		},
    },
	cors: true,
	accessLog: true,
    routes: {
		/* ADMIN */
		// user
		"POST /admin/user": "functions/admin/user/create.main",
		"GET /admin/users": "functions/admin/user/list.main",
		"GET /admin/user/{id}": "functions/admin/user/get.main",
		"GET /admin/user/shirts": "functions/admin/user/list.shirts",
		"GET /admin/user/signs": "functions/admin/user/list.signs",
		"GET /admin/user/donors": "functions/admin/user/list.donors",
		"GET /admin/user/shirts/filter/{id}": "functions/admin/user/list.shirtsFilter",
		"GET /admin/user/signs/filter/{id}": "functions/admin/user/list.signsFilter",
		"GET /admin/user/shirt/{id}": "functions/admin/user/get.shirt",
		"GET /admin/user/sign/{id}": "functions/admin/user/get.sign",
		"PUT /admin/user/{id}/order": "functions/admin/user/update.orderStatus",
		
		// sponsor
		"POST /admin/user/sponsor": "functions/admin/user/create.sponsor",
		"PUT /admin/user/sponsor/{id}": "functions/admin/user/update.sponsor",
		"PUT /admin/user/sponsor/{id}/logo": "functions/admin/user/update.logo",
		"DELETE /admin/user/sponsor/{id}": "functions/admin/user/delete.sponsor",

		// event
		"POST /admin/event": "functions/admin/event/create.main",
		"GET /admin/event/{id}": "functions/admin/event/get.main",
		"GET /admin/event-attendees/{id}": "functions/admin/event/get.attendees",
		"GET /admin/events": "functions/admin/event/list.main",
		"GET /admin/events/filter": "functions/admin/event/list.filter",
		"PUT /admin/event/{id}": "functions/admin/event/update.main",
		"PUT /admin/event/{id}/price": "functions/admin/event/update.eventPrice",
		"GET /admin/event/user/{id}": "functions/admin/event/get.userEvents",
		"GET /admin/event/team/{id}": "functions/admin/event/get.teamPlayers",
		"DELETE /admin/event/{id}": "functions/admin/event/delete.main",

		// team
		"POST /admin/team": "functions/admin/team/create.main",
		"GET /admin/teams": "functions/admin/team/list.main",
		"PUT /admin/team/{id}": "functions/admin/team/update.main",
		"PUT /admin/teamAdmin/{id}": "functions/admin/team/update.byAdmin",
		"DELETE /admin/team/{id}": "functions/admin/team/delete.main",

		// player
		"POST /admin/player": "functions/admin/player/create.main",
		"DELETE /admin/player/{id}": "functions/admin/player/delete.main",

		// product
		"POST /admin/product": "functions/admin/product/create.main",
		"GET /admin/product/{id}": "functions/admin/product/get.main",
		"GET /admin/products": "functions/admin/product/list.main",
		"GET /admin/product/type/{id}": "functions/admin/product/get.type",
		"PUT /admin/product/{id}": "functions/admin/product/update.main",
		"DELETE /admin/product/{id}": "functions/admin/product/delete.main",

		/* CLIENT */
		"POST /client/sponsor": "functions/client/sponsor/create.main",
		"GET /client/sponsor/logos": "functions/client/sponsor/list.logos",
		"POST /client/player": "functions/client/player/create.main",
		"POST /client/team": "functions/client/team/create.main",
		"GET /client/product/{type}": "functions/client/product/get.main",
		"POST /client/sign-buyer": "functions/client/product/create.signBuyer",
		"POST /client/shirt-buyer": "functions/client/product/create.shirtBuyer",
		"POST /client/donor": "functions/client/product/create.donor",
		"POST /client/event": "functions/client/event/create.main",
		"GET /client/events": "functions/admin/event/list.main",
		"GET /client/events/filter": "functions/admin/event/list.filter",
		"GET /client/event/{id}": "functions/admin/event/get.main",
		"GET /client/event-attendees/{id}": "functions/admin/event/get.attendees",
		"POST /client/email/{id}": "functions/client/email/create.main",
		"POST /client/contactform": "functions/client/email/create.contactForm",

		/* PAYMENT */
		"POST /payment": "functions/payment/create.main",
		"GET /payment/invoices": "functions/payment/get.invoiceList",

		// ORDER
		"GET /client/order/{id}": "functions/client/order/get.main",


		// OTHER
		"GET /admin/totals": "functions/admin/dashboard/get.totals",
    },	

    });
	api.attachPermissions("*");

	stack.addOutputs({
		ApiEndpoint: api.url,
	});

	  // Return the API resource
	return {
		api,
	};
}
