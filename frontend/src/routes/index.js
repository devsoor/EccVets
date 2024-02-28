import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// components
import LoadingScreen from '../components/LoadingScreen';
// layouts
import MainLayout from '../layouts/main';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';

// ----------------------------------------------------------------------

const Loadable = Component => props => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();

    return (
        <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: 'auth',
            children: [
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    ),
                },
                {
                    path: 'register',
                    element: (
                        <GuestGuard>
                            <Register />
                        </GuestGuard>
                    ),
                },
                { path: 'login-unprotected', element: <Login /> },
                { path: 'register-unprotected', element: <Register /> },
                { path: 'reset-password', element: <ResetPassword /> },
                { path: 'new-password', element: <NewPassword /> },
                { path: 'verify', element: <VerifyCode /> },
            ],
        },

        // Dashboard Routes
        // {
        //     path: 'dashboard',
        //     element: (
        //         <AuthGuard>
        //             <DashboardLayout />
        //         </AuthGuard>
        //     ),
        //     children: [
        //         { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        //         { path: 'app', element: <GeneralApp /> },
        //         { path: 'permission-denied', element: <PermissionDenied /> },
        //     ],
        // },

        // Main Routes
        {
            path: '*',
            element: <LogoOnlyLayout />,
            children: [
                { path: 'coming-soon', element: <ComingSoon /> },
                { path: 'maintenance', element: <Maintenance /> },
                { path: '500', element: <Page500 /> },
                { path: '404', element: <Page404 /> },
                { path: '403', element: <Page403 /> },
                { path: '*', element: <Navigate to="/404" replace /> },
            ],
        },
        {
            path: '/',
            element: <MainLayout />,
            children: [
                { element: <HomePage />, index: true },
                { path: 'about-us', element: <About /> },
                { path: 'contact-us', element: <Contact /> },
                // { path: 'gallery', element: <Gallery /> },
                { path: 'donate', element: <Donate /> },
                { 
                    path: 'event',
                    children: [
                        { path: 'list', element: <EventList /> },
                        { path: 'detail/:id/:type', element: <EventDetail /> },
                    ],
                },
                { path: 'payment/:id/:price/:emailAddress/:orderID', element: <SetupPayment /> },
                { path: 'payment/complete', element: <CompletePayment /> },
                {
                    path: 'golf',
                    children: [
                        { path: 'info', element: <GolfInfo /> },
                        { path: 'packages/:id', element: <GolfSponsorshipPackages /> },
                        { path: 'veteranregistration/:id', element: <GolfVeteranPlayerRegistration /> },
                        { path: 'communityregistration/:id', element: <GolfCommunityPlayerRegistration /> },
                        { path: 'sponsor/:id/:price/:eventID', element: <GolfSponsor /> },
                        { path: 'player/:id/:price/:type/:eventID', element: <GolfPlayer /> },
                    ],
                },
                {
                    path: 'order',
                    children: [
                        { path: 'sign', element: <OrderSign /> },
                        { path: 'shirt', element: <OrderShirt /> },
                    ],
                },
            ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// GENERAL
// const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));


// TEST RENDER PAGE BY ROLE
// const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));

// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
// const Gallery = Loadable(lazy(() => import('../pages/Gallery')));
const Donate = Loadable(lazy(() => import('../pages/Donate')));
// const GolfPage = Loadable(lazy(() => import('../pages/veterans/GolfPage')));
const GolfInfo = Loadable(lazy(() => import('../pages/GolfInfo')));
const GolfSponsor = Loadable(lazy(() => import('../pages/GolfSponsor')));
const GolfPlayer = Loadable(lazy(() => import('../pages/GolfPlayer')));
const GolfSponsorshipPackages = Loadable(lazy(() => import('../pages/GolfSponsorshipPackages')));
const GolfVeteranPlayerRegistration = Loadable(lazy(() => import('../pages/GolfVeteranPlayerRegistration')));
const GolfCommunityPlayerRegistration = Loadable(lazy(() => import('../pages/GolfCommunityPlayerRegistration')));
const OrderPage = Loadable(lazy(() => import('../pages/OrderPage')));
const OrderSign = Loadable(lazy(() => import('../pages/OrderSign')));
const OrderShirt = Loadable(lazy(() => import('../pages/OrderShirt')));
const EventList = Loadable(lazy(() => import('../pages/EventList')));
const EventDetail = Loadable(lazy(() => import('../pages/EventDetail')));
const SetupPayment = Loadable(lazy(() => import('../pages/SetupPayment')));
const CompletePayment = Loadable(lazy(() => import('../pages/CompletePayment')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
