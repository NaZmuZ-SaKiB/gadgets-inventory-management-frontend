import { Link } from "react-router-dom";

import { useGetAllSalesQuery } from "@/redux/features/sale/sale.api";
import { TSale } from "@/types/sale.interface";
import { Skeleton } from "../ui/skeleton";

const LastSales = () => {
  const { data, isLoading } = useGetAllSalesQuery({
    page: 1,
    limit: 10,
    sort: "-createdAt",
  });

  return (
    <div className="mt-5 border-2 border-blue-500 rounded-lg p-2 bg-blue-50">
      <h2 className="text-lg font-semibold text-center mb-3 text-blue-600">
        Last Sold
      </h2>
      <div className="text-sm p-2 font-semibold bg-blue-500 text-white rounded-md grid gap-3 grid-cols-7 mb-2">
        <span>Buyer</span>
        <span className="col-span-3">Product</span>
        <span className="text-center">Quantity</span>
        <span className="text-right col-span-2">Date</span>
      </div>
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={`last-sales-loader-${index}`}
                className="w-full h-10 mb-2 bg-blue-300"
              />
            ))
        : data?.data?.sales?.map((sale: TSale) => (
            <div
              key={sale._id.toString()}
              className="text-sm p-2 rounded-md bg-blue-100 mb-2 grid gap-3 grid-cols-7"
            >
              <span>{sale.buyerName}</span>
              <Link
                to={`/product/${sale.product._id}`}
                className="hover:underline col-span-3 max-md:underline"
              >
                <span>{sale.product.name}</span>
              </Link>
              <span className="text-center">{sale.quantity}</span>
              <span className="text-right col-span-2">
                {new Date(sale.dateOfSale).toDateString()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default LastSales;
