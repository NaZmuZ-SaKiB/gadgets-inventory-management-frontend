import { useState } from "react";
import { setFilter } from "@/redux/features/product/product.slice";
import { useAppDispatch } from "@/redux/hooks";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";

type TProps = {
  min: number;
  max: number;
  field: string;
  step: number;
};

const RangeFilterCard = ({ min, max, field, step }: TProps) => {
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);

  const dispatch = useAppDispatch();

  const handleMinValue = (value: number) => {
    setMinValue(value);
    setTimeout(() => {
      dispatch(setFilter({ value, field: `min${field}` }));
    }, 300);
  };

  const handleMaxValue = (value: number) => {
    setMaxValue(value);
    setTimeout(() => {
      dispatch(setFilter({ value, field: `max${field}` }));
    }, 300);
  };
  return (
    <div className="filter-card">
      <p className="text-sm">
        Min {field} ({minValue})
      </p>
      <Slider
        onValueChange={(v) => handleMinValue(v[0])}
        max={maxValue}
        step={step}
        className={cn("w-full my-2")}
        defaultValue={[minValue]}
      />
      <p className="text-sm">
        Max {field} ({maxValue})
      </p>
      <Slider
        onValueChange={(v) => handleMaxValue(v[0])}
        min={minValue}
        max={max}
        step={step}
        className={cn("w-full my-2")}
        defaultValue={[maxValue]}
      />
    </div>
  );
};

export default RangeFilterCard;
