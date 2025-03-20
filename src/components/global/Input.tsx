import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {fontScale} from '../../styles/globalStyles';

const Input = ({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) => {
  const styles = makeStyles(fontScale);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainer}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={'#F5F5F5'}
      />
    </View>
  );
};

export default Input;
const {width} = Dimensions.get('window');
const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    inputContainer: {
      backgroundColor: 'transparent',
      width: width - 60,
      padding: 18,
      paddingHorizontal: 16,
      borderRadius: 4 / fontScale,
      marginTop: 14,
      borderWidth: 1,
      borderColor: '#fff',
      color: '#fff',
      fontFamily: 'Manrope-Light',
      fontSize: 14 / fontScale,
    },
  });
