import dynamoDb from '../util/dynamodb-lib';

const userTable = process.env.userTable;
const productTable = process.env.productTable;
const eventTable = process.env.eventTable;

export const dbGetProducts = async () => {
    const params = {
        TableName: productTable,
    };

    try {
        const data = await dynamoDb.scan(params);
        return data.Items;
    } catch (err) {
        console.log('Unable to get products. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetProduct = async (id, category) => {
    const params = {
        TableName: productTable,
        Key: {
            id: id,
            productType: category
        }
    };

    console.log("dbGetProduct: params = ", params)

    try {
        const data = await dynamoDb.get(params);
        return data.Item;
    } catch (err) {
        console.log('Unable to get product. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetProductsByType = async (productType) => {
    const params = {
        TableName: productTable,
        IndexName: 'GSI1',
        KeyConditionExpression: 'productType = :ptype',
        // FilterExpression: 'productType = :ptype',
        ExpressionAttributeValues: {
            ':ptype': productType,
        },
    };

    try {
        const data = await dynamoDb.query(params);
        const products = data.Items.sort((a,b) => {
            if (a.level < b.level) {
                return -1;
            }
            if (a.level > b.level) {
                return 1;
            }
            return 0;
        })
        return products;
    } catch (err) {
        console.log('Unable to get products. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};
export const dbGetUser = async (type, id) => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk AND SK = :sk',
        ExpressionAttributeValues: {
            ':pk': type.toUpperCase(),
            ':sk': id,
        },
    };

    try {
        const data = await dynamoDb.query(params);
        return data.Items[0];
    } catch (err) {
        console.log('Unable to get user. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetUserEvents = async (id, type) => {
    const params = {
        TableName: userTable,
        IndexName: 'GSI1',
        KeyConditionExpression: 'SK = :sk AND begins_with(PK, :pk)',
        ExpressionAttributeValues: {
            ':sk': `${type.toUpperCase()}#${id}`,
            ':pk': 'EVENT',
        },
    };
    try {
        const data = await dynamoDb.query(params);
        if (data.Items.length === 0) {
            return null;
        } else {
            return data.Items;
        }
    } catch (err) {
        console.log('Unable to query user events. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetEventDetail = async (eventIDList) => {
    const items = [];
    for (let e=0; e < eventIDList.length; e++) {
       items.push({
            PK: 'EVENT',
            SK: eventIDList[e]
        });
    };
 
    const dbParams = {
        RequestItems: {
            eventTable: {
                Keys: items
            }
        }
    }

    try {
        const data = await dynamoDb.batchGet(dbParams);
        return { statusCode: 200, data };
    } catch (err) {
        console.log('Error getting event details:', JSON.stringify(err, null, 2));
        return { statusCode: 400, err };
    }
}

export const dbGetSponsorTeam = async (id) => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': `SPONSOR#${id}`,
            ':sk': 'TEAM',
        },
    };
    try {
        const data = await dynamoDb.query(params);
        if (data.Items.length === 0) {
            return null;
        } else {
            return data.Items;
        }
    } catch (err) {
        console.log('Unable to get sponsor team. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};
export const dbGetTeamForType = async (id, type) => {
    const params = {
        TableName: userTable,
        IndexName: 'GSI1',
        KeyConditionExpression: 'SK = :sk AND begins_with(PK, :pk)',
        ExpressionAttributeValues: {
            ':pk': `${type.toUpperCase()}#`,
            ':sk': `TEAM#${id}`,
        },
    };
    try {
        const data = await dynamoDb.query(params);
        if (data.Items.length === 0) {
            return null;
        } else {
            return data.Items[0];
        }
    } catch (err) {
        console.log('Unable to get team for type. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};
export const dbGetTeamForAllTypes = async (id) => {
    // const items = [];
    // for (let type of ['SPONSOR', 'VETERAN', 'COMMUNITY']) {
    //     console.log("dbGetTeamForAllTypes: type is ", type)
    //     items.push({
    //         IndexName: 'GSI1',
    //         KeyConditionExpression: 'SK = :sk AND begins_with(PK, :pk)',
    //         ExpressionAttributeValues: {
    //             ':pk': `${type.toUpperCase()}#`,
    //             ':sk': `TEAM#${id}`,
    //         },
    //      });
    // }
 
    // const dbParams = {
    //     RequestItems: {
    //         userTable: {
    //             Keys: items
    //         }
    //     }
    // }
    // console.log('dbGetTeamForAllTypes dbParams:', JSON.stringify(dbParams, null, 2));


    // try {
    //     const data = await dynamoDb.batchGet(dbParams);
    //     return { statusCode: 200, data };
    // } catch (err) {
    //     console.log('Error getting teams for all types:', JSON.stringify(err, null, 2));
    //     return { statusCode: 400, err };
    // }

    let returnList = [];
    for (let type of ['SPONSOR', 'VETERAN', 'COMMUNITY']) {

        let params = {
            TableName: userTable,
            IndexName: 'GSI1',
            KeyConditionExpression: 'SK = :sk AND begins_with(PK, :pk)',
            ExpressionAttributeValues: {
                ':pk': `${type.toUpperCase()}#`,
                ':sk': `TEAM#${id}`,
            },
        };
        try {
            const data = await dynamoDb.query(params);
            if (data.Items.length > 0) {
                returnList.push(data.Items[0])
            } 
            // else {
            //     return data.Items[0];
            // }
        } catch (err) {
            console.log('Unable to get team for type. Error JSON:', JSON.stringify(err, null, 2));
            return null;
        }
    }
    console.log("returning returnList:: ", returnList)
    return returnList;
};

export const dbGetTeam = async (type, id) => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk AND SK = :sk',
        ExpressionAttributeValues: {
            ':pk': 'TEAM',
            ':sk': id,
        },
    };

    try {
        const data = await dynamoDb.query(params);
        return data.Items[0];
    } catch (err) {
        console.log('Unable to get team. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetTeamPlayers = async (id) => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': `TEAM#${id}`,
            ':sk': 'PLAYER',
        },
    };
    try {
        const data = await dynamoDb.query(params);
        if (data.Items.length === 0) {
            return null;
        } else {
            return data.Items;
        }
    } catch (err) {
        console.log('Unable to get team players. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetUserShirts = async (type, id) => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': `${type.toUpperCase()}#${id}`,
            ':sk': 'SHIRT',
        },
    };
    try {
        const data = await dynamoDb.query(params);
        console.log("dbGetUserShirts: data = ", data)
        if (data.Items.length === 0) {
            return null;
        } else {
            return data.Items;
        }
    } catch (err) {
        console.log('Unable to query user events. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};
export const dbGetUserShirtsSignsFilter = async (type, id, filter, orderType) => {
    let filterExpr = {};
    let filterValue;
    switch (filter) {
        case "ordered":
            filterExpr = 'ordered = :bool';
            filterValue = true;
            break;
        case "notOrdered":
            filterExpr = 'ordered = :bool';
            filterValue = false;
            break;
        case "shipped":
            filterExpr = 'shipped = :bool';
            filterValue = true;
            break;
        case "notShipped":
            filterExpr = 'shipped = :bool';
            filterValue = false;
            break;
        case "orderedAndShipped":
            filterExpr = 'ordered = :bool AND shipped = :bool';
            filterValue = true;
            break;
        default:
            break;
    }
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        FilterExpression: filterExpr,
        ExpressionAttributeValues: {
            ':pk': `${type.toUpperCase()}#${id}`,
            ':sk': `${orderType.toUpperCase()}`,
            ':bool': filterValue
        },
    };
    console.log('dbGetUserShirtsSignsFilter params:', JSON.stringify(params, null, 2));

    try {
        const data = await dynamoDb.query(params);
        if (data.Items.length === 0) {
            return null;
        } else {
            return data.Items;
        }
    } catch (err) {
        console.log('Unable to get filtered shirts or signs Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetUserSigns = async (type, id) => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': `${type.toUpperCase()}#${id}`,
            ':sk': 'SIGN',
        },
    };
    try {
        const data = await dynamoDb.query(params);
        console.log("dbGetUserSigns: data = ", data)
        if (data.Items.length === 0) {
            return null;
        } else {
            return data.Items;
        }
    } catch (err) {
        console.log('Unable to query user events. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetShirts = async (id) => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk AND SK = :sk',
        ExpressionAttributeValues: {
            ':pk': `SHIRT#${id}`,
            ':sk': `SHIRT#${id}`,
        },
    };

    try {
        const data = await dynamoDb.query(params);

        return data.Items;
    } catch (err) {
        console.log('Unable to get shirt. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetUsers = async type => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
            ':pk': type.toUpperCase(),
        },
    };

    try {
        const data = await dynamoDb.query(params);
        return data.Items;
    } catch (err) {
        console.log('Unable to get users. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetUserByEmail = async (email, type) => {
    const params = {
        TableName: userTable,
        IndexName: 'GSI2',
        KeyConditionExpression: 'PK2 = :pk2 AND begins_with(PK, :pk)',
        ExpressionAttributeValues: {
            ':pk2': email,
            ':pk': type.toUpperCase(),
        },
    };
    try {
        const data = await dynamoDb.query(params);
        if (data.Items.length === 0) {
            return null;
        } else {
            return data.Items[0];
        }
    } catch (err) {
        console.log('Unable to query user by email. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetTeamForPlayer = async (playerID) => {
    const params = {
        TableName: userTable,
        IndexName: 'GSI4',
        KeyConditionExpression: 'PK4 = :pk4 AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk4': `PLAYER#${playerID}`,
            ':sk': 'TEAM#',
        },
    };
    try {
        const data = await dynamoDb.query(params);
        if (data.Items.length === 0) {
            return null;
        } else {
            return data.Items[0];
        }
    } catch (err) {
        console.log('Unable to query team for player. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetTeams = async () => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
            ':pk': 'TEAM',
        },
    };
    try {
        const data = await dynamoDb.query(params);
        return data.Items;
    } catch (err) {
        console.log('Unable to get teams. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetEvent = async eventID => {
    const params = {
        TableName: eventTable,
        KeyConditionExpression: 'PK = :pk AND SK = :sk',
        ExpressionAttributeValues: {
            ':pk': 'EVENT',
            ':sk': eventID,
        },
    };
    try {
        const data = await dynamoDb.query(params);
        return data.Items[0];
    } catch (err) {
        console.log('Unable to get event. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetEventAttendees = async eventID => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
            ':pk': `EVENT#${eventID}`,
        },
    };
    try {
        const data = await dynamoDb.query(params);
        return data.Items;
    } catch (err) {
        console.log('Unable to get event. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetEvents = async (startDateRange, endDateRange) => {
    const params = {
        TableName: eventTable,
        KeyConditionExpression: 'PK = :pk',
        FilterExpression: 'startDate >= :sd AND startDate <= :ed',
        ExpressionAttributeValues: {
            ':pk': 'EVENT',
            ':sd': startDateRange,
            ':ed': endDateRange,        
        },
    };

    try {
        const data = await dynamoDb.query(params);
        console.log("dbGetEvents: data.Items = ", data.Items);
        return data.Items;
    } catch (err) {
        console.log('Unable to get events. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetEventsFiltered = async (type, value) => {
    let arg, dbValue;
    if (type == "allowed") {
        switch (value) {
            case "Sponsor":
                arg = "extendedProps.allowSponsor";
                break;
            case "Veteran":
                arg = "extendedProps.allowVeteran";
                break;
            case "Community":
                arg = "extendedProps.allowCommunity";
                default:
                break;
                break;
        }
        dbValue = true;
    }
    if (type == "category") {
        arg = "extendedProps.category";
        dbValue = value;
    }


    const params = {
        TableName: eventTable,
        KeyConditionExpression: 'PK = :pk',
        FilterExpression: `${arg} = :arg`,
        ExpressionAttributeValues: {
            ':pk': 'EVENT',
            ':arg': dbValue,
        },
    };

    try {
        const data = await dynamoDb.query(params);
        return data.Items;
    } catch (err) {
        console.log('Unable to get filtered events. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetDonations = async (id) => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': `DONOR#${id}`,
            ':sk': 'DONATION',
        },
    };
    try {
        const data = await dynamoDb.query(params);
        return data.Items;
    } catch (err) {
        console.log('Unable to query user by email. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};

export const dbGetOrder = async (id) => {
    const params = {
        TableName: userTable,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
            ':pk': `ORDER#${id}`,
        },
    };

    try {
        const data = await dynamoDb.query(params);
        console.log("data = ", JSON.stringify(data, null, 2));
        return data.Items;
    } catch (err) {
        console.log('Unable to get order. Error JSON:', JSON.stringify(err, null, 2));
        return null;
    }
};