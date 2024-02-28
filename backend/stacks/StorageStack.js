import { Bucket, Table } from "sst/constructs";
import * as iam from "aws-cdk-lib/aws-iam";

export function StorageStack({ stack, app }) {
    // Create an S3 bucket
    const bucket = new Bucket(stack, "Uploads", {
        cors: [
            {
                maxAge: "1 day",
                allowedOrigins: ["*"],
                allowedHeaders: ["*"],
                allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
                exposedHeaders: [ 
                    "x-amz-server-side-encryption",
                    "x-amz-request-id",
                    "x-amz-id-2",
                    "ETag"
                ],
            },
        ],
    });
    // bucket.attachPermissions(bucket, [
    //     new iam.PolicyStatement({
    //         actions: ["s3:*"],
    //         effect: iam.Effect.ALLOW,
    //         resources: [
    //             bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
    //             bucket.bucketArn + "/public/*",
    //             bucket.bucketArn + "/protected/${cognito-identity.amazonaws.com:sub}/*",
    //             bucket.bucketArn + "/protected/*",
    //             bucket.bucketArn + "/uploads/*",
    //         ],
    //     }),
    // ]);

    // Create the Users DynamoDB table
    const userTable = new Table(stack, "Users", {
        fields: {
            PK: "string",
            SK: "string", 
            PK2: "string",
            PK3: "string",
            PK4: "string",
        },
        primaryIndex: { partitionKey: "PK", sortKey: "SK" },
        globalIndexes: {
            "GSI1": { partitionKey: "SK", sortKey: "PK"},
            "GSI2": { partitionKey: "PK2", sortKey: "PK"},
            "GSI3": { partitionKey: "PK3", sortKey: "PK"},
            "GSI4": { partitionKey: "PK4", sortKey: "SK"},
        },
    });
    // Create the Events DynamoDB table
    const eventTable = new Table(stack, "Events", {
        fields: {
            PK: "string",
            SK: "string", 
            PK2: "string",
            PK3: "string",
            PK4: "string",
        },
        primaryIndex: { partitionKey: "PK", sortKey: "SK" },
        globalIndexes: {
            "GSI1": { partitionKey: "SK", sortKey: "PK"},
            "GSI2": { partitionKey: "PK2", sortKey: "PK"},
            "GSI3": { partitionKey: "PK3", sortKey: "PK"},
            "GSI4": { partitionKey: "PK4", sortKey: "SK"},
        },
    });
    // Create the Products DynamoDB table
    const productTable = new Table(stack, "Products", {
        fields: {
            id: "string",
            productType: "string",
        },
        primaryIndex: { partitionKey: "id", sortKey: "productType" },
        globalIndexes: {
            "GSI1": { partitionKey: "productType", sortKey: "id"},
        },
    });

      // Show the endpoint in the output
    stack.addOutputs({
        BucketName: bucket.bucketName,
    });

    return {
        bucket,
        userTable,
        eventTable,
        productTable,
    };
}