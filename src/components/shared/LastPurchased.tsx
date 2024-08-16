import { Link } from "react-router-dom";

import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { TProduct } from "@/types/product.interface";
import { Skeleton } from "../ui/skeleton";

const LastPurchased = () => {
  const { data, isLoading } = useGetAllProductsQuery({
    page: 1,
    limit: 10,
    sort: "-createdAt",
  });

  return (
    <div className="mt-5 border-2 border-purple-500 rounded-lg p-2 bg-purple-50">
      <h2 className="text-lg font-semibold text-center mb-3 text-purple-600">
        Last Purchased
      </h2>

      <div className="overflow-x-auto scrollbar-thin scrollbar-webkit">
        <div className="min-w-[580px]">
          <div className="text-sm p-2 font-semibold bg-purple-500 text-white rounded-md grid gap-3 grid-cols-5 mb-2">
            <span className="col-span-3">Name</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Cost</span>
          </div>
          {isLoading ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={`last-purchased-loading-${index}`}
                  className="w-full h-10 mb-2 bg-purple-300"
                />
              ))
          ) : data?.data?.products?.length > 0 ? (
            data?.data?.products?.map((product: TProduct) => (
              <div
                key={product._id.toString()}
                className="text-sm p-2 rounded-md bg-purple-100 mb-2 grid gap-3 grid-cols-5"
              >
                <Link
                  to={`/product/${product._id}`}
                  className="hover:underline col-span-3 max-md:underline"
                >
                  <span>{product.name}</span>
                </Link>
                <span className="text-center">{product.quantity}</span>
                <span className="text-right">{product.cost}</span>
              </div>
            ))
          ) : (
            <div className="text-center border-2 p-3 text-lg font-semibold text-purple-600 bg-purple-100 border-purple-500">
              No items
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LastPurchased;
