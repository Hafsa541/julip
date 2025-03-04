'use client';

import PropTypes from 'prop-types';
import { AuthGuard } from 'src/auth/guard';
import AuthGuardInside from 'src/auth/guard/auth-guard-inside';
// components
import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuardInside>
      <AuthModernCompactLayout>{children}</AuthModernCompactLayout>
    </AuthGuardInside>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
