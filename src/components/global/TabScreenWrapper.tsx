import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../styles/colors';

interface TabScreenWrapperProps {
  children: ReactNode;
  style?: object;
  [key: string]: any;
}

const TabScreenWrapper = React.memo(
  ({children, style, ...props}: TabScreenWrapperProps) => {
    const insets = useSafeAreaInsets();
    const containerStyle = [
      styles.container,
      style,
      {
        paddingTop: insets.top,
      },
    ];
    return (
      <View style={containerStyle} {...props}>
        {children}
      </View>
    );
  },
);

export default TabScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
