import axiosInstance from '../axiosInstance';
import {endpoints} from '../endpoints';

interface LoginBody {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface SocialLoginBody {
  full_name: string;
  email: string;
  provider: string;
}

export interface User {
  _id: string;
  full_name: string;
  provider: string;
  email: string;
  password: string;
  user_analysis: {
    pe_score: number;
    potential_score: number;
    comparison: string;
    key_issues: string[];
  };
  latency_time: number;
  status: number;
  number_of_days_a_week: number;
  current_day: number;
  week_number: number;
  number_of_weeks: number;
  current_day_date: number;
  streak: number;
  createdAt: string;
  updatedAt: string;
}

export const getProfile = async (): Promise<User | null> => {
  try {
    const res = await axiosInstance.get(endpoints.auth.profile);
    return res.data;
  } catch (err) {
    return null;
  }
};

export const authenticateUser = async (body: LoginBody) => {
  const res = await axiosInstance.post(endpoints.auth.authenticate, body);
  return res.data;
};

export const socialLogin = async (body: SocialLoginBody) => {
  const res = await axiosInstance.post(endpoints.auth.social_login, body);
  return res.data;
};

export const deleteAccount = async () => {
  const res = await axiosInstance.delete(endpoints.auth.delete_account);
  return res.data;
};
