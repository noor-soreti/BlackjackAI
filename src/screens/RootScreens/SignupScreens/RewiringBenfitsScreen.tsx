import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {storage} from '../../../Api/Storage';
import AppButton from '../../../components/global/AppButton';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {fontScale, height} from '../../../styles/globalStyles';

const RewiringBenfitsScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  useFocusEffect(
    useCallback(() => {
      storage.set('last_screen', 'RewiringBenefitsScreen');
    }, []),
  );

  return (
    <ScreenWrapper
      bgImage={require('../../../assets/Images/background2.png')}
      style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign
            name="arrowleft"
            color={'#fff'}
            size={20}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Rewiring benefits</Text>
      </View>
      <Text style={styles.subTitle}>Regaining control feels life-changing</Text>
      <Image
        source={require('../../../assets/Images/graph.png')}
        style={styles.graph}
      />
      <View style={styles.bottomContiner}>
        <Text style={styles.bottomText}>
          <Text style={{fontFamily: 'NeueHaasDisplay-Black'}}>LASTR'</Text>
          {'  '}
          helps you master your performance permanently
        </Text>
        <AppButton
          title="Continue"
          onPress={() => {
            navigation.navigate('Goals');
          }}
          style={styles.button}
        />
      </View>
    </ScreenWrapper>
  );
};

export default RewiringBenfitsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingHorizontal: 22,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingVertical: 22,
    // paddingTop: 30,
  },
  header: {
    fontSize: 30 / fontScale,
    fontFamily: 'NeueHaasDisplay-Black',
    color: '#fff',
  },
  subTitle: {
    fontSize: 22 / fontScale,
    fontFamily: 'NeueHaasDisplay-Mediu',
    letterSpacing: 0.3 / fontScale,
    lineHeight: 30 / fontScale,
    width: '70%',
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 34,
  },
  graph: {
    resizeMode: 'contain',
    height: height / 2.1,
    width: '100%',
    alignSelf: 'center',
  },
  bottomContiner: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: '100%',
  },
  bottomText: {
    fontFamily: 'NeueHaasDisplay-Light',
    fontSize: 16 / fontScale,
    lineHeight: 20 / fontScale,
    letterSpacing: 0.3,
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 60,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 29,
  },
});
