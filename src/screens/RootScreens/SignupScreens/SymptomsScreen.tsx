import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {storage} from '../../../Api/Storage';
import AppButton from '../../../components/global/AppButton';
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import {symptoms} from '../../../constants/question';
import {fontScale} from '../../../styles/globalStyles';

const SymptomsScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSelection = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(item => item !== symptom)
        : [...prev, symptom],
    );
  };

  useFocusEffect(
    useCallback(() => {
      storage.set('last_screen', 'SymptomsScreen');
    }, []),
  );

  return (
    <ScreenWrapper
      style={styles.container}
      bgImage={require('../../../assets/Images/background2.png')}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            color={'#fff'}
            size={20}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Symptoms</Text>
      </View>
      <Text style={styles.subtext}>
        Your performance anxiety might be affecting more than you think...
        Select symptoms below:
      </Text>

      {/* Symptoms List */}
      <FlatList
        data={symptoms}
        style={styles.flatlistContainer}
        keyExtractor={(item, index) => item.title + index}
        showsVerticalScrollIndicator={false}
        shouldRasterizeIOS
        // initialNumToRender={15}
        renderItem={({item}) => (
          <View>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            {item.data.map(symptom => (
              <TouchableOpacity
                key={symptom}
                style={[
                  styles.option,
                  selectedSymptoms.includes(symptom)
                    ? {backgroundColor: 'rgba(247, 115, 0, 0.6)'}
                    : null,
                ]}
                onPress={() => toggleSelection(symptom)}>
                {selectedSymptoms.includes(symptom) ? (
                  <Image
                    source={require('../../../assets/Images/check-orange.png')}
                    style={{width: 29, height: 29}}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/Images/check-unmark.png')}
                    style={{width: 29, height: 29}}
                  />
                )}
                {/* <Icon
                  name={
                    selectedSymptoms.includes(symptom)
                      ? 'checkbox-marked-circle'
                      : 'checkbox-blank-circle-outline'
                  }
                  size={28}
                  color={
                    selectedSymptoms.includes(symptom) ? '#F77300' : '#888'
                  }
                /> */}
                <Text style={styles.optionText}>{symptom}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      {/* Button */}
      <AppButton
        title="Rewire my brain"
        onPress={() => {
          navigation.navigate('SliderScreen');
        }}
        style={styles.button}
        btnStyle={styles.buttonText}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: 24,
    paddingVertical: 14,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 22,
  },
  header: {
    fontSize: 26 / fontScale,
    fontFamily: 'NeueHaasDisplay-Black',
    color: '#fff',
    letterSpacing: 0.3,
  },
  subtext: {
    fontSize: 16 / fontScale,
    color: '#fff',
    lineHeight: 28 / fontScale,
    fontFamily: 'NeueHaasDisplay-Mediu',
    // paddingRight: 80,
  },
  flatlistContainer: {
    // marginTop: 16 ,
  },
  sectionTitle: {
    fontSize: 16 / fontScale,
    // fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    marginBottom: 10,
    fontFamily: 'NeueHaasDisplay-Bold',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#180D48',
    padding: 19,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 16,
  },
  optionText: {
    color: '#fff',
    fontSize: 13 / fontScale,
    marginLeft: 10,
    lineHeight: 18 / fontScale,
    flex: 1,
    fontFamily: 'Manrope-Medium',
  },
  button: {
    backgroundColor: '#F77300',
    // paddingVertical: 15,
    // paddingBottom: 17,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 16 / fontScale,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    lineHeight: 22 / fontScale,
  },
});

export default SymptomsScreen;
