import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, StyleSheet} from 'react-native';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {fontScale} from '../../styles/globalStyles';

interface WithSplashScreenProps {
  children: React.ReactNode;
  isAppReady: boolean;
}

export function WithSplashScreen({
  children,
  isAppReady,
}: WithSplashScreenProps) {
  return (
    <>
      {isAppReady && children}
      <Splash isAppReady={isAppReady} />
    </>
  );
}

const LOADING_IMAGE = 'Loading image';
const FADE_IN_IMAGE = 'Fade in image';
const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';

interface SplashProps {
  isAppReady: boolean;
}

export const Splash = ({isAppReady}: SplashProps) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const progress = useSharedValue(0);
  const styles = makeStyles(fontScale);
  const [state, setState] = useState(LOADING_IMAGE);

  // Start gradient animation
  useEffect(() => {
    const interval = setInterval(() => {
      progress.value = withTiming(progress.value === 0 ? 1 : 0, {
        duration: 2000,
      });
    }, 4000); // Change gradient every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Fade in the logo
  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [state]);

  // Fade out when the app is ready
  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY && isAppReady) {
      setState(FADE_OUT);
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [state]);

  if (state === HIDDEN) return null;

  return (
    <Animated.View style={[styles.container, {opacity: containerOpacity}]}>
      {/* Animated Multi-Color Gradient */}
      <Animated.Image
        source={require('../../assets/Images/background.png')}
        style={{flex: 1}}
        resizeMode="contain"
      />
      {/* Logo with Fade Effect */}
      <Animated.View collapsable={false} style={styles.imageContainer}>
        <Animated.Image
          source={require('../../assets/Images/logo.png')}
          fadeDuration={0}
          onLoad={() => setState(FADE_IN_IMAGE)}
          style={[styles.image, {opacity: imageOpacity}]}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/Images/star.png')}
          style={{width: 105, height: 40}}
          resizeMode="contain"
        />
      </Animated.View>
    </Animated.View>
  );
};

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '-20%',
    },
    image: {
      width: 150,
      height: 90,
    },
    text: {
      fontSize: 20 / fontScale,
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });

export default Splash;
