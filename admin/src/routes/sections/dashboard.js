import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
// const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
// const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
// const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
// const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
// const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
// PRODUCT
const ProductPage = lazy(() => import('src/pages/dashboard/product/list'));

// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// USER
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));

const SponsorListPage = lazy(() => import('src/pages/dashboard/sponsor/list'));

const VeteranListPage = lazy(() => import('src/pages/dashboard/veteran/list'));
const CommunityListPage = lazy(() => import('src/pages/dashboard/community/list'));
const DonorListPage = lazy(() => import('src/pages/dashboard/donor/list'));
const SignListPage = lazy(() => import('src/pages/dashboard/sign/list'));
const ShirtListPage = lazy(() => import('src/pages/dashboard/shirt/list'));
const GolfListPage = lazy(() => import('src/pages/dashboard/golf/list'));
const GolfCreateTeam = lazy(() => import('src/pages/dashboard/golf/GolfCreateTeam'));
const PeopleView = lazy(() => import('src/pages/dashboard/people/PeopleView'));
const PeopleCreateSponsor = lazy(() => import('src/pages/dashboard/people/PeopleCreateSponsor'));

const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const EventListPage = lazy(() => import('src/pages/dashboard/eventlist'));

const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'product', element: <ProductPage/>
      },
      {
        path: 'sponsor', element: <SponsorListPage />
      },
      {
        path: 'veteran', element: <VeteranListPage />
      },
      {
        path: 'community', element: <CommunityListPage />
      },
      {
        path: 'donor', element: <DonorListPage />
      },
      {
        path: 'sign', element: <SignListPage />
      },
      {
        path: 'shirt', element: <ShirtListPage />
      },
      {
        path: 'golfteam', element: <GolfListPage />
      },
      { path: 'golfteam/newteam', element: <GolfCreateTeam /> },
      { path: 'people/:type/:id/:role', element: <PeopleView /> },
      { path: 'people/newsponsor', element: <PeopleCreateSponsor /> },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'event', element: <EventListPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];
