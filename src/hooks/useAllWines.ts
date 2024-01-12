import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Wine } from "../utils/types";

/**
 * This component is used to fetch all wines from the API
 */
export const useAllWines = () => {
  const { data, isLoading, isError } = useQuery<Wine[]>({
    queryKey: ["AllWines"],
    queryFn: () =>
      axios
        .get(
          "https://apis.vinmonopolet.no/products/v0/details-normal?productShortNameContains=vin&maxResults=1000&start=200",
          {
            headers: {
              "Ocp-Apim-Subscription-Key": "669f8b7f269549f88b132cf0bc17f25a",
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => response.data),
  });

  return { data, isError, isLoading };
};
