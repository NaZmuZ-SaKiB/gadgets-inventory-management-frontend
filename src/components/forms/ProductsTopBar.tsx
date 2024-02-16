/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDeleteProductsMutation } from "@/redux/features/product/product.api";

import { Button } from "../ui/button";
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
import PaginationFilter from "../cards/PaginationFilter";
import { clearSelectedProducts } from "@/redux/features/product/product.slice";

type TProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const ProductsTopBar = ({ setShow }: TProps) => {
  const selectedProducts = useAppSelector((state) => state.product.selected);

  const dispatch = useAppDispatch();

  const [deleteProduct] = useDeleteProductsMutation();

  const handleDelete = async () => {
    const loadingToastId = toast.loading("Deleting Products");

    try {
      await deleteProduct(selectedProducts);

      dispatch(clearSelectedProducts());
      toast.success("Products Deleted", { id: loadingToastId });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message ?? "Simething went wrong!", {
        id: loadingToastId,
      });
    }
  };

  return (
    <div className="mt-3 flex gap-3 justify-center items-center flex-wrap">
      <p className="px-3 py-1 rounded-3xl border text-sm">
        {selectedProducts.length} Selected
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={selectedProducts.length === 0}
            variant="outline"
            size="sm"
            className="text-sm px-3 py-1 rounded-3xl border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Delete Selected
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              products.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PaginationFilter />

      <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setShow(true)}
      >
        Filters
      </Button>
    </div>
  );
};

export default ProductsTopBar;
