// routes
import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.REACT_APP_HOST_API;
export const ASSETS_API = process.env.REACT_APP_ASSETS_API;

// export const FIREBASE_API = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APPID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// export const AMPLIFY_API = {
//   userPoolId: process.env.REACT_APP_AWS_AMPLIFY_USER_POOL_ID,
//   userPoolWebClientId: process.env.REACT_APP_AWS_AMPLIFY_USER_POOL_WEB_CLIENT_ID,
//   region: process.env.REACT_APP_AWS_AMPLIFY_REGION,
// };

// export const AUTH0_API = {
//   clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
//   domain: process.env.REACT_APP_AUTH0_DOMAIN,
//   callbackUrl: process.env.REACT_APP_AUTH0_CALLBACK_URL,
// };

export const MAPBOX_API = process.env.REACT_APP_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'

// Set API service names here
const apiNames = [
    'admin', 
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
    cognito: {
      REGION: process.env.REACT_APP_REGION,
      USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
      APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
};
