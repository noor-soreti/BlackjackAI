/* eslint-disable react-native/no-inline-styles */
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import Lottie from 'lottie-react-native';
import {usePostHog} from 'posthog-react-native';
import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Purchases, {LOG_LEVEL, PurchasesPackage} from 'react-native-purchases';
import {ClaimOffer, CrossIcon} from '../../../assets/Svg';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {COLORS} from '../../../styles/colors';
import {fontScale, height, width} from '../../../styles/globalStyles';
import {useAuthContext} from '../../Config';

const GiftScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const {user} = useAuthContext();
  const postHog = usePostHog();

  useFocusEffect(
    useCallback(() => {
      postHog.capture('yearly_plan_subscription_screen');
    }, [postHog]),
  );

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

  const displayAnnualPackage = async (): Promise<
    PurchasesPackage | undefined
  > => {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.availablePackages.find(
      _package => _package.packageType === 'ANNUAL',
    );
  };

  const {data, isLoading} = useQuery({
    queryKey: ['annual_package'],
    queryFn: displayAnnualPackage,
  });

  const purchaseSubscription = async () => {
    if (data?.packageType) {
      const res = await Purchases.purchasePackage(data!);
      return res;
    }
    throw new Error('Package not found');
  };

  const {mutate, isPending} = useMutation({
    mutationFn: purchaseSubscription,
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'tabs'}],
      });
    },
    onError: err => console.log(err),
  });

  return (
    <ScreenWrapper bgImage={require('../../../assets/Images/background3.png')}>
      {(isPending || isLoading) && (
        <View style={styles.loader}>
          <ActivityIndicator color="#fff" size={35 / fontScale} />
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            paddingHorizontal: 22,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            // paddingTop: 20,
          }}>
          <View
            style={{flexDirection: 'row', gap: 8, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('RewiringBenefitsTwoScreen');
              }}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.exclusiveBtn}>
            <Text style={styles.exclusiveText}>Exclusive offer 🎉</Text>
          </TouchableOpacity>
          <Text style={styles.specialText}>
            A Special One-Time Gift for you
          </Text>
          <Text style={styles.offerText}>80% OFF</Text>
          <Lottie
            source={require('../../../assets/Lottie/gift-box.json')}
            autoPlay
            loop
            style={{
              height: height / 3.5,
              width: width / 0.8,
              marginTop: 30,
              marginBottom: 50,
            }}
          />
          <Text style={styles.bottomText}>
            Only{' '}
            <Text style={{fontSize: 22 / fontScale, color: '#FFCC00'}}>
              $1,67
            </Text>{' '}
            per month{' '}
          </Text>
          <Text style={styles.totalText}>Total of $19.99 / year</Text>
          <TouchableOpacity
            style={{marginTop: 50, width: '100%'}}
            onPress={() => mutate()}>
            <ClaimOffer width={'100%'} height={61} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default GiftScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    justifyContent: 'center',
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
  exclusiveBtn: {
    borderColor: '#7C7C7C',
    backgroundColor: '#070707',
    padding: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    borderWidth: 1,
  },
  exclusiveText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 19 / fontScale,
    color: '#fff',
  },
  specialText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 19 / fontScale,
    color: '#fff',
    marginTop: 32,
  },
  offerText: {
    fontFamily: 'NeueHaasDisplay-Bold',
    fontSize: 46 / fontScale,
    color: '#fff',
    marginTop: 32,
  },
  bottomText: {
    fontFamily: 'Manrope-ExtraBold',
    lineHeight: 28 / fontScale,
    fontSize: 20 / fontScale,
    color: '#fff',
  },
  totalText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 17 / fontScale,
    color: COLORS.lightGray,
    marginTop: 10,
  },
});
