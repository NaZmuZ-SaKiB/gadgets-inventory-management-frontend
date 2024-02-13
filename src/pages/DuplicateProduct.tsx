import { useNavigate, useParams } from "react-router-dom";

import { useGetProductByIdQuery } from "@/redux/features/product/product.api";
import ProductForm from "@/components/forms/ProductForm";

const DuplicateProduct = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  if (!productId) navigate("/");

  const { data, isLoading } = useGetProductByIdQuery(productId as string);

  if (isLoading) return null;

  return (
    <div className="grid place-items-center h-full pt-16 flex-1 p-2">
      <div className="max-w-4xl w-full border rounded-lg p-4">
        <h1 className="text-2xl font-medium text-center mb-10">
          Duplicate Product
        </h1>
        <ProductForm type="duplicate" product={data?.data} />
      </div>
    </div>
  );
};

export default DuplicateProduct;
