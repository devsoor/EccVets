// @mui
import { enUS, frFR, zhCN, viVN, arSD } from '@mui/material/locale';
// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';

export const COGNITO_API = {
    userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
    clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
};

export const MAPBOX_API = process.env.REACT_APP_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
    MOBILE_HEIGHT: 64,
    MAIN_DESKTOP_HEIGHT: 96,
    DASHBOARD_DESKTOP_HEIGHT: 92,
    DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
    BASE_WIDTH: 260,
    DASHBOARD_WIDTH: 280,
    DASHBOARD_COLLAPSE_WIDTH: 88,
    //
    DASHBOARD_ITEM_ROOT_HEIGHT: 48,
    DASHBOARD_ITEM_SUB_HEIGHT: 40,
    DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const NAV = {
    W_BASE: 260,
    W_DRAWER: 280,
    //
    H_ITEM: 48,
    H_ITEM_SUB: 36,
  };

export const ICON = {
    NAVBAR_ITEM: 22,
    NAVBAR_ITEM_HORIZONTAL: 20,
};

// Roles
export const ROLES = [
    {name: 'Veteran', label: 'Veteran'},
    {name: 'Sponsor', label: 'Sponsor'},
    {name: 'Community', label: 'A kind soul who wants to give back'},
]

// Set API service names here
const apiNames = [
    'client',
    'payment'
];

const createEndpoint = name => {
    let apiLink = '';

    switch (process.env.REACT_APP_STAGE) {
        case 'dev':
            apiLink = process.env.REACT_APP_API_URL;
            break;
        case 'staging':
            apiLink = process.env.REACT_APP_API_URL;
            break;
        case 'prod':
            apiLink = process.env.REACT_APP_API_URL;
            break;
        default:
            apiLink = process.env.REACT_APP_API_URL;
            break;
    }
    const item = {
        name,
        endpoint: apiLink,
        region: process.env.REACT_APP_REGION,
    };
    return item;
};

const endpoints = [];
apiNames.forEach(item => {
    const ep = createEndpoint(item);
    endpoints.push(ep);
});

export const AwsConfig = {
    s3: {
        REGION: process.env.REACT_APP_REGION,
        BUCKET: process.env.REACT_APP_BUCKET,
    },
    apiGateway: {
        endpoints,
    },
};

// SETTINGS
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const defaultSettings = {
    themeMode: 'light',
    themeDirection: 'ltr',
    themeContrast: 'default',
    themeLayout: 'horizontal',
    themeColorPresets: 'default',
    themeStretch: false,
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs = [
    {
        label: 'English',
        value: 'en',
        systemValue: enUS,
        icon: '/assets/icons/flags/ic_flag_en.svg',
    },
    {
        label: 'French',
        value: 'fr',
        systemValue: frFR,
        icon: '/assets/icons/flags/ic_flag_fr.svg',
    },
    {
        label: 'Vietnamese',
        value: 'vn',
        systemValue: viVN,
        icon: '/assets/icons/flags/ic_flag_vn.svg',
    },
    {
        label: 'Chinese',
        value: 'cn',
        systemValue: zhCN,
        icon: '/assets/icons/flags/ic_flag_cn.svg',
    },
    {
        label: 'Arabic (Sudan)',
        value: 'ar',
        systemValue: arSD,
        icon: '/assets/icons/flags/ic_flag_sa.svg',
    },
];

export const defaultLang = allLangs[0]; // English
