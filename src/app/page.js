'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import { paths } from 'src/routes/paths';
// sections
// import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

// export const metadata = {
//   title: 'Minimal: The starting point for your next project',
// };

export default function HomePage() {
  const router = useRouter();
  const pathName = usePathname();

  const { authenticated } = useAuthContext();

  useEffect(() => {
    if (pathName === '/' && !authenticated) {
      router?.replace(paths.auth.jwt.onboarding);
    } else {
      router?.replace(paths.dashboard.about);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
  // return <HomeView />;
}
