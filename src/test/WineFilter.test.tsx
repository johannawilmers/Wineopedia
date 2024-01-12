import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import ListView from "../components/ListView";
import { WineFilter } from "../components/WineFilter";
import Slideshow from "../components/Slideshow";

const allWines = [
  {
    basic: {
      productId: "133501",
      productShortName: "Tissot Vin Jaune La Vasée",
      favorite: false,
    },
    lastChanged: {
      date: "2021-04-16",
      time: "06:19:05",
    },
  },
  {
    basic: {
      productId: "162701",
      productShortName: "Niepoort Bioma Vintage",
      favorite: false,
    },
    lastChanged: {
      date: "2021-03-15",
      time: "22:57:42",
    },
  },
];

const redWines = [
  {
    basic: {
      productId: "257201",
      productShortName: "Smalhans rødvin",
      favorite: false,
    },
    lastChanged: {
      date: "2021-03-15",
      time: "22:57:42",
    },
  },
  {
    basic: {
      productId: "650401",
      productShortName: "Grevinnen & Hovmesteren Rødvin",
      favorite: false,
    },
    lastChanged: {
      date: "2021-03-15",
      time: "22:57:42",
    },
  },
];

const whiteWines = [
  {
    basic: {
      productId: "201001",
      productShortName: "Smalhans hvitvin",
      favorite: false,
    },
    lastChanged: {
      date: "2021-03-15",
      time: "22:57:42",
    },
  },
  {
    basic: {
      productId: "6436006",
      productShortName: "Hvit Hagevin Arne & Carlos",
      favorite: false,
    },
    lastChanged: {
      date: "2021-03-15",
      time: "22:57:42",
    },
  },
];

describe("renders filter component in listView", () => {
  let wrapper: RenderResult;

  it("test the filter for all wines", () => {
    wrapper = render(
      <BrowserRouter>
        <div>
          <WineFilter setCurrentWineString={() => {}} />
          <ListView wines={allWines} />
        </div>
      </BrowserRouter>,
    );

    const wine1 = screen.getByText("Tissot Vin Jaune La Vasée");
    const wine2 = screen.getByText("Niepoort Bioma Vintage");
    expect(wine1 && wine2).toBeInTheDocument();

    expect(wine1).toMatchSnapshot();
    expect(wine2).toMatchSnapshot();
  });

  it("test the filter for red wines", () => {
    wrapper = render(
      <BrowserRouter>
        <div>
          <WineFilter setCurrentWineString={() => {}} />
          <ListView wines={redWines} />
        </div>
      </BrowserRouter>,
    );
    const redbutton = wrapper.getByRole("button", { name: /Red/i });
    expect(redbutton).toBeInTheDocument();
    fireEvent.click(redbutton);
    const wine1 = screen.getByText("Smalhans rødvin");
    const wine2 = screen.getByText("Grevinnen & Hovmesteren Rødvin");
    expect(wine1 && wine2).toBeInTheDocument();
  });

  it("test the filter for white wines", () => {
    wrapper = render(
      <BrowserRouter>
        <div>
          <WineFilter setCurrentWineString={() => {}} />
          <ListView wines={whiteWines} />
        </div>
      </BrowserRouter>,
    );
    const button = screen.getByRole("button", { name: /White/i });
    fireEvent.click(button);
    const wine = screen.getByRole("heading", { name: /Smalhans hvitvin/i });
    expect(wine).toBeInTheDocument();
  });

  it("dobble check the that the filter for all wines works", () => {
    wrapper = render(
      <BrowserRouter>
        <div>
          <WineFilter setCurrentWineString={() => {}} />
          <ListView wines={redWines} />
        </div>
      </BrowserRouter>,
    );
    const button = screen.getByRole("button", { name: /Red/i });
    fireEvent.click(button);
    const wine = screen.queryByText("Smalhans hvitvin");
    expect(wine).not.toBeInTheDocument();
  });
});

