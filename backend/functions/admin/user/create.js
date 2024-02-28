import handler from '../../util/handler';
import { dbCreateSponsor } from '../../libs/create-lib';
import { dbGetUserByEmail } from '../../libs/queries-lib';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const VETS_BUCKET = process.env.bucket;
const client = new S3Client();

export const sponsor = handler(async (event) => {
    console.log(event);
	const params = JSON.parse(event.body);
    let response;
    const email = params.billingAddress.emailAddress.toLowerCase();
    const type = params.type;
    // see if the sponsor already exists
    const user = await dbGetUserByEmail(email, type);
	if (user) {
		return {statusCode: 401, data: "User already exists"}
	}
	response = await dbCreateSponsor(params);
	const id = response.data;
	if (response.statusCode !== 200) {
		return {statusCode: 400, data: "FAIL"}
	} else {
		if (params.billingAddress.companyLogo) {
			//  upload the logo to S3
			const filename = params.billingAddress.companyLogo.path;
			const folder = id;
			const key = `logos/${folder}/${filename}`;
			const bucketParams = {
				Body: `${params.billingAddress.companyLogo}`,
				Bucket: `${VETS_BUCKET}`,
				Key: key
			}
			const command = new PutObjectCommand(bucketParams);
			response = await client.send(command);
		}
		return {statusCode: 200, data: response.data}

	}

});
