// import { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal, ArrowUpDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <p>{row.original?.id?.slice(0, 7)}</p>,
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "coin",
    header: "Coin",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <p className="flex gap-1 items-center">
          {row.original.type === "deposit" ? (
            <Plus className="text-green-500 w-2" />
          ) : (
            <Minus className="text-red-500 w-2" />
          )}
          <span
            className={`${
              row.original.type === "deposit" &&
              row.original.status === "confirmed"
                ? "text-green-500"
                : row.original.type === "withdrawal" &&
                  row.original.status === "confirmed"
                ? "text-red-500"
                : ""
            }`}
          >
            {`$${row.original.amount}`}
          </span>
        </p>
      );
    },
  },
  //   {
  //     accessorKey: "type",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Type
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //   },
  //   {
  //     accessorKey: "type",
  //     header: "Type",
  //   },
  {
    accessorKey: "creationDate",
    header: "Date",
    filterFn: (row, id, value) => {
      const [start, end] = value;
      const rowDate = new Date(row.getValue(id));
      return rowDate >= start && rowDate <= end;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          variant={"outline"}
          className={`${
            row.original.status === "confirmed" &&
            "text-green-500 border-green-500"
          } ${
            row.original.status === "declined" && "text-red-500 border-red-500"
          }`}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => {
  //       const transaction = row.original;

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem
  //               onClick={() => navigator.clipboard.writeText(transaction.id)}
  //             >
  //               Copy transaction ID
  //             </DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>View transaction details</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
];
