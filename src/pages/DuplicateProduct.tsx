import { useNavigate, useParams } from "react-router-dom";

import { useGetProductByIdQuery } from "@/redux/features/product/product.api";
import ProductForm from "@/components/forms/ProductForm";
import Spinner from "@/components/shared/Spinner";

const DuplicateProduct = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  if (!productId) navigate("/");

  const { data, isLoading } = useGetProductByIdQuery(productId as string);

  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-[100svh]">
        <div className="size-16">
          <Spinner className="border-y-black" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center h-full pt-16 flex-1 p-2">
      <div className="max-w-4xl w-full border rounded-lg p-4">
        <h1 className="text-2xl font-medium text-center mb-10">
          Duplicate Product
        </h1>
        <ProductForm
          type="duplicate"
          product={{ ...data?.data, name: data?.data?.name + " ( Duplicate )" }}
        />
      </div>
    </div>
  );
};

export default DuplicateProduct;
