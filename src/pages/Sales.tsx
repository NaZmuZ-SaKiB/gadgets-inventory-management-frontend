import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SalesTable from "@/components/tables/SalesTable";

type TFilters = {
  page: number;
  limit: number;
  time?: "all" | "1" | "7" | "30" | "365";
  sort: string;
};

const SalesPage = () => {
  const [filters, setFilters] = useState<TFilters>({
    page: 1,
    limit: 10,
    sort: "-createdAt",
  });

  const handleFilterChange = (value: string | number, field: string) => {
    const newFilters = { ...filters, [field]: value };
    if (field === "time") {
      newFilters.page = 1;
    }
    setFilters(newFilters);
  };

  return (
    <>
      <div className="p-2 pt-16 max-sm:pt-14 relative max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">Sales</h1>

        <div className="flex flex-wrap gap-2 items-center">
          <Select onValueChange={(v) => handleFilterChange(v, "time")}>
            <SelectTrigger className="w-auto h-7 border-black">
              <SelectValue placeholder="Time" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="1">Today</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="365">Last 365 days</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => handleFilterChange(v, "sort")}>
            <SelectTrigger className="w-auto h-7 border-black">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="-createdAt">Latest</SelectItem>
              <SelectItem value="createdAt">Oldest</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => handleFilterChange(v, "limit")}>
            <SelectTrigger className="w-auto h-7 border-black">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={"10"}>10</SelectItem>
              <SelectItem value={"20"}>20</SelectItem>
              <SelectItem value={"30"}>30</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-3">
          <SalesTable
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </>
  );
};

export default SalesPage;
