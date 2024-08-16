import { useGetAllBrandsQuery } from "@/redux/features/brand/brand.api";
import TableLoader from "../Loaders/TableLoader";
import { TBrand } from "@/types/brand.interface";
import "@/styles/table.css";
import UpdateBrandModel from "../modals/UpdateBrandModel";

const BrandTable = () => {
  const { data, isLoading } = useGetAllBrandsQuery(undefined, {
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
                {data?.data?.map((brand: TBrand) => {
                  return (
                    <tr key={brand._id.toString()}>
                      <td>{brand?.name}</td>

                      <td className="text-center">{brand?.productCount}</td>

                      <td className="text-center">
                        <UpdateBrandModel
                          id={brand?._id?.toString()}
                          name={brand.name}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <div className="mt-10 text-center border-2 p-3 text-lg font-semibold border-black">
                Brand is empty
              </div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrandTable;
