import { useAllWines } from "../hooks/useAllWines";
import { Viewings } from "../components/Viewings";
import { useFavorites } from "../hooks/useFavorites";
import { Wine } from "../utils/types";
import "../styles/favorites.css";

/**
 * This page is used to display the favorites page
 */
function Favorites() {
  const { setViewing, changeViewing, isSlideShow } = Viewings();
  const { favorites } = useFavorites();
  const { data, isError, isLoading } = useAllWines();

  if (isLoading) {
    return <div className="holdUpText">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="holdUpText"> Error loading data. </div>;
  }

  const favWineMap = !data
    ? [{} as Wine]
    : data
        .filter((wine) => favorites.includes(wine.basic.productId))
        .map((wine) => ({
          ...wine,
          imageUrl: `https://bilder.vinmonopolet.no/cache/300x300-0/${wine.basic.productId}-1.jpg`,
        }));
  if (favWineMap.length == 0) {
    return (
      <div id="noFavs">
        No products in this category. Add your favorites in homepage
      </div>
    );
  }

  return (
    <div className="favoritesDiv">
      <div className="topText">
        <h1 id="favHeadline"> Your Favorite Wines </h1>
      </div>
      <div>{setViewing(favWineMap)} </div>
      <div className="buttonContainer">
        <button className="favoriteButton" onClick={changeViewing}>
          {isSlideShow ? "Listview" : "Slideshow"}
        </button>
      </div>
    </div>
  );
}
export default Favorites;
