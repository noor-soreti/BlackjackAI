import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, {Rect, Text as SvgText} from 'react-native-svg';
import {storage} from '../../../Api/Storage';
import AppButton from '../../../components/global/AppButton';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {fontScale} from '../../../styles/globalStyles';
import {useAuthContext} from '../../Config';

const screenWidth = Dimensions.get('window').width - 50;

const AnalysisComplete = () => {
  const navigation = useNavigation();
  const styles = makeStyles(fontScale);

  const {user} = useAuthContext();
  const percentage = parseInt(
    user?.user_analysis.comparison!.match(/\d+/)?.[0] ?? '25',
    10,
  );

  // console.log(refetch);

  useFocusEffect(
    useCallback(() => {
      storage.set('last_screen', 'AnalysisComplete');
    }, []),
  );

  return (
    <ScreenWrapper
      style={styles.container}
      bgImage={require('../../../assets/Images/background2.png')}>
      {/* Header */}
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '15%',
          }}>
          <Text style={styles.title}>Analysis Complete</Text>
          <Image
            source={require('../../../assets/Images/check.png')}
            style={{width: 30, height: 30, marginLeft: 12}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.subtext}>
          We've got some news to break to you...
        </Text>

        <Text
          style={[
            styles.description,
            {marginTop: '5%', paddingHorizontal: 35},
          ]}>
          Tell us more about your symptoms so we can finishing customizing your
          plan.
        </Text>

        {/* Custom Bar Chart */}
        <View style={styles.chartContainer}>
          <Svg width={screenWidth} height={360}>
            {/* Your Score (Red Bar) */}
            <Rect
              x="110"
              y="50"
              width="70"
              height="280"
              fill="#B00D0D"
              rx="10"
            />
            <SvgText
              x="137"
              y="78"
              fontSize="18"
              fill="white"
              fontFamily="NeueHaasDisplay-Bold"
              fontWeight="bold"
              textAnchor="middle">
              {percentage < 25 ? 25 : percentage}%
            </SvgText>
            <SvgText
              x="147"
              y="350"
              fontSize="14"
              fill="white"
              textAnchor="middle">
              Your score
            </SvgText>

            {/* Average Score (Green Bar) */}
            <Rect
              x="200"
              y="187"
              width="70"
              height="140"
              fill="#41923F"
              rx="10"
            />
            <SvgText
              x="237"
              y="215"
              fontSize="18"
              fill="white"
              fontWeight="bold"
              fontFamily="NeueHaasDisplay-Bold"
              textAnchor="middle">
              13%
            </SvgText>
            <SvgText
              x="236"
              y="350"
              fontSize="14"
              fill="white"
              textAnchor="middle">
              Average
            </SvgText>
          </Svg>
        </View>

        <Text style={[styles.description, {marginTop: 15}]}>
          Your ejaculation control is{' '}
          <Text style={{color: '#FF1400'}}>
            {percentage < 25 ? 25 : percentage}% lower
          </Text>{' '}
          than the average male, but we got you.
        </Text>

        {/* Disclaimer */}
        <Text style={styles.note}>
          * This result is an indication only, not a medical diagnosis. For a
          medical assessment, contact your healthcare provider.
        </Text>

        {/* Button */}
        <AppButton
          title="Check your symptoms"
          onPress={() => navigation.navigate('SymptomsScreen')}
          style={styles.button}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 22,
    },
    title: {
      fontSize: 26 / fontScale,
      fontFamily: 'NeueHaasDisplay-Black',
      color: '#fff',
      lineHeight: 30 / fontScale,
      // letterSpacing: -0.7,
    },
    subtext: {
      fontSize: 18 / fontScale,
      fontFamily: 'NeueHaasDisplay-Mediu',
      lineHeight: 30 / fontScale,
      color: '#fff',
      marginTop: 15,
    },
    description: {
      fontSize: 16 / fontScale,
      fontFamily: 'NeueHaasDisplay-Mediu',
      color: '#fff',
      textAlign: 'center',
      paddingHorizontal: 40,
      lineHeight: 22 / fontScale,
    },
    chartContainer: {
      marginTop: 0,
      alignItems: 'center',
    },
    note: {
      fontSize: 8 / fontScale,
      color: '#fff',
      fontFamily: 'Manrope-ExtraLight',
      textAlign: 'center',
      marginTop: 'auto',
      marginBottom: 20,
      paddingHorizontal: 42,
    },
    button: {
      backgroundColor: '#fff',
      borderRadius: 30,
      marginHorizontal: 22,
      marginBottom: 25,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16 / fontScale,
      fontWeight: 'bold',
      color: '#000',
    },
  });

export default AnalysisComplete;
