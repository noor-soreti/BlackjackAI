import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {fontScale} from '../../styles/globalStyles';

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  style?: object;
  rightIcon?: any;
  btnStyle?: object;
  row?: boolean;
  isLoading?: boolean;
}
const AppButton = ({
  style,
  title,
  onPress,
  rightIcon,
  btnStyle,
  row = false,
  isLoading,
}: AppButtonProps) => {
  const styles = makeStyles(fontScale);

  return (
    <LinearGradient
      colors={['#9F01D2', '#9300C4', '#6A008D']}
      style={[styles.gradientContainer, style]}>
      <TouchableOpacity
        style={[
          styles.btnContainer,
          row && {flexDirection: 'row', alignItems: 'center'},
        ]}
        onPress={onPress}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size={20 / fontScale} color="#fff" />
        ) : (
          <React.Fragment>
            <Text style={[styles.title, btnStyle]}>{title}</Text>
            {rightIcon && rightIcon}
          </React.Fragment>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default AppButton;

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    gradientContainer: {
      borderRadius: 20,
      overflow: 'hidden',
    },
    btnContainer: {
      paddingHorizontal: 24,
      paddingVertical: 17,
      paddingTop: 15,
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 16 / fontScale,
      fontFamily: 'Manrope-ExtraBold',
      textAlign: 'center',
    },
  });
