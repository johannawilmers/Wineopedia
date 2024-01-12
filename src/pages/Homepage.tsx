import { Viewings } from "../components/Viewings";
import { useAllWines } from "../hooks/useAllWines";
import "../styles/homepage.css";
import "../styles/listView.css";

/**
 * This page is used to display the homepage
 */
function Homepage() {
  const { data, isError, isLoading } = useAllWines();
  const { setViewing, changeViewing, isSlideShow } = Viewings();

  if (isLoading) {
    return <div className="holdUpText">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="holdUpText">Error loading data.</div>;
  }

  const wineMap = data.map((wine) => ({
    ...wine,
    imageUrl: `https://bilder.vinmonopolet.no/cache/300x300-0/${wine.basic.productId}-1.jpg`,
  }));

  return (
    <div className="homepageDiv">
      <h1 id="headerFront"> DISCOVER YOUR FAVORITE WINES </h1>
      <p className="preamble">
        - Here you can click your way through some selected wines to find your
        new favorite -{" "}
      </p>

      <div className="buttonContainer">
        <button className="favoriteButton" onClick={changeViewing}>
          {isSlideShow ? "Listview" : "Slideshow"}
        </button>
      </div>

      <div> {setViewing(wineMap)} </div>
    </div>
  );
}

export default Homepage;
