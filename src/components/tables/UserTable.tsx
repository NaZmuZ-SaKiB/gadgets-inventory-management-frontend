/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useAssignManagerMutation,
  useGetAllUsersQuery,
} from "@/redux/features/auth/auth.api";
import TableLoader from "../Loaders/TableLoader";
import { TUser } from "@/types/user.interface";
import { toast } from "sonner";
import { USER_ROLE } from "@/constants/user.constant";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import "@/styles/table.css";

type TProps = {
  filters: {
    page: number;
    limit: number;
    sort: string;
    search: string;
  };
  setFilters: (filters: any) => void;
};

const UserTable = ({ filters, setFilters }: TProps) => {
  const { currentData, isFetching } = useGetAllUsersQuery(filters, {
    pollingInterval: 60000,
  });

  const [assignManager, { isLoading: isAssignManagerLoading }] =
    useAssignManagerMutation();

  const handleAssignManager = async (id: string) => {
    const loadingToastId = toast.loading("Updating user role");

    try {
      await assignManager(id).unwrap();

      toast.success("User role updated", { id: loadingToastId });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message ?? "Simething went wrong!", {
        id: loadingToastId,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto scrollbar-thin scrollbar-webkit bg-white p-2 rounded-lg">
        <div className="min-w-[700px]">
          <table className="table-auto admin-table">
            <thead className="text-left">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            {isFetching && !currentData ? (
              <TableLoader tdNumber={4} />
            ) : currentData?.data?.users?.length > 0 ? (
              <tbody>
                {currentData?.data?.users?.map((user: TUser) => {
                  return (
                    <tr key={user._id.toString()}>
                      <td>{user?.name}</td>

                      <td>{user?.email}</td>
                      <td>{user?.role}</td>
                      <td className="text-right">
                        <button
                          onClick={() =>
                            handleAssignManager(user._id.toString())
                          }
                          disabled={isAssignManagerLoading}
                          className={`px-2 py-1 rounded text-white disabled:bg-gray-300 ${
                            user.role === USER_ROLE.USER
                              ? "bg-black"
                              : "bg-red-500"
                          }`}
                        >
                          {user.role === USER_ROLE.USER ? "Promote" : "Demote"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <div className="mt-10 text-center border-2 p-3 text-lg font-semibold border-black">
                No Users
              </div>
            )}
          </table>
        </div>
      </div>
      {!isFetching && currentData?.data?.users?.length > 0 && (
        <div>
          <Pagination>
            <PaginationContent className="mt-10 overflow-x-scroll pb-10">
              <PaginationItem hidden={filters.page === 1}>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page - 1 })
                  }
                />
              </PaginationItem>
              {Array(Math.ceil(currentData?.data?.total / filters.limit))
                .fill(0)
                .map((_, index) => (
                  <PaginationItem key={`paginatin-${index}`}>
                    <PaginationLink
                      isActive={filters.page === index + 1}
                      onClick={() =>
                        setFilters({ ...filters, page: index + 1 })
                      }
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              <PaginationItem
                hidden={
                  filters.page ===
                  Math.ceil(currentData?.data?.total / filters.limit)
                }
              >
                <PaginationNext
                  className="cursor-pointer"
                  onClick={() =>
                    setFilters({ ...filters, page: filters.page + 1 })
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default UserTable;
