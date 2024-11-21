import CountrySelect from "@/components/country-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/use-auth";
import { useRef } from "react";
import { handleFileSelect } from "@/lib/helpers";
import { toast } from "sonner";

function UserProfile() {
  const [country, setCountry] = useState("");
  const { user } = useAuth();
  const [userImage, setUserImage] = useState(
    JSON.parse(localStorage.getItem("dp")) || null
  );
  const [isNotEditing, setIsNotEditing] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [count, setCount] = useState(0);

  // TODO: finish this component: add region and postal id
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click(); // Trigger the file input
  };

  const handleFileChange = async (e) => {
    if (isNotEditing) {
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
      await handleFileSelect(file);

      // Optionally: Reset the file input to allow re-uploading the same file
      e.target.value = null;
    } catch (error) {
      console.error("Error handling file change:", error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold">
          {/* <h1 className="text-4xl font-bold border-b-2 border-solid border-sidebar-border"> */}
          Profile
        </h1>
      </div>
      <div className="bg-muted/50 p-5 rounded-md flex items-center gap-2">
        {/* <div className="border-solid border-2 border-red-500 before:content-[hello] before:h-[5px] before:w-full before:border-b-[100px] bg-black bottom-[0]"> */}
        <Avatar
          className="w-14 h-14 object-contain object-center"
          onClick={handleAvatarClick}
        >
          <AvatarImage
            className="object-contain object-center"
            src={userImage}
          />
          <AvatarFallback>
            {!user
              ? ""
              : user?.firstName.charAt(0).toUpperCase() +
                user?.lastName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <input
          className="hidden"
          type="file"
          id="avatar"
          accept="image/png, image/jpeg, image/webp"
          name="avatar"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {/* </div> */}
        <div className="mr-2 text-sm grid gap-1">
          <p className="font-extrabold">{user?.displayName}</p>
          {/* <p>@jack_adams</p> */}
          <p className="text-slate-400">@{user?.username}</p>
        </div>
        <div className=" ml-auto">
          <Button
            onClick={() => {
              setIsNotEditing((prev) => !prev);
              setCount((prev) => prev + 1);
              const currentCount = count + 1;
              if (currentCount % 2 === 0 && isTouched) {
                toast.success("Profile updated successfully");
              }
            }}
          >
            {isNotEditing ? "Edit" : "Submit"}
          </Button>
        </div>
      </div>
      <form>
        <fieldset className="bg-muted/50 rounded-md">
          <h3 className="p-5 mb-5 border-b-2 border-solid border-sidebar-border">
            Personal Information
          </h3>
          <div className="px-5 pb-5 grid md:grid-cols-2 gap-y-4 items-center">
            <div className="grid w-full max-w-sm items-center gap-1.5 md:col-start-1 md:col-end-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                type="text"
                id="fullName"
                placeholder="Full name"
                value={user?.displayName}
                disabled
                readOnly
              />
            </div>
            {/* <div className="grid w-full max-w-sm items-center gap-1.5 md:col-start-1 md:col-end-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input type="text" id="firstName" placeholder="First name" />
            </div> */}
            {/* <div className="grid w-full max-w-sm items-center gap-1.5 col-start-2 col-end-3">
              <Label htmlFor="lastName">Full Name</Label>
              <Input type="text" id="lastName" placeholder="Last name" />
            </div> */}
            <div className="grid w-full max-w-sm items-center gap-1.5 md:col-start-2 md:col-end-3">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Username"
                value={user?.username}
                readOnly
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 col-start-1 col-end-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                value={user?.email}
                readOnly
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 md:col-start-2 md:col-end-3">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="number"
                id="phoneNumber"
                placeholder="Type your phone number"
                onBlur={(e) => {
                  if (e.target.value !== "") {
                    setIsTouched(true);
                    localStorage.setItem("p", JSON.stringify(e.target.value));
                  }
                }}
                value={
                  JSON.parse(localStorage.getItem("p")) ||
                  user?.phoneNumber ||
                  undefined
                }
                disabled={isNotEditing}
              />
            </div>
            {/* <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="wallet">Wallet</Label>
              <Input
                type="text"
                id="wallet"
                placeholder="Enter your wallet address"
              />
            </div> */}
          </div>
        </fieldset>
        <fieldset
          className="mt-5 bg-muted/50 rounded-md"
          disabled={isNotEditing}
        >
          <h3 className="p-5 mb-5 border-b-2 border-solid border-sidebar-border">
            Account Information
          </h3>
          <div className="px-5 pb-5 grid md:grid-cols-2 gap-y-4 items-center">
            <div className="grid w-full max-w-sm items-center gap-1.5 md:col-start-1 md:col-end-2">
              <Label htmlFor="wallet">Country</Label>
              <CountrySelect
                onBlur={(e) => {
                  if (e.target.value !== "") {
                    setIsTouched(true);
                    localStorage.setItem("c", JSON.stringify(e.target.value));
                  }
                }}
                onChange={(value) => setCountry(value)}
                priorityOptions={["US", "UK"]}
                placeholder="Country"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 md:col-start-2 md:col-end-3">
              <Label htmlFor="wallet">Wallet Address</Label>
              <Input
                type="text"
                id="walletAddress"
                name="walletAddress"
                onBlur={(e) => {
                  if (e.target.value !== "") {
                    setIsTouched(true);
                    localStorage.setItem("wa", JSON.stringify(e.target.value));
                  }
                }}
                value={
                  JSON.parse(localStorage.getItem("p")) ||
                  user?.phoneNumber ||
                  undefined
                }
                placeholder="Enter your wallet address"
              />
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default UserProfile;
