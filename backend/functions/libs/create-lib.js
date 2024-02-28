import { v4 as uuidv4 } from 'uuid';
import dynamoDb from '../util/dynamodb-lib';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { formatISO } from 'date-fns';
import { createPreSignedURL } from '../util/presignedurl';

const userTable = process.env.userTable;
const productTable = process.env.productTable;
const eventTable = process.env.eventTable;

const VETS_BUCKET = process.env.bucket;
const s3Client = new S3Client();

const storeS3object = async (obj, dir) => {
    const input = {
        Body: obj,
        Bucket: `${VETS_BUCKET}`,
        Key: `${dir}/` + obj.split('/').pop(),
    }
    const command = new PutObjectCommand(input);
    const response = await s3Client.send(command);
    return response;
}

/*********************************
 *     Product
 *********************************/
export const dbCreateProducts = async (params) => {
    // console.log("dbCreateProducts: params = ", params)
    const items = [];
    for (let p=0; p < params.length; p++) {
        await storeS3object(params[p].images[0], 'product/images');
        if (params[p].active === true) {
            items.push({
                Put: {
                    TableName: productTable,
                    Item: {
                        id: params[p].name,
                        createdAt: params[p].created,
                        price: params[p].default_price.unit_amount/100,
                        priceID: params[p].default_price.id,
                        features: params[p].features,
                        productType: params[p].metadata.type,
                        level: params[p].metadata.level,
                        button: params[p].metadata.button || '',
                        image: params[p].images[0],
                        paymentLink: params[p].paymentLink || '',
                    }
                }
            });
        }
    }

    
    const dbParams = {
        TransactItems: items
    }

    console.log("dbCreateProducts: dbParams = ", JSON.stringify(dbParams, null, 2))

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        console.log('Created products:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data };
    } catch (err) {
        console.log('Error creating products:', JSON.stringify(err, null, 2));
        return { statusCode: 400, err };
    }
}

/*********************************
 *     User
 *********************************/
