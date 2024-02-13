import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/redux/features/product/product.api";
import ProductForm from "@/components/forms/ProductForm";

const UpdateProductPage = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  if (!productId) navigate("/");

  const { data, isLoading } = useGetProductByIdQuery(productId as string);

  if (isLoading)
    return (
      <div className=" pt-16">
        <h1 className="text-2xl font-medium text-center mb-10">Loading...</h1>
      </div>
    );

  return (
    <div className="grid place-items-center h-full pt-16 flex-1 p-2">
      <div className="max-w-4xl w-full border rounded-lg p-4">
        <h1 className="text-2xl font-medium text-center mb-10">Product</h1>
        <ProductForm type="update" product={data?.data} />
      </div>
    </div>
  );
};

export default UpdateProductPage;
