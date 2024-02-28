import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: t('dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [

          // CALENDAR
          {
            title: t('event calendar'),
            path: paths.dashboard.calendar,
            // icon: ICONS.calendar,
            icon: <Iconify icon="material-symbols:event"/>,
          },
        ],
      },
      {
        subheader: t('view'),
        items: [
          // SPONSOR
          {
            title: t('sponsor'),
            path: paths.dashboard.sponsor.root,
            icon: <Iconify icon="codicon:organization"/>,
          },
          {
            title: t('veteran'),
            path: paths.dashboard.veteran.root,
            icon: <Iconify icon="material-symbols:military-tech-outline"/>,
          },
          {
            title: t('community'),
            path: paths.dashboard.community.root,
            icon: <Iconify icon="iconoir:community"/>,
          },
          {
            title: t('donor'),
            path: paths.dashboard.donor.root,
            icon: <Iconify icon="la:donate"/>,
          },
          {
            title: t('veteran sign'),
            path: paths.dashboard.sign.root,
            icon: <Iconify icon="la:flag-usa"/>,
          },
          {
            title: t('red shirt'),
            path: paths.dashboard.shirt.root,
            icon: <Iconify icon="tabler:shirt"/>,
          },
          {
            title: t('event'),
            path: paths.dashboard.event,
            icon: <Iconify icon="material-symbols:event"/>,
          },
          {
            title: t('golf teams'),
            path: paths.dashboard.golfteam.root,
            icon: <Iconify icon="maki:golf"/>,
          },
        ],
      },
      {
        subheader: t('Other'),
        items: [
          // PRODUCT
          {
            title: t('product'),
            path: paths.dashboard.product.root,
            icon: ICONS.product,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
