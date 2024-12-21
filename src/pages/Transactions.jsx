import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useAuth } from "@/context/auth/use-auth";
import { getSubCollectionDocuments } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";

function TransactionHistoryPage() {
  const { user } = useAuth();
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
