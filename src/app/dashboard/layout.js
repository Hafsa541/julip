'use client';

import { usePathname, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
// auth
import { AuthGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';
// components
import DashboardLayout from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  const router = useRouter();
  const pathName = usePathname();
  const { authenticated, user } = useAuthContext();

  console.log('authenticated, user ', { authenticated, user });
  useEffect(() => {
    if (authenticated && !user?.isEmailVerified) {
      console.log('email verified');
      router?.replace(paths.authDemo.modern.verify);
    } else if (authenticated && user?.isEmailVerified && !user?.isProfileCreated) {
      console.log('profile created');
      router?.replace(paths.authDemo.modern.setProfile);
    } else if (
      authenticated &&
      user?.isEmailVerified &&
      user?.isProfileCreated &&
      !user?.isTemplateSelected
    ) {
      router?.replace(paths.authDemo.modern.setProfile);
    } else if (
      authenticated &&
      user?.isEmailVerified &&
      user?.isProfileCreated &&
      user?.isTemplateSelected &&
      !user?.isPricingSelected
    ) {
      router?.replace(paths.authDemo.modern.setProfile);
    } else if (
      authenticated &&
      user?.isEmailVerified &&
      user?.isProfileCreated &&
      user?.isTemplateSelected &&
      user?.isPricingSelected
    ) {
      router.replace(paths.dashboard.about);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   if (pathName === '/dashboard/' && authenticated) {
  //     router.replace(paths.dashboard.about);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
