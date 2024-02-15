/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
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
    limit: 1,
    search: "",
  });

  const { currentData, isFetching } = useGetAllUsersQuery(filters, {
    pollingInterval: 10000,
  });

  console.log(currentData);

  const [assignManager, { isLoading: isAssignManagerLoading }] =
    useAssignManagerMutation();

  const handleAssignManager = async (id: string) => {
    const loadingToastId = toast.loading("Updating user role");

    try {
      await assignManager(id).unwrap();

      toast.success("Manager Assigned", { id: loadingToastId });

      if (currentData?.data?.users.length === 1 && filters.page > 1) {
        setFilters({ ...filters, page: filters.page - 1 });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message ?? "Simething went wrong!", {
        id: loadingToastId,
      });
    }
  };

  return (
    <div className="pt-16 p-2">
      <h1 className="text-2xl font-semibold mb-2">Asign Manager</h1>
      <div className="grid grid-cols-6 text-sm rounded-md border bg-gray-50 px-3 py-2 font-semibold">
        <div className="col-span-2">Name</div>
        <div className="col-span-2 text-center">email</div>
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
            className="grid grid-cols-6 rounded-md border items-center px-3 py-2 mt-2"
          >
            <div className="col-span-2">{user.name}</div>
            <div className="col-span-2 text-center">{user.email}</div>
            <div className="col-span-1 text-center">{user.role}</div>
            <div className="col-span-1 text-right">
              <Button
                size="sm"
                onClick={() => handleAssignManager(user._id.toString())}
                disabled={isAssignManagerLoading}
              >
                {isAssignManagerLoading ? "Updating" : "Make Manager"}
              </Button>
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
