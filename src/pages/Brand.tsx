import AddBrand from "@/components/forms/AddBrand";
import BrandTable from "@/components/tables/BrandTable";

const BrandPage = () => {
  return (
    <div className="pt-16 flex-1 p-2 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-3">Brand</h1>

      <div className="border rounded-lg p-4">
        <AddBrand />
      </div>

      <div className="border rounded-lg p-2 mt-3">
        <div>
          <BrandTable />
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
