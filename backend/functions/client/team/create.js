import handler from '../../util/handler';
import { dbCreateUser, dbCreateUserPackage } from '../../libs/create-lib';
import { dbGetUserByEmail } from '../../libs/queries-lib';

export const main = handler(async (event) => {
    console.log(event);
    
    const params = JSON.parse(event.body);
    let response;
    const email = params.billingAddress.emailAddress.toLowerCase();
    const type = params.type;
    // see if the sponsor already exists
    const user = await dbGetUserByEmail(email, type);
    let id;
    if (user) {
        id = user.SK;
    } else {
        response = await dbCreateUser(type, params);
        if (response.statusCode === 200) {
            id = response.data;
        } else {
            return {statusCode: 400, data: "FAIL"}
        }
        if (params.billingAddress.companyLogo) {
            //  upload the logo to S3
            const input = {
                Body: `${params.billingAddress.companyLogo}`,
                Bucket: `${VETS_BUCKET}`,
                Key: `logos/${params.billingAddress.companyLogo.name}`,
            }
            const command = new PutObjectCommand(input);
            response = await client.send(command);
        }
    }
    response = await dbCreateUserPackage(id, params);
    return {statusCode: response.statusCode, data: response.data};
});
