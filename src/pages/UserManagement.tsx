/* eslint-disable @typescript-eslint/no-explicit-any */
import UserTable from "@/components/tables/UserTable";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const UserManagementPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    sort: "role",
    search: "",
  });

  const handleSerach = (value: string) => {
    setTimeout(() => {
      setFilters({ ...filters, search: value });
    }, 300);
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
      <div>
        <UserTable filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
};

export default UserManagementPage;
