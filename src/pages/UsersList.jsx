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
                className={`${filteredUsers.length === 0 ? "w-full" : "w-fit"}`}
              >
                ID
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              {/* <TableHead className="text-right">role</TableHead> */}
              <TableHead className="text-right"></TableHead>
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
                {/* <TableCell>{user.username}</TableCell> */}
                <TableCell>
                  <Badge
                    variant={"outline"}
                    className={`${
                      !user.isDisabled
                        ? "text-green-500 border-green-500"
                        : "text-red-500 border-red-500"
                    }`}
                  >
                    {!user.isDisabled ? "Active" : "Disabled"}
                  </Badge>
                </TableCell>
                <TableCell>{!user.isAdmin ? "user" : "Admin"}</TableCell>
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
                          if (!user.isAdmin) {
                            toast.info(
                              `Are you sure? ${user.name} will be able to perform admin duties`,
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
                                    updateFirebaseDb("users", user.docRef, {
                                      isAdmin: !user.isAdmin,
                                    });
                                    toast.success(
                                      `${user.name} is now an admin!`
                                    );
                                  },
                                },
                              }
                            );
                          } else {
                            updateFirebaseDb("users", user.docRef, {
                              isAdmin: !user.isAdmin,
                            });
                            toast.success(
                              `${user.name} is no longer an admin!`
                            );
                          }
                        }}
                      >
                        {!user.isAdmin ? "Make" : "Remove as"} admin
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          toast.info(
                            `Are you sure you want to delete ${user.name} account? This step is irreversible`,
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
                                  updateFirebaseDb("users", user.docRef, {
                                    isDeleted: true,
                                  });
                                  toast.success(
                                    `${user.name} account has been deleted.`
                                  );
                                },
                              },
                            }
                          );
                        }}
                      >
                        Delete account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
