import { useMemo } from 'react';
import { Typography } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// locales
// import { useLocales } from 'src/locales';
// components
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1, color: 'black' }} />
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
  // analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  about_you: icon('julip_about_you'),
  templates: icon('julip_templates'),
  pages: icon('julip_pages'),
  analytics: icon('julip_analytics'),
  settings: icon('julip_settings'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  // const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        items: [
          // {
          //   title: t('app'),
          //   path: paths.dashboard.root,
          //   icon: ICONS.dashboard,
          // },

          {
            title: (
              <Typography fontSize={18} fontWeight={700} color="black">
                About You
              </Typography>
            ),
            path: paths.dashboard.about || paths.dashboard.root,
            icon: ICONS.about_you,
          },
          {
            title: (
              <Typography fontSize={18} fontWeight={700} color="black">
                Templates
              </Typography>
            ),
            path: paths.dashboard.templates,
            icon: ICONS.templates,
          },
          {
            title: (
              <Typography fontSize={18} fontWeight={700} color="black">
                Pages
              </Typography>
            ),
            path: paths.dashboard.pages,
            icon: ICONS.pages,
          },
          {
            title: (
              <Typography fontSize={18} fontWeight={700} color="black">
                Analytics
              </Typography>
            ),
            path: paths.dashboard.analytics,
            icon: ICONS.analytics,
          },
          {
            title: (
              <Typography fontSize={18} fontWeight={700} color="black">
                Settings
              </Typography>
            ),
            path: paths.dashboard.settings,
            icon: ICONS.settings,
          },
        ],
      },
    ],
    []
  );

  return data;
}
