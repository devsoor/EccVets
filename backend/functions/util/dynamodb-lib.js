// import AWS from 'aws-sdk';
import {
    DynamoDBClient,
} from "@aws-sdk/client-dynamodb";

import { 
    DynamoDBDocumentClient, 
    UpdateCommand,
    GetCommand,
    PutCommand,
    ScanCommand,
    DeleteCommand,
    QueryCommand,
    BatchGetCommand,
    BatchWriteCommand,
    TransactWriteCommand
} from "@aws-sdk/lib-dynamodb";


const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export default {
    get: async(params) => await docClient.send(new GetCommand(params)),
    put: async(params) => await docClient.send(new PutCommand(params)),
    query: async(params) => await docClient.send(new QueryCommand(params)),
    scan: async(params) => await docClient.send(new ScanCommand(params)),
    update: async(params) => await docClient.send(new UpdateCommand(params)),
    delete: async(params) => await docClient.send(new DeleteCommand(params)),
    transactWrite: async(params) => await docClient.send(new TransactWriteCommand(params)),
    batchWrite: async(params) => await docClient.send(new BatchWriteCommand(params)),
    batchGet: async(params) => await docClient.send(new BatchGetCommand(params))
}
