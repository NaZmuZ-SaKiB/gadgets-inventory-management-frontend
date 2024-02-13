import { useGetAllBrandsQuery } from "@/redux/features/brand/brand.api";
import { TBrand } from "@/types/brand.interface";
import AddBrand from "@/components/forms/AddBrand";

const BrandPage = () => {
  const { data, isError, isLoading } = useGetAllBrandsQuery(undefined, {
    pollingInterval: 10000,
  });
  return (
    <div className="grid place-items-center h-full pt-16 flex-1 p-2">
      <div className="max-w-sm w-full">
        <div className="border rounded-lg p-4">
          <AddBrand />
        </div>

        <div className="border rounded-lg p-4 mt-3">
          <h2 className="text-xl font-medium mb-5">Current Brands</h2>
          <div className="flex flex-wrap gap-2">
            {!isLoading &&
              !isError &&
              data.data.map((brand: TBrand) => (
                <span
                  key={brand._id.toString()}
                  className="border border-gray-500 text-sm px-2 py-0.5 rounded-3xl capitalize"
                >
                  {brand.name.toLowerCase()}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
