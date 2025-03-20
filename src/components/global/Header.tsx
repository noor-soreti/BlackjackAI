import {
  StyleProp,
  StyleSheet,
  StyleSheetProperties,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {BackIcon, CrossIcon, SettingIcon, UploadIcon} from '../../assets/Svg';
import {useNavigation} from '@react-navigation/native';
import {fontScale} from '../../styles/globalStyles';

const Header = ({
  title,
  back,
  upload,
  cross,
  setting,
  giftScreen,
  onPressSettings,
  containerStyle,
}: {
  title: string;
  back?: boolean;
  upload?: boolean;
  cross?: boolean;
  giftScreen?: boolean;
  setting?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onPressSettings?: () => void;
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>
        {back ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        ) : null}
        {upload ? (
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <UploadIcon />
          </TouchableOpacity>
        ) : null}
        {setting ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Settings')}>
            <SettingIcon />
          </TouchableOpacity>
        ) : null}
        {cross ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.goBack();
            }}>
            <CrossIcon />
          </TouchableOpacity>
        ) : null}
        {giftScreen ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('RewiringBenefitsTwoScreen');
            }}>
            <CrossIcon />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontFamily: 'NeueHaasDisplay-Bold',
    fontSize: 28 / fontScale,
    color: '#fff',
    flexWrap: 'wrap',
    maxWidth: 310,
    verticalAlign: 'middle',
    // lineHeight: 30 / fontScale,
    textTransform: 'capitalize',
  },
  rightContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
});
