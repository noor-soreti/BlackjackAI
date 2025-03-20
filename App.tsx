import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import Config from './src/screens/Config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://f7f2e5bc3e3138a5cd8f24a2f855af21@o4508959602769920.ingest.de.sentry.io/4508959627083857',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: Infinity,
      // retryOnMount: true,
      // refetchInterval: 5000,
      refetchOnMount: true,
      retry: 0,
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Config />
    </QueryClientProvider>
  );
};

export default Sentry.wrap(App);
