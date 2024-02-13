import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { setFilter } from "@/redux/features/product/product.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type TProps = {
  total: number;
};

const StockPagination = ({ total }: TProps) => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.product.filter);

  const totalPages = Math.ceil(total / Number(filter.limit));

  return (
    <Pagination>
      <PaginationContent className="mt-10">
        <PaginationItem hidden={filter.page === 1}>
          <PaginationPrevious
            onClick={() =>
              dispatch(
                setFilter({ value: Number(filter.page) - 1, field: "page" })
              )
            }
          />
        </PaginationItem>
        {Array(totalPages)
          .fill(0)
          .map((_, index) => (
            <PaginationItem key={`paginatin-${index}`}>
              <PaginationLink
                isActive={filter.page === index + 1}
                onClick={() =>
                  dispatch(setFilter({ value: index + 1, field: "page" }))
                }
                className="cursor-pointer"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        <PaginationItem hidden={filter.page === totalPages}>
          <PaginationNext
            onClick={() =>
              dispatch(
                setFilter({ value: Number(filter.page) + 1, field: "page" })
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default StockPagination;
