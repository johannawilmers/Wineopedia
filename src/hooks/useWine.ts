import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Wine } from "../utils/types";

/**
 * This component is used to fetch a wine by id from the API
 */
const getWineById = async (id: string) => {
  const { data } = await axios.get(
    `https://apis.vinmonopolet.no/products/v0/details-normal?productId=${id}`,
    {
      headers: {
        "Ocp-Apim-Subscription-Key": "669f8b7f269549f88b132cf0bc17f25a",
        "Content-Type": "application/json",
      },
    },
  );
  return data;
};

export default function useWine(id: string) {
  return useQuery<Wine[]>(["post", id], () => getWineById(id));
}
