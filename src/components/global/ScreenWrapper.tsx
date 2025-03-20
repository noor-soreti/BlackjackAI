import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../styles/colors';

interface ScreenWrapperProps {
  children: ReactNode;
  bgImage?: any;
  style?: object;
  [key: string]: any;
}

const ScreenWrapper = React.memo(
  ({children, bgImage, style, ...props}: ScreenWrapperProps) => {
    const insets = useSafeAreaInsets();
    const containerStyle = [
      styles.container,
      style,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      },
    ];
    return (
      <ImageBackground
        style={containerStyle}
        resizeMode="cover"
        {...props}
        resizeMethod="auto"
        source={bgImage}>
        {children}
      </ImageBackground>
    );
  },
);

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: -2,
    marginTop: -2,
    backgroundColor: '#fff',
  },
});
