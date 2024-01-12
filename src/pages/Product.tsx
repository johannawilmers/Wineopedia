import { Link, useParams } from "react-router-dom";
import useWine from "../hooks/useWine";
import { getWineImageUrl } from "../utils/getWineImageUrl";
import "../styles/slideshow.css";
import "../styles/product.css";

/**
 * This page is used to display a single wine product
 */
function Product() {
  const params = useParams();
  const productId = params.id || "";

  const { data, isError, isLoading } = useWine(productId);

  if (!productId) return null;

  if (isLoading) {
    return <div className="holdUpText"> Loading...</div>;
  }

  if (isError || !data) {
    return <div className="holdUpText">Error loading data.</div>;
  }

  const wine = data[0];
  const imageUrl = getWineImageUrl(wine.basic.productId);

  return (
    <>
      <div className="slideShow">
        <div className="wineSlide">
          <h2 className="productName">{wine.basic.productShortName}</h2>

          <img src={imageUrl} alt="" />
          <p>
            <b> ProductID: </b> {wine.basic.productId}
          </p>
          <p>
            <b> Last Changed at: </b> {wine.lastChanged.date}
            {wine.lastChanged.time}
          </p>
        </div>
      </div>
      <div>
        <div>
          <Link to={"/"}>
            <button className="favoriteButton">Back</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Product;
