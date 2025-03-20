import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactNode} from 'react';
import {fontScale} from '../../styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

interface TaskItem {
  title?: number;
  day?: number;
  exercises?: string[];
}

const TaskButton = ({
  right,
  item,
  exercise_type,
}: {
  right?: ReactNode;
  exercise_type?: string;
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (item.type === 'day') {
      if (item?.title === 'Physical 💪') {
        navigation.navigate('DayListScreen', {data: item});
      } else if (item?.title === 'Psychological 🧠') {
        navigation.navigate('ExerciseListScreen', {data: item, exercise_type});
      } else {
        navigation.navigate('LifeStyleScreen', {exercise_type: 'lifestyle 🧬'});
      }
      return;
    }

    if (type === 'exercise') {
      navigation.navigate('ExerciseListScreen', {
        data: item?.exercises,
        exercise_type,
      });
      return;
    }

    switch (exercise_type) {
      case 'Psychological 🧠':
        navigation.navigate('PhyscologicalExerciseScreen', {data: item});
        return;
      case 'Physical 💪':
        navigation.navigate('ExerciseScreen', {data: item});
        return;
      case 'lifestyle 🧬':
        navigation.navigate('LifeStyleScreen', {exercise_type: 'lifestyle 🧬'});
        return;
      default:
        return;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View>
        <Text style={styles.btnTxt}>{item?.title}</Text>
        {item?.subtitle && (
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        )}
      </View>
      {right || (
        <TouchableOpacity>
          <AntDesign name={'right'} color={'#fff'} size={22} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default TaskButton;

const styles = StyleSheet.create({
  container: {
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
    fontFamily: 'Fontspring-DEMO-integralcf-regular',
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