export const dbCreateUser = async (type, params) => {
    const userID = uuidv4();
    const datenow = formatISO(Date.now());

    const dbParams = {
        TableName: userTable,
        Item: {
            PK: type.toUpperCase(),
            SK: userID,
            id: userID,
            fullName: params.billingAddress.fullName,
            emailAddress: params.billingAddress.emailAddress.toLowerCase(),
            phoneNumber: params.billingAddress.phoneNumber && params.billingAddress.phoneNumber,
            streetAddress: params.billingAddress.streetAddress && params.billingAddress.streetAddress,
            zipCode: params.billingAddress.zipCode && params.billingAddress.zipCode,
            city: params.billingAddress.city && params.billingAddress.city,
            state: params.billingAddress.state && params.billingAddress.state,
            PK2: params.billingAddress.emailAddress.toLowerCase(),
            createdAt: datenow,
        },
    };

    console.log("dbCreateUser: dbParams = ", JSON.stringify(dbParams, null, 2))

    try {
        const data = await dynamoDb.put(dbParams);
        console.log('Created user:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data: userID };
    } catch (err) {
        return { statusCode: 400, data: err };
    }
}

/*********************************
 *     Sponsor
 *********************************/
export const dbCreateSponsor = async (params) => {
    const sponsorID = uuidv4();
    const datenow = formatISO(Date.now());
    let preSignedURL = '';

    if (params.billingAddress.companyLogo) {
        //  upload the logo to S3
        const filename = params.billingAddress.companyLogo.path;
        const folder = sponsorID;
        const key = `logos/${folder}/${filename}`;
        const bucketParams = {
            Body: `${params.billingAddress.companyLogo}`,
            Bucket: `${VETS_BUCKET}`,
            // ResponseContentType: 'image/png',
            Key: key
        }
        const command = new PutObjectCommand(bucketParams);
        await s3Client.send(command);
        preSignedURL = await createPreSignedURL(key);
    }

    const dbParams = {
        TransactItems: [
        {
            Put: {
                TableName: userTable,
                Item: {
                    PK: `SPONSOR`,
                    SK: sponsorID,
                    id: sponsorID,
                    fullName: params.billingAddress.fullName,
                    emailAddress: params.billingAddress.emailAddress.toLowerCase(),
                    phoneNumber: params.billingAddress.phoneNumber || '',
                    streetAddress: params.billingAddress.streetAddress|| '',
                    zipCode: params.billingAddress.zipCode || '',
                    city: params.billingAddress.city || '',
                    state: params.billingAddress.state || '',
                    companyName: params.billingAddress.companyName || '',
                    companyLogo: params.billingAddress.companyLogo || {},
                    PK2: params.billingAddress.emailAddress.toLowerCase(),
                    preSignedURL: preSignedURL || '',
                    createdAt: datenow,
                },
            },
        },
        {
            Put: {
                TableName: userTable,
                Item: {
                    PK: `SPONSOR#${sponsorID}`,
                    SK: `SPONSOR#${sponsorID}`,
                    fullName: params.billingAddress.fullName,
                    emailAddress: params.billingAddress.emailAddress.toLowerCase(),
                    phoneNumber: params.billingAddress.phoneNumber || '',
                    streetAddress: params.billingAddress.streetAddress|| '',
                    zipCode: params.billingAddress.zipCode || '',
                    city: params.billingAddress.city || '',
                    state: params.billingAddress.state || '',
                    companyName: params.billingAddress.companyName || '',
                    companyLogo: params.billingAddress.companyLogo || {},
                    PK2: params.billingAddress.emailAddress.toLowerCase(),
                    preSignedURL: preSignedURL || '',
                    createdAt: datenow,
                }
            }
        },
        ]
    };

    console.log("dbCreateSponsor: dbParams = ", JSON.stringify(dbParams, null, 2))

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        console.log('Created sponsor:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data: sponsorID };
    } catch (err) {
        return { statusCode: 400, data: err };
    }
}

export const dbCreateSponsorPackage = async (id, params) => {
    console.log("dbCreateSponsorPackage: params = ", JSON.stringify(params, null, 2))

    const teamID = uuidv4();
    const datenow = formatISO(Date.now());

    const items = [];
    items.push({
        Put: {
            TableName: userTable,
            Item: {
                PK: `SPONSOR#${id}`,
                SK: `TEAM#${teamID}`,
                teamName: params.teamName,
                package: params.package || '',
                type: params.type.toUpperCase(),
                golfCart: params.golfCart,
                // additionalMeals: params.additionalMeals,
                createdAt: datenow,
            }
        }
    });
    items.push({
        Put: {
            TableName: userTable,
            Item: {
                PK: `TEAM`,
                SK: teamID,
                id: teamID,
                teamName: params.teamName || '',
                type: params.type.toUpperCase(),
                package: params.package || '',
                golfCart: params.golfCart,
                // additionalMeals: params.additionalMeals,
                createdAt: datenow,
            }
        }
    });
    items.push({
        Put: {
            TableName: userTable,
            Item: {
                PK: `EVENT#${params.eventID}`,
                SK: `SPONSOR#${id}`,
                eventID: params.eventID,
                fullName: params.billingAddress.fullName,
                emailAddress: params.billingAddress.emailAddress.toLowerCase(),
                phoneNumber: params.billingAddress.phoneNumber || '',
                streetAddress: params.billingAddress.streetAddress|| '',
                zipCode: params.billingAddress.zipCode || '',
                city: params.billingAddress.city || '',
                state: params.billingAddress.state || '',
                companyName: params.billingAddress.companyName || '',
                companyLogo: params.billingAddress.companyLogo || {},
                PK2: params.billingAddress.emailAddress.toLowerCase(),
                team: `TEAM#${teamID}`,
                teamName: params.teamName,
                category: params.category,
                package: params.package || '',
                golfCart: params.golfCart,
                // additionalMeals: params.additionalMeals,
                price: params.price,
                type: params.type.toUpperCase(),
                createdAt: datenow,
            }
        }
    });


    let playerID;
    params.players.forEach((player) => {
        playerID = uuidv4();
        items.push({
            Put: {
                TableName: userTable,
                Item: {
                    PK: `TEAM#${teamID}`,
                    SK: `PLAYER#${playerID}`,
                    fullName: player.fullName,
                    emailAddress: player.emailAddress.toLowerCase(),
                    phoneNumber: player.phoneNumber || '',
                    PK2: player.emailAddress.toLowerCase(),
                    createdAt: datenow,
                }
            }
        });
        items.push({
            Put: {
                TableName: userTable,
                Item: {
                    PK: `PLAYER`,
                    SK: playerID,
                    id: playerID,
                    fullName: player.fullName,
                    emailAddress: player.emailAddress.toLowerCase(),
                    phoneNumber: player.phoneNumber || '',
                    PK2: player.emailAddress.toLowerCase(),
                    createdAt: datenow,
                }
            }
        });
       
    });

    const dbParams = {
        TransactItems: items
    }
    console.log("dbCreateSponsorPackage: dbParams = ", JSON.stringify(dbParams, null, 2))


    try {
        const data = await dynamoDb.transactWrite(dbParams);
        console.log('Created sponsor package:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data };
    } catch (err) {
        console.log('ERROR:', err);
        return { statusCode: 400, data: err };
    }
    
}

export const dbCreateUserPackage = async (id, params) => {
    console.log("dbCreateUserPackage: params = ", params)
    const teamID = uuidv4();
    const datenow = formatISO(Date.now());

    const items = [];
    // items.push({
    //     Put: {
    //         TableName: userTable,
    //         Item: {
    //             PK: `${params.type.toUpperCase()}#${id}`,
    //             SK: `PACKAGE#${params.package}`,
    //             golfCart: params.golfCart,
    //             createdAt: datenow,
    //         }
    //     }
    // });
    items.push({
        Put: {
            TableName: userTable,
            Item: {
                PK: `${params.type.toUpperCase()}#${id}`,
                SK: `TEAM#${teamID}`,
                teamName: params.teamName,
                type: params.type.toUpperCase(),
                golfCart: params.golfCart,
                createdAt: datenow,
            }
        }
    });
    items.push({
        Put: {
            TableName: userTable,
            Item: {
                PK: `TEAM`,
                SK: teamID,
                id: teamID,
                teamName: params.teamName,
                type: params.type.toUpperCase(),
                package: params.package || '',
                golfCart: params.golfCart,
                createdAt: datenow,
            }
        }
    });
    items.push({
        Put: {
            TableName: userTable,
            Item: {
                PK: `EVENT#${params.eventID}`,
                SK: `${params.type.toUpperCase()}#${id}`,
                eventID: params.eventID,
                fullName: params.billingAddress.fullName,
                emailAddress: params.billingAddress.emailAddress.toLowerCase(),
                phoneNumber: params.billingAddress.phoneNumber || '',
                streetAddress: params.billingAddress.streetAddress|| '',
                zipCode: params.billingAddress.zipCode || '',
                city: params.billingAddress.city || '',
                state: params.billingAddress.state || '',
                PK2: params.billingAddress.emailAddress.toLowerCase(),
                team: `TEAM#${teamID}`,
                teamName: params.teamName,
                category: params.category,
                package: params.package || '',
                golfCart: params.golfCart,
                price: params.price && params.price,
                type: params.type,
                createdAt: datenow,
            }
        }
    });


    let playerID;
    params.players.forEach((player) => {
        playerID = uuidv4();
        items.push({
            Put: {
                TableName: userTable,
                Item: {
                    PK: `TEAM#${teamID}`,
                    SK: `PLAYER#${playerID}`,
                    fullName: player.fullName,
                    emailAddress: player.emailAddress.toLowerCase(),
                    PK2: player.emailAddress.toLowerCase(),
                    phoneNumber: player.phoneNumber,
                    createdAt: datenow,
                }
            }
        });
        items.push({
            Put: {
                TableName: userTable,
                Item: {
                    PK: `PLAYER`,
                    SK: playerID,
                    id: playerID,
                    fullName: player.fullName,
                    emailAddress: player.emailAddress.toLowerCase(),
                    phoneNumber: player.phoneNumber,
                    PK2: player.emailAddress.toLowerCase(),
                    createdAt: datenow,
                }
            }
        });
       
    });

    const dbParams = {
        TransactItems: items
    }

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        console.log(`Created User package: ${JSON.stringify(data, null, 2)}`);
        return { statusCode: 200, data };
    } catch (err) {
        return { statusCode: 400, data: err };
    }
    
}

/*********************************
 *     Player
 *********************************/

export const dbCreatePlayer = async (teamID, fullName, emailAddress, phoneNumber) => {
    const playerID = uuidv4();
    const items = [];
    const datenow = formatISO(Date.now());

    items.push({
        Put: {
            TableName: userTable,
            Item: {
                PK: `TEAM#${teamID}`,
                SK: `PLAYER#${playerID}`,
                fullName: fullName,
                emailAddress: emailAddress.toLowerCase(),
                phoneNumber: phoneNumber || '',
                PK2: emailAddress.toLowerCase(),
                createdAt: datenow,
            }
        }
    });
    items.push({
        Put: {
            TableName: userTable,
            Item: {
                PK: `PLAYER`,
                SK: playerID,
                id: playerID,
                fullName: fullName,
                emailAddress: emailAddress.toLowerCase(),
                phoneNumber: phoneNumber,
                PK2: emailAddress.toLowerCase(),
                createdAt: datenow,
            }
        }
    });

    const dbParams = {
        TransactItems: items
    }

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        console.log(`Created player: ${JSON.stringify(data, null, 2)}`);
        return { statusCode: 200, data };
    } catch (err) {
        return { statusCode: 400, data: err };
    }
}

