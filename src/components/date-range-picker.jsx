/* eslint-disable react/prop-types */
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
// import { addDays, format } from "date-fns";
// import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useEffect } from "react";

export function DateRangePicker({ className, onDateRangeChange }) {
  const [date, setDate] = useState({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    onDateRangeChange(date);
  }, [date, onDateRangeChange]);

  return (
    <div
      className={cn(
        "grid gap-2 w-full md:max-w-[auto] lg:max-w-[330px]",
        className
      )}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              // "w-[300px] justify-start text-left font-normal",
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
