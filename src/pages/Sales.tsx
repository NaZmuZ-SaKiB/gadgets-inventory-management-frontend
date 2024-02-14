import { useState } from "react";

import { useGetAllSalesQuery } from "@/redux/features/sale/sale.api";
import { TSale } from "@/types/sale.interface";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TFilters = {
  page: number;
  limit: number;
  time?: "all" | "1" | "7" | "30" | "365";
  sort: string;
};

const SalesPage = () => {
  const [filters, setFilters] = useState<TFilters>({
    page: 1,
    limit: 10,
    sort: "-createdAt",
  });

  const handleFilterChange = (value: string | number, field: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  };

  const { data, isLoading } = useGetAllSalesQuery(filters);

  return (
    <div className="p-2 pt-16 max-sm:pt-14 relative max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Sales</h1>

      <div className="flex flex-wrap gap-2 items-center">
        <Select onValueChange={(v) => handleFilterChange(v, "time")}>
          <SelectTrigger className="w-auto h-7 border-black">
            <SelectValue placeholder="Time" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="1">Today</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="365">Last 365 days</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => handleFilterChange(v, "sort")}>
          <SelectTrigger className="w-auto h-7 border-black">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="-createdAt">Latest</SelectItem>
            <SelectItem value="createdAt">Oldest</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => handleFilterChange(v, "limit")}>
          <SelectTrigger className="w-auto h-7 border-black">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={"10"}>10</SelectItem>
            <SelectItem value={"20"}>20</SelectItem>
            <SelectItem value={"30"}>30</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3">
        <div className="text-sm p-2 font-semibold border rounded-md mb-1 bg-gray-50 border-gray-300 grid gap-3 grid-cols-6">
          <span className="col-span-2">Buyer Name</span>
          <span className="text-center">Items</span>
          <span className="text-center">Price</span>
          <span className="text-right col-span-2">Date</span>
        </div>
        {isLoading ? (
          <>
            <Skeleton className="w-full h-10 mb-2 " />
            <Skeleton className="w-full h-10 mb-2 " />
            <Skeleton className="w-full h-10 mb-2 " />
            <Skeleton className="w-full h-10 mb-2 " />
          </>
        ) : (
          data?.data?.sales?.map((sale: TSale) => (
            <div
              key={sale._id.toString()}
              className="text-sm p-2 border rounded-md mb-1 border-gray-300 grid gap-3 grid-cols-6"
            >
              <span className="col-span-2">{sale.buyerName}</span>

              <span className="text-center">{sale.products.length}</span>

              <span className="text-center">{sale.total}/-</span>
              <span className="text-right col-span-2">
                {new Date(sale.dateOfSale).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
      {!isLoading && data && (
        <div>
          <Pagination>
            <PaginationContent className="mt-10">
              <PaginationItem hidden={filters.page === 1}>
                <PaginationPrevious
                  onClick={() => handleFilterChange(filters.page - 1, "page")}
                />
              </PaginationItem>
              {Array(Math.ceil(data?.data?.total / filters.limit))
                .fill(0)
                .map((_, index) => (
                  <PaginationItem key={`paginatin-${index}`}>
                    <PaginationLink
                      isActive={filters.page === index + 1}
                      onClick={() => handleFilterChange(index + 1, "page")}
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              <PaginationItem
                hidden={
                  filters.page === Math.ceil(data?.data?.total / filters.limit)
                }
              >
                <PaginationNext
                  onClick={() => handleFilterChange(filters.page + 1, "page")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default SalesPage;
