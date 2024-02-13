import { TProduct } from "./product.interface";

export type TSale = {
  _id: string;
  buyerName: string;
  quantity: number;
  dateOfSale: Date;
  product: TProduct;
};