export const dbCreatePlayers = async (params) => {
    let playerID;
    const datenow = formatISO(Date.now());

    const items = [];
    params.forEach((player) => {
        playerID = uuidv4();
        items.push({
            Put: {
                TableName: userTable,
                Item: {
                    PK: `PLAYER`,
                    SK: playerID,
                    id: playerID,
                    fullName: player.fullName,
                    emailAddress: player.emailAddress.toLowerCase(),
                    PK2: player.emailAddress.toLowerCase(),
                    createdAt: datenow,
                }
            }
        })
    });

    const dbParams = {
        TransactItems: items
    }

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        console.log('Created players:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data };
    } catch (err) {
        return { statusCode: 400, err };
    }
}

/*********************************
 *     Sign Buyer
 *********************************/
export const dbCreateSignBuyer = async (id, type, params) => {
    const datenow = formatISO(Date.now());
    const signID = uuidv4();
    const orderID = uuidv4();

    const dbParams = {
        TransactItems: [
            {
                Put: {
                    TableName: userTable,
                    Item: {
                        PK: `SIGN`,
                        SK: `${type.toUpperCase()}#${id}`,
                        id: `${type.toUpperCase()}#${id}`,
                        fullName: params.billingAddress.fullName,
                        emailAddress: params.billingAddress.emailAddress.toLowerCase(),
                        phoneNumber: params.billingAddress.phoneNumber,
                        streetAddress: params.billingAddress.streetAddress,
                        zipCode: params.billingAddress.zipCode,
                        city: params.billingAddress.city,
                        state: params.billingAddress.state,
                        PK2: params.billingAddress.emailAddress.toLowerCase(),
                        createdAt: datenow,
                    },
                },
            },
            {
                Put: {
                    TableName: userTable,
                    Item: {
                        PK: `${type.toUpperCase()}#${id}`,
                        SK: `SIGN#${signID}`,
                        price: params.price,
                        quantity: params.quantity,
                        appearName: params.appearName,
                        renewal: params.renewal,
                        ordered: false,
                        orderedDate: "",
                        shipped: false,
                        shipDate: "",
                        createdAt: datenow,
                    }
                },
            },
            {
                Put: {
                    TableName: userTable,
                    Item: {
                        PK: `ORDER#${orderID}`,
                        SK: `SIGN#${signID}`,
                        user: `${type.toUpperCase()}#${id}`,
                        price: params.price,
                        quantity: params.quantity,
                        appearName: params.appearName,
                        renewal: params.renewal,
                        ordered: false,
                        orderedDate: "",
                        shipped: false,
                        shipDate: "",
                        createdAt: datenow,
                    }
                },
            },
            {
                Put: {
                    TableName: userTable,
                    Item: {
                        PK: `SIGN#${signID}`,
                        SK: `SIGN#${signID}`,
                        price: params.price,
                        quantity: params.quantity,
                        appearName: params.appearName,
                        renewal: params.renewal,
                        ordered: false,
                        orderedDate: "",
                        shipped: false,
                        shipDate: "",
                        createdAt: datenow,
                    }
                },
            },
        ]
    };

    console.log("dbCreateSignBuyer: dbParams = ", JSON.stringify(dbParams, null, 2))

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        console.log('Created sign buyer:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data: orderID };
    } catch (err) {
        return { statusCode: 400, data: err };
    }
}


