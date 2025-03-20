import {useMutation} from '@tanstack/react-query';
import moment, {Moment} from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useCountUp} from 'use-count-up';
import {queryClient} from '../../../App';
import {completeTask} from '../../Api/functions/submission';
import normalize from '../../components/dimen';
import Header from '../../components/global/Header';
import TabScreenWrapper from '../../components/global/TabScreenWrapper';
import {fontScale, height} from '../../styles/globalStyles';
import {useAuthContext} from '../Config';
import {useDataContext} from '../DataContext';

const CustomDay = (props: {date: Moment; selected?: boolean}) => {
  return (
    <Pressable
      style={[
        styles.dayContainer,
        props.selected && styles.highlightDateContainer,
      ]}
      key={props.date.toISOString()}>
      <Text
        style={[
          styles.dateNumber,
          props.selected && styles.highlightDateNumber,
        ]}>
        {moment(props.date.toISOString()).format('D')}
      </Text>
      <Text
        style={[styles.dateName, props.selected && styles.highlightDateName]}>
        {moment(props.date.toISOString()).format('MMM')}
      </Text>
    </Pressable>
  );
};

const TaskScreen = () => {
  const {user, refetch} = useAuthContext();
  const {daily_tasks, isDailyTasksLoading, daily_task_refetch} =
    useDataContext();
  const [tasks, setTasks] = useState(daily_tasks?.tasks);
  const tasks_completed = tasks?.filter(_task => _task.completed) ?? [];

  // useEffect(() => {
  //   setTasks(daily_tasks?.tasks);
  // }, [daily_tasks?.tasks]);

  // Calculate progress dynamically
  const totalTasks = tasks?.length;
  const completedTasks = tasks_completed.length;
  const progress = completedTasks / (totalTasks ?? 10);

  const invalidateDailyTask = async () => {
    await queryClient.invalidateQueries({queryKey: ['daily_tasks']});
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     invalidateDailyTask();
  //   }, []),
  // );

  useEffect(() => {
    invalidateDailyTask();
  }, []);

  const {mutate, isPending} = useMutation({
    mutationFn: completeTask,
    onSuccess: async () => {
      daily_task_refetch();
      if (totalTasks === completedTasks) {
        refetch();
      }
    },
    onError: err => {
      console.log(err);
    },
  });

  const toggleTaskCompletion = (id: string) => {
    const arr = JSON.parse(JSON.stringify(tasks ?? '[]'));
    const new_tasks = arr.map(
      (_task: {task: string; completed: boolean; _id: string}) => {
        if (_task._id === id) {
          _task.completed = !_task.completed;
        }
        return _task;
      },
    );
    setTasks(new_tasks);
    mutate({day_id: daily_tasks!._id, tasks: new_tasks!});
  };
  const allTasksCompleted =
    tasks?.length === completedTasks ||
    parseInt(moment(user?.current_day_date).startOf('day').format('x'), 10) >
      parseInt(moment().startOf('day').format('x'), 10);

  const taskCompletionHour =
    (user?.current_day ?? 0) + 1 > (user?.number_of_days_a_week ?? 3)
      ? moment()
          .add(1, 'week')
          .set({
            day: 1,
          })
          .startOf('day')
          .diff(moment(), 'hours')
      : 24; // Task completed at 12:00 PM
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentSecond = new Date().getSeconds();

  // Calculate remaining time in seconds
  const remainingHours = (24 - (currentHour - taskCompletionHour)) % 24;
  const remainingTimeInSeconds =
    remainingHours * 3600 - currentMinute * 60 - currentSecond;

  // Use `useCountUp` to count down
  const {value} = useCountUp({
    isCounting: true,
    duration: remainingTimeInSeconds, // Total remaining seconds
    start: remainingTimeInSeconds,
    end: 0,
    easing: 'easeInCubic',
    updateInterval: 1, // Update every second
  });

  // Convert value into HH:MM:SS
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;

  return (
    <TabScreenWrapper style={styles.container}>
      {/* {isDailyTasksLoading && (
        <View style={styles.loader}>
          <ActivityIndicator color="#fff" size={35 / fontScale} />
        </View>
      )} */}
      <Header title="Today’s tasks 🎯" setting />
      <View style={styles.mainContainer}>
        {/* Calendar Strip */}
        <View style={styles.calendarStrip}>
          {[3, 2, 1].map(_day => {
            const _date = moment().subtract(_day, 'days');
            return <CustomDay date={_date} key={_date.toISOString()} />;
          })}
          <CustomDay date={moment()} selected />
          {[1, 2, 3].map(_day => {
            const _date = moment().add(_day, 'days');
            return <CustomDay date={_date} key={_date.toISOString()} />;
          })}
        </View>
        {/* Streaks Section */}
        <View style={styles.streaksContainer}>
          <Text style={styles.streaksText}>Streaks 🔥</Text>
          <View style={styles.streaksBadge}>
            <Text style={styles.streaksNumber}>{user?.streak}</Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>In progress</Text>
          <Text style={styles.progressCount}>
            {allTasksCompleted ? tasks?.length : completedTasks}/{totalTasks}
          </Text>
        </View>

        {/* React Native Progress Bar */}
        <ProgressBar
          progress={allTasksCompleted ? 1 : progress}
          width={null}
          height={5 / fontScale}
          color="#8C00D3"
          borderRadius={10 / fontScale}
          borderWidth={0}
          unfilledColor="#535353"
          style={styles.progressBar}
        />

        {/* Task List */}
        {allTasksCompleted ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Congratulations! You have completed all your tasks for today.
            </Text>
            <Text style={[styles.emptyText, {marginTop: 30}]}>
              Next task starts in :
            </Text>
            <View style={styles.row}>
              <View style={styles.timerContainer}>
                <Text style={styles.timerInnerText}>
                  {hours.toString().padStart(2, '0')}
                </Text>
              </View>
              <View style={styles.timerContainer}>
                <Text style={styles.timerInnerText}>
                  {minutes.toString().padStart(2, '0')}
                </Text>
              </View>
              <View style={styles.timerContainer}>
                <Text style={styles.timerInnerText}>
                  {seconds.toString().padStart(2, '0')}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <FlatList
            data={tasks ?? []}
            keyExtractor={(_, index) => index.toString()}
            // style={styles.flatlistContent}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => toggleTaskCompletion(item._id)}
                  style={[
                    styles.taskItem,
                    item.completed && styles.taskCompleted,
                  ]}>
                  {item.completed ? (
                    <Image
                      source={require('../../assets/Images/purple-check.png')}
                      style={{width: 30, height: 30}}
                    />
                  ) : (
                    <MaterialIcons
                      name="radio-button-unchecked"
                      color={'#AFAFAF'}
                      size={30}
                      style={{alignSelf: 'center'}}
                    />
                  )}
                  <Text
                    style={[
                      styles.taskText,
                      item.completed && styles.taskTextCompleted,
                    ]}>
                    {item.task}
                  </Text>
                </TouchableOpacity>
              );
            }}
            // ItemSeparatorComponent={() => (
            //   <View
            //     style={{
            //       width: width / 1.2,
            //       borderBottomWidth: 1,
            //       borderBottomColor: '#535353',
            //       alignSelf: 'center',
            //       padding: 1,
            //     }}
            //   />
            // )}
          />
        )}
      </View>
    </TabScreenWrapper>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0e0e0e',
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },
  loader: {
    width: '100%',
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: '#00000060',
  },
  streaksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    paddingVertical: 8,
    paddingLeft: 18,
    borderRadius: 12,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#323232',
  },
  streaksText: {
    color: '#fff',
    fontSize: 24 / fontScale,
    fontFamily: 'NeueHaasDisplay-Mediu',
    letterSpacing: -0.3,
  },
  streaksBadge: {
    backgroundColor: 'rgba(102, 0, 162, 0.5)',
    borderRadius: 15 / fontScale,
    borderColor: '#AA00FF',
    borderWidth: 1,
    paddingVertical: Platform.OS === 'android' ? 6 : 10,
    paddingHorizontal: 28,
    marginRight: 8,
  },
  streaksNumber: {
    color: '#fff',
    fontSize: 24 / fontScale,
    fontFamily: 'WorkSans-ExtraBold',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
    // paddingHorizontal: 12,
  },
  progressText: {
    color: '#fff',
    fontSize: 22 / fontScale,
    fontFamily: 'NeueHaasDisplay-Mediu',
    lineHeight: 24,
  },
  progressCount: {
    color: '#fff',
    fontSize: 22 / fontScale,
    lineHeight: 24,
    fontFamily: 'WorkSans-ExtraBold',
  },
  progressBar: {
    marginVertical: 14,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 28,
    backgroundColor: '#1c1c1c',
    gap: 24,
    marginBottom: 14,
    borderRadius: 14,
    borderColor: '#323232',
    borderWidth: 1,
  },
  taskCompleted: {
    // backgroundColor: '#711773',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6D3B9F',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#6D3B9F',
  },
  taskText: {
    color: '#fff',
    fontSize: 16 / fontScale,
    fontFamily: 'NeueHaasDisplay-Mediu',
  },
  taskTextCompleted: {
    // textDecorationLine: 'line-through',
    // color: '#bbb',
  },
  calendarStrip: {
    // height: normalize(65),
    // width: '111%',
    // marginLeft: -22,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  dayContainer: {
    backgroundColor: '#1c1c1c',
    borderRadius: 10 / fontScale,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    borderWidth: 0.5,
    borderColor: '#2C2C2C',
    flex: 1,
    height: normalize(55),
    // flex: 1,
  },
  dateNumber: {
    color: '#fff',
    fontSize: 22 / fontScale,
    fontFamily: 'WorkSans-ExtraBold',
    lineHeight: 20 / fontScale,
  },
  dateName: {
    color: '#fff',
    fontSize: 12 / fontScale,
    fontFamily: 'Manrope-Regular',
    textTransform: 'capitalize',
    lineHeight: 20,
    marginTop: 5,
  },
  highlightDateNumber: {
    color: '#fff',
    fontSize: 22 / fontScale,
    fontFamily: 'WorkSans-ExtraBold',
  },
  highlightDateName: {
    color: '#fff',
    fontSize: 12 / fontScale,
    fontFamily: 'Manrope-Regular',
    textTransform: 'capitalize',
  },
  highlightDateContainer: {
    backgroundColor: 'rgba(102, 0, 162, 0.5)',
    borderColor: '#AA00FF',
    borderWidth: 1,
  },
  flatlistContent: {
    // backgroundColor: '#1C1C1C',
    // marginBottom: 46,
    // borderRadius: 10 / fontScale,
    // borderWidth: 1,
    // borderColor: '#2C2C2C',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18 / fontScale,
    fontFamily: 'Manrope-SemiBold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  timerText: {
    fontSize: 18 / fontScale,
    color: '#fff',
    fontFamily: 'Manrope-SemiBold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    gap: 14,
    marginTop: 20,
  },
  timerContainer: {
    padding: 13,
    paddingHorizontal: 11,
    borderColor: '#2C2C2C',
    borderWidth: 1,
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
  },
  timerInnerText: {
    fontSize: 30 / fontScale,
    color: '#fff',
    fontFamily: 'WorkSans-ExtraBold',
    letterSpacing: -0.5,
  },
});
