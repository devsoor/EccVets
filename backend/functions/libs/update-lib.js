import dynamoDb from '../util/dynamodb-lib';
import { formatISO } from 'date-fns';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createPreSignedURL } from '../util/presignedurl';

const eventTable = process.env.eventTable;
const userTable = process.env.userTable;

const VETS_BUCKET = process.env.bucket;
const s3Client = new S3Client();

export const dbUpdateSponsor = async (id, params) => {
    console.log("dbUpdateSponsor: params = ", params)

    let updateExprTemp = `set `;
    let expAttrNames = {};
    let expAttrValues = {};
    for (const [key, value] of Object.entries(params)) {
        if (key === 'PK' || key === 'SK') {
            continue;
        }
        updateExprTemp += `#${key} = :${key},`;
        expAttrNames[`#${key}`] = `${key}`;
        expAttrValues[`:${key}`] = value;
    }
    const updateExpr = updateExprTemp.slice(0, -1);
    const dbParams = {
        TransactItems: [
            {
                Update: {
                    TableName: userTable,
                    Key: {
                        PK: 'SPONSOR',
                        SK: id,
                    },
                    UpdateExpression: updateExpr,
                    ExpressionAttributeNames: expAttrNames,
                    ExpressionAttributeValues: expAttrValues,
                    ReturnValues: "ALL_NEW"
                }
            },
            {
                Update: {
                    TableName: eventTable,
                    Key: {
                        PK: `SPONSOR#${id}`,
                        SK: `SPONSOR#${id}`,
                    },
                    UpdateExpression: updateExpr,
                    ExpressionAttributeNames: expAttrNames,
                    ExpressionAttributeValues: expAttrValues,
                    ReturnValues: "ALL_NEW"
                }
            },
        ]
    };

    console.log("dbUpdateSponsor: dbParams = ", JSON.stringify(dbParams, null, 2))
    try {
        const data = await dynamoDb.transactWrite(dbParams);
        console.log('Updated sponsor:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data };
    } catch (err) {
        console.log('Unable to update sponsor. Error JSON:', err);
        return { statusCode: 400, data: err };
    }
};

export const dbUpdateEvent = async (eventID, params) => {
    console.log("dbUpdateEvent: params = ", params)

    let updateExprTemp = `set `;
    let expAttrNames = {};
    let expAttrValues = {};
    for (const [key, value] of Object.entries(params)) {
        if (key === 'PK' || key === 'SK') {
            continue;
        }
        if (key !== "extendedProps") {
            updateExprTemp += `#${key} = :${key}, `;
            expAttrNames[`#${key}`] = `${key}`;
            expAttrValues[`:${key}`] = value;
        } else {
            for (const [k, v] of Object.entries(value)) {
                updateExprTemp += `#${key}.#${k} = :${k},`;
                expAttrNames[`#${k}`] = `${k}`;
                expAttrValues[`:${k}`] = v;
            }
            expAttrNames[`#${key}`] = `${key}`;
        }
    }
    const updateExpr = updateExprTemp.slice(0, -2);

    const dbParams = {
        TableName: eventTable,
        Key: {
            PK: 'EVENT',
            SK: eventID,
        },
        UpdateExpression: updateExpr,
        ExpressionAttributeNames: expAttrNames,
        ExpressionAttributeValues: expAttrValues,
        ReturnValues: "ALL_NEW"
    };
    console.log("dbUpdateEvent: dbParams = ", dbParams)
    try {
        const data = await dynamoDb.update(dbParams);
        console.log('Updated event:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data: data.Attributes };
    } catch (err) {
        console.log('Unable to update event. Error JSON:', err);
        return { statusCode: 400, data: err };
    }
};


export const dbUpdateEventPrice = async (id, role, roleID, price) => {
    const dbParams = {
        TableName: userTable,
        Key: {
            PK: `EVENT#${id}`,
            SK: `${role.toUpperCase()}#${roleID}`,
        },
        UpdateExpression: 'set #price = :price',
        ExpressionAttributeNames: {
            '#price': 'price',
        },
        ExpressionAttributeValues: {
            ":price": price,
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const data = await dynamoDb.update(dbParams);
        return { statusCode: 200, data };
    } catch (err) {
        console.log('Unable to update order status. Error JSON:', JSON.stringify(err, null, 2));
        return { statusCode: 400, data: err };
    }
};
export const dbOrderStatus = async (id, params) => {
    const datenow = formatISO(Date.now());
    const updateExpr = 'set #ordered = :ordered, #orderedDate = :orderedDate';
    let expAttrNames = {};

    if (params.category === "order") {
        expAttrNames = {
            '#ordered': 'ordered',
            '#orderedDate': 'orderedDate',
        }
    } else {
        expAttrNames = {
            '#ordered': 'shipped',
            '#orderedDate': 'shipDate',
        }
    }
    const expAttrValues =  {
        ':ordered': true,
        ':orderedDate': datenow,
    }

    const dbParams = {
        TransactItems: [
            {
                Update: {
                    TableName: userTable,
                    Key: {
                        PK: `${params.orderType.toUpperCase()}#${params.orderID}`,
                        SK: `${params.orderType.toUpperCase()}#${params.orderID}`,
                    },
                    UpdateExpression: updateExpr,
                    ExpressionAttributeNames: expAttrNames,
                    ExpressionAttributeValues: expAttrValues,
                    ReturnValues: "ALL_NEW"
                },
            },
            {
                Update: {
                    TableName: userTable,
                    Key: {
                        PK: `${params.role.toUpperCase()}#${id}`,
                        SK: `${params.orderType.toUpperCase()}#${params.orderID}`,
                    },
                    UpdateExpression: updateExpr,
                    ExpressionAttributeNames: expAttrNames,
                    ExpressionAttributeValues: expAttrValues,
                    ReturnValues: "ALL_NEW"
                },
            },
        ],
    };

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        return { statusCode: 200, data: data };
    } catch (err) {
        console.log('Unable to update order status. Error JSON:', JSON.stringify(err, null, 2));
        return { statusCode: 400, data: err };
    }
};

export const dbUpdateTeams = async (teamID, typeID, params, eventIDList) => {
    /* Updates:
        PK:type#ID, SK:TEAM#ID
        PK=TEAM, SK:ID
        PK:TEAM#ID, SK:PLAYER#ID
        PK:PLAYER, SK:ID
        PK:EVENT#ID, SK:type#ID
    */
    const items = [];
    items.push({
        Update: {
            TableName: userTable,
            Key: {
                PK: typeID,
                SK: `TEAM#${teamID}`,
            },
            UpdateExpression: 'set #teamName = :teamName, #golfCart = :golfCart',
            ExpressionAttributeNames: {
                '#teamName': 'teamName',
                '#golfCart': 'golfCart',
                // '#additionalMeals': 'additionalMeals',
            },
            ExpressionAttributeValues: {
                ':teamName': params.teamName,
                ':golfCart': params.golfCart,
                // ':additionalMeals': params.additionalMeals,
            },
            ReturnValues: "ALL_NEW"
        },
    })
    items.push({
        Update: {
            TableName: userTable,
            Key: {
                PK: 'TEAM',
                SK: teamID,
            },
            UpdateExpression: 'set #teamName = :teamName, #golfCart = :golfCart',
            ExpressionAttributeNames: {
                '#teamName': 'teamName',
                '#golfCart': 'golfCart',
                // '#additionalMeals': 'additionalMeals',
            },
            ExpressionAttributeValues: {
                ':teamName': params.teamName,
                ':golfCart': params.golfCart,
                // ':additionalMeals': params.additionalMeals,
            },
            ReturnValues: "ALL_NEW"
        },
    })

    // if (params.playerID1) {
    //     items.push({
    //         Update: {
    //             TableName: userTable,
    //             Key: {
    //                 PK: `TEAM#${teamID}`,
    //                 SK: `PLAYER#${params.playerID1}`,
    //             },
    //             UpdateExpression: 'set #fullName = :fullName, #email = :email',
    //             ExpressionAttributeNames: {
    //                 '#fullName': 'fullName',
    //                 '#email': 'emailAddress'
    //             },
    //             ExpressionAttributeValues: {
    //                 ':fullName': params.playerName1,
    //                 ':email': params.playerEmail1
    //             },
    //             ReturnValues: "ALL_NEW"
    //         },
    //     });
    //     items.push({
    //         Update: {
    //             TableName: userTable,
    //             Key: {
    //                 PK: 'PLAYER',
    //                 SK: params.playerID1,
    //             },
    //             UpdateExpression: 'set #fullName = :fullName, #email = :email',
    //             ExpressionAttributeNames: {
    //                 '#fullName': 'fullName',
    //                 '#email': 'emailAddress'
    //             },
    //             ExpressionAttributeValues: {
    //                 ':fullName': params.playerName1,
    //                 ':email': params.playerEmail1
    //             },
    //             ReturnValues: "ALL_NEW"
    //         },
    //     });
    // }
    // if (params.playerID2) {
    //     items.push({
    //         Update: {
    //             TableName: userTable,
    //             Key: {
    //                 PK: `TEAM#${teamID}`,
    //                 SK: `PLAYER#${params.playerID2}`,
    //             },
    //             UpdateExpression: 'set #fullName = :fullName, #email = :email',
    //             ExpressionAttributeNames: {
    //                 '#fullName': 'fullName',
    //                 '#email': 'emailAddress'
    //             },
    //             ExpressionAttributeValues: {
    //                 ':fullName': params.playerName2,
    //                 ':email': params.playerEmail2
    //             },
    //             ReturnValues: "ALL_NEW"
    //         },
    //     });
    //     items.push({
    //         Update: {
    //             TableName: userTable,
    //             Key: {
    //                 PK: 'PLAYER',
    //                 SK: params.playerID2,
    //             },
    //             UpdateExpression: 'set #fullName = :fullName, #email = :email',
    //             ExpressionAttributeNames: {
    //                 '#fullName': 'fullName',
    //                 '#email': 'emailAddress'
    //             },
    //             ExpressionAttributeValues: {
    //                 ':fullName': params.playerName2,
    //                 ':email': params.playerEmail2
    //             },
    //             ReturnValues: "ALL_NEW"
    //         },
    //     });
    // }
    // if (params.playerID3) {
    //     items.push({
    //         Update: {
    //             TableName: userTable,
    //             Key: {
    //                 PK: `TEAM#${teamID}`,
    //                 SK: `PLAYER#${params.playerID3}`,
    //             },
    //             UpdateExpression: 'set #fullName = :fullName, #email = :email',
    //             ExpressionAttributeNames: {
    //                 '#fullName': 'fullName',
    //                 '#email': 'emailAddress'
    //             },
    //             ExpressionAttributeValues: {
    //                 ':fullName': params.playerName3,
    //                 ':email': params.playerEmail3
    //             },
    //             ReturnValues: "ALL_NEW"
    //         },
    //     });
    //     items.push({
    //         Update: {
    //             TableName: userTable,
    //             Key: {
    //                 PK: 'PLAYER',
    //                 SK: params.playerID3,
    //             },
    //             UpdateExpression: 'set #fullName = :fullName, #email = :email',
    //             ExpressionAttributeNames: {
    //                 '#fullName': 'fullName',
    //                 '#email': 'emailAddress'
    //             },
    //             ExpressionAttributeValues: {
    //                 ':fullName': params.playerName3,
    //                 ':email': params.playerEmail3
    //             },
    //             ReturnValues: "ALL_NEW"
    //         },
    //     });
    // }
    // if (params.playerID4) {
    //     items.push({
    //         Update: {
    //             TableName: userTable,
    //             Key: {
    //                 PK: `TEAM#${teamID}`,
    //                 SK: `PLAYER#${params.playerID4}`,
    //             },
    //             UpdateExpression: 'set #fullName = :fullName, #email = :email',
    //             ExpressionAttributeNames: {
    //                 '#fullName': 'fullName',
    //                 '#email': 'emailAddress'
    //             },
    //             ExpressionAttributeValues: {
    //                 ':fullName': params.playerName4,
    //                 ':email': params.playerEmail4
    //             },
    //             ReturnValues: "ALL_NEW"
    //         },
    //     });
    //     items.push({
    //         Update: {
    //             TableName: userTable,
    //             Key: {
    //                 PK: 'PLAYER',
    //                 SK: params.playerID4,
    //             },
    //             UpdateExpression: 'set #fullName = :fullName, #email = :email',
    //             ExpressionAttributeNames: {
    //                 '#fullName': 'fullName',
    //                 '#email': 'emailAddress'
    //             },
    //             ExpressionAttributeValues: {
    //                 ':fullName': params.playerName4,
    //                 ':email': params.playerEmail4
    //             },
    //             ReturnValues: "ALL_NEW"
    //         },
    //     });
    // }

    eventIDList.map(key => {
        items.push({
            Update: {
                TableName: userTable,
                Key: {
                    PK: key,
                    SK: typeID,
                },
                UpdateExpression: 'set #teamName = :teamName, #golfCart = :golfCart',
                ExpressionAttributeNames: {
                    '#teamName': 'teamName',
                    '#golfCart': 'golfCart',
                    // '#additionalMeals': 'additionalMeals',
                },
                ExpressionAttributeValues: {
                    ':teamName': params.teamName,
                    ':golfCart': params.golfCart,
                    // ':additionalMeals': params.additionalMeals,
                },
                ReturnValues: "ALL_NEW"
            },
        });
    })
    

    const dbParams = {
        TransactItems: items
    };

    console.log("dbUpdateTeams: dbParams = ", dbParams)

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        return { statusCode: 200, data: data };
    } catch (err) {
        console.log('Unable to update team. Error JSON:', JSON.stringify(err, null, 2));
        return { statusCode: 400, data: err };
    }
}

export const dbUpdateCompanyLogo = async (id, logo) => {
    const filename = logo.path;
    const folder = id;
    const key = `logos/${folder}/${filename}`;
    const bucketParams = {
        Body: `${logo}`,
        Bucket: `${VETS_BUCKET}`,
        ResponseContentType: 'image/png',
        Key: key
    }
    const command = new PutObjectCommand(bucketParams);
    await s3Client.send(command);
    const preSignedURL = await createPreSignedURL(key);

    const updateExpr = 'set #logo = :logo, #url = :url';
    const expAttrNames = {
        '#logo': 'companyLogo',
        '#url': 'preSignedURL'
    };
    const expAttrValues = {
        ':logo': logo,
        ':url': preSignedURL
    };
    const dbParams = {
        TransactItems: [
            {
                Update: {
                    TableName: userTable,
                    Key: {
                        PK: 'SPONSOR',
                        SK: id,
                    },
                    UpdateExpression: updateExpr,
                    ExpressionAttributeNames: expAttrNames,
                    ExpressionAttributeValues: expAttrValues,
                    ReturnValues: "ALL_NEW"
                }
            },
            {
                Update: {
                    TableName: eventTable,
                    Key: {
                        PK: `SPONSOR#${id}`,
                        SK: `SPONSOR#${id}`,
                    },
                    UpdateExpression: updateExpr,
                    ExpressionAttributeNames: expAttrNames,
                    ExpressionAttributeValues: expAttrValues,
                    ReturnValues: "ALL_NEW"
                }
            },
        ]
    };

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        console.log('Updated logo:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data };
    } catch (err) {
        console.log('Unable to update logo. Error JSON:', err);
        return { statusCode: 400, data: err };
    }
};
