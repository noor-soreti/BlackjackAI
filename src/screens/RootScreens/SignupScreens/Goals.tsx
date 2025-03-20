import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import vector icons
import ScreenWrapper from '../../../components/global/ScreenWrapper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '../../../components/global/AppButton';
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from '@react-navigation/native';
import {fontScale} from '../../../styles/globalStyles';
import {storage} from '../../../Api/Storage';
import {
  ConfidenceIcon,
  DriveIcon,
  EjaculationIcon,
  EsteemIcon,
  IntimacyIcon,
  LibidoIcon,
  RelationshipIcon,
} from '../../../assets/Svg';
import {Image} from 'react-native';

const {width} = Dimensions.get('window');

const goalsData = [
  {
    id: '1',
    title: 'Total control over ejaculation',
    color: 'rgba(60, 103, 212, 0.3)',
    selected_color: 'rgba(60, 103, 212, 0.6)',
    icon: <EjaculationIcon />,
  },
  {
    id: '2',
    title: 'Stronger relationship',
    color: 'rgba(228, 0, 83, 0.3)',
    selected_color: 'rgba(228, 0, 83, 0.6)',
    icon: <RelationshipIcon />,
  },
  {
    id: '3',
    title: 'Improve self-confidence',
    color: 'rgba(255, 211, 18, 0.3)',
    selected_color: 'rgba(255, 211, 18, 0.6)',
    icon: <ConfidenceIcon />,
  },
  {
    id: '4',
    title: 'Higher self-esteem',
    color: 'rgba(0, 182, 228, 0.3)',
    selected_color: 'rgba(0, 182, 228, 0.6)',
    icon: <EsteemIcon />,
  },
  {
    id: '5',
    title: 'Increased energy and drive',
    color: 'rgba(245, 128, 3, 0.3)',
    selected_color: 'rgba(245, 128, 3, 0.6)',
    icon: <DriveIcon />,
  },
  {
    id: '6',
    title: 'More active sex life and libido',
    color: 'rgba(254, 14, 18, 0.3)',
    selected_color: 'rgba(254, 14, 18, 0.6)',
    icon: <LibidoIcon />,
  },
  {
    id: '7',
    title: 'Reduced anxiety related to intimacy',
    color: 'rgba(236, 12, 240, 0.3)',
    selected_color: 'rgba(236, 12, 240, 0.6)',
    icon: <IntimacyIcon />,
  },
];

const Goals = ({navigation}: {navigation: NavigationProp<ParamListBase>}) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoalSelection = id => {
    setSelectedGoals(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(goalId => goalId !== id)
        : [...prevSelected, id],
    );
  };

  useFocusEffect(
    useCallback(() => {
      storage.set('last_screen', 'Goals');
    }, []),
  );

  return (
    <ScreenWrapper
      style={styles.container}
      bgImage={require('../../../assets/Images/background2.png')}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign
            name="arrowleft"
            color={'#fff'}
            size={20}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <Text style={styles.header}>Choose your goals</Text>
      </View>
      <Text style={styles.subtitle}>
        Select the goals you want to track during the{'\n'}program
      </Text>

      {/* Goals List */}
      <FlatList
        data={goalsData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          const isSelected = selectedGoals.includes(item.id);
          return (
            <TouchableOpacity
              style={[
                styles.goalItem,
                {
                  backgroundColor: isSelected
                    ? item.selected_color
                    : item.color,
                },
              ]}
              onPress={() => toggleGoalSelection(item.id)}>
              <View style={{flexDirection: 'row', gap: 12}}>
                {item?.icon}
                <Text style={styles.goalText}>{item.title}</Text>
              </View>
              {isSelected ? (
                <Image
                  source={require('../../../assets/Images/check-white.png')}
                  style={{width: 22, height: 22, alignSelf: 'center'}}
                />
              ) : (
                <Image
                  source={require('../../../assets/Images/uncheck.png')}
                  style={{width: 22, height: 22, alignSelf: 'center'}}
                />
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* Track Button */}
      <AppButton
        title="Continue"
        onPress={() => navigation.navigate('Rating')}
        btnStyle={{alignSelf: 'center'}}
        style={{marginTop: 15, marginBottom: 25}}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingVertical: 22,
    paddingTop: 30,
  },
  header: {
    fontSize: 30 / fontScale,
    fontFamily: 'NeueHaasDisplay-Black',
    color: '#fff',
  },
  title: {
    fontSize: 22 / fontScale,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16 / fontScale,
    color: '#fff',
    lineHeight: 28 / fontScale,
    fontFamily: 'NeueHaasDisplay-Mediu',
    marginBottom: 18,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 14,
    justifyContent: 'space-between',
  },
  goalText: {
    color: 'white',
    fontSize: 14 / fontScale,
    fontFamily: 'Manrope-SemiBold',
    alignSelf: 'center',
  },
});

export default Goals;
