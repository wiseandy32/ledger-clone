import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { useAuth } from "@/context/auth/use-auth";
import { getDocuments } from "@/lib/helpers";
import { useEffect } from "react";
import { useState } from "react";
// fix date for each transaction

// const data = [
//   {
//     uid: "d2XVRu2ujIS81QBFvd81aoryRMn1",
//     id: "6gyJ6liYfjHMuBntlliR",
//     // id: "gyJ6liY",
//     coin: "XRP",
//     type: "deposit",
//     amount: "1232.21",
//     status: "confirmed",
//     creationDate: "01-12-2024",
//   },
//   {
//     uid: "d2XVRu2ujIS81QBFvd81aoryRMn1",
//     id: "9HKqrTx8oZX3gCckwkod",
//     // id: "HKqrTx8",
//     coin: "XRP",
//     type: "deposit",
//     amount: "550",
//     status: "confirmed",
//     creationDate: "02-12-2024",
//   },
//   {
//     uid: "d2XVRu2ujIS81QBFvd81aoryRMn1",
//     id: "Apdxa7EkL8nvQ8Hhii3u",
//     // id: "pdxa7Ek",
//     coin: "XRP",
//     type: "deposit",
//     amount: "932.50",
//     status: "confirmed",
//     creationDate: "02-12-2024",
//   },
//   {
//     uid: "d2XVRu2ujIS81QBFvd81aoryRMn1",
//     id: "QPpw8phkHq7OJSJSCc1j",
//     // id: "Ppw8phk",
//     coin: "XRP",
//     type: "withdrawal",
//     amount: "1000",
//     status: "pending",
//     creationDate: "02-12-2024",
//   },
//   {
//     uid: "PxUskCYMBFMmtjbSob4jFUFTvTp2",
//     id: "VB40cH5LEr0cQgeSYrm3",
//     // id: "B40cH5L",
//     coin: "XRP",
//     type: "withdrawal",
//     amount: "1000",
//     status: "confirmed",
//     creationDate: "05-12-2024",
//   },
//   {
//     uid: "d2XVRu2ujIS81QBFvd81aoryRMn1",
//     id: "e6lltM0TAlkOGvQK2M1w",
//     // id: "6lltM0T",
//     coin: "XRP",
//     type: "withdrawal",
//     amount: "5500",
//     status: "pending",
//     creationDate: "02-12-2024",
//   },
//   {
//     uid: "bDB8lTqQtzOg35Vkdf3Gw6spgzb2",
//     id: "BqNbsryCMdHYXU7cJmHC",
//     // id: "qNbsryC",
//     coin: "XRP",
//     type: "deposit",
//     amount: "135.50",
//     status: "confirmed",
//     creationDate: "04-12-2024",
//   },
//   {
//     uid: "d2XVRu2ujIS81QBFvd81aoryRMn1",
//     id: "CBgKRdF8nXvWr3Nyry5u",
//     // id: "BgKRdF8",
//     coin: "XRP",
//     type: "deposit",
//     amount: "514.03",
//     status: "confirmed",
//     creationDate: "05-12-2024",
//   },
//   {
//     uid: "pQmZeNJgksYDVoP6uGZea6Fq8642",
//     id: "CEOy7kKoOJgwUAAT7iey",
//     // id: "EOy7kKo",
//     coin: "XLM",
//     type: "deposit",
//     amount: "50",
//     status: "pending",
//     creationDate: "06-12-2024",
//   },
//   {
//     uid: "d2XVRu2ujIS81QBFvd81aoryRMn1",
//     id: "DDdZamMKbA9lLeHrkDXf",
//     // id: "DdZamMK",
//     coin: "XRP",
//     type: "deposit",
//     amount: "2000",
//     status: "confirmed",
//     creationDate: "05-12-2024",
//   },
//   {
//     uid: "d2XVRu2ujIS81QBFvd81aoryRMn1",
//     id: "Dcmxc0lESGczmR3sl8sq",
//     // id: "cmxc0lE",
//     coin: "XRP",
//     type: "deposit",
//     amount: "1371.98",
//     status: "confirmed",
//     creationDate: "08-12-2024",
//   },
//   {
//     uid: "euy9YzCT7OQ6N5jYga1cKD7Xc7e2",
//     id: "GeGNQAD3SYBdtcv4tDA9",
//     // id: "eGNQAD3",
//     coin: "Ethereum",
//     type: "deposit",
//     amount: "2000",
//     status: "confirmed",
//     creationDate: "09-12-2024",
//   },
//   {
//     uid: "zJ1NgKtcZ9OMVReW8F7yfWhRdd22",
//     id: "IbkUh2L47oC1ymOFpJry",
//     // id: "bkUh2L4",
//     coin: "XRP",
//     type: "deposit",
//     amount: "100",
//     status: "pending",
//     creationDate: "10-12-2024",
//   },
//   {
//     uid: "euy9YzCT7OQ6N5jYga1cKD7Xc7e2",
//     id: "LfD4F5KvGhwXogTGx4xw",
//     // id: "fD4F5Kv",
//     coin: "Bitcoin",
//     type: "deposit",
//     amount: "1000",
//     status: "confirmed",
//     creationDate: "12-12-2024",
//   },
//   {
//     uid: "d2XVRu2ujIS81QBFvd81aoryRMn1",
//     id: "Po1JbV6ndrvu89YHwMRK",
//     // id: "o1JbV6n",
//     coin: "XRP",
//     type: "deposit",
//     amount: "466.21",
//     status: "confirmed",
//     creationDate: "05-12-2024",
//   },
//   {
//     uid: "Se75RCnijwRRhZg0qyy3I2Jit0I2",
//     id: "Pwmjvy8Jj7cJDBBpl8Em",
//     // id: "wmjvy8J",
//     coin: "XRP",
//     type: "deposit",
//     amount: "100",
//     status: "confirmed",
//     creationDate: "10-12-2024",
//   },
//   {
//     uid: "bDB8lTqQtzOg35Vkdf3Gw6spgzb2",
//     id: "i7rOBxNqoiiyry6VNBnO",
//     // id: "7rOBxNq",
//     coin: "Bitcoin",
//     type: "deposit",
//     amount: "8000",
//     status: "confirmed",
//     creationDate: "10-12-2024",
//   },
//   {
//     uid: "d2XVRu2ujIS81QBFvd81aoryRMn1",
//     id: "pGqXsnMVqV5rPpow8jWo",
//     // id: "GqXsnMV",
//     coin: "XRP",
//     type: "deposit",
//     amount: "799.89",
//     status: "confirmed",
//     creationDate: "11-12-2024",
//   },
//   {
//     uid: "PxUskCYMBFMmtjbSob4jFUFTvTp2",
//     id: "4HORgW1WFpNHSoixdNVV",
//     // id: "HORgW1W",
//     coin: "Bitcoin",
//     type: "withdrawal",
//     amount: "5000",
//     status: "Confirmed",
//     creationDate: "09-12-2024",
//   },
//   {
//     uid: "euy9YzCT7OQ6N5jYga1cKD7Xc7e2",
//     id: "4rlnLoZABECTeXZy9A0y",
//     // id: "rlnLoZA",
//     coin: "Bitcoin",
//     type: "withdrawal",
//     amount: "1000",
//     status: "confirmed",
//     creationDate: "09-12-2024",
//   },
// ];

function TransactionHistoryPage() {
  const [info, setInfo] = useState([]);
  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    const ge = async () => {
      try {
        const infos = await getDocuments(
          user?.uid,
          "transactionsHistory",
          "uid"
        );
        setInfo(infos);
      } catch (error) {
        console.error(error);
      }
    };
    ge();
  }, [user]);

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
        <DataTable columns={columns} data={info} />
      </div>
    </>
  );
}

export default TransactionHistoryPage;
