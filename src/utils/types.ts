export interface Wine {
  basic: {
    productId: string;
    productShortName: string;
    favorite: boolean;
  };
  lastChanged: {
    date: string;
    time: string;
  };
}
