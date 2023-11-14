import { SetStateAction } from "react";

export type PostDetails = {
  _id: string;
  likes: [string];
  title: string;
  description: string;
  category: string;
  createdAt: string;
  creator: DataDetails;
};

export type UserDetails = {
  _id: string;
  studentID: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
};

export type commentProps = {
  _id: string;
  commentor: UserDetails;
  comment: string;
};

interface PostProps {
  title: string;
  description: string;
  category: string;
}

interface ProfileDetailsProps {
  studentID: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface AddCommentProps {
  setLoading: (loading: boolean) => void;
  setComment: Dispatch<SetStateAction<string>>;
  comment: string;
  postID: string;
  userID: string;
}

interface CreatePostProps {
  setLoading: (loading: boolean) => void;
  userID?: string;
  data: PostProps;
  setData: Dispatch<SetStateAction<PostProps>>;
  setToggle: (toggle: boolean) => void;
}

interface CancelPostProps {
  setToggle: (toggle: boolean) => void;
  setData: Dispatch<SetStateAction<PostProps>>;
}

interface UpdatePostProps {
  setLoading: (loading: boolean) => void;
  postID?: string;
  data: PostProps;
  setToggle: (toggle: boolean) => void;
  setData: Dispatch<SetStateAction<PostProps>>;
}

interface UpdateProfileProps {
  setLoading: (loading: boolean) => void;
  setToggle: (toggle: boolean) => void;
  userID?: string;
  data: ProfileDetailsProps;
  setData: Dispatch<SetStateAction<PostProps>>;
}
