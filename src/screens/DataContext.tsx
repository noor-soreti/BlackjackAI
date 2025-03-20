import {useQuery} from '@tanstack/react-query';
import React, {createContext, useContext} from 'react';
import {getForums} from '../Api/functions/forum';
import {getDailyTask, handleStreak} from '../Api/functions/submission';
import {getWeekPlan, WeekPlan} from '../Api/functions/weeklyPlan';
import {storage} from '../Api/Storage';
import RootStack from '../navigation/RootStack';
import {useAuthContext} from './Config';

const Context = createContext<{
  week_plan?: WeekPlan | null;
  daily_tasks?: {
    _id: string;
    week: number;
    day: number;
    tasks: {task: string; completed: boolean; _id: string}[];
  } | null;
  forum?: {
    _id: string;
    user_id: string;
    user: {full_name: string};
    title: string;
    content: string;
    comments: {
      _id: string;
      comment: string;
      commented_on: string;
      user_id: string;
      full_name: string;
    }[];
    createdAt: string;
  }[];
  isDailyTasksLoading: boolean;
  isForumFetching: boolean;
  week_refetch: () => void;
  daily_task_refetch: () => void;
  forumRefetch: () => void;
}>({
  isForumFetching: false,
  isDailyTasksLoading: false,
  week_refetch: () => {},
  daily_task_refetch: () => {},
  forumRefetch: () => {},
});

export const useDataContext = () => useContext(Context);

export default function DataContext() {
  const token = storage.getString('token');
  const {user} = useAuthContext();

  const {
    data: daily_tasks,
    isFetching: isDailyTasksLoading,
    refetch: dailyTaskRefetch,
  } = useQuery({
    queryKey: ['daily_tasks', user?.current_day, user?.week_number, token],
    queryFn: () =>
      getDailyTask({day: user?.current_day!, week: user?.week_number!}),
    // enabled: Boolean(token),
  });

  const {
    data: forum,
    isFetching: isForumLoading,
    refetch: forumRefetch,
  } = useQuery({
    queryKey: ['forum'],
    queryFn: getForums,
  });

  const {
    data: week_plan,
    refetch: week_refetch,
    isLoading: isWeekPlanLoading,
  } = useQuery({
    queryKey: ['week', user?.week_number, token],
    queryFn: () => getWeekPlan(user?.week_number!),
    // enabled: Boolean(token),
  });

  const {isLoading: isStreakHandling} = useQuery({
    queryKey: ['streak'],
    queryFn: handleStreak,
    gcTime: 120000,
    staleTime: 1000,
    enabled: Boolean(token),
  });

  return (
    <Context.Provider
      value={{
        week_plan,
        week_refetch,
        daily_tasks,
        daily_task_refetch: dailyTaskRefetch,
        isDailyTasksLoading,
        forum,
        forumRefetch,
        isForumFetching: isForumLoading,
      }}>
      <RootStack />
    </Context.Provider>
  );
}
