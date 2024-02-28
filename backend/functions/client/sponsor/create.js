import handler from '../../util/handler';
import { dbCreateSponsor, dbCreateSponsorPackage } from '../../libs/create-lib';
import { dbGetUserByEmail } from '../../libs/queries-lib';


// const VETS_BUCKET = process.env.bucket;
// const client = new S3Client();

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
        response = await dbCreateSponsor(params);
        if (response.statusCode === 200) {
            id = response.data;
        } else {
            return {statusCode: 400, data: "FAIL"}
        }
        // if (params.billingAddress.companyLogo) {
        //     //  upload the logo to S3
        //     const filename = params.billingAddress.companyLogo.path;
        //     const folder = id;
        //     const key = `logos/${folder}/${filename}`;
        //     console.log("key = ", key)
        //     const bucketParams = {
        //         Body: `${params.billingAddress.companyLogo}`,
        //         Bucket: `${VETS_BUCKET}`,
        //         Key: key
        //     }
        //     const command = new PutObjectCommand(bucketParams);
        //     response = await client.send(command);
        // }
    }

    response = await dbCreateSponsorPackage(id, params);
    return {statusCode: response.statusCode, data: id};
});
