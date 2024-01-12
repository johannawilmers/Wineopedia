import { useFilter } from "../hooks/useFilter";

interface WineFilterProps {
  setCurrentWineString: (wineType: string) => void;
}

/**
 * This component is used to filter on red and white wines
 */
export const WineFilter = (props: WineFilterProps) => {
  const { activeButton, setActiveButton, setCurrentIndex } = useFilter();

  const handleFilterClick = (wineType: string) => {
    props.setCurrentWineString(wineType);
    setActiveButton(wineType);
    setCurrentIndex(0);
  };

  return (
    <div className="buttonContainer">
      <button
        className={`filterButton ${activeButton === "rød" ? "active" : ""}`}
        onClick={() => handleFilterClick("rød")}
      >
        Red
      </button>
      <button
        className={`filterButton ${activeButton === "" ? "active" : ""}`}
        onClick={() => handleFilterClick("")}
      >
        All wines
      </button>
      <button
        className={`filterButton ${activeButton === "hvit" ? "active" : ""}`}
        onClick={() => handleFilterClick("hvit")}
      >
        White
      </button>
    </div>
  );
};
