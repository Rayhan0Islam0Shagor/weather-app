import React from 'react';
import '../styles/main.scss';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  React.useEffect(() => {
    const start = () => NProgress.start();
    const end = () => NProgress.done();

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
