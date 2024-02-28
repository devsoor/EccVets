import { API } from 'aws-amplify';

const endpoint = {
    createUser: () => '/admin/user',
    getUser: (id) => `/admin/user/${id}`,
    getUsers: () => '/admin/users',
    getUserShirts: (id) => `/admin/user/shirt/${id}`,
    getAllUsersShirts: () => '/admin/user/shirts',
    getAllUsersSigns: () => '/admin/user/signs',
    getAllDonors: () => '/admin/user/donors',
    getAllUsersShirtsFilter: (id) => `/admin/user/shirts/filter/${id}`,
    getAllUsersSignsFilter: (id) => `/admin/user/signs/filter/${id}`,
    getUserSigns: (id) => `/admin/user/sign/${id}`,
    createSponsor: () => '/admin/user/sponsor',
    updateSponsor: (id) => `/admin/user/sponsor/${id}`,
    updateSponsorLogo: (id) => `/admin/user/sponsor/${id}/logo`,
    deleteSponsor: (id) => `/admin/user/sponsor/${id}`,
    updateOrderStatus: (id) => `/admin/user/${id}/order`,
    createProduct: () => '/admin/product',
    getProduct: id => `/admin/product/${id}`,
    getProducts: () => '/admin/products',
    getProductsByType: (id) => `/admin/product/type/${id}`,
    getStripeProducts: () => '/admin/products/stripe',
    updateProduct: id => `/admin/product/${id}`,
    deleteProduct: id => `/admin/product/${id}`,
    createEvent: () => '/admin/event',
    getEvent: id => `/admin/event/${id}`,
    getUserEvents: id => `/admin/event/user/${id}`,
    getEventAttendees: id => `/admin/event-attendees/${id}`,
    getEventsFilter: () => '/admin/events/filter',
    getEventTeamPlayers: id => `/admin/event/team/${id}`,
    createTeamByAdmin: () => '/admin/team',
    updateTeamByAdmin: (id) => `/admin/team/${id}`,
    getTeams: () => '/admin/teams',
    updateTeam: (id) => `/admin/team/${id}`,
    deleteTeam: (id) => `/admin/team/${id}`,
    createPlayer: () => '/admin/player',
    deletePlayer: (id) => `/admin/player/${id}`,
    getEvents: () => '/admin/events',
    updateEvent: (id) => `/admin/event/${id}`,
    updateEventPrice: (id) => `/admin/event/${id}/price`,
    deleteEvent: (id) => `/admin/event/${id}`,
    getTotals: () => '/admin/totals',
    getInvoiceSummary: () => '/payment/invoices',
}

export const createUser = async params => {
    const response = await API.post('admin', endpoint.createUser(), {
        body: params,
    });
    return response;
};


export const getUser = async (id, params) => {
    const response = await API.get('admin', endpoint.getUser(id), {
        queryStringParameters: params,
    });
    return response;
};

export const getUserShirts = async (id, params) => {
    const response = await API.get('admin', endpoint.getUserShirts(id), {
        queryStringParameters: params,
    });
    return response;
};

export const getAllUsersShirts = async () => {
    const response = await API.get('admin', endpoint.getAllUsersShirts());
    return response;
};

export const getAllUsersSigns = async () => {
    const response = await API.get('admin', endpoint.getAllUsersSigns());
    return response;
};

export const getAllDonors = async () => {
    const response = await API.get('admin', endpoint.getAllDonors());
    return response;
};

export const getAllUsersShirtsFilter = async (id) => {
    const response = await API.get('admin', endpoint.getAllUsersShirtsFilter(id));
    return response;
};

export const getAllUsersSignsFilter = async (id) => {
    const response = await API.get('admin', endpoint.getAllUsersSignsFilter(id));
    return response;
};


export const getUserSigns = async (id, params) => {
    const response = await API.get('admin', endpoint.getUserSigns(id), {
        queryStringParameters: params,
    });
    return response;
};
export const createSponsor = async params => {
    const response = await API.post('admin', endpoint.createSponsor(), {
        body: params,
    });
    return response;
};

export const updateSponsor = async (id, params) => {
    const response = await API.put('admin', endpoint.updateSponsor(id), {
        body: params,
    });
    return response;
};

