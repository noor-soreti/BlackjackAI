import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import React, {createContext, useContext, useEffect, useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {WithSplashScreen} from './RootScreens/SplashScreen';
import {getProfile, User} from '../Api/functions/user';
import {storage} from '../Api/Storage';
import {useQuery} from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';
import DataContext from './DataContext';
import AuthStack from '../navigation/AuthStack';
import {PostHogProvider} from 'posthog-react-native';
import {queryClient} from '../../App';
import Purchases, {LOG_LEVEL} from 'react-native-purchases';
import {Platform} from 'react-native';
import * as Sentry from '@sentry/react-native';

const Context = createContext<{
  user?: User | null;
  loading: boolean;
  fetching: boolean;
  signOut: () => void;
  refetch: () => void;
}>({
  loading: true,
  fetching: true,
  signOut: () => {},
  refetch: () => {},
});

export const useAuthContext = () => useContext(Context);

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});
Sentry.init({
  dsn: 'https://f7f2e5bc3e3138a5cd8f24a2f855af21@o4508959602769920.ingest.de.sentry.io/4508959627083857',
  integrations: [navigationIntegration],
});

const Config = () => {
  const containerRef = useRef<NavigationContainerRef<any>>(null);
  
  useEffect(() => {
    async function init() {
      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

      if (Platform.OS === 'ios') {
        Purchases.configure({
          apiKey: 'appl_MfnGNVKrtHUbZxbxTjbUKVMLHgN',
        });
      } else if (Platform.OS === 'android') {
        Purchases.configure({apiKey: ''});
      }
    }
    init();
  }, []);

  useEffect(() => {
    const checkFirebase = async () => {
      try {
        await auth().signInAnonymously();
        console.log('Firebase initialized successfully');
      } catch (error) {
        console.error('Firebase initialization error:', error);
      }
    };
    checkFirebase();
  }, []);

  const {data, isLoading, isFetching, refetch} = useQuery({
    queryKey: ['user'],
    queryFn: getProfile,
  });

  const signOut = async () => {
    await auth().signOut();
    storage.clearAll();
    await queryClient.invalidateQueries({queryKey: ['user']});
    await queryClient.invalidateQueries({queryKey: ['week']});
    await queryClient.invalidateQueries({queryKey: ['daily_task']});
  };

  return (
    <SafeAreaProvider>
      <WithSplashScreen isAppReady={!isLoading}>
        <NavigationContainer
          ref={containerRef}
          onReady={() => {
            navigationIntegration.registerNavigationContainer(containerRef.current);
          }}>
          <PostHogProvider apiKey="phc_9CfblbEVXk3CQBflyMcbjckZbuDghAyi5dVY3Bn3WBl">
            <Context.Provider
              value={{
                user: data,
                loading: isLoading,
                fetching: isFetching,
                signOut,
                refetch,
              }}>
              {data?._id ? <DataContext /> : <AuthStack />}
            </Context.Provider>
          </PostHogProvider>
        </NavigationContainer>
      </WithSplashScreen>
    </SafeAreaProvider>
  );
};

export default Config;
