/* eslint-disable react/prop-types */
import { useState } from "react";
import { AuthContext } from "./use-auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useQuery } from "@tanstack/react-query";
// import { userDetailQuery } from "@/loaders/user-loader";
import { fetchUserByID } from "@/lib/helpers";

function AuthProvider({ children }) {
  const [uid, setUid] = useState("");
  // const [uid, setUid] = useState("");
  // const { data: user } = useQuery(userDetailQuery(uid));
  const [userImage, setUserImage] = useState(
    JSON.parse(localStorage.getItem("dp")) ||
      auth?.currentUser?.photoURL ||
      null
  );
  const { data: user } = useQuery({
    queryKey: ["uid", uid],
    queryFn: async () => {
      const user = await fetchUserByID(uid);
      return user;
    },
    staleTime: Infinity,
  });
  // const [user, setUser] = useState({});
  // TODO: profile not showing
  const values = {
    user,
    uid,
    userImage,
    setUserImage,
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("id", user?.uid);
        setUid(user?.uid);
      }
    });
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
