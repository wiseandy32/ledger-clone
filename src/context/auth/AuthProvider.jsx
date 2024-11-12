/* eslint-disable react/prop-types */
import { useState } from "react";
import { AuthContext } from "./use-auth";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";

function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("id")) || ""
  );

  console.log(user);

  const values = {
    user,
    setUser,
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser("");
        console.log("first");
      } else {
        // const uid = user.uid;
        localStorage.setItem("id", JSON.stringify(user?.uid));
        setUser(user);

        console.log("second");
      }
    });
  }, [user]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
