import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { withdrawalOptions } from "@/data";
import { auth } from "@/services/firebase";
import { addDataToDb } from "@/utils/auth";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { useState } from "react";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";

function Withdrawal() {
  const [errorMessage, setErrorMessage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // if (+formData.get("amount") > 0) {
    //   setErrorMessage(
    //     "Insufficient Balance: Please ensure you have enough funds to complete this transaction."
    //   );
    // }

    const withdrawalRequestInfo = {
      uid: auth.currentUser.uid,
      method: formData.get("WithdrawalMethod"),
      name: auth.currentUser.displayName,
      amount: formData.get("amount"),
      walletAddress: formData.get("walletAddress"),
      email: auth.currentUser.email,
      isConfirmed: false,
    };

    try {
      await addDataToDb("withdrawalRequests", withdrawalRequestInfo);
      setIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">
          {/* <h1 className="text-4xl font-bold border-b-2 border-solid border-sidebar-border"> */}
          Withdrawal Request
        </h1>
        <p className="md:mt-2 text-sm">
          Please fill the form below to request a withdrawal
        </p>
      </div>
      <form
        className="w-full max-w-[680px] bg-muted/50 p-6 grid gap-4 rounded-sm mt-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        {!errorMessage ? null : (
          <p className="bg-red-600 p-2 text-sm rounded-md font-medium">
            {errorMessage}
          </p>
        )}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="amount" className="capitalize">
            Amount ($)
          </Label>
          {/* <input type="number" name="" min={} id="" /> */}
          <Input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            min={1000}
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="WithdrawalMethod" className="capitalize">
            Withdrawal Method
          </Label>
          <Select id="WithdrawalMethod" name="WithdrawalMethod" required>
            <SelectTrigger>
              <SelectValue placeholder="Select a Wallet" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Withdrawal Method</SelectLabel>
                {withdrawalOptions.map((option) => (
                  <SelectItem key={option.title} value={option.value}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="walletAddress" className="capitalize">
            Wallet Address
          </Label>
          <Input
            type="text"
            id="walletAddress"
            name="walletAddress"
            placeholder="Enter your wallet address"
            required
          />
        </div>
        <Button variant="gooeyLeft">Complete Request</Button>
      </form>
      <Modal
        classNames={{
          //   overlay: "customModal",
          modal: "customModal",
          root: "bg-[rgba(0,_0,_0,_0.8)] grid place-content-center",
        }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="grid place-items-center gap-4 text-center">
          <div className="border-solid border-2 border-green-600 w-20 h-20 grid place-content-center rounded-full">
            <Check color="#16a34a" width={"3rem"} height={"3rem"} />
          </div>
          <p className="font-semibold text-2xl">Withdrawal Initiated</p>
          <p className="">
            Your withdrawal request has been successfully received and is being
            processed. You will be notified once it is approved.
          </p>
          <Button variant="gooeyRight">
            <Link to="/user">Go to dashboard</Link>
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Withdrawal;
