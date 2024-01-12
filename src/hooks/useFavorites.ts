import { useEffect, useState } from "react";

const FAVORITES_STORAGE_KEY = "favorites";

/**
 * This component is used to fetch all favorites from local storage
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const addFavorite = (id: string) => {
    if (!favorites.includes(id)) {
      setFavorites((prev) => [...prev, id]);
    }
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((favoriteId) => favoriteId !== id));
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      removeFavorite(id);
      if (window.location.pathname.includes("/myfavorites")) {
        window.location.reload();
      }
    } else {
      addFavorite(id);
    }
  };

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, toggleFavorite, addFavorite, removeFavorite };
};
