import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/redux/features/product/product.api";
import ProductForm from "@/components/forms/ProductForm";
import Spinner from "@/components/shared/Spinner";

const UpdateProductPage = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  if (!productId) navigate("/");

  const { data, isLoading } = useGetProductByIdQuery(productId as string);
  const product = data?.data;

  if (isLoading)
    return (
      <div className=" flex justify-center items-center h-[100svh]">
        <div className="size-16">
          <Spinner className="border-y-black" />
        </div>
      </div>
    );

  return (
    <div className="grid place-items-center h-full pt-16 flex-1 p-2">
      <div className="max-w-4xl w-full border rounded-lg p-4">
        <h1 className="text-2xl font-medium text-center mb-10">Product</h1>
        <ProductForm
          type="update"
          product={data?.data}
          defaultValues={{
            name: product?.name || "",
            model: product?.model || "",
            quantity: product?.quantity || 0,
            cost: product?.cost || 0,
            price: product?.price || 0,
            imgUrl: product?.imgUrl || "",
            description: product?.description || "",
            releaseDate: product?.releaseDate
              ? new Date(product.releaseDate)
              : undefined,
            camera: product?.camera || undefined,
            weight: product?.weight || undefined,
            displaySize: product?.displaySize || undefined,
            operatingSystem: product?.operatingSystem || undefined,
            powerSource: product?.powerSource || undefined,
            category: product?.category || undefined,
            brand: product?.brand || undefined,
          }}
        />
      </div>
    </div>
  );
};

export default UpdateProductPage;
