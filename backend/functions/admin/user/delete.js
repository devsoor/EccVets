import handler from '../../util/handler';
import { dbDeleteSponsor } from '../../libs/delete-lib';
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const VETS_BUCKET = process.env.bucket;
const client = new S3Client();

export const sponsor = handler(async (event) => {
    console.log(event);
    const id = event.pathParameters.id;
    const { filename } = JSON.parse(event.body);

    const response = await dbDeleteSponsor(id);
    const folder = id;
    const key = `logos/${folder}/${filename}`;
    const bucketParams = {
        Bucket: `${VETS_BUCKET}`,
        Key: key
    }
    const command = new DeleteObjectCommand(bucketParams);
    await client.send(command);
    
    return response;
});
