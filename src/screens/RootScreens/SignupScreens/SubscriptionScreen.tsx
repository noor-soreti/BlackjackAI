import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import {usePostHog} from 'posthog-react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Purchases, {
  LOG_LEVEL,
  PurchasesOfferings,
  PurchasesPackage,
} from 'react-native-purchases';
import {storage} from '../../../Api/Storage';
import {CrossIcon, JourneyButton, PopularIcon} from '../../../assets/Svg';
import normalize from '../../../components/dimen';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {fontScale, height} from '../../../styles/globalStyles';
import {useAuthContext} from '../../Config';

const SubscriptionScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [selected_subscription, setSelectedSubscription] =
    useState<PurchasesPackage>();
  const {user} = useAuthContext();
  const postHog = usePostHog();

  useEffect(() => {
    postHog.capture('subscription_paywall_screen');
  }, [postHog]);

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'ios') {
      Purchases.configure({
        apiKey: 'appl_MfnGNVKrtHUbZxbxTjbUKVMLHgN',
        appUserID: user?._id,
      });
    } else if (Platform.OS === 'android') {
      Purchases.configure({apiKey: ''});
    }

    return () => {
      Purchases.logOut();
    };
  }, [user?._id]);

  const displayOfferings = async (): Promise<
    PurchasesOfferings | undefined
  > => {
    const offerings = await Purchases.getOfferings();
    return offerings;
  };

  const {data, isLoading, isSuccess} = useQuery({
    queryKey: ['offerings'],
    queryFn: displayOfferings,
    select: data => {
      return data?.current?.availablePackages ?? [];
    },
  });

  useFocusEffect(
    useCallback(() => {
      storage.set('last_screen', 'GiftScreen');
    }, []),
  );

  useEffect(() => {
    setSelectedSubscription(data?.[1]);
  }, [data, isSuccess]);

  const restorePurchases = async () => {
    const restore = await Purchases.restorePurchases();
    return restore;
  };

  const {mutate: restore, isPending: isRestoring} = useMutation({
    mutationFn: restorePurchases,
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'tabs'}],
      });
    },
  });

  const purchaseSubscription = async () => {
    const res = await Purchases.purchasePackage(selected_subscription!);
    return res;
  };

  const {mutate, isPending} = useMutation({
    mutationFn: purchaseSubscription,
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'tabs'}],
      });
    },
    onError: err => {
      console.log(err);
    },
  });

  return (
    <ScreenWrapper bgImage={require('../../../assets/Images/background5.png')}>
      {(isPending || isLoading || isRestoring) && (
        <View style={styles.loader}>
          <ActivityIndicator color="#fff" size={35 / fontScale} />
        </View>
      )}
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => restore()}>
            <Text style={styles.restoreText}>Restore</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('GiftScreen');
            }}>
            <CrossIcon />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../../assets/Images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.desText}>
          Get unlimited access to LASTR including: Custom and Science-Based
          Training Plan, Pelvic Floor Workouts, Arousal & Control Exercises,
          Performance Tracking, Community Support, Expert Tips & More!
        </Text>
        <Image
          source={require('../../../assets/Images/mockup.png')}
          style={styles.mockup}
        />
        <View style={styles.subscriptionContainer}>
          {/* Weekly Plan */}
          <TouchableOpacity
            onPress={() =>
              setSelectedSubscription(
                data?.find(_dat => _dat.packageType === 'WEEKLY'),
              )
            }
            style={[
              styles.planBox,
              selected_subscription?.packageType === 'WEEKLY' && {
                borderColor: '#fff',
                ...styles.selectedPlan,
              },
            ]}>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text
                style={[
                  styles.planText,
                  selected_subscription?.packageType === 'WEEKLY' && {
                    color: '#184A7B',
                  },
                ]}>
                WEEKLY
              </Text>
              <Text
                style={[
                  styles.priceText,
                  selected_subscription?.packageType === 'WEEKLY' && {
                    color: '#000',
                  },
                ]}>
                $4.99{' '}
                <Text
                  style={{
                    fontFamily: 'NeueHaasDisplay-Light',
                    fontSize: 12 / fontScale,
                  }}>
                  / week
                </Text>
              </Text>
            </View>
          </TouchableOpacity>

          {/* Lifetime Plan (Highlighted) */}
          <TouchableOpacity
            style={[
              styles.planBox,
              selected_subscription?.packageType === 'LIFETIME' &&
                styles.selectedPlan,
              selected_subscription?.packageType === 'LIFETIME' && {
                borderColor: '#fff',
              },
            ]}
            onPress={() =>
              setSelectedSubscription(
                data?.find(_dat => _dat.packageType === 'LIFETIME'),
              )
            }>
            <View style={styles.popularTag}>
              <PopularIcon
                style={{backgroundColor: '#100f0f', borderRadius: 60}}
              />
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text
                style={[
                  styles.planText,
                  selected_subscription?.packageType === 'LIFETIME' && {
                    color: '#184A7B',
                  },
                ]}>
                LIFETIME
              </Text>
              <Text
                style={[
                  styles.priceText,
                  selected_subscription?.packageType === 'LIFETIME' && {
                    color: '#000',
                  },
                ]}>
                $39.99
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => mutate()} style={styles.journeyButton}>
          <JourneyButton height={65} width={'100%'} />
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Purchase appears as “ITUNES STORE”.{'\n'}Cancel anytime ✅ Money back
          guarantee 🛡️
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
    paddingTop: 0,
    alignItems: 'center',
  },
  loader: {
    width: '100%',
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: '#00000060',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // paddingTop: 20,
  },
  restoreText: {
    fontSize: 12 / fontScale,
    fontFamily: 'Manrope-Bold',
    color: '#9c9da8',
  },
  logo: {
    resizeMode: 'contain',
    width: 132,
    height: 50,
    overflow: 'hidden',
    // marginVertical: 10,
  },
  desText: {
    fontSize: 14 / fontScale,
    fontFamily: 'Manrope-Medium',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 18 / fontScale,
    letterSpacing: 0.2,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 15,
  },
  mockupContainer: {
    marginBottom: 10,
  },
  mockup: {
    height: height / 2.35,
    width: '116%',
    resizeMode: 'contain',
    marginTop: '-15%',
  },
  subscriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 3,
    marginTop: 34,
    marginBottom: 27,
    gap: 12,
  },
  planBox: {
    flex: 1,
    // width: 174,
    maxWidth: normalize(174),
    paddingVertical: 20,
    borderRadius: 12 / fontScale,
    backgroundColor: '#111739',
    alignItems: 'center',
    flexDirection: 'row',
    // paddingHorizontal: 10,
    gap: 12,
    justifyContent: 'space-between',
    borderColor: '#757C87',
    borderWidth: 1 / fontScale,
  },
  selectedPlan: {
    backgroundColor: '#fff',
  },
  popularTag: {
    position: 'absolute',
    top: -16,
    left: 43,
  },
  popularText: {
    fontSize: 10 / fontScale,
    fontFamily: 'Manrope-Bold',
    color: '#000',
  },
  planText: {
    fontSize: 14 / fontScale,
    fontFamily: 'NeueHaasDisplay-Black',
    color: '#fff',
    lineHeight: 22 / fontScale,
    letterSpacing: 1.3 / fontScale,
    textAlign: 'center',
  },
  priceText: {
    fontSize: 18 / fontScale,
    fontFamily: 'NeueHaasDisplay-Mediu',
    color: '#D6D6D6',
    lineHeight: 24 / fontScale,
    letterSpacing: 0.25,
    marginTop: 2,
    textAlign: 'center',
  },
  journeyButton: {
    // marginTop: 20,
    width: '100%',
  },
  footerText: {
    fontSize: 12 / fontScale,
    fontFamily: 'Manrope-Bold',
    color: '#9c9da8',
    textAlign: 'center',
    marginVertical: 20,
  },
});
