import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateFirebaseDb } from "@/lib/helpers";
import { db } from "@/services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";

function DepositRequestsList() {
  const [docs, setDocs] = useState([]);
  const total = docs?.reduce((prev, curr) => prev + +curr?.amount, 0);

  useEffect(() => {
    const getLatestChanges = onSnapshot(
      collection(db, "depositRequests"),
      (doc) => {
        const currentDocs = [];
        doc.forEach((d) => currentDocs.push(d.data()));
        setDocs(currentDocs);
      }
    );
    return () => getLatestChanges();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">Deposits</h1>
        <p className="md:mt-2 text-sm">
          Below is the list of all the available deposit request
        </p>
      </div>
      {docs.length === 0 && (
        <p className="capitalize p-5 text-2xl">No deposit request yet</p>
      )}

      {docs.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-fit">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Coin Type</TableHead>
              <TableHead className="text-right">Amount ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docs.map((doc) => (
              <TableRow key={doc.docRef}>
                <TableCell className="font-medium">
                  {doc.docRef.slice(1, 8)}
                </TableCell>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={"outline"}
                    className={`${
                      doc.isConfirmed && "text-green-500 border-green-500"
                    }`}
                  >
                    {doc.isConfirmed ? "Confirmed" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">{doc.coinType}</TableCell>
                <TableCell className="text-right">{doc?.amount}</TableCell>
                <TableCell className="text-center flex gap-2 pl-9 w-fit">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          if (!doc.isConfirmed) {
                            updateFirebaseDb("depositRequests", doc.docRef, {
                              isConfirmed: true,
                            });
                            toast.success(
                              `You have approved ${doc?.name} deposit`
                            );
                          } else {
                            toast.info(
                              `Are you sure you want to rescind ${doc.name} deposit request status?`,
                              {
                                duration: Infinity,
                                cancel: {
                                  label: "Cancel",
                                  onClick: () => {
                                    return;
                                  },
                                },
                                action: {
                                  label: "Confirm",
                                  onClick: () => {
                                    updateFirebaseDb(
                                      "depositRequests",
                                      doc.docRef,
                                      {
                                        isConfirmed: false,
                                      }
                                    );
                                    toast.success(
                                      `${doc.name} deposit request has been rescinded`
                                    );
                                  },
                                },
                              }
                            );
                          }
                        }}
                      >
                        {!doc.isConfirmed
                          ? "Approve Request"
                          : "UnApprove Request"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">${total}</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  );
}

export default DepositRequestsList;
