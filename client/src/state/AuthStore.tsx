import { create } from "zustand";
import { persist } from "zustand/middleware";

type Props = {
  userID: string | null;
  tokenID: string | null;
  setToken: (id: string) => void;
  setID: (id: string) => void;
};

const AuthStore = create<Props>()(
  persist(
    (set) => ({
      userID: null,
      tokenID: null,
      setToken: (id: string | null) => {
        set({ tokenID: id });
      },
      setID: (id: string | null) => {
        set({ userID: id });
      },
    }),
    {
      name: "auth",
    }
  )
);

export default AuthStore;
