import { useAppDispatch } from "@/redux/hooks";
import { setFilter } from "@/redux/features/product/product.slice";
import { operatingSystems, powerSources } from "@/constants/product.constant";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const DropDownFilterCard = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="filter-card">
      <p className="text-sm mb-2">Operating System</p>
      <Select
        onValueChange={(v) => dispatch(setFilter({ value: v, field: "os" }))}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Operating System" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {operatingSystems.map((os) => (
            <SelectItem key={`filter-os-${os}`} value={os}>
              {os.toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p className="text-sm my-2">Power Source</p>
      <Select
        onValueChange={(v) =>
          dispatch(setFilter({ value: v, field: "powerSource" }))
        }
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Power Source" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {powerSources.map((ps) => (
            <SelectItem key={`filter-ps-${ps}`} value={ps}>
              {ps.toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropDownFilterCard;
