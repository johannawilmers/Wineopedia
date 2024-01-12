import { useEffect, useState } from "react";

const VIEWING_STORAGE_KEY = "positionState";

/**
 * This component is used to view wines in slideshow or list
 */
export const useViewing = () => {
  const [isSlideShow, setIsSlideshow] = useState<boolean>(() => {
    const storedViewing = sessionStorage.getItem(VIEWING_STORAGE_KEY);
    return storedViewing ? JSON.parse(storedViewing) : true;
  });

  useEffect(() => {
    sessionStorage.setItem(VIEWING_STORAGE_KEY, JSON.stringify(isSlideShow));
  }, [isSlideShow]);

  return { isSlideShow, setIsSlideshow };
};
