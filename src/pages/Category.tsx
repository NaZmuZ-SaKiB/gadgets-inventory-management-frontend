import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { TCategory } from "@/types/category.interface";
import AddCategory from "@/components/forms/AddCategory";
import Spinner from "@/components/shared/Spinner";

const CategoryPage = () => {
  const { data, isLoading } = useGetAllCategoriesQuery(undefined, {
    pollingInterval: 10000,
  });
  return (
    <div className="grid place-items-center h-full pt-16 flex-1 p-2">
      <div className="max-w-sm w-full">
        <div className="border rounded-lg p-4">
          <AddCategory />
        </div>

        <div className="border rounded-lg p-4 mt-3">
          <h2 className="text-xl font-medium mb-5">Current Categories</h2>
          <div className="flex flex-wrap gap-2">
            {isLoading ? (
              <div className="flex justify-center items-center w-full">
                <div className="size-10">
                  <Spinner className="border-y-black" />
                </div>
              </div>
            ) : (
              data.data.map((category: TCategory) => (
                <span
                  key={category._id.toString()}
                  className="border border-gray-500 text-sm px-2 py-0.5 rounded-3xl capitalize"
                >
                  {category.name.toLowerCase()}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
