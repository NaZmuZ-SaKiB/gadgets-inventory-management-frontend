import Spinner from "@/components/shared/Spinner";
import { useGetStockCountQuery } from "@/redux/features/product/product.api";

const ProductStockCountCard = ({
  quantity,
  title,
  className,
}: {
  quantity: "1" | "0";
  title: string;
  className: string;
}) => {
  const { data, isLoading } = useGetStockCountQuery(quantity);

  return (
    <div
      className={`rounded-lg text-white p-3 xs:p-5 text-center cursor-pointer ${className}`}
    >
      <h2 className="xs:text-xl xs:mb-3">{title}</h2>
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

export default ProductStockCountCard;
