import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { TCategory } from "@/types/category.interface";
import TableLoader from "../Loaders/TableLoader";
import "@/styles/table.css";
import UpdateCategoryModal from "../modals/UpdateCategoryModal";

const CategoryTable = () => {
  const { data, isLoading } = useGetAllCategoriesQuery(undefined, {
    pollingInterval: 60000,
  });

  return (
    <div className="w-full">
      <div className="overflow-x-auto scrollbar-thin scrollbar-webkit bg-white p-2 rounded-lg">
        <div className="min-w-[400px]">
          <table className="table-auto admin-table">
            <thead className="text-left">
              <tr>
                <th>Name</th>
                <th>Products</th>
                <th className="!text-center">Actions</th>
              </tr>
            </thead>

            {isLoading && !data ? (
              <TableLoader tdNumber={3} />
            ) : data?.data?.length > 0 ? (
              <tbody>
                {data?.data?.map((category: TCategory) => {
                  return (
                    <tr key={category._id.toString()}>
                      <td>{category?.name}</td>

                      <td className="text-center">{category?.productCount}</td>

                      <td className="text-center">
                        <UpdateCategoryModal
                          id={category?._id?.toString()}
                          name={category.name}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <div className="mt-10 text-center border-2 p-3 text-lg font-semibold border-black">
                Category is empty
              </div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