/*********************************
 *     Shirt Buyer
 *********************************/
export const dbCreateShirtBuyer = async (id, type, params) => {
    const datenow = formatISO(Date.now());
    let shirtID;
    const orderID = uuidv4();

    const items = [];
    items.push({
        Put: {
            TableName: userTable,
            Item: {
                PK: `SHIRT`,
                SK: `${type.toUpperCase()}#${id}`,
                id: `${type.toUpperCase()}#${id}`,
                fullName: params.billingAddress.fullName,
                emailAddress: params.billingAddress.emailAddress.toLowerCase(),
                phoneNumber: params.billingAddress.phoneNumber,
                streetAddress: params.billingAddress.streetAddress,
                zipCode: params.billingAddress.zipCode,
                city: params.billingAddress.city,
                state: params.billingAddress.state,
                PK2: params.billingAddress.emailAddress.toLowerCase(),
                createdAt: datenow,
            }
        }
    });

    params.shirts.forEach((shirt) => {
        shirtID = uuidv4();
        items.push({
            Put: {
                TableName: userTable,
                Item: {
                    PK: `SHIRT#${shirtID}`,
                    SK: `SHIRT#${shirtID}`,
                    size: shirt.size,
                    gender: shirt.gender,
                    quantity: shirt.quantity,
                    price: shirt.price,
                    type: shirt.type,
                    ordered: false,
                    orderedDate: "",
                    shipped: false,
                    shipDate: "",
                    createdAt: datenow,
                }
            },
        });
        items.push({
            Put: {
                TableName: userTable,
                Item: {
                    PK: `${type.toUpperCase()}#${id}`,
                    SK: `SHIRT#${shirtID}`,
                    size: shirt.size,
                    gender: shirt.gender,
                    quantity: shirt.quantity,
                    price: shirt.price,
                    type: shirt.type,
                    ordered: false,
                    orderedDate: "",
                    shipped: false,
                    shipDate: "",
                    createdAt: datenow,
                }
            },
        });
        items.push({
            Put: {
                TableName: userTable,
                Item: {
                    PK: `ORDER#${orderID}`,
                    SK: `SHIRT#${shirtID}`,
                    user: `${type.toUpperCase()}#${id}`,
                    size: shirt.size,
                    gender: shirt.gender,
                    quantity: shirt.quantity,
                    price: shirt.price,
                    type: shirt.type,
                    ordered: false,
                    orderedDate: "",
                    shipped: false,
                    shipDate: "",
                    createdAt: datenow,
                }
            },
        });
    });
        

    const dbParams = {
        TransactItems: items
    }

    console.log("dbCreateShirtBuyer: dbParams = ", JSON.stringify(dbParams, null, 2))
    // const returnItems = items.map(i => i.Put.Item);

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        console.log('Created shirt buyer:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data: orderID };
    } catch (err) {
        return { statusCode: 400, data: err };
    }
}

