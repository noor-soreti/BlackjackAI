import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {usePostHog} from 'posthog-react-native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Purchases from 'react-native-purchases';
import {queryClient} from '../../../../App';
import {socialLogin} from '../../../Api/functions/user';
import {storage} from '../../../Api/Storage';
import AppText from '../../../components/global/AppText';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {Apple, Google} from '../../../constants/imageConstants';
import {fontScale, height} from '../../../styles/globalStyles';
import {useAuthContext} from '../../Config';

const SignupScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const styles = makeStyles(fontScale);
  const postHog = usePostHog();
  const {refetch} = useAuthContext();

  useEffect(() => {
    async function init() {
      const has = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      if (has) {
        GoogleSignin.configure({
          webClientId:
            '572578354967-rqt7oarc4npqj7cntb4hnh8f70qrr2v2.apps.googleusercontent.com',
          iosClientId:
            '572578354967-1df18traa2no5beadfu3vah6d4o00dd3.apps.googleusercontent.com',
        });
      }
    }
    init();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (data: FirebaseAuthTypes.User | null) => {
        if (data) {
          const user = data?.providerData[0];
          mutate({
            email: user?.email!,
            full_name:
              (user?.displayName
                ? user.displayName
                : user?.email!.split('@')[0]) || '',
            provider: user?.providerId.includes('google') ? 'google' : 'apple',
          });
        }
      },
    );
    return subscriber;
  }, []);

  const {mutate, isPending} = useMutation({
    mutationFn: socialLogin,
    onSuccess: async data => {
      const {customerInfo} = await Purchases.logIn(data.user._id);
      // await queryClient.setQueryData(['user', data.token], data.user);
      storage.set('token', data.token);
      await queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      // postHog.identify(data.user._id, {
      //   email: data.user.email,
      //   name: data.user.full_name,
      // });
    },
    onError: err => {
      console.log(err);
      if (Platform.OS === 'android') {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.SHORT);
      } else {
        Alert.alert(err?.response?.data?.message);
      }
    },
  });

  // useEffect(() => {
  //   if (isSuccess && data) {
  //     // const {customerInfo} = await Purchases.logIn(data.user._id);

  //   }
  // }, [isSuccess, data]);

  const onGooglePress = async () => {
    try {
      // Check if your device supports Google Play
      const has = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      if (has) {
        // Get the users ID token
        const signInResult = await GoogleSignin.signIn();

        if (signInResult.type === 'success') {
          // Try the new style of google-sign in result, from v13+ of that module
          let idToken = signInResult.data?.idToken;
          // if (!idToken) {
          //   // if you are using older versions of google-signin, try old style result
          //   idToken = signInResult?.idToken;
          // }
          if (!idToken) {
            throw new Error('No ID token found');
          }

          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);

          // Sign-in the user with the credential
          return await auth().signInWithCredential(googleCredential);
        }
      }
      // return;
    } catch (err) {
      console.log('out');
      console.log(err);
    }
  };

  const onAppleButtonPress = async () => {
    // Start the sign-in request
    if (appleAuth.isSupported) {
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
          // See: https://github.com/invertase/react-native-apple-authentication#faqs
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
          throw new Error('Apple Sign-In failed - no identify token returned');
        }

        // Create a Firebase credential from the response
        const {identityToken, nonce} = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce,
        );

        // Sign the user in with the credential
        return await auth().signInWithCredential(appleCredential);
        // if (!!data.user) {
        // }
        // return;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('not supported');
    }
  };

  return (
    <ScreenWrapper bgImage={require('../../../assets/Images/background.png')}>
      {isPending && (
        <View style={styles.loader}>
          <ActivityIndicator color="#fff" size={35 / fontScale} />
        </View>
      )}
      <Image
        source={require('../../../assets/Images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.container}>
        <Text style={styles.title}>Already have an account?</Text>
        {Platform.OS === 'ios' && (
          <TouchableOpacity
            style={[
              styles.btn,
              {backgroundColor: '#2A2A2A', borderColor: '#2A2A2A'},
            ]}
            onPress={onAppleButtonPress}>
            <Image source={Apple} style={styles.imageIcon} />
            <AppText style={styles.btntext}>Continue with Apple</AppText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: '#fff'}]}
          onPress={onGooglePress}>
          <Image source={Google} style={styles.imageIcon} />
          <AppText style={{...styles.btntext, color: '#000'}}>
            Continue with Google
          </AppText>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('CreateAccount');
          }}>
          <Image source={Email} style={styles.imageIcon} />
          <AppText style={styles.btntext}>Sign up with Email</AppText>
        </TouchableOpacity> */}
        {/* <AppButton
          onPress={() => {
            navigation.navigate('QuestionScreen');
          }}
          title="Skip for now"
          style={styles.skipBtn}
          row
          rightIcon={
            <AntDesign
              name={'arrowright'}
              color={'#000'}
              size={22 / fontScale}
              style={{alignSelf: 'center', top: 2, left: 6}}
            />
          }
        /> */}
      </View>
      <AppText style={styles.privacyText}>
        By creating an account or signing in you agree to our {'\n'}{' '}
        <Text
          style={{fontFamily: 'Calimate-Bold', color: '#BF00FF'}}
          onPress={() => {
            Linking.openURL('https://lastrapp.xyz/privacy');
          }}>
          Privacy Policy {' '}
        </Text>
        <Text>& </Text>
        <Text
          style={{fontFamily: 'Calimate-Bold', color: '#BF00FF'}}
          onPress={() => {
            Linking.openURL('https://lastrapp.xyz/terms');
          }}>
          Terms and Conditions
        </Text>
      </AppText>
    </ScreenWrapper>
  );
};

export default SignupScreen;

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    image: {width: 120, height: 120, alignSelf: 'center'},
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
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
      marginTop: '-30%',
    },
    title: {
      fontFamily: 'AeonikTRIAL-Light',
      fontSize: 28 / fontScale,
      color: '#fff',
      textAlign: 'center',
      marginBottom: 20,
      width: '60%',
      letterSpacing: 0.19,
    },
    btn: {
      backgroundColor: 'transparent',
      borderRadius: 10 / fontScale,
      paddingHorizontal: 24,
      paddingVertical: 20,
      flexDirection: 'row',
      marginTop: 14,
      borderColor: '#fff',
      borderWidth: 1,
      width: '100%',
      justifyContent: 'center',
    },
    btntext: {
      color: '#fff',
      fontSize: 18 / fontScale,
      fontFamily: 'Manrope-Bold',
    },
    skipBtn: {
      marginTop: 20,
      width: '100%',
      justifyContent: 'center',
      padding: 6,
    },
    imageIcon: {
      width: 20,
      height: 20,
      marginRight: 16,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    privacyText: {
      color: '#fff',
      fontSize: 12 / fontScale,
      fontFamily: 'Manrope-Regular',
      textAlign: 'center',
      marginBottom: 16,
      paddingHorizontal: 22,
      lineHeight: 20,
    },
  });
