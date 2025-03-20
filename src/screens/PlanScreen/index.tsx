import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {queryClient} from '../../../App';
import Header from '../../components/global/Header';
import TabScreenWrapper from '../../components/global/TabScreenWrapper';
import {fontScale} from '../../styles/globalStyles';
import {useAuthContext} from '../Config';

const data = [
  {title: 'Physical 💪'},
  {
    title: 'Psychological 🧠',
  },
  {
    title: 'Lifestyle 🧬',
  },
];

const TaskButton = ({
  exercise_type,
  title,
}: {
  exercise_type?: string;
  title: string;
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (title === 'Physical 💪') {
      navigation.navigate('DayListScreen', {data: title});
    } else if (title === 'Psychological 🧠') {
      navigation.navigate('DayListScreen', {
        data: title,
      });
    } else {
      navigation.navigate('LifeStyleScreen', {exercise_type: 'lifestyle 🧬'});
    }
    return;
  };

  return (
    <TouchableOpacity style={styles.btn_container} onPress={handlePress}>
      <View>
        <Text style={styles.btnTxt}>{title}</Text>
      </View>
      <TouchableOpacity>
        <AntDesign name={'right'} color={'#fff'} size={22} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const PlanScreen = () => {
  const {user} = useAuthContext();

  const invalidateWeeks = async () => {
    await queryClient.invalidateQueries({queryKey: ['week']});
  };

  useFocusEffect(
    useCallback(() => {
      invalidateWeeks();
    }, []),
  );

  return (
    <TabScreenWrapper style={{backgroundColor: '#0e0e0e'}}>
      <Header title="Your Plan 📒 " setting />
      <View style={styles.container}>
        <Text style={styles.title}>
          Hello,{' '}
          <Text
            style={{fontSize: 22 / fontScale, fontFamily: 'Manrope-ExtraBold'}}>
            {user?.full_name}!
          </Text>
        </Text>
        <FlatList
          style={styles.flatlistContent}
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <TaskButton title={item.title} />}
        />
      </View>
    </TabScreenWrapper>
  );
};

export default PlanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 14 / fontScale,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    marginTop: 10,
  },
  flatlistContent: {
    marginTop: 23,
  },
  btn_container: {
    borderColor: '#323232',
    borderWidth: 1 / fontScale,
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 24,
    paddingVertical: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginVertical: 7,
    alignItems: 'center',
  },
  btnTxt: {
    fontFamily: 'NeueHaasDisplay-Mediu',
    fontSize: 20 / fontScale,
    color: '#fff',
    // lineHeight: 24,
  },
  subtitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 10 / fontScale,
    color: '#fff',
  },
});
