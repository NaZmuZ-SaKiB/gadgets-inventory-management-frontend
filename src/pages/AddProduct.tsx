import ProductForm from "@/components/forms/ProductForm";

const AddProductPage = () => {
  return (
    <div className="grid place-items-center h-full pt-16 flex-1 p-2">
      <div className="max-w-4xl w-full border rounded-lg p-4">
        <h1 className="text-2xl font-medium text-center mb-10">Add Product</h1>
        <ProductForm type="add" />
      </div>
    </div>
  );
};

export default AddProductPage;
