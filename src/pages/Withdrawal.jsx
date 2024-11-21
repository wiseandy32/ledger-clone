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
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

function Withdrawal() {
  const [errorMessage, setErrorMessage] = useState(0);

  return (
    <>
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">
          {/* <h1 className="text-4xl font-bold border-b-2 border-solid border-sidebar-border"> */}
          Create a Withdrawal Request
        </h1>
        <p className="md:mt-2 text-sm">
          Please fill the form below to request a withdrawal
        </p>
      </div>
      <form
        className="w-full max-w-[680px] bg-muted/50 p-6 grid gap-4 rounded-sm mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);

          if (+formData.get("amount") > 0) {
            setErrorMessage(
              "Insufficient Balance: Please ensure you have enough funds to complete this transaction."
            );
          }

          alert("clicked");
        }}
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
          <Select id="WithdrawalMethod" required>
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
    </>
  );
}

export default Withdrawal;
