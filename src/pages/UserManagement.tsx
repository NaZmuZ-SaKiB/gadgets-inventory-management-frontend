/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { USER_ROLE } from "@/constants/user.constant";
import {
  useAssignManagerMutation,
  useGetAllUsersQuery,
} from "@/redux/features/auth/auth.api";
import { TUser } from "@/types/user.interface";
import { useState } from "react";
import { toast } from "sonner";

const UserManagementPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: "role",
    search: "",
  });

  const { currentData, isFetching } = useGetAllUsersQuery(filters, {
    pollingInterval: 10000,
  });

  const handleSerach = (value: string) => {
    setTimeout(() => {
      setFilters({ ...filters, search: value });
    }, 300);
  };

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
    <div className="pt-16 p-2">
      <h1 className="text-2xl font-semibold mb-2">Users</h1>
      <Input
        type="text"
        placeholder="Search (name, email)"
        className="mb-3 w-72 max-w-[100%]"
        onChange={(e) => handleSerach(e.target.value)}
      />
      <div className="grid grid-cols-4 sm:grid-cols-6 text-sm rounded-md border bg-gray-50 px-3 py-2 font-semibold">
        <div className="col-span-2 hidden sm:block">Name</div>
        <div className="col-span-2 text-center">Email</div>
        <div className="col-span-1 text-center">Role</div>
        <div className="col-span-1 text-right">Action</div>
      </div>
      {isFetching && !currentData ? (
        <>
          <Skeleton className="w-full h-10 mb-2 " />
          <Skeleton className="w-full h-10 mb-2 " />
          <Skeleton className="w-full h-10 mb-2 " />
          <Skeleton className="w-full h-10 mb-2 " />
        </>
      ) : currentData?.data?.users?.length === 0 ? (
        <div className="text-center text-xl font-semibold p-5 border  mt-4 rounded-md">
          No Users
        </div>
      ) : (
        currentData?.data?.users?.map((user: TUser) => (
          <div
            key={user._id.toString()}
            className="grid grid-cols-4 sm:grid-cols-6 rounded-md border items-center px-3 py-2 mt-2 text-xs sm:text-sm"
          >
            <div className="col-span-2 hidden sm:block">{user.name}</div>
            <div className="col-span-2 text-center">{user.email}</div>
            <div className="col-span-1 text-center">{user.role}</div>
            <div className="col-span-1 text-right">
              <button
                onClick={() => handleAssignManager(user._id.toString())}
                disabled={isAssignManagerLoading}
                className={`px-2 py-1 rounded text-white disabled:bg-gray-300 ${
                  user.role === USER_ROLE.USER ? "bg-black" : "bg-red-500"
                }`}
              >
                {user.role === USER_ROLE.USER ? "Promote" : "Demote"}
              </button>
            </div>
          </div>
        ))
      )}

      {!isFetching && currentData?.data?.users?.length > 0 && (
        <div>
          <Pagination>
            <PaginationContent className="mt-10">
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

export default UserManagementPage;
