"use client";
import { useEffect } from "react";

const AutoResize = (
  textref: HTMLTextAreaElement | HTMLInputElement | null,
  value: string | undefined,
  handleModalToggle?: () => void
) => {
  useEffect(() => {
    if (textref) {
      textref.style.height = "100%";
      const scrollHeight = textref.scrollHeight;
      textref.style.height = scrollHeight + "px";
    }
  }, [textref, value, handleModalToggle]);
};

export default AutoResize;
