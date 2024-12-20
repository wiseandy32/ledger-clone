import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

export const createUser = async (email, password, onError) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const { code } = error;
    if (code === "auth/email-already-in-use") {
      onError("An account with this email already exists.");
    }
  }
};

export const addDataToDb = async (field, data) => {
  try {
    const docRef = doc(collection(db, field));
    // if (field === "transactionsHistory") {

    // }
    const updatedData = {
      ...data,
      docRef: docRef.id,
    };
    await setDoc(docRef, updatedData);
    if (field === "withdrawalRequests" || field === "depositRequests") {
      return docRef.id;
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateUserProfile = async (newInfo) => {
  try {
    await updateProfile(auth.currentUser, newInfo);
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (navigate) => {
  try {
    await signOut(auth);
    localStorage.removeItem("id");
    navigate("/");
  } catch (error) {
    console.error(error);
  }
};
