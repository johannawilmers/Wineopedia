import Slideshow from "./Slideshow";
import { Wine } from "../utils/types";
import ListView from "./ListView";
import { useEffect, useState } from "react";
import { WineFilter } from "./WineFilter";
import { useViewing } from "../hooks/useViewing";
import { useFilter } from "../hooks/useFilter";

/**
 * This component is used to display either a slideshow or listview
 */
export const Viewings = () => {
  const { isSlideShow, setIsSlideshow } = useViewing();
  const [wineString, setWineString] = useState("");
  const { currentIndex, setCurrentIndex } = useFilter();
  const { activeButton } = useFilter();

  useEffect(() => {
    setWineString(activeButton);
  }, [activeButton]);

  const setViewing = (map: Wine[]) => {
    if (isSlideShow) {
      return (
        <div>
          <WineFilter setCurrentWineString={setWineString} />
          <Slideshow
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            wines={map.filter((w) =>
              w.basic.productShortName.toLowerCase().includes(wineString),
            )}
            activeButton={""}
          />
        </div>
      );
    }
    return (
      <div>
        <WineFilter setCurrentWineString={setWineString} />
        <h2 id="NBheader">
          Some of the wines may have the same name, but they differ in sizing
          and packing. Click on a wine to get more information!
        </h2>
        <hr></hr>
        <ListView
          wines={map.filter((w) =>
            w.basic.productShortName.toLowerCase().includes(wineString),
          )}
        />
      </div>
    );
  };

  const changeViewing = () => {
    setIsSlideshow((current) => !current);
  };

  return { setViewing, changeViewing, isSlideShow };
};
