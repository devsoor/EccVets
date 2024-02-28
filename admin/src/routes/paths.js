// utils
import { paramCase } from 'src/utils/change-case';
import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/kAYnYYdib0aQPNKZpgJT6J/%5BPreview%5D-Minimal-Web.v5.0.0?type=design&node-id=0%3A1&t=Al4jScQq97Aly0Mn-1',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      register: `${ROOTS.AUTH}/amplify/register`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    blank: `${ROOTS.DASHBOARD}/blank`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    event: `${ROOTS.DASHBOARD}/event`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
    },
    sponsor: {
      root: `${ROOTS.DASHBOARD}/sponsor`,
    },
    veteran: {
      root: `${ROOTS.DASHBOARD}/veteran`,
    },
    community: {
      root: `${ROOTS.DASHBOARD}/community`,
    },
    donor: {
      root: `${ROOTS.DASHBOARD}/donor`,
    },
    sign: {
      root: `${ROOTS.DASHBOARD}/sign`,
    },
    shirt: {
      root: `${ROOTS.DASHBOARD}/shirt`,
    },
    golfteam: {
      root: `${ROOTS.DASHBOARD}/golfteam`,
      newTeam: `${ROOTS.DASHBOARD}/golfteam/newteam`,
    },
    people: {
      view: (type, id, role) => `${ROOTS.DASHBOARD}/people/${type}/${id}/${role}`,
      newsponsor: `${ROOTS.DASHBOARD}/people/newsponsor`,
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      sponsorship: {
        list: `${ROOTS.DASHBOARD}/product/sponsorship/list`,
        new: `${ROOTS.DASHBOARD}/product/sponsorship/new`,
        edit: (id) => `${ROOTS.DASHBOARD}/product/sponsorship/${id}/edit`,
      },
      veteran: {
        list: `${ROOTS.DASHBOARD}/product/veteran/list`,
        new: `${ROOTS.DASHBOARD}/product/veteran/new`,
        edit: (id) => `${ROOTS.DASHBOARD}/product/veteran/${id}/edit`,
      },
      community: {
        list: `${ROOTS.DASHBOARD}/product/community/list`,
        new: `${ROOTS.DASHBOARD}/product/community/new`,
        edit: (id) => `${ROOTS.DASHBOARD}/product/community/${id}/edit`,
      },
      sign: {
        list: `${ROOTS.DASHBOARD}/product/sign/list`,
        new: `${ROOTS.DASHBOARD}/product/sign/new`,
        edit: (id) => `${ROOTS.DASHBOARD}/product/sign/${id}/edit`,
      },
      shirt: {
        list: `${ROOTS.DASHBOARD}/product/shirt/list`,
        new: `${ROOTS.DASHBOARD}/product/shirt/new`,
        edit: (id) => `${ROOTS.DASHBOARD}/product/shirt/${id}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    // post: {
    //   root: `${ROOTS.DASHBOARD}/post`,
    //   new: `${ROOTS.DASHBOARD}/post/new`,
    //   details: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
    //   edit: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
    //   demo: {
    //     details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
    //     edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
    //   },
    // },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      details: (id) => `${ROOTS.DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
      },
    },
    // job: {
    //   root: `${ROOTS.DASHBOARD}/job`,
    //   new: `${ROOTS.DASHBOARD}/job/new`,
    //   details: (id) => `${ROOTS.DASHBOARD}/job/${id}`,
    //   edit: (id) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
    //   demo: {
    //     details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
    //     edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
    //   },
    // },
    // tour: {
    //   root: `${ROOTS.DASHBOARD}/tour`,
    //   new: `${ROOTS.DASHBOARD}/tour/new`,
    //   details: (id) => `${ROOTS.DASHBOARD}/tour/${id}`,
    //   edit: (id) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
    //   demo: {
    //     details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
    //     edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
    //   },
    // },
  },
};
