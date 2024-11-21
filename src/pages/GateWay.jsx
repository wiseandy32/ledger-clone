import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { CopyIcon } from "lucide-react";
import { useState } from "react";
import { useRef } from "react";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { toast } from "sonner";

function GateWay() {
  const data = useLoaderData();
  const inputRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [amountDeposited, setAmountDeposited] = useState("");

  const handleCopy = () => {
    const textToCopy = inputRef.current.value;
    if (textToCopy.trim()) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          toast.success("Wallet address copied to keyboard");
        })
        .catch((err) => {
          console.error("Failed to copy text:", err);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(true);
    setAmountDeposited("");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl md:text-4xl font-bold capitalize">
          {data.type} Gateway
        </h1>
        <p>
          Scan the QR code or copy the {data.type} address to make your deposit
        </p>
      </div>
      <form
        className="w-full max-w-[680px] bg-muted/50 p-6 grid gap-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex gap-1">
          <img src={data.icon} alt="" width={25} />
          <p className="uppercase font-semibold">{data.type}</p>
        </div>
        <div className="grid place-content-center">
          <img src={data.qrCode} alt="" width={330} />
        </div>
        <div className="grid w-full items-center gap-1.5 relative">
          <Label htmlFor="walletAddress" className="capitalize">
            {data.type} Address
          </Label>
          <Input
            type="text"
            id="walletAddress"
            value={data?.walletAddress}
            ref={inputRef}
            readOnly
            disabled
            className="py-5"
          />
          <Button
            className="w-fit absolute right-1 top-[50%] translate-y-[-22%]"
            onClick={handleCopy}
            type="button"
          >
            <CopyIcon className="mr-2" /> Copy Address
          </Button>
        </div>
        <div className="grid w-full items-center gap-1.5 mt-7">
          <Label htmlFor="depositAmount" className="capitalize">
            Deposit Amount ($)
          </Label>
          <Input
            type="number"
            id="depositAmount"
            placeholder="Enter the amount you sent"
            className="py-5"
            value={amountDeposited}
            onChange={(e) => setAmountDeposited(e.target.value)}
            required
          />
          <Button className="mt-2" type="submit" variant="ringHover">
            Submit
          </Button>
        </div>
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
          <p className="font-semibold text-2xl">DEPOSIT RECEIVED</p>
          <p className="">
            Your deposit has been successfully received and is being processed.
            You will be notified once the transaction is confirmed.
          </p>
          <Button variant="gooeyRight">
            <Link to="/user">Go to dashboard</Link>
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default GateWay;
