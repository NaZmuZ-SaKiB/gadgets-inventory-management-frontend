import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { useAppDispatch } from "@/redux/hooks";
import { setFilter } from "@/redux/features/product/product.slice";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";

const DateFilterCard = () => {
  const [releasedAfter, setReleasedAfter] = useState<Date>();
  const [releasedBefore, setReleasedBefore] = useState<Date>();

  const dispatch = useAppDispatch();

  const handleReleasedDate = (date: Date, type: "after" | "before") => {
    if (type === "after") {
      if (releasedBefore && date > releasedBefore) return;

      setReleasedAfter(new Date(date));
      dispatch(
        setFilter({ value: date.toISOString(), field: "releasedAfter" })
      );
    } else {
      if (releasedAfter && date < releasedAfter) return;

      setReleasedBefore(new Date(date));
      dispatch(
        setFilter({ value: date.toISOString(), field: "releasedBefore" })
      );
    }
  };

  return (
    <div className="filter-card">
      <p className="text-sm mb-1">Released After</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !releasedAfter && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {releasedAfter ? (
              format(releasedAfter, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={releasedAfter}
            onSelect={(date) => handleReleasedDate(date as Date, "after")}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <p className="text-sm mb-1 mt-2">Released Before</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !releasedBefore && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {releasedBefore ? (
              format(releasedBefore, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={releasedBefore}
            onSelect={(date) => handleReleasedDate(date as Date, "before")}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateFilterCard;
