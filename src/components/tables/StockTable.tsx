/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteProductsMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/product.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/product.interface";
import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { addToCart } from "@/redux/features/cart/cart.slice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import StockPagination from "../forms/StockPagination";
import TableLoader from "../Loaders/TableLoader";
import "@/styles/table.css";

type TProps = {
  handleSelect: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
};

const StockTable = ({ handleSelect }: TProps) => {
  const filter = useAppSelector((state) => state.product.filter);

  const cart = useAppSelector((state) => state.cart.cart);

  const dispatch = useAppDispatch();

  const isAddedToCart = (id: string) =>
    !!cart.find((item) => item.product._id === id);

  const [deleteProduct] = useDeleteProductsMutation();

  const handleDelete = async (id: string) => {
    const loadingToastId = toast.loading("Deleting Product");

    try {
      await deleteProduct([id]);

      toast.success("Product Deleted", { id: loadingToastId });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message ?? "Simething went wrong!", {
        id: loadingToastId,
      });
    }
  };

  const { currentData, isFetching } = useGetAllProductsQuery(filter, {
    pollingInterval: 60000,
  });

  return (
    <div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-webkit bg-white p-2 rounded-lg">
        <div className="min-w-[800px]">
          <table className="table-auto admin-table">
            <thead className="text-left">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Costing</th>
                <th>MRP</th>
                <th className="!text-center">Actions</th>
              </tr>
            </thead>

            {isFetching && !currentData ? (
              <TableLoader tdNumber={6} />
            ) : currentData?.data?.products?.length > 0 ? (
              <tbody>
                {currentData?.data?.products?.map((product: TProduct) => {
                  const addedToCart = isAddedToCart(product._id.toString());

                  return (
                    <tr key={product._id.toString()}>
                      <td>
                        <Input
                          onChange={(e) => handleSelect(e, product._id)}
                          type="checkbox"
                          className="size-4"
                        />
                      </td>
                      <td className="text-sky-600 hover:underline">
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
                      </td>

                      <td>{product.quantity}</td>

                      <td>{product.cost}/-</td>
                      <td>{product.price}/-</td>
                      <td>
                        <div className="flex justify-end gap-3">
                          <Link to={`/product/${product._id}`}>
                            <Button size="icon" variant="outline">
                              <img
                                className="size-5"
                                src="/assets/icons/edit.svg"
                                alt="edit"
                              />
                            </Button>
                          </Link>

                          <Link to={`/duplicate-product/${product._id}`}>
                            <Button size="icon" variant="outline">
                              <img
                                className="size-5"
                                src="/assets/icons/duplicate.svg"
                                alt="duplicate"
                              />
                            </Button>
                          </Link>

                          <Button
                            disabled={addedToCart ? true : false}
                            size="sm"
                            className="bg-sky-600 hover:bg-sky-700"
                            onClick={() =>
                              dispatch(
                                addToCart({
                                  price: product.price,
                                  quantity: 1,
                                  product,
                                })
                              )
                            }
                          >
                            <div className="flex items-center gap-1">
                              <img
                                className="size-5"
                                src="/assets/icons/cart.svg"
                                alt="add to cart"
                              />
                              {addedToCart ? (
                                <span className="text-white text-lg">
                                  &#x2713;
                                </span>
                              ) : (
                                <span className="text-white text-lg">+</span>
                              )}
                            </div>
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="icon" variant="destructive">
                                <img
                                  className="size-5 stroke-white"
                                  src="/assets/icons/delete.svg"
                                  alt="delete"
                                />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete the product.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() =>
                                    handleDelete(product._id.toString())
                                  }
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <div className="mt-10 text-center border-2 p-3 text-lg font-semibold border-black">
                Stock is empty
              </div>
            )}
          </table>
        </div>
      </div>
      {!isFetching && currentData?.data?.products?.length > 0 && (
        <StockPagination total={currentData?.data?.total} />
      )}
    </div>
  );
};

export default StockTable;
