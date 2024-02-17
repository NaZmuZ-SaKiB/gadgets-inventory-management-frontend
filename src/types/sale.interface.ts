import { TProduct } from "./product.interface";

export type TSale = {
  _id: string;
  buyerName: string;
  contactNo: string;
  soldBy: string;
  dateOfSale: Date;
  products: {
    product: TProduct;
    quantity: number;
    price: number;
  }[];
  total: number;
};
