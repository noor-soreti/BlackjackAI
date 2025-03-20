import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  View,
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Input from '../../../components/global/Input';
import AppButton from '../../../components/global/AppButton';
import AppText from '../../../components/global/AppText';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../styles/colors';
import {fontScale} from '../../../styles/globalStyles';
import {useMutation} from '@tanstack/react-query';
import {authenticateUser} from '../../../Api/functions/user';
import {storage} from '../../../Api/Storage';
import Purchases, {LOG_LEVEL} from 'react-native-purchases';
import {usePostHog} from 'posthog-react-native';
import {useAuthContext} from '../../Config';

const CreateAccount = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const styles = makeStyles(fontScale);
  const postHog = usePostHog();

  const {refetch} = useAuthContext();

  let loginSchema = Yup.object().shape({
    full_name: Yup.string().required(),
    email: Yup.string().required('Invalid Email').label('Email'),
    password: Yup.string()
      .required('Password should be 4 characters')
      .min(4, 'Password must be at least 4 characters')
      .label('Password'),
    confirm_password: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match') // ✅ Ensure passwords match
      .label('Confirm Password'),
  });

  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'ios') {
      Purchases.configure({
        apiKey: 'appl_MfnGNVKrtHUbZxbxTjbUKVMLHgN',
      });
    } else if (Platform.OS === 'android') {
      Purchases.configure({apiKey: ''});
    }

    return () => {
      Purchases.logOut();
    };
  }, []);

  const {mutate, isPending} = useMutation({
    mutationFn: authenticateUser,
    onSuccess: async data => {
      storage.set('token', data.token);
      postHog.identify(data.user._id, {
        email: data.user.email,
        name: data.user.full_name,
      });
      refetch();
      const {customerInfo} = await Purchases.logIn(data.user._id);
      if (customerInfo && customerInfo.activeSubscriptions.length > 0) {
        navigation.reset({
          index: 0,
          routes: [{name: 'tabs'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'QuestionScreen'}],
        });
      }
    },
    onError: err => {
      if (Platform.OS === 'android') {
        ToastAndroid.show(err?.response?.data?.message, ToastAndroid.SHORT);
      } else {
        Alert.alert(err?.response?.data?.message);
      }
    },
  });

  const {handleChange, handleSubmit, values, errors, touched} = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
      full_name: '',
    },
    validationSchema: loginSchema,
    onSubmit: value => {
      mutate(value);
    },
  });
  return (
    <ScreenWrapper bgImage={require('../../../assets/Images/background2.png')}>
      <Image
        source={require('../../../assets/Images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>
        <Input
          placeholder="Full name"
          value={values.full_name}
          onChangeText={handleChange('full_name')}
        />
        {touched.full_name && errors.full_name && (
          <Text>{errors.full_name}</Text>
        )}
        <Input
          placeholder="Email address"
          value={values.email}
          onChangeText={handleChange('email')}
        />
        {touched.email && errors.email && <Text>{errors.email}</Text>}
        <Input
          placeholder="Password"
          value={values.password}
          onChangeText={handleChange('password')}
        />
        {touched.password && errors.password && <Text>{errors.password}</Text>}
        <Input
          placeholder="Confirm Password"
          value={values.confirm_password}
          onChangeText={handleChange('confirm_password')}
        />
        {touched.confirm_password && errors.confirm_password && (
          <Text>{errors.confirm_password}</Text>
        )}
        <AppButton
          onPress={handleSubmit}
          title="Create account"
          style={styles.skipBtn}
          isLoading={isPending}
        />
        <View style={styles.backContainer}>
          <AppText style={{...styles.backText, color: COLORS.lightGray}}>
            or
          </AppText>
          <TouchableOpacity
            style={{flexDirection: 'row', gap: 3}}
            onPress={() => {
              navigation.goBack();
            }}>
            <AppText style={{...styles.backText, fontFamily: 'Manrope-Bold'}}>
              go back
            </AppText>
            <AntDesign name="arrowleft" size={18} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
      <AppText style={styles.privacyText}>
        By creating an account or signing in you agree to our {'\n'}{' '}
        <Text
          style={{fontFamily: 'Calimate-Bold'}}
          onPress={() => {
            Linking.openURL('https://lastrapp.xyz/privacy-policy');
          }}>
          Privacy Policy &{' '}
        </Text>
        <Text
          style={{fontFamily: 'Calimate-Bold'}}
          onPress={() => {
            Linking.openURL('https://lastrapp.xyz/terms');
          }}>
          Terms and Conditions
        </Text>
      </AppText>
    </ScreenWrapper>
  );
};

export default CreateAccount;

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    image: {width: 120, height: 120, alignSelf: 'center'},
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    title: {
      fontFamily: 'NeueHaasDisplay-Black',
      fontSize: 24 / fontScale,
      color: '#fff',
      textAlign: 'center',
      marginBottom: 6,
    },
    skipBtn: {
      marginTop: 20,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    privacyText: {
      color: '#fff',
      fontSize: 12 / fontScale,
      fontFamily: 'Calimate-Medium',
      textAlign: 'center',
      marginBottom: 16,
      paddingHorizontal: 22,
    },
    backContainer: {flexDirection: 'row', gap: 6, marginTop: 10},
    backText: {
      color: '#fff',
      fontSize: 12 / fontScale,
      fontFamily: 'Manrope-Light',
    },
  });
