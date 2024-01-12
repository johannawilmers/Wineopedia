import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ListView from "../components/ListView";
import "@testing-library/jest-dom/extend-expect";

const wineArray = [
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

const wineArrayAfterLoad = [
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
  {
    basic: {
      productId: "162000",
      productShortName: "Some new whitewine",
      favorite: false,
    },
    lastChanged: {
      date: "2021-03-15",
      time: "22:57:42",
    },
  },
];

describe("renders ListView component", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        <ListView wines={wineArray} />
      </BrowserRouter>,
    );
  });

  it("create snapshot of listview", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("test that the first wine is visible on site", () => {
    const heading = wrapper.getByRole("heading", {
      name: /Tissot Vin Jaune La Vasée/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("test that the second wine is visible on site", () => {
    const heading = wrapper.getByRole("heading", {
      name: /Niepoort Bioma Vintage/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("test that a wine is NOT visible on the site", () => {
    const wineNotInDocument = screen.queryByText("thiswineisnotindocument");
    expect(wineNotInDocument).not.toBeInTheDocument();
  });

  it("should test the number of wines on site", () => {
    expect(wrapper).length == 2;
  });

  it("should load more wines", () => {
    const loadMoreButton = wrapper.getByTestId("favoriteButton");
    fireEvent.click(loadMoreButton);

    wrapper.rerender(
      <BrowserRouter>
        <ListView wines={wineArrayAfterLoad} />
      </BrowserRouter>,
    );

    expect(wrapper.getByText("Some new whitewine")).toBeInTheDocument();
  });

  it("get loadMore button", () => {
    const loadMoreButton = wrapper.getByTestId("favoriteButton");
    expect(loadMoreButton).toBeInTheDocument();
  });
});

describe("Renders emtpy listview", () => {
  it("test if the list is empty", () => {
    render(
      <BrowserRouter>
        <ListView wines={[]} />
      </BrowserRouter>,
    );
    expect(screen.queryByText("Load more wines")).toBeNull();
  });
});
