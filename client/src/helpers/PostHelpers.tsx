import {
  AddCommentProps,
  CancelPostProps,
  CreatePostProps,
  UpdatePostProps,
  UpdateProfileProps,
} from "../props";
import axios from "../api/axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { DataStore } from "../state/DataStore";

interface PostStoreProps {
  handleAddComment: ({
    comment,
    postID,
    setComment,
    setLoading,
    userID,
  }: AddCommentProps) => Promise<boolean>;
  handleCreatePost: ({
    data,
    setData,
    setLoading,
    userID,
    setToggle,
  }: CreatePostProps) => Promise<void>;
  handleCancel: ({ setData, setToggle }: CancelPostProps) => void;
  handleUpdatePost: ({
    setLoading,
    postID,
    data,
    setToggle,
    setData,
  }: UpdatePostProps) => Promise<boolean>;
  handleUpdateProfile: ({
    setLoading,
    setToggle,
    userID,
    data,
    setData,
  }: UpdateProfileProps) => Promise<boolean>;
}

export const PostStore = create<PostStoreProps>()(() => ({
  handleAddComment: async ({
    comment,
    postID,
    setComment,
    setLoading,
    userID,
  }: AddCommentProps) => {
    try {
      setLoading(true);
      await axios.post(`/comment`, {
        comment: comment,
        postID: postID,
        userID: userID,
      });
      setLoading(false);
      setComment("");
      return true;
    } catch (error) {
      console.error(error);
      setLoading(false);
      setComment("");
      return false;
    }
  },

  handleCreatePost: async ({
    data,
    setData,
    setLoading,
    userID,
    setToggle,
  }: CreatePostProps) => {
    const getAllPosts = DataStore((state) => state.getAllPosts);
    try {
      setLoading(true);
      const res = await axios.post(`/post/${userID}`, { data });
      toast.success(res.data.message);
      getAllPosts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setData({
        title: "",
        description: "",
        category: "general",
      });
      setToggle(false);
    }
  },

  handleCancel: ({ setData, setToggle }: CancelPostProps) => {
    setToggle(false);
    setData({
      title: "",
      description: "",
      category: "general",
    });
  },

  handleUpdatePost: async ({
    setLoading,
    postID,
    data,
    setToggle,
    setData,
  }: UpdatePostProps) => {
    try {
      setLoading(true);
      const res = await axios.patch(`/post/${postID}`, { data });
      toast.success(res.data.message);
      setLoading(false);
      setToggle(false);
      setData({
        title: "",
        description: "",
        category: "",
      });
      return true;
    } catch (error) {
      console.error(error);
      setLoading(false);
      setToggle(false);
      setData({
        title: "",
        description: "",
        category: "",
      });
      return false;
    }
  },

  handleUpdateProfile: async ({
    setLoading,
    setToggle,
    userID,
    data,
    setData,
  }: UpdateProfileProps) => {
    try {
      setLoading(true);
      const res = await axios.patch(`/user/${userID}`, { data });
      toast.success(res.data.message);
      setLoading(false);
      setToggle(false);
      setData({
        studentID: "",
        firstname: "",
        lastname: "",
        email: "",
      });
      return true;
    } catch (error) {
      console.error(error);
      setLoading(false);
      setToggle(false);
      setData({
        studentID: "",
        firstname: "",
        lastname: "",
        email: "",
      });
      return false;
    }
  },
}));
