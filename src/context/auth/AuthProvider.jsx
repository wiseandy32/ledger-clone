/* eslint-disable react/prop-types */
import { useState } from "react";
import { AuthContext } from "./use-auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useQuery } from "@tanstack/react-query";
import { userDetailQuery } from "@/loaders/user-loader";

function AuthProvider({ children }) {
  const [uid, setUid] = useState(JSON.parse(localStorage.getItem("id")) || "");
  const { data: user } = useQuery(userDetailQuery(uid));

  const values = {
    user,
    uid,
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      localStorage.removeItem("id");
      localStorage.setItem("id", JSON.stringify(user?.uid || ""));
      setUid(user?.uid);
    });
  }, [user]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
