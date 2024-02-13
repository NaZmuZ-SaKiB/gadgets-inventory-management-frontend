import { ChangeEvent, useState } from "react";

import { setFilter } from "@/redux/features/product/product.slice";
import { useAppDispatch } from "@/redux/hooks";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TProps = {
  items: string[];
  field: string;
};

const CheckBoxFilterCard = ({ items, field }: TProps) => {
  const [selectedConnectivities, setCompatibilities] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const handleCompatibility = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.checked) {
      const array = Array.from(
        new Set([...selectedConnectivities, e.target.name])
      );
      setCompatibilities(array);
      dispatch(setFilter({ value: array, field }));
    } else {
      const array = selectedConnectivities.filter(
        (item) => item !== e.target.name
      );
      setCompatibilities(array);
      dispatch(setFilter({ value: array, field }));
    }
  };
  return (
    <div className="filter-card">
      <p className="text-sm mb-2 capitalize">{field}</p>

      {items.map((item) => (
        <div
          className="flex gap-3 items-center my-2"
          key={`${field}-filter-${item}`}
        >
          <Input
            type="checkbox"
            name={item}
            id={item}
            className="size-3"
            onChange={handleCompatibility}
          />
          <Label htmlFor={item}>{item.toLowerCase()}</Label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxFilterCard;
