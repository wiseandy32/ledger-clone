/* eslint-disable react/prop-types */
import { useState } from "react";
import { AuthContext } from "./use-auth";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useQuery } from "@tanstack/react-query";
import { fetchUserByID } from "@/lib/helpers";

function AuthProvider({ children }) {
  const [uid, setUid] = useState(JSON.parse(localStorage.getItem("id")) || "");
  // const [user, setUser] = useState({});
  const { data: user } = useQuery({
    queryKey: ["user", uid],
    queryFn: () => fetchUserByID(uid),
    enabled: !!uid,
  });

  const values = {
    user,
    uid,
  };
  // console.log("auth: ", user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      localStorage.setItem("id", JSON.stringify(user?.uid || ""));
      setUid(user?.uid);
    });
  }, [user]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
