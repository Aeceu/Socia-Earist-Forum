import axios from "axios";
import { create } from "zustand";

type DataDetails = {
  _id: string;
  studentID: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
};

type commentProps = {
  _id: string;
  commentor: DataDetails;
  comment: string;
};

type PostDetails = {
  _id: string;
  title: string;
  description: string;
  likes: [string];
  category: string;
  createdAt: string;
  creator: DataDetails;
};

type Props = {
  UserData: DataDetails | null;
  AllPosts: PostDetails[] | null;
  UserPosts: PostDetails[] | null;
  loading: boolean;
  post: PostDetails | null;
  user: DataDetails | null;
  postcomments: commentProps[] | null;
  getAllComments: (postID: string) => Promise<void>;
  getUser: (id: string) => Promise<void>;
  getPost: (id: string) => Promise<void>;
  getAllPosts: () => Promise<void>;
  getUserPosts: (id: string) => Promise<void>;
  setLoading: (state: boolean) => void;
  getUserData: () => Promise<void>;
};

const baseUrl = "https://socia-earist-forum-backend.vercel.app";

export const DataStore = create<Props>()((set, get) => ({
  UserData: null,
  loading: false,
  AllPosts: null,
  UserPosts: null,
  post: null,
  user: null,
  postcomments: null,
  getAllComments: async (postID: string) => {
    try {
      const res = await axios.get(`${baseUrl}/comment/${postID}`);
      set({ postcomments: res.data.comments });
    } catch (error) {
      console.error(error);
    }
  },
  getUser: async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/user/${id}`);
      set({ user: res.data.data });
    } catch (error) {
      console.error(error);
    }
  },
  getPost: async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/post/${id}`);
      set({ post: res.data.post });
    } catch (error) {
      console.error(error);
    }
  },
  getUserPosts: async (id: string) => {
    try {
      get().setLoading(true);
      const res = await axios.get(`${baseUrl}/userposts/${id}`);
      console.log(res.data);

      set({ UserPosts: res.data.userposts });
    } catch (error) {
      console.error(error);
    } finally {
      get().setLoading(false);
    }
  },
  getAllPosts: async () => {
    try {
      get().setLoading(true);
      const res = await axios.get(`${baseUrl}/post`);
      set({ AllPosts: res.data.posts });
    } catch (error) {
      console.error(error);
    } finally {
      get().setLoading(false);
    }
  },
  setLoading: (state: boolean) => {
    set({ loading: state });
  },
  getUserData: async () => {
    try {
      get().setLoading(true);
      const res = await axios.get(`${baseUrl}/userdata`);
      set({ UserData: res.data.data });
    } catch (error) {
      console.error(error);
    } finally {
      get().setLoading(false);
    }
  },
}));
