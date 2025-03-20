import axiosInstance from '../axiosInstance';
import {endpoints} from '../endpoints';

type SubmitBody = {
  question: string;
  answer: string;
}[];

export const submitAnswers = async (body: SubmitBody) => {
  const res = await axiosInstance.post(
    endpoints.submissions.submit_answers,
    body,
    {
      timeout: 120000,
    },
  );
  return res.data;
};

export const chatBot = async (body: {
  text: string;
}): Promise<{message: string}> => {
  const res = await axiosInstance.post(endpoints.submissions.chat_bot, body);
  return res.data;
};

export const getDailyTask = async (body: {
  day: number;
  week: number;
}): Promise<{
  _id: string;
  tasks: {task: string; _id: string; completed: boolean}[];
  week: number;
  day: number;
} | null> => {
  if (body.day && body.week) {
    const res = await axiosInstance.get(endpoints.submissions.get_daily_tasks, {
      params: body,
    });
    return res.data;
  }
  return null;
};

export const completeTask = async (body: {
  day_id: string;
  tasks: {task: string; _id: string; completed: boolean}[];
}) => {
  const res = await axiosInstance.put(
    endpoints.submissions.complete_task,
    body,
  );
  return res.data;
};

export const handleStreak = async () => {
  const res = await axiosInstance.get(endpoints.submissions.handle_streak);
  return res.data;
};
