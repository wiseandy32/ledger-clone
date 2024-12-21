import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useAuth } from "@/context/auth/use-auth";
import {
  getSubCollectionDocuments,
  subscribeToSubCollection,
} from "@/lib/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function TransactionHistoryPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: transactions } = useQuery({
    queryKey: ["user", user?.uid],
    queryFn: async () => {
      const documents = await getSubCollectionDocuments(
        "users",
        user.docRef,
        "transactions"
      );
      return documents;
    },
  });

  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToSubCollection(
        "users",
        user?.docRef,
        "transactions",
        () => qc.invalidateQueries({ queryKey: ["user"] })
      );

      return unsubscribe;
    }
  }, [user, user?.docRef, qc]);

  return (
    <>
      <div className="">
        <h1 className="text-2xl md:text-4xl font-bold capitalize">
          Transaction History
        </h1>
        <p className="md:mt-2 text-sm">
          Here&apos;s an overview of all transactions on your account.
        </p>
      </div>
      <div className="container mx-auto py-5">
        <DataTable columns={columns} data={transactions || []} />
      </div>
    </>
  );
}

export default TransactionHistoryPage;
