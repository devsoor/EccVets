import { API } from 'aws-amplify';

const endpoint = {
    createSponsor: () => '/client/sponsor',
    getSponsorLogos: () => '/client/sponsor/logos',
    createPlayer: () => '/client/player',
    createTeam: () => '/client/team',
    getProducts: (type) => `/client/product/${type}`,
    createPaymentIntent: () => '/payment',
    createVeteranSignBuyer: () => '/client/sign-buyer',
    createVeteranShirtBuyer: () => '/client/shirt-buyer',
    createDonor: () => '/client/donor',
    getEvents: () => '/client/events',
    getEventsFilter: () => '/client/events/filter',
    getEvent: (id) => `/client/event/${id}`,
    createEvent: () => '/client/event',
    getEventAttendees: id => `/client/event-attendees/${id}`,
    sendEmail: (id) => `/client/email/${id}`,
    getOrder: (id) => `/client/order/${id}`,
    sendContactFormEmail: () => '/client/contactform',
}

/*******************
 * CLIENT API
 ********************/

export const createSponsor = async params => {
    const response = await API.post('client', endpoint.createSponsor(), {
        body: params,
    });
    return response;
};

export const createPlayer = async params => {
    const response = await API.post('client', endpoint.createPlayer(), {
        body: params,
    });
    return response;
};

export const createTeam = async params => {
    const response = await API.post('client', endpoint.createTeam(), {
        body: params,
    });
    return response;
};

export const getProducts = async (type) => {
    const response = await API.get('client', endpoint.getProducts(type));
    return response;
};

export const createVeteranSignBuyer = async params => {
    const response = await API.post('client', endpoint.createVeteranSignBuyer(), {
        body: params,
    });
    return response;
};
export const createVeteranShirtBuyer = async params => {
    const response = await API.post('client', endpoint.createVeteranShirtBuyer(), {
        body: params,
    });
    return response;
};

export const createDonor = async params => {
    const response = await API.post('client', endpoint.createDonor(), {
        body: params,
    });
    return response;
};

/*******************
 * PAYMENT API
 ********************/

export const createPaymentIntent = async params => {
    const response = await API.post('payment', endpoint.createPaymentIntent(), {
        body: params,
    });
    return response;
};

/*******************
 * EVENT API
 ********************/
export const getEvents = async (params) => {
    const response = await API.get('client', endpoint.getEvents(), {
        queryStringParameters: params,
    });
    return response;
};

export const getEvent = async (id) => {
    const response = await API.get('client', endpoint.getEvent(id));
    return response;
};

export const getEventsFilter = async (params) => {
    const response = await API.get('client', endpoint.getEventsFilter(), {
        queryStringParameters: params,
    });
    return response;
};

export const createEvent = async params => {
    const response = await API.post('client', endpoint.createEvent(), {
        body: params,
    });
    return response;
};

export const getEventAttendees = async (id) => {
    const response = await API.get('client', endpoint.getEventAttendees(id));
    return response;
};

export const getSponsorLogos = async () => {
    const response = await API.get('client', endpoint.getSponsorLogos());
    return response;
};

export const sendEmail = async (id, params) => {
    const response = await API.post('client', endpoint.sendEmail(id), {
        body: params
    });
    return response;
};
export const sendContactFormEmail = async (params) => {
    const response = await API.post('client', endpoint.sendContactFormEmail(), {
        body: params
    });
    return response;
};

export const getOrder = async (id) => {
    const response = await API.get('client', endpoint.getOrder(id));
    return response;
};
