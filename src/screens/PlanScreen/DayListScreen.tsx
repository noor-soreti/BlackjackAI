import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../components/global/Header';
import TabScreenWrapper from '../../components/global/TabScreenWrapper';
import {fontScale} from '../../styles/globalStyles';
import {useDataContext} from '../DataContext';

const MAPPER: {[key: string]: 'physical_training' | 'psychological_training'} =
  {
    'Physical 💪': 'physical_training',
    'Psychological 🧠': 'psychological_training',
  };

const TaskButton = ({
  item,
  exercise_type,
}: {
  item: {title: string; exercises: string[]};
  exercise_type?: string;
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ExerciseListScreen', {
      data: item?.exercises,
      title: item.title,
      exercise_type,
    });
    return;
  };

  return (
    <TouchableOpacity style={styles.btn_container} onPress={handlePress}>
      <View>
        <Text style={styles.btnTxt}>{item.title}</Text>
      </View>
      <TouchableOpacity>
        <AntDesign name={'right'} color={'#fff'} size={22} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const DayListScreen = ({route}: {route: any}) => {
  const {data} = route.params;
  const {week_plan} = useDataContext();

  const plan = week_plan?.daily_schedule.map(_day => ({
    day: _day.day,
    exercises: _day[MAPPER[data]],
  }));

  return (
    <TabScreenWrapper style={{backgroundColor: '#0e0e0e'}}>
      <Header title={data} back />
      <View style={styles.container}>
        <View style={styles.weekContainer}>
          <Text style={styles.title}>Week {week_plan?.week}</Text>
          <Text style={styles.subtitle}>{week_plan?.focus}</Text>
        </View>
        <FlatList
          style={styles.flatlistContent}
          data={plan?.map(item => {
            return {title: `Day ${item?.day}`, exercises: item.exercises};
          })}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TaskButton item={item} exercise_type={data} />
          )}
        />
      </View>
    </TabScreenWrapper>
  );
};

export default DayListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },
  title: {
    fontSize: 18 / fontScale,
    fontFamily: 'NeueHaasDisplay-Bold',
    color: '#fff',
    lineHeight: 20 / fontScale,
  },
  subtitle: {
    fontFamily: 'NeueHaasDisplay-Light',
    fontSize: 16 / fontScale,
    color: '#fff',
    marginTop: 5,
    paddingRight: 10,
    lineHeight: 20 / fontScale,
  },
  flatlistContent: {
    marginTop: '2%',
  },
  weekContainer: {
    borderColor: '#2A2A2A',
    borderWidth: 1,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 24,
    paddingVertical: 22,
    borderRadius: 10,
    marginTop: 16,
  },
  btn_container: {
    borderColor: '#2A2A2A',
    borderWidth: 0.5,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 24,
    paddingVertical: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginVertical: 7,
    alignItems: 'center',
  },
  btnTxt: {
    fontFamily: 'NeueHaasDisplay-Bold',
    fontSize: 18 / fontScale,
    color: '#fff',
    // lineHeight: 24,
  },
});