export const updateSponsorLogo = async (id, params) => {
    const response = await API.put('admin', endpoint.updateSponsorLogo(id), {
        body: params,
    });
    return response;
};

export const deleteSponsor = async (id, params) => {
    const response = await API.del('admin', endpoint.deleteSponsor(id), {
        body: params
    });
    return response;
};

export const updateOrderStatus = async (id, params) => {
    const response = await API.put('admin', endpoint.updateOrderStatus(id), {
        body: params,
    });
    return response;
};

export const createTeamByAdmin = async params => {
    const response = await API.post('admin', endpoint.createTeamByAdmin(), {
        body: params,
    });
    return response;
};

export const updateTeam = async (id, params) => {
    const response = await API.put('admin', endpoint.updateTeam(id), {
        body: params,
    });
    return response;
};

export const updateTeamByAdmin = async (id, params) => {
    const response = await API.put('admin', endpoint.updateTeamByAdmin(id), {
        body: params,
    });
    return response;
};

export const deleteTeam = async (id, params) => {
    const response = await API.del('admin', endpoint.deleteTeam(id), {
        body: params,
    });
    return response;
};

export const createPlayer = async params => {
    const response = await API.post('admin', endpoint.createPlayer(), {
        body: params,
    });
    return response;
};

export const deletePlayer = async (id, params) => {
    const response = await API.del('admin', endpoint.deletePlayer(id), {
        body: params,
    });
    return response;
};

export const getUserEvents = async (id, params) => {
    const response = await API.get('admin', endpoint.getUserEvents(id), {
        queryStringParameters: params,
    });
    return response;
};

export const getTeams = async () => {
    const response = await API.get('admin', endpoint.getTeams());
    return response;
};

export const getEventTeamPlayers = async (id) => {
    const response = await API.get('admin', endpoint.getEventTeamPlayers(id));
    return response;
};

export const getEventsFilter = async (params) => {
    const response = await API.get('admin', endpoint.getEventsFilter(), {
        queryStringParameters: params,
    });
    return response;
};

export const getUsers = async (params) => {
    const response = await API.get('admin', endpoint.getUsers(), {
        queryStringParameters: params,
    });
    return response;
};

export const createProduct = async params => {
    const response = await API.post('admin', endpoint.createProduct(), {
        body: params,
    });
    return response;
};

export const getProduct = async (id, params) => {
    const response = await API.get('admin', endpoint.getProduct(id), {
        queryStringParameters: params,
    });
    return response;
};

export const getProducts = async () => {
    const response = await API.get('admin', endpoint.getProducts());
    return response;
};
export const getProductsByType = async (id) => {
    const response = await API.get('admin', endpoint.getProductsByType(id));
    return response;
};

export const updateProduct = async (id, params) => {
    const response = await API.put('admin', endpoint.updateProduct(id), {
        body: params,
    });
    return response;
};

export const deleteProduct = async (id, params) => {
    const response = await API.del('admin', endpoint.deleteProduct(id), {
        body: params,
    });
    return response;
};

export const createEvent = async params => {
    const response = await API.post('admin', endpoint.createEvent(), {
        body: params,
    });
    return response;
};

export const updateEvent = async (id, params) => {
    const response = await API.put('admin', endpoint.updateEvent(id), {
        body: params,
    });
    return response;
};

export const updateEventPrice = async (id, params) => {
    const response = await API.put('admin', endpoint.updateEventPrice(id), {
        body: params,
    });
    return response;
};

export const deleteEvent = async (id) => {
    const response = await API.del('admin', endpoint.deleteEvent(id));
    return response;
};

export const getEvent = async (id) => {
    const response = await API.get('admin', endpoint.getEvent(id));
    return response;
};

export const getEventAttendees = async (id) => {
    const response = await API.get('admin', endpoint.getEventAttendees(id));
    return response;
};

export const getEvents = async (params) => {
    const response = await API.get('admin', endpoint.getEvents(), {
        queryStringParameters: params,
    });
    return response;
};

export const getTotals = async () => {
    const response = await API.get('admin', endpoint.getTotals());
    return response;
};
export const getInvoiceSummary = async () => {
    const response = await API.get('admin', endpoint.getInvoiceSummary());
    return response;
};