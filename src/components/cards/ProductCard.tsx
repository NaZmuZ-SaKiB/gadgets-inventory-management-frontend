/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { TProduct } from "@/types/product.interface";

import { useDeleteProductsMutation } from "@/redux/features/product/product.api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SaleModal from "../shared/SaleModal";

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

type TProps = {
  product: TProduct;
  handleSelect: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
};

const ProductCard = ({ product, handleSelect }: TProps) => {
  const [deleteProduct] = useDeleteProductsMutation();

  const handleDelete = async () => {
    const loadingToastId = toast.loading("Deleting Product");

    try {
      await deleteProduct([product._id.toString()]);

      toast.success("Product Deleted", { id: loadingToastId });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message ?? "Simething went wrong!", {
        id: loadingToastId,
      });
    }
  };

  return (
    <div className="border rounded-lg flex flex-col justify-between">
      <div>
        <div className="relative h-28">
          <img
            src={product?.imgUrl || "/assets/icons/photo.svg"}
            alt={product.name}
            className="size-full object-contain"
          />
          <Input
            onChange={(e) => handleSelect(e, product._id.toString())}
            type="checkbox"
            className="absolute left-2 top-2 size-4"
          />
        </div>
        <div className="p-2 text-sm">
          <Link to={`/product/${product._id}`}>
            <h2 className="font-semibold mb-2">{product.name}</h2>
          </Link>
          <p>Quantity: {product.quantity}</p>
          <p>Cost: {product.cost}</p>
          <p>Price: {product.price}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between p-2">
        <SaleModal
          productId={product._id.toString()}
          maxQnt={product.quantity}
        />
        <Link to={`/product/${product._id}`}>
          <Button size="icon" variant="outline">
            <img className="size-5" src="/assets/icons/edit.svg" alt="edit" />
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
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                product.
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
      </div>
    </div>
  );
};

export default ProductCard;
