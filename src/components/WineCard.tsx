import React from "react";
import { Wine } from "../utils/types";
import "../styles/wineCard.css";

interface WineCardProps {
  wine: Wine;
}

/**
 * This component is used to display a single wine card
 * @param {ineCardProps} wine
 */
const WineCard: React.FunctionComponent<WineCardProps> = ({ wine }) => {
  return (
    <a href={`/project1/product/${wine.basic.productId}`} className="wineCard">
      <div>
        <img
          src={`https://bilder.vinmonopolet.no/cache/300x300-0/${wine.basic.productId}-1.jpg`}
          alt={wine.basic.productShortName}
        />
      </div>
      <h2 className="wineName">{wine.basic.productShortName}</h2>
    </a>
  );
};

export default WineCard;
