/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "./date-range-picker";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  //   const [dateRange, setDateRange] = useState({
  //     from: undefined,
  //     to: undefined,
  //   });
  const [, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleDateRangeChange = useCallback(
    (range) => {
      setDateRange(range);
      if (range.from && range.to) {
        table.getColumn("creationDate")?.setFilterValue([range.from, range.to]);
      } else {
        table.getColumn("creationDate")?.setFilterValue(undefined);
      }
    },
    [table]
  );

  const handleClearFilters = useCallback(() => {
    table.getColumn("type")?.setFilterValue("");
    table.getColumn("status")?.setFilterValue("");
    table.getColumn("creationDate")?.setFilterValue(undefined);
    setDateRange({ from: undefined, to: undefined });
  }, [table]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 py-4">
        <Select
          value={table.getColumn("type")?.getFilterValue() ?? "all"}
          onValueChange={(value) =>
            table
              .getColumn("type")
              ?.setFilterValue(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="md:max-w-[180px]">
            {/* <SelectTrigger> */}
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="deposit">Deposit</SelectItem>
            <SelectItem value="withdrawal">Withdrawal</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={table.getColumn("status")?.getFilterValue() ?? "all"}
          onValueChange={(value) =>
            table
              .getColumn("status")
              ?.setFilterValue(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="md:max-w-[180px]">
            {/* <SelectTrigger> */}
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
        <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="ml-auto"
        >
          Clear Filters
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="whitespace-nowrap"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No available transactions.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