describe("renders slideshow component with filter", () => {
  it("test the filter for all wines", () => {
    render(
      <BrowserRouter>
        <div>
          <WineFilter setCurrentWineString={() => {}} />
          <Slideshow
            wines={allWines}
            currentIndex={0}
            activeButton={"All wines"}
            setCurrentIndex={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </BrowserRouter>,
    );
    const wine1 = screen.getByText("Tissot Vin Jaune La Vasée");
    expect(wine1).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /button-ClickRight/i });
    fireEvent.click(button);
    const wine2 = screen.getByText("Niepoort Bioma Vintage");
    expect(wine2).toBeInTheDocument();
  });

  it("test the filter for white wines", () => {
    render(
      <BrowserRouter>
        <div>
          <WineFilter setCurrentWineString={() => {}} />
          <Slideshow
            wines={whiteWines}
            currentIndex={0}
            activeButton={"All wines"}
            setCurrentIndex={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </BrowserRouter>,
    );

    const button = screen.getByRole("button", { name: /White/i });
    fireEvent.click(button);
    const wine = screen.getByText("Smalhans hvitvin");
    expect(wine).toBeInTheDocument();
  });

  it("test that you load 6 wines at the time", () => {
    const loadMoreWines = [
      {
        basic: {
          productId: "1",
          productShortName: "Vin1",
          favorite: false,
        },
        lastChanged: {
          date: "2021-04-16",
          time: "06:19:05",
        },
      },
      {
        basic: {
          productId: "2",
          productShortName: "Vin2",
          favorite: false,
        },
        lastChanged: {
          date: "2021-03-15",
          time: "22:57:42",
        },
      },
      {
        basic: {
          productId: "3",
          productShortName: "Vin3",
          favorite: false,
        },
        lastChanged: {
          date: "2021-04-16",
          time: "06:19:05",
        },
      },
      {
        basic: {
          productId: "4",
          productShortName: "Vin4",
          favorite: false,
        },
        lastChanged: {
          date: "2021-03-15",
          time: "22:57:42",
        },
      },
      {
        basic: {
          productId: "5",
          productShortName: "Vin5",
          favorite: false,
        },
        lastChanged: {
          date: "2021-04-16",
          time: "06:19:05",
        },
      },
      {
        basic: {
          productId: "6",
          productShortName: "Vin6",
          favorite: false,
        },
        lastChanged: {
          date: "2021-03-15",
          time: "22:57:42",
        },
      },
      {
        basic: {
          productId: "7",
          productShortName: "Vin7",
          favorite: false,
        },
        lastChanged: {
          date: "2021-04-16",
          time: "06:19:05",
        },
      },
      {
        basic: {
          productId: "8",
          productShortName: "Vin8",
          favorite: false,
        },
        lastChanged: {
          date: "2021-03-15",
          time: "22:57:42",
        },
      },
    ];

    render(
      <BrowserRouter>
        <div>
          <WineFilter setCurrentWineString={() => {}} />
          <ListView wines={loadMoreWines} />
        </div>
      </BrowserRouter>,
    );

    expect(screen.getByText("Vin1")).toBeInTheDocument();
    expect(screen.getByText("Vin2")).toBeInTheDocument();
    expect(screen.getByText("Vin3")).toBeInTheDocument();
    expect(screen.getByText("Vin4")).toBeInTheDocument();
    expect(screen.getByText("Vin5")).toBeInTheDocument();
    expect(screen.getByText("Vin6")).toBeInTheDocument();

    // test that the load more button loads more wines when you click the button
    const loadMoreWinesButton = screen.getByRole("button", {
      name: /Load more wines/i,
    });
    fireEvent.click(loadMoreWinesButton);

    expect(screen.getByText("Vin7")).toBeInTheDocument();
    expect(screen.getByText("Vin8")).toBeInTheDocument();
  });

  it("test that the favorite button changes text when you click it", () => {
    render(
      <BrowserRouter>
        <div>
          <WineFilter setCurrentWineString={() => {}} />
          <ListView wines={allWines} />
        </div>
      </BrowserRouter>,
    );
    const favoriteButtons = screen.getAllByText("Add to Favorites");
    fireEvent.click(favoriteButtons[0]);
    expect(favoriteButtons[0]).toHaveTextContent(/Remove from Favorites/i);
  });
});
