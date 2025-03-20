import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/global/AppButton';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {fontScale} from '../../../styles/globalStyles';

const IntroScreens = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const styles = makeStyles(fontScale);

  return (
    <ScreenWrapper bgImage={require('../../../assets/Images/background.png')}>
      {/* <Image
        source={require('../../../assets/Images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      /> */}
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>
          Want to see how smart players make moves?
        </Text>
        <Image
          source={require('../../../assets/Images/star.png')}
          style={{width: 140, height: 54}}
          resizeMode="contain"
        />
      </View>
      <View style={styles.btnContainer}>
        <AppButton
          title="I'm new here"
          onPress={() => {
            navigation.navigate('SignupScreen');
          }}
          style={{width: '90%'}}
        />

        <TouchableOpacity
          style={{
            paddingHorizontal: 24,
            paddingVertical: 17,
            paddingTop: 15,
            alignItems: 'center',
            borderWidth: 0.2,
            borderColor: '#4C4A4A',
            borderRadius: 20,
            width: '90%',
            backgroundColor: '#101010',
          }}
          onPress={() => {
            navigation.navigate('SignupScreen');
          }}
          >
          <Text style={{
            color: '#fff',
            fontSize: 16 / fontScale,
            fontFamily: 'Manrope-ExtraBold',
            textAlign: 'center',
          }}>I already have an account</Text>
      </TouchableOpacity>

      </View>
    </ScreenWrapper>
  );
};

export default IntroScreens;

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
      fontSize: 32 / fontScale,
      color: '#fff',
      textAlign: 'left',
    },
    subtitle: {
      fontFamily: 'AeonikTRIAL-Light',
      fontSize: 20 / fontScale,
      letterSpacing: 0,
      lineHeight: 20 / fontScale,
      color: '#ffffff80',
      textAlign: 'center',
      marginVertical: 25,
      width: '75%',

    },
    btnContainer: {
      alignItems: 'center',
      // marginRight: '12%',
      marginBottom: '24%',
      gap: 10,
    },
  });
