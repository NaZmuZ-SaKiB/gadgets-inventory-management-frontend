import Spinner from "@/components/shared/Spinner";
import { useGetAllSalesQuery } from "@/redux/features/sale/sale.api";

const SalesCard = ({
  time,
  title,
  className,
}: {
  time: "1" | "7" | "30";
  title: string;
  className: string;
}) => {
  const { data, isLoading } = useGetAllSalesQuery(
    { time },
    { pollingInterval: 10000 }
  );

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
          data?.data?.sales?.length
        )}
      </span>
    </div>
  );
};

export default SalesCard;
