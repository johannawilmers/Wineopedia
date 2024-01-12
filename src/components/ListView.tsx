import React, { useState } from "react";
import { Wine } from "../utils/types";
import "../styles/listView.css";
import WineCard from "./WineCard";
import { useFavorites } from "../hooks/useFavorites";

interface WineListView {
  wines: Wine[];
}

/**
 * This component is used to display a list of wine cards
 * @param {WineListView} wines
 */
const ListView: React.FunctionComponent<WineListView> = ({ wines }) => {
  const [visibleItems, setVisibleItems] = useState(6);
  const { favorites, toggleFavorite } = useFavorites();

  const showMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 6);
  };

  return (
    <div>
      <div className="listview-container">
        {wines.slice(0, visibleItems).map((wine) => (
          <div key={wine.basic.productId} className="wine-card-wrapper">
            <WineCard wine={wine} />
            <button
              onClick={() => toggleFavorite(wine.basic?.productId)}
              className="favoriteButton"
            >
              {wine.basic && favorites.includes(wine.basic.productId)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>
      <div id="buttonDiv" data-testid="favoriteButton">
        {visibleItems < wines.length && (
          <button className="show-more-button" onClick={showMore}>
            Load more wines
          </button>
        )}
      </div>
    </div>
  );
};

export default ListView;
