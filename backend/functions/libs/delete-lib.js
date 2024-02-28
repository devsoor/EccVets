import dynamoDb from '../util/dynamodb-lib';

const eventTable = process.env.eventTable;
const userTable = process.env.userTable;

export const dbDeleteSponsor = async (id) => {
    const dbParams = {
        TransactItems: [
            {
                Delete: {
                    TableName: userTable,
                    Key: {
                        PK: `SPONSOR`,
                        SK: id,
                    },
                },
            },
            {
                Delete: {
                    TableName: userTable,
                    Key: {
                        PK: `SPONSOR#${id}`,
                        SK: `SPONSOR#${id}`,
                    },
                },
            }
        ]
    }

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        return { statusCode: 200, data: data };
    } catch (err) {
        console.log('Unable to delete player. Error JSON:', JSON.stringify(err, null, 2));
        return { statusCode: 400, data: err };
    }
};

export const dbDeleteEvent = async eventID => {
    const params = {
        TableName: eventTable,
        Key: {
            PK: 'EVENT',
            SK: eventID,
        },
    };

    try {
        await dynamoDb.delete(params);
        return { statusCode: 200, data: 'Deleted event successfully' };
    } catch (err) {
        console.log('Unable to delete event. Error JSON:', JSON.stringify(err, null, 2));
        return { statusCode: 400, data: err };
    }
};


export const dbDeleteTeam = async (teamID, typeID, params, eventIDList) => {
    /* Updates:
        PK:type#ID, SK:TEAM#ID
        PK=TEAM, SK:ID
        PK:TEAM#ID, SK:PLAYER#ID
        PK:PLAYER, SK:ID
        PK:EVENT#ID, SK:type#ID
    */
    const items = [];
    items.push({
        Delete: {
            TableName: userTable,
            Key: {
                PK: typeID,
                SK: `TEAM#${teamID}`,
            },
        },
    })
    items.push({
        Delete: {
            TableName: userTable,
            Key: {
                PK: 'TEAM',
                SK: teamID,
            },
        },
    })

    if (params.playerID1) {
        items.push({
            Delete: {
                TableName: userTable,
                Key: {
                    PK: `TEAM#${teamID}`,
                    SK: `PLAYER#${params.playerID1}`,
                },
            },
        });
        items.push({
            Delete: {
                TableName: userTable,
                Key: {
                    PK: 'PLAYER',
                    SK: params.playerID1,
                },
            },
        });
    }
    if (params.playerID2) {
        items.push({
            Delete: {
                TableName: userTable,
                Key: {
                    PK: `TEAM#${teamID}`,
                    SK: `PLAYER#${params.playerID2}`,
                },
            },
        });
        items.push({
            Delete: {
                TableName: userTable,
                Key: {
                    PK: 'PLAYER',
                    SK: params.playerID2,
                },
            },
        });
    }
    if (params.playerID3) {
        items.push({
            Delete: {
                TableName: userTable,
                Key: {
                    PK: `TEAM#${teamID}`,
                    SK: `PLAYER#${params.playerID3}`,
                },
            },
        });
        items.push({
            Delete: {
                TableName: userTable,
                Key: {
                    PK: 'PLAYER',
                    SK: params.playerID3,
                },
            },
        });
    }
    if (params.playerID4) {
        items.push({
            Delete: {
                TableName: userTable,
                Key: {
                    PK: `TEAM#${teamID}`,
                    SK: `PLAYER#${params.playerID4}`,
                },
            },
        });
        items.push({
            Delete: {
                TableName: userTable,
                Key: {
                    PK: 'PLAYER',
                    SK: params.playerID4,
                },
            },
        });
    }

    eventIDList.map(key => {
        items.push({
            Delete: {
                TableName: userTable,
                Key: {
                    PK: key,
                    SK: typeID,
                },
            },
        });
    })
    

    const dbParams = {
        TransactItems: items
    };

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        return { statusCode: 200, data: data };
    } catch (err) {
        console.log('Unable to delete team. Error JSON:', JSON.stringify(err, null, 2));
        return { statusCode: 400, data: err };
    }
}

export const dbDeletePlayer = async (id, teamID) => {
    const dbParams = {
        TransactItems: [
            {
                Delete: {
                    TableName: userTable,
                    Key: {
                        PK: `TEAM#${teamID}`,
                        SK: `PLAYER#${id}`,
                    },
                },
            },
            {
                Delete: {
                    TableName: userTable,
                    Key: {
                        PK: 'PLAYER',
                        SK: id,
                    },
                },
            }
        ]
    }

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        return { statusCode: 200, data: data };
    } catch (err) {
        console.log('Unable to delete player. Error JSON:', JSON.stringify(err, null, 2));
        return { statusCode: 400, data: err };
    }
};
