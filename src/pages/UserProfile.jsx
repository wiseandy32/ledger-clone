import CountrySelect from "@/components/country-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/use-auth";
import { useRef } from "react";
import { capitalizeFirstLettersOfName, updateFirebaseDb } from "@/lib/helpers";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { auth } from "@/services/firebase";
import { updatePassword } from "firebase/auth";
import { Loader2 } from "lucide-react";
import RegionSelect from "@/components/region-select";

function UserProfile() {
  const [country, setCountry] = useState("");
  const [, setRegion] = useState("");
  const { user } = useAuth();

  const [isNotEditing, setIsNotEditing] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [isPasswordFieldTouched, setIsPasswordFieldTouched] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isPasswordFieldDisabled, setIsPasswordFieldDisabled] = useState(true);
  const [passwordFieldCount, setPasswordFieldCount] = useState(0);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const qc = useQueryClient();
  // TODO: finish this component: add region and postal id
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    if (isNotEditing) {
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    try {
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          const addUserPhoto = async () => {
            await updateFirebaseDb("users", user.docRef, {
              photo: reader.result,
            });
          };

          addUserPhoto();

          qc.invalidateQueries({ queryKey: ["uid"] });
        };

        reader.readAsDataURL(file);
      }
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
          className={`w-14 h-14 object-contain object-center ${
            isNotEditing === false && "cursor-pointer"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <AvatarImage
            className="object-contain object-center"
            src={user?.photo}
          />
          <AvatarFallback>
            {capitalizeFirstLettersOfName(user?.name)}
          </AvatarFallback>
        </Avatar>
        <input
          className="hidden"
          type="file"
          id="avatar"
          accept="image/png, image/jpeg, image/webp"
          name="avatar"
          ref={fileInputRef}
          disabled={isNotEditing}
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
          <div className="px-5 pb-5 grid md:grid-cols-2 gap-4 gap-x-7 items-center">
            <div className="grid w-full items-center gap-1.5 md:col-start-1 md:col-end-2">
              <Label htmlFor="country">Country</Label>
              <CountrySelect
                onBlur={(e) => {
                  if (e.target.value !== "") {
                    setIsTouched(true);
                    localStorage.setItem("c", JSON.stringify(e.target.value));
                  }
                }}
                onChange={(value) => setCountry(value)}
                priorityOptions={["US", "UK"]}
                placeholder="Select your country"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 md:col-start-2 md:col-end-3">
              <Label htmlFor="countryRegion">Region</Label>
              <RegionSelect
                countryCode={country}
                onBlur={(e) => {
                  if (e.target.value !== "") {
                    setIsTouched(true);
                    localStorage.setItem("cr", JSON.stringify(e.target.value));
                  }
                }}
                onChange={(value) => setRegion(value)}
                placeholder="Select your region"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 md:col-span-full">
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
                className="w-full"
              />
            </div>
          </div>
        </fieldset>
        <div className="mt-5">
          <div className="bg-muted/50 p-5 rounded-md flex items-center gap-2 border-b-2 border-solid border-sidebar-border">
            <h3>Change Password</h3>
            <div className=" ml-auto">
              <Button
                type="button"
                onClick={async (e) => {
                  e.stopPropagation();
                  const currentCount = passwordFieldCount + 1;
                  setIsPasswordFieldDisabled(false);
                  setPasswordFieldCount((prev) => prev + 1);

                  if (!isPasswordFieldTouched && currentCount % 2 !== 0) {
                    return;
                  }

                  if (!newPassword || !confirmNewPassword) {
                    setError("Password fields cannot be empty");
                    return;
                  }

                  try {
                    if (currentCount % 2 === 0 && isPasswordFieldTouched) {
                      setIsUpdatingPassword(true);

                      await updatePassword(auth.currentUser, newPassword);
                      toast.success("Password updated successfully");
                      setIsUpdatingPassword(false);
                      setIsPasswordFieldDisabled(true);
                    }
                  } catch (error) {
                    console.error(error);
                    setIsUpdatingPassword(false);
                  }
                }}
              >
                {!isUpdatingPassword ? null : (
                  <Loader2 className="animate-spin mr-2" />
                )}

                {isPasswordFieldDisabled
                  ? "Edit"
                  : !isUpdatingPassword
                    ? "Submit"
                    : "Submitting"}
              </Button>
            </div>
          </div>
          <fieldset
            className=" bg-muted/50 rounded-md"
            disabled={isPasswordFieldDisabled}
          >
            <div className="px-5 pb-5 pt-5 grid md:grid-cols-2 gap-4 items-center">
              {/* <div className="flex flex-col gap-1 md:w-[45%]"> */}
              <div className="flex flex-col gap-1 md:col-start-1 md:col-end-2">
                <label htmlFor="newPassword" className="capitalize">
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="Type your new password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="newPassword"
                  name="newPassword"
                  minLength={6}
                  className="py-5"
                  onBlur={() => {
                    if (newPassword) {
                      setIsPasswordFieldTouched(true);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 md:col-start-2 md:col-end-3">
                <label htmlFor="confirmNewPassword" className="capitalize">
                  Confirm new Password
                </label>
                <Input
                  type="password"
                  placeholder="Type your new password"
                  required
                  value={confirmNewPassword}
                  id="confirmNewPassword"
                  name="confirmPassword"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  minLength={6}
                  onBlur={() => {
                    if (confirmNewPassword) {
                      setIsPasswordFieldTouched(true);
                    }

                    if (newPassword !== confirmNewPassword) {
                      setError(
                        "Passwords do not match. Please ensure both fields are identical",
                      );
                    } else {
                      setError("");
                    }
                  }}
                  className="py-5"
                />
              </div>
              {!error ? null : (
                <p className="text-white bg-red-500 w-full p-2 rounded-md font-semibold">
                  {error}
                </p>
              )}
            </div>
          </fieldset>
        </div>
      </form>
    </>
  );
}

export default UserProfile;
