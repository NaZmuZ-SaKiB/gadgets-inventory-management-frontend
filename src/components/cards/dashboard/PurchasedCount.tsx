import Spinner from "@/components/shared/Spinner";
import { useGetPurchaseCountQuery } from "@/redux/features/product/product.api";

const PurchasedCount = () => {
  const { data, isLoading } = useGetPurchaseCountQuery(undefined);

  return (
    <div
      className={`rounded-lg text-white p-3 xs:p-5 text-center cursor-pointer bg-yellow-500 hover:bg-yellow-600`}
    >
      <h2 className="xs:text-xl xs:mb-3">Purchased This Month</h2>
      <span className="max-xs:text-2xl text-4xl">
        {isLoading ? (
          <div className="size-8 mx-auto">
            <Spinner className="border-y-white" />
          </div>
        ) : (
          data?.data?.count
        )}
      </span>
    </div>
  );
};

export default PurchasedCount;
