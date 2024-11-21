import { Button } from "@/components/ui/button";
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
                  {doc.isConfirmed ? "Confirmed" : "Pending"}
                </TableCell>
                <TableCell className="capitalize">{doc.coinType}</TableCell>
                <TableCell className="text-right">{doc?.amount}</TableCell>
                <TableCell className="text-center flex gap-2 pl-9 w-fit">
                  <Button
                    disabled={doc.isConfirmed}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      updateFirebaseDb("depositRequests", doc.docRef, {
                        isConfirmed: true,
                      });
                      toast.success(`You have approved ${doc?.name} deposit`);
                    }}
                  >
                    Confirm
                  </Button>
                  {doc.isConfirmed && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        updateFirebaseDb("depositRequests", doc.docRef, {
                          isConfirmed: false,
                        });
                        toast.error(
                          `You have reversed the confirmation status of ${doc?.name} deposit`
                        );
                      }}
                    >
                      Undo
                    </Button>
                  )}
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
