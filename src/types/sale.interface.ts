export type TSale = {
  _id: string;
  buyerName: string;
  contactNo: string;
  soldBy: string;
  dateOfSale: Date;
  products: {
    product: string;
    quantity: number;
    price: number;
  }[];
  total: number;
};
