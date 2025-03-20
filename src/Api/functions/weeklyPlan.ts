import axiosInstance from '../axiosInstance';
import {endpoints} from '../endpoints';

export interface WeekPlan {
  week: number;
  focus: string;
  daily_schedule: {
    day: number;
    physical_training: string[];
    psychological_training: string[];
  }[];
}

export const getWeekPlan = async (
  week: number | string,
): Promise<WeekPlan | null> => {
  if (week) {
    const res = await axiosInstance.get(endpoints.weekly_plan.get_week_plan, {
      params: {week},
    });

    return res.data;
  }
  return null;
};
