import axios from "../api/axios";
import { create } from "zustand";
import { PostDetails, UserDetails, commentProps } from "../props";

type Props = {
  UserData: UserDetails | null;
  AllPosts: PostDetails[] | null;
  UserPosts: PostDetails[] | null;
  loading: boolean;
  post: PostDetails | null;
  user: UserDetails | null;
  postcomments: commentProps[] | null;
  getAllComments: (postID: string) => Promise<void>;
  getUser: (id: string) => Promise<void>;
  getPost: (id: string) => Promise<void>;
  getAllPosts: () => Promise<void>;
  getUserPosts: (id: string) => Promise<void>;
  setLoading: (state: boolean) => void;
  getUserData: () => Promise<void>;
};

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
      const res = await axios.get(`/comment/${postID}`);
      set({ postcomments: res.data.comments });
    } catch (error) {
      console.error(error);
    }
  },
  getUser: async (id: string) => {
    try {
      const res = await axios.get(`/user/${id}`);
      set({ user: res.data.data });
    } catch (error) {
      console.error(error);
    }
  },
  getPost: async (id: string) => {
    try {
      const res = await axios.get(`/post/${id}`);
      set({ post: res.data.post });
    } catch (error) {
      console.error(error);
    }
  },
  getUserPosts: async (id: string) => {
    try {
      get().setLoading(true);
      const res = await axios.get(`/userposts/${id}`);
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
      const res = await axios.get(`/post`);
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
      const res = await axios.get(`/userdata`);
      set({ UserData: res.data.data });
    } catch (error) {
      console.error(error);
    } finally {
      get().setLoading(false);
    }
  },
}));
