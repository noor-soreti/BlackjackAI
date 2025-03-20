import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../components/global/Header';
import TabScreenWrapper from '../../components/global/TabScreenWrapper';
import {fontScale} from '../../styles/globalStyles';

const TaskButton = ({
  item,
  exercise_type,
}: {
  item: {title: string; code: string};
  exercise_type?: string;
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    switch (exercise_type) {
      case 'Psychological 🧠':
        navigation.navigate('PhyscologicalExerciseScreen', {data: item});
        return;
      case 'Physical 💪':
        navigation.navigate('ExerciseScreen', {data: item});
        return;
      case 'lifestyle 🧬':
        navigation.navigate('LifeStyleScreen', {exercise_type: 'Lifestyle 🧬'});
        return;
      default:
        return;
    }
  };

  return (
    <TouchableOpacity style={styles.btn_container} onPress={handlePress}>
      <View>
        <Text style={styles.btnTxt}>{item?.title}</Text>
      </View>
      <TouchableOpacity>
        <AntDesign name={'right'} color={'#fff'} size={22} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const ExerciseListScreen = ({route}: {route: any}) => {
  const {data, title, exercise_type} = route.params;

  return (
    <TabScreenWrapper style={{backgroundColor: '#0e0e0e'}}>
      <Header title={exercise_type} back />
      <View style={styles.container}>
        <View style={styles.weekContainer}>
          <Text style={styles.title}>{title}: basics</Text>
        </View>
        <FlatList
          style={styles.flatlistContent}
          data={data.map((item: {exercise: string; code: string}) => {
            return {title: item.exercise, code: item.code};
          })}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TaskButton
              item={item}
              exercise_type={exercise_type ? exercise_type : 'Psychological 🧠'}
            />
          )}
        />
      </View>
    </TabScreenWrapper>
  );
};

export default ExerciseListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },
  title: {
    fontFamily: 'NeueHaasDisplay-Bold',
    fontSize: 18 / fontScale,
    color: '#fff',
    // lineHeight: 22,
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
  subtitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 10 / fontScale,
    color: '#fff',
  },
});
