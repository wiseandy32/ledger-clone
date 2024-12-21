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
import { deleteDocumentFromDB, handleRequestApproval } from "@/lib/helpers";
import { db } from "@/services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";

function WithdrawalRequestsList() {
  const [docs, setDocs] = useState([]);
  const total = docs?.reduce((prev, curr) => prev + +curr?.amount, 0);

  useEffect(() => {
    const getLatestChanges = onSnapshot(
      collection(db, "withdrawalRequests"),
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
        <h1 className="text-2xl md:text-4xl font-bold">Withdrawals</h1>
        <p className="md:mt-2 text-sm">
          Below is the list of all the available withdrawal request
        </p>
      </div>{" "}
      {docs.length === 0 && (
        <>
          <p className="capitalize p-5 text-2xl">No withdrawal request yet</p>
        </>
      )}
      {docs.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className={`${docs.length === 0 ? "w-full" : "w-[100px]"}`}
              >
                ID
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead className="text-right">Amount ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docs.map((doc) => (
              <TableRow key={doc.docRef}>
                <TableCell className="font-medium">
                  {doc.docRef?.slice(1, 8)}
                </TableCell>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={"outline"}
                    className={`${
                      doc.isConfirmed && "text-green-500 border-green-500"
                    }`}
                  >
                    {doc.isConfirmed ? "Approved" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">{doc?.coin}</TableCell>
                <TableCell>{doc.walletAddress}</TableCell>
                <TableCell className="text-right">{doc.amount}</TableCell>
                <TableCell className="text-center flex gap-2 pl-9 w-fit">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          handleRequestApproval(
                            doc,
                            "withdrawal",
                            "withdrawalRequests",
                            doc.docRef,
                            doc.userDocRef
                          );
                        }}
                      >
                        {!doc.isConfirmed
                          ? "Approve Request"
                          : "UnApprove Request"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () => {
                          try {
                            toast.warning(
                              `Are you sure you want to delete ${doc.name} withdrawal request? This action is irreversible`,
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
                                  onClick: async () => {
                                    await deleteDocumentFromDB(
                                      "withdrawalRequests",
                                      doc.docRef
                                    );
                                    toast.success(
                                      `${doc.name} withdrawal request has been deleted.`
                                    );
                                  },
                                },
                              }
                            );
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                      >
                        Delete Request
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">${total}</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  );
}

export default WithdrawalRequestsList;
