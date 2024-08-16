/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllSalesQuery } from "@/redux/features/sale/sale.api";
import { TSale } from "@/types/sale.interface";
import { Dispatch, SetStateAction, useState } from "react";
import TableLoader from "../Loaders/TableLoader";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import "@/styles/table.css";
import { formatCurrency } from "@/utils/currencyFormat";

type TFilters = {
  page: number;
  limit: number;
  time?: "all" | "1" | "7" | "30" | "365";
  sort: string;
};

type TProps = { filters: TFilters; handleFilterChange: any };

const SalesTable = ({ filters, handleFilterChange }: TProps) => {
  const [selectedSale, setSelectedSale] = useState<TSale | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSelectSale = (sale: TSale) => {
    setSelectedSale(sale);
    setOpenModal(true);
  };

  const { currentData, isFetching } = useGetAllSalesQuery(filters);

  console.log(currentData?.data?.total, filters.limit);

  return (
    <div className="w-full">
      <div className="overflow-x-auto scrollbar-thin scrollbar-webkit bg-white p-2 rounded-lg">
        <div className="min-w-[800px]">
          <table className="table-auto admin-table">
            <thead className="text-left">
              <tr>
                <th>Buyer Name</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            {isFetching && !currentData ? (
              <TableLoader tdNumber={5} />
            ) : currentData?.data?.sales?.length > 0 ? (
              <tbody>
                {currentData?.data?.sales?.map((sale: TSale) => {
                  return (
                    <tr key={sale._id.toString()}>
                      <td>{sale?.buyerName}</td>

                      <td>{sale?.products?.length}</td>

                      <td>{formatCurrency(sale?.total)}</td>
                      <td>
                        {" "}
                        {new Date(sale?.dateOfSale).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="flex justify-end gap-3">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleSelectSale(sale)}
                          >
                            <Eye className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <div className="mt-10 text-center border-2 p-3 text-lg font-semibold border-black">
                Sales is empty
              </div>
            )}
          </table>
        </div>
      </div>
      {!isFetching && currentData?.data?.sales?.length > 0 && (
        <Pagination>
          <PaginationContent className="mt-5 overflow-x-auto pb-5">
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
      )}

      {selectedSale && (
        <SaleModal
          sale={selectedSale}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </div>
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
      <DialogContent className="sm:max-w-[500px] max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sale</DialogTitle>
        </DialogHeader>
        <div className="pl-2">
          <div className="space-y-1">
            <p>
              <span className="font-semibold">Buyer:</span> {sale.buyerName}
            </p>
            <p>
              <span className="font-semibold">Contact no:</span>{" "}
              {sale.contactNo}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(sale.dateOfSale).toLocaleDateString()}
            </p>
          </div>
          <hr className="mt-2 bg-black" />
          <DialogHeader className="my-4 -ms-2">
            <DialogTitle>Products</DialogTitle>
          </DialogHeader>
          {sale.products.map((item) => (
            <div
              key={item.product._id.toString()}
              className="mt-3 text-sm bg-slate-50 rounded-md p-2"
            >
              <Link to={`/products/${item.product._id}`}>
                <h2 className="font-medium text-blue-500">
                  {item.product.name}
                </h2>
              </Link>
              <p>
                <span className="font-semibold">Quantity:</span> {item.quantity}
              </p>
              <p>
                <span className="font-semibold">Price:</span>{" "}
                {formatCurrency(item.price)}
              </p>
            </div>
          ))}
          <hr className="my-3 bg-black" />
          <p className="-ms-2">
            <strong>Total Amount:</strong> {formatCurrency(sale.total)}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalesTable;
