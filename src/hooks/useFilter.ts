import { useEffect, useState } from "react";

const FILTER_STORAGE_KEY = "filter";
const CURRENT_INDEX_STORAGE_KEY = "currentIndex";

/**
 * This component is used to filter on wines
 */
export const useFilter = () => {
  const [activeButton, setActiveButton] = useState<string>(() => {
    const storedActiveButton = sessionStorage.getItem(FILTER_STORAGE_KEY);
    return storedActiveButton ? JSON.parse(storedActiveButton) : "";
  });

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const storedCurrentIndex = sessionStorage.getItem(
      CURRENT_INDEX_STORAGE_KEY,
    );
    return storedCurrentIndex ? parseInt(storedCurrentIndex) : 0;
  });

  useEffect(() => {
    sessionStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(activeButton));
  }, [activeButton]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeButton]);

  useEffect(() => {
    sessionStorage.setItem(CURRENT_INDEX_STORAGE_KEY, currentIndex.toString());
  }, [currentIndex]);

  return { activeButton, setActiveButton, currentIndex, setCurrentIndex };
};
