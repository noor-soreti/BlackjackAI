import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {queryClient} from '../../../../App';
import {storage} from '../../../Api/Storage';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {fontScale} from '../../../styles/globalStyles';
import {useAuthContext} from '../../Config';

export default function PEScoreScreen({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const {refetch} = useAuthContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) {
      navigation.navigate('AnalysisComplete'); // Navigate after progress completes
    }
  }, [navigation, progress]);

  useFocusEffect(
    useCallback(() => {
      storage.set('last_screen', 'PEScoreScreen');
      // setTimeout(() => {
      //   navigation.navigate('AnalysisComplete');
      // }, 5000)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
      return () => clearInterval(interval);
    }, []),
  );

  return (
    <ScreenWrapper
      style={styles.container}
      bgImage={require('../../../assets/Images/background2.png')}>
      <AnimatedCircularProgress
        size={250}
        width={18}
        fill={progress}
        rotation={0}
        tintColor={'#54BF08'}
        backgroundWidth={12}
        fillLineCap="round"
        backgroundColor={'#333333'}>
        {fill => (
          <Text style={styles.progressText}>
            {`${Math.round(fill)}`}
            <Text style={{...styles.progressText, fontSize: 48 / fontScale}}>
              %
            </Text>
          </Text>
        )}
      </AnimatedCircularProgress>
      {/* <CircularProgress
        value={progress}
        radius={125}
        activeStrokeWidth={18}
        duration={4000}
        progressValueColor={'#fff'}
        activeStrokeColor={COLORS.green}
        inActiveStrokeColor={COLORS.darkGray}
        maxValue={100}
        valueSuffix={'%'}
        titleColor={'#fff'}
        titleStyle={{fontWeight: 'bold'}}
      /> */}
      <Text style={styles.label}>Calculating..</Text>
      <Text style={styles.subtitle}>
        Give us a moment to analyze your responses..
      </Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  progressText: {
    fontSize: 58 / fontScale,
    fontFamily: 'Calimate-Black',
    color: '#fff',
  },
  label: {
    marginTop: '8%',
    fontSize: 24 / fontScale,
    color: '#fff',
    fontFamily: 'Calimate-Black',
  },
  subtitle: {
    fontFamily: 'NeueHaasDisplay-Roman-Italic',
    fontSize: 16 / fontScale,
    lineHeight: 30,
    letterSpacing: 0.2,
    marginTop: 10,
    color: '#fff',
  },
});
