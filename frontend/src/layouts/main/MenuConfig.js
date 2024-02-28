// routes
// components
import { PATH_AFTER_LOGIN } from '../../config';
import { PATH_PAGE } from '../../routes/paths';

// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
    width: 22,
    height: 22,
};

const menuConfig = [
    {
        title: 'Home',
        icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
        path: '/',
    },

    // {
    //     title: 'Golf',
    //     path: PATH_PAGE.golf,
    //     icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
    //     children: [
    //         {
    //             items: [
    //                 // { title: 'Information', path: PATH_PAGE.golf.info },
    //                 { title: 'Sponsorship Packages', path: PATH_PAGE.golf.sponsorPackages },
    //                 { title: 'Veteran Registration', path: PATH_PAGE.golf.veteranregistration },
    //                 { title: 'Community Registration', path: PATH_PAGE.golf.communityregistration },
    //             ],
    //         },
    //     ],
    // },
    { title: 'Red Shirts', path: PATH_PAGE.order.shirt },
    { title: 'Support Signs', path: PATH_PAGE.order.sign },
    // {
    //     title: 'Order Products',
    //     path: PATH_PAGE.order,
    //     icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
    //     children: [
    //         {
    //             items: [
    //                 { title: 'Veterans Community Support Signs', path: PATH_PAGE.order.sign },
    //                 { title: 'Red Shirts', path: PATH_PAGE.order.shirt },
    //             ],
    //         },
    //     ],
    // },
    {
        title: 'Events',
        // icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
        path: PATH_PAGE.event.list,
    },
    // {
    //     title: 'Golf',
    //     // icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    //     path: PATH_PAGE.golf.info,
    // },
    // {
    //     title: 'Gallery',
    //     icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
    //     path: PATH_PAGE.gallery,
    // },
    {
        title: 'Contact Us',
        // icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
        path: PATH_PAGE.contact,
    },
    {
        title: 'About Us',
        // icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
        path: PATH_PAGE.about,
    },
    {
        title: 'Donate',
        // icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
        path: PATH_PAGE.donate,
    },
];

export default menuConfig;
