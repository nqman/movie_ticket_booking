import { useEffect } from "react";

export const TitleFunction = (newTitle) => {
  useEffect(() => {
    document.title = newTitle;
  }, []);
};
