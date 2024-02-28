import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
    getSignedUrl,
} from "@aws-sdk/s3-request-presigner";

const VETS_BUCKET = process.env.bucket;
const client = new S3Client();

export const createPreSignedURL = async item => {
    try {
        // let url = await s3.getSignedUrlPromise('getObject', {
        //     Bucket: process.env.STORAGE_SANTAPROJECT_BUCKETNAME,
        //     Key: `${item}`,
        // });
        const command = new GetObjectCommand({ Bucket: `${VETS_BUCKET}`, Key: item });
        let url = await getSignedUrl(client, command, { expiresIn: 3600 });
        url = url.split('?')[0];
        url = url.replace(/\"/g, '');
        return url;
    } catch (error) {
        console.log("Error getting S3 file: ", error)
        return null;
    }
  };