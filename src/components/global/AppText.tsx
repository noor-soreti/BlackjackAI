import {StyleSheet, Text} from 'react-native';
import React from 'react';

import {TextProps, TextStyle} from 'react-native';

interface AppTextProps extends TextProps {
  style?: TextStyle;
}

const AppText: React.FC<AppTextProps> = ({children, style, ...props}) => {
  const combinedStyles = StyleSheet.flatten([defaultStyles.text, style]);
  return (
    <Text style={combinedStyles} {...props}>
      {children}
    </Text>
  );
};

export default AppText;

const defaultStyles = StyleSheet.create({
  text: {
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'left',
    verticalAlign: 'middle',
  },
});
