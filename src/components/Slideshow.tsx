import React from "react";
import { Wine } from "../utils/types";
import { useFavorites } from "../hooks/useFavorites";
import { useFilter } from "../hooks/useFilter";
import "../styles/slideshow.css";
import "../styles/listView.css";

interface WineSlideShow {
  wines: Wine[];
  currentIndex: number;
  activeButton: string;
  setCurrentIndex: (index: number) => void;
}

/**
 * This component is used to display a slideshow of wines, showing one wine at a time
 * @param {WineSlideShow} wines
 */
const Slideshow: React.FunctionComponent<WineSlideShow> = ({ wines }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { currentIndex, setCurrentIndex } = useFilter();
  if (wines.length === 0) {
    return (
      <div id="errorNoWine">
        <p>No products in this category. Add your favorites in homepage</p>
      </div>
    );
  }
  const currentWine = wines[currentIndex]?.basic.productId
    ? wines[currentIndex] || {}
    : wines[0];
  const isFavorite =
    currentWine.basic && favorites.includes(currentWine.basic.productId);

  const getPreviousElement = () => {
    currentIndex !== 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(0);
  };

  const getNextElement = () => {
    currentIndex < wines.length - 1
      ? setCurrentIndex(currentIndex + 1)
      : setCurrentIndex(0);
  };

  return (
    <div>
      <div className="slideShow">
        <button
          className="buttonLeft"
          aria-label="button-ClickLeft"
          onClick={getPreviousElement}
        />
        <div className="wineSlide">
          <h2 className="slideshowProductName">
            {currentWine.basic?.productShortName ||
              "Product Name Not Available"}
          </h2>
          {currentWine.basic && (
            <img
              className="wineImage"
              src={`https://bilder.vinmonopolet.no/cache/300x300-0/${currentWine.basic.productId}-1.jpg`}
              alt={currentWine.basic.productShortName}
            />
          )}
        </div>
        <button
          className="buttonRight"
          aria-label="button-ClickRight"
          onClick={getNextElement}
        />
      </div>
      <div className="wineInformation">
        <p>
          <b> ProductID: </b> {currentWine.basic?.productId || "N/A"}
        </p>
        <p>
          <b> Last Changed at: </b> {currentWine.lastChanged?.date}{" "}
          {currentWine.lastChanged?.time}
        </p>
        <div className="buttonContainer">
          <button
            onClick={() => toggleFavorite(currentWine.basic?.productId)}
            className="favoriteButton"
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