/*********************************
 *     Donor
 *********************************/
export const dbCreateDonor = async (params) => {
    const donorID = uuidv4();
    const datenow = formatISO(Date.now());

    const dbParams = {
        TableName: userTable,
        Item: {
            PK: 'DONOR',
            SK: donorID,
            id: donorID,
            fullName: params.billingAddress.fullName,
            emailAddress: params.billingAddress.emailAddress.toLowerCase(),
            phoneNumber: params.billingAddress.phoneNumber,
            streetAddress: params.billingAddress.streetAddress,
            zipCode: params.billingAddress.zipCode,
            city: params.billingAddress.city,
            state: params.billingAddress.state,
            PK2: params.billingAddress.emailAddress.toLowerCase(),
            createdAt: datenow,
        },
    };

    console.log("dbCreateDonor: dbParams = ", JSON.stringify(dbParams, null, 2))

    try {
        const data = await dynamoDb.put(dbParams);
        console.log('Created donor:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data: donorID };
    } catch (err) {
        return { statusCode: 400, data: err };
    }
}

export const dbCreateDonorCollection = async (id, params) => {
    const datenow = formatISO(Date.now());
    const orderID = uuidv4();
    const donationID = uuidv4();

    const dbParams = {
        TransactItems: [
            {
                Put: {
                    TableName: userTable,
                    Item: {
                        PK: `DONOR#${id}`,
                        SK: `DONATION#${donationID}`,
                        amount: params.amount,
                        purpose: params.purpose,
                        createdAt: datenow,
                    },
                }
            },
            {
                Put: {
                    TableName: userTable,
                    Item: {
                        PK: `ORDER#${orderID}`,
                        SK: `DONOR#${id}`,
                        amount: params.amount,
                        purpose: params.purpose,
                        createdAt: datenow,
                    },
                }
            },

        ]
    }

    // const dbParams = {
    //     TableName: userTable,
    //     Item: {
    //         PK: `DONOR#${id}`,
    //         SK: `DONATION`,
    //         amount: params.amount,
    //         purpose: params.purpose,
    //         createdAt: datenow,
    //     },
    // };

    console.log("dbCreateDonor: dbParams = ", JSON.stringify(dbParams, null, 2))

    try {
        const data = await dynamoDb.transactWrite(dbParams);
        console.log('Created donor:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data: orderID };
    } catch (err) {
        return { statusCode: 400, data: err };
    }
}

/*********************************
 *  Event
 *********************************/
export const dbCreateEvent = async (params) => {
    const datenow = formatISO(Date.now());

    const item = {
        PK: 'EVENT',
        SK: params.id,
        id: params.id,
        color: params.color,
        title: params.title,
        allDay: params.allDay,
        description: params.description,
        startDate: formatISO(params.start),
        endDate: formatISO(params.end),
        extendedProps: {
            totalAttendees: params.extendedProps.totalAttendees,
            cutoffDate: formatISO(params.extendedProps.cutoffDate),
            // cutoffAttendees: params.extendedProps.cutoffAttendees,
            cost: params.extendedProps.cost,
            active: params.extendedProps.active,
            location: params.extendedProps.location,
            allowSponsor: params.extendedProps.allowSponsor,
            allowVeteran: params.extendedProps.allowVeteran,
            allowCommunity: params.extendedProps.allowCommunity,
            comment: params.extendedProps.comment,
            veteranFree: params.extendedProps.veteranFree,
            category: params.extendedProps.category,
        },
        createdAt: datenow,
    }

    const dbParams = {
        TableName: eventTable,
        Item: item
    };

    console.log("dbCreateEvent: dbParams = ", dbParams)

    try {
        const data = await dynamoDb.put(dbParams);
        console.log('Created event:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data };
    } catch (err) {
        return { statusCode: 400, data: err };
    }
}

export const dbCreateUserEvent = async (id, params) => {
    const datenow = formatISO(Date.now());

    const item = {
        PK: `EVENT#${params.eventID}`,
        SK: `${params.type.toUpperCase()}#${id}`,
        fullName: params.billingAddress.fullName,
        emailAddress: params.billingAddress.emailAddress.toLowerCase(),
        phoneNumber: params.billingAddress.phoneNumber,
        streetAddress: params.billingAddress.streetAddress,
        zipCode: params.billingAddress.zipCode,
        city: params.billingAddress.city,
        state: params.billingAddress.state,
        numberOfGuests: params.numberOfGuests,
        PK2: params.billingAddress.emailAddress.toLowerCase(),
        category: params.category,
        totalCost: params.totalCost,
        createdAt: datenow,
    }

    const dbParams = {
        TableName: userTable,
        Item: item
    };

    console.log("dbCreateUserEvent: dbParams = ", dbParams)

    try {
        const data = await dynamoDb.put(dbParams);
        console.log('Created event:', JSON.stringify(data, null, 2));
        return { statusCode: 200, data };
    } catch (err) {
        return { statusCode: 400, data: err };
    }
}