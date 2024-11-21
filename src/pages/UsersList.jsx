import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
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

function UsersList() {
  const [docs, setDocs] = useState([]);
  const filteredUsers = docs?.filter((user) => user.isDeleted === false);

  useEffect(() => {
    const getLatestChanges = onSnapshot(collection(db, "users"), (doc) => {
      const currentDocs = [];
      doc.forEach((d) => currentDocs.push(d.data()));
      setDocs(currentDocs);
    });
    return () => getLatestChanges();
  }, []);

  console.log(docs);
  return (
    <>
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">Registered Users</h1>
        <p className="md:mt-2 text-sm">
          Below is the list of all registered users
        </p>
      </div>{" "}
      {filteredUsers.length === 0 && (
        <>
          <p className="capitalize p-5 text-2xl">No registered users yet</p>
        </>
      )}
      {filteredUsers.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className={`${
                  filteredUsers.length === 0 ? "w-full" : "w-[100px]"
                }`}
              >
                ID
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>email</TableHead>
              {/* <TableHead>Method</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead className="text-right">Amount ($)</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.docRef}>
                <TableCell className="font-medium">
                  {user.docRef?.slice(1, 8)}
                </TableCell>
                <TableCell className="capitalize">{user.name}</TableCell>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                {/* <TableCell className="text-right">{doc.amount}</TableCell> */}
                <TableCell className="text-center flex gap-2 pl-9 w-fit">
                  {user.isConfirmed && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        const canDelete = window.confirm(
                          "Are you sure? This action is irreversible"
                        );
                        if (!canDelete) return;

                        updateFirebaseDb("users", user.docRef, {
                          isDeleted: true,
                        });

                        toast.error(`${user.name} has been deleted`);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                  {/* <Button
                    disabled={doc?.isConfirmed}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      updateFirebaseDb("withdrawalRequests", doc.docRef, {
                        isConfirmed: true,
                      });
                      toast.success(
                        `You have approved ${doc.name} withdrawal request`
                      );
                    }}
                  >
                    Confirm
                  </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

export default UsersList;
