import { setFilter } from "@/redux/features/product/product.slice";
import { useAppDispatch } from "@/redux/hooks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PaginationFilter = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div>
        <Select
          onValueChange={(v) =>
            dispatch(setFilter({ value: v, field: "sort" }))
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="-createdAt">Latest</SelectItem>
            <SelectItem value="createdAt">Oldest</SelectItem>
            <SelectItem value="price">Price low to high</SelectItem>
            <SelectItem value="-price">Price high to low</SelectItem>
            <SelectItem value="quantity">Quantity high to low</SelectItem>
            <SelectItem value="-quantity">Quantity high to low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          onValueChange={(v) =>
            dispatch(setFilter({ value: v, field: "limit" }))
          }
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Product Per Page" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default PaginationFilter;
