import { render, fireEvent, RenderResult } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Slideshow from "../components/Slideshow";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/dom";

const firstwine = {
  basic: {
    productId: "133501",
    productShortName: "Tissot Vin Jaune La Vasée",
    favorite: false,
  },
  lastChanged: {
    date: "2021-04-16",
    time: "06:19:05",
  },
};

const secondwine = {
  basic: {
    productId: "162701",
    productShortName: "Niepoort Bioma Vintage",
    favorite: false,
  },
  lastChanged: {
    date: "2021-03-15",
    time: "22:57:42",
  },
};

const thirdWine = {
  basic: {
    productId: "620302",
    productShortName: "Gaia Vin Santo",
    favorite: false,
  },
  lastChanged: {
    date: "2021-03-15",
    time: "22:57:42",
  },
};

const testArray = [firstwine, secondwine, thirdWine];

describe("renders slideshow component", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(
      <BrowserRouter>
        <Slideshow
          wines={testArray}
          currentIndex={0}
          activeButton={"All wines"}
          setCurrentIndex={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </BrowserRouter>,
    );
  });

  it("test that firstwine is shown in slideshow", () => {
    const firstWine = wrapper.getByText("Tissot Vin Jaune La Vasée");
    expect(firstWine).toBeInTheDocument();
    expect(firstWine).toMatchSnapshot();
  });

  it("Should be able to click to next and prev element in the slideshow", () => {
    const firstWine = wrapper.getByText("Tissot Vin Jaune La Vasée");
    expect(firstWine).toBeInTheDocument();

    // click to the next wine in slideshow
    const changeSlide = wrapper.getByRole("button", {
      name: /button-ClickRight/i,
    });
    fireEvent.click(changeSlide);

    const secondWine = wrapper.getByText("Niepoort Bioma Vintage");
    expect(secondWine).toBeInTheDocument();

    const theRemovedWine = screen.queryByText("Tissot Vin Jaune La Vasée");
    expect(theRemovedWine).not.toBeInTheDocument();

    //clicks back to the first wine in the slideshow
    const changeSlideBack = wrapper.getByRole("button", {
      name: /button-clickLeft/i,
    });
    fireEvent.click(changeSlideBack);
    expect(firstWine).toBeInTheDocument();
  });

  it("should be able to like/unlike a wine", () => {
    const favButton = screen.getByText("Add to Favorites");
    fireEvent.click(favButton);
    expect(favButton.textContent).toBe("Remove from Favorites");
    expect(favButton.textContent).not.toBe("Add to Favorites");
    fireEvent.click(favButton);
    expect(favButton.textContent).toBe("Add to Favorites");
  });

  it("Should show an empty slideshow and the text 'Product Name Not Available'", () => {
    wrapper.rerender(
      <BrowserRouter>
        <Slideshow
          wines={[]}
          currentIndex={0}
          activeButton={""}
          setCurrentIndex={function (): void {
            throw new Error("Function not implemented.");
          }}
        ></Slideshow>
      </BrowserRouter>,
    );
    expect(
      wrapper.getByText(
        "No products in this category. Add your favorites in homepage",
      ),
    ).toBeInTheDocument();
  });

  it("Should show an empty slideshow and the text 'Product Name Not Available'", () => {
    wrapper.rerender(
      <BrowserRouter>
        <Slideshow
          wines={[]}
          currentIndex={0}
          activeButton={""}
          setCurrentIndex={function (): void {
            throw new Error("Function not implemented.");
          }}
        ></Slideshow>
      </BrowserRouter>,
    );
    expect(
      wrapper.getByText(
        "No products in this category. Add your favorites in homepage",
      ),
    ).toBeInTheDocument();
  });
});
