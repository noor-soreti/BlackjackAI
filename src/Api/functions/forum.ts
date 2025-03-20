import axiosInstance from '../axiosInstance';
import {endpoints} from '../endpoints';

export const getForums = async (): Promise<
  {
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
  }[]
> => {
  const res = await axiosInstance.get(endpoints.forum.get_forums);
  return res.data;
};

export const getForum = async (
  id: string,
): Promise<{
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
}> => {
  const res = await axiosInstance.get(endpoints.forum.get_forum, {
    params: {
      forum_id: id,
    },
  });
  return res.data;
};

export const createForum = async (body: {title: string; content: string}) => {
  const res = await axiosInstance.post(endpoints.forum.create_forum, body);
  return res.data;
};

export const addComment = async (body: {comment: string; forum_id: string}) => {
  const res = await axiosInstance.post(endpoints.forum.add_comment, body);
  return res.data;
};
