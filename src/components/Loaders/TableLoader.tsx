import { Skeleton } from "../ui/skeleton";

const TableLoader = ({ tdNumber }: { tdNumber: number }) => {
  return (
    <>
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <tr key={`product-table-loading-${index}`}>
            {Array(tdNumber)
              .fill(0)
              .map((_, i) => (
                <td
                  className="!p-0"
                  key={`product-table-td-loading-${index}-${i}`}
                >
                  <Skeleton className="h-12 rounded-md" />
                </td>
              ))}
          </tr>
        ))}
    </>
  );
};

export default TableLoader;
