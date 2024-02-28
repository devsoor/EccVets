// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register'),
    loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
    verify: path(ROOTS_AUTH, '/verify'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    pricing: '/pricing',
    payment: (id, price, emailAddress, orderID) => `/payment/${id}/${price}/${emailAddress}/${orderID}`,
    paymentComplete: '/payment/complete',
    about: '/about-us',
    contact: '/contact-us',
    // gallery: '/gallery',
    donate: '/donate',
    event: {
        list: '/event/list',
        detail: (id, type) => `/event/detail/${id}/${type}`
    },
    faqs: '/faqs',
    page403: '/403',
    page404: '/404',
    page500: '/500',
    components: '/components',
    golf: {
        info: '/golf/info',
        sponsorPackages: id => `/golf/packages/${id}`,
        veteranregistration: id => `/golf/veteranregistration/${id}`,
        communityregistration: id => `/golf/communityregistration/${id}`,
        sponsorBuy: (id, price, eventID) => `/golf/sponsor/${id}/${price}/${eventID}`,
        playerBuy:  (id, price, type, eventID) => `/golf/player/${id}/${price}/${type}/${eventID}`,
    },
    order: {
        root: '/order',
        sign: '/order/sign',
        shirt: '/order/shirt',
    },
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
        app: path(ROOTS_DASHBOARD, '/app'),
    },
    permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
};