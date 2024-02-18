import { Dispatch, SetStateAction, useState } from "react";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

type TFilters = {
  page: number;
  limit: number;
  time?: "all" | "1" | "7" | "30" | "365";
  sort: string;
};

const SalesPage = () => {
  const [selectedSale, setSelectedSale] = useState<TSale | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSelectSale = (sale: TSale) => {
    setSelectedSale(sale);
    setOpenModal(true);
  };

  const [filters, setFilters] = useState<TFilters>({
    page: 1,
    limit: 10,
    sort: "-createdAt",
  });

  const handleFilterChange = (value: string | number, field: string) => {
    const newFilters = { ...filters, [field]: value };
    if (field === "time") {
      newFilters.page = 1;
    }
    setFilters(newFilters);
  };

  const { currentData, isFetching } = useGetAllSalesQuery(filters);

  return (
    <>
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
            <span className="text-center">Amount</span>
            <span className="text-right col-span-2">Date</span>
          </div>
          {isFetching && !currentData ? (
            <>
              <Skeleton className="w-full h-10 mb-2 " />
              <Skeleton className="w-full h-10 mb-2 " />
              <Skeleton className="w-full h-10 mb-2 " />
              <Skeleton className="w-full h-10 mb-2 " />
            </>
          ) : currentData?.data?.sales?.length > 0 ? (
            currentData?.data?.sales?.map((sale: TSale) => (
              <div
                key={sale._id.toString()}
                className="text-sm p-2 border rounded-md mb-1 border-gray-300 grid gap-3 grid-cols-6 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSelectSale(sale)}
              >
                <span className="col-span-2">{sale.buyerName}</span>

                <span className="text-center">{sale.products.length}</span>

                <span className="text-center">{sale.total}/-</span>
                <span className="text-right col-span-2">
                  {new Date(sale.dateOfSale).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <div className="mt-5 text-center border-2 p-3 text-lg font-semibold">
              No sales yet
            </div>
          )}
        </div>
        {!isFetching && currentData?.data?.sales?.length > 0 && (
          <div>
            <Pagination>
              <PaginationContent className="mt-10">
                <PaginationItem hidden={filters.page === 1}>
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={() => handleFilterChange(filters.page - 1, "page")}
                  />
                </PaginationItem>
                {Array(Math.ceil(currentData?.data?.total / filters.limit))
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
                    filters.page ===
                    Math.ceil(currentData?.data?.total / filters.limit)
                  }
                >
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() => handleFilterChange(filters.page + 1, "page")}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      {selectedSale && (
        <SaleModal
          sale={selectedSale}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </>
  );
};

type TModalProps = {
  sale: TSale | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SaleModal = ({ sale, open, setOpen }: TModalProps) => {
  if (!sale) {
    setOpen(false);
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Sale</DialogTitle>
        </DialogHeader>
        <div className="ps-2">
          <p>Buyer: {sale.buyerName}</p>
          <p>Contact no: {sale.contactNo}</p>
          <p>Date: {new Date(sale.dateOfSale).toLocaleDateString()}</p>
          <hr className="mt-2 bg-black" />
          <DialogHeader className="my-4 -ms-2">
            <DialogTitle>Products</DialogTitle>
          </DialogHeader>
          {sale.products.map((item) => (
            <div key={item.product._id.toString()} className="mt-3">
              <Link to={`/products/${item.product._id}`}>
                <h2 className="font-medium text-blue-500">
                  {item.product.name}
                </h2>
              </Link>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price}/-</p>
            </div>
          ))}
          <hr className="my-3 bg-black" />
          <p className="-ms-2">
            <strong>Total Amount:</strong> {sale.total}/-
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalesPage;
