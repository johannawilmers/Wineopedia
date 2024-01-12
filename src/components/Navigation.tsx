import { Route, Routes } from "react-router-dom";
import Favorites from "../pages/Favorites";
import Homepage from "../pages/Homepage";
import Product from "../pages/Product";

/**
 * This component is used to display a list of wine cards
 */
function Navigation() {
  return (
    <div>
      <Routes>
        <Route path="/myfavorites" Component={Favorites}></Route>
        <Route path="/" Component={Homepage}></Route>
        <Route path="/product/:id" Component={Product} />
      </Routes>
    </div>
  );
}

export default Navigation;
