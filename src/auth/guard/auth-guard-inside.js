import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { usePathname, useRouter } from 'src/routes/hooks';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.jwt.login,
};

// ----------------------------------------------------------------------

export default function AuthGuardInside({ children }) {
  const router = useRouter();
  const pathName = usePathname();

  const { authenticated, method, user } = useAuthContext();

  console.log('authenticated, user authGuardInside', { authenticated, user });
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
    } else {
      router.replace(paths.auth.jwt.onboarding);
    }
    // check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (!checked) {
  //   return null;
  // }
  //   return null;

  return <>{children}</>;
}

AuthGuardInside.propTypes = {
  children: PropTypes.node,
};
