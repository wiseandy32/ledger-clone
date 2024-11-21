import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
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
    const docRef = await addDoc(collection(db, field), data);
    return docRef;
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

export const loginWithGoogle = async (navigate) => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ display: "popup", prompt: "select_account" });
  try {
    await signInWithPopup(auth, provider);
    navigate("/dashboard");
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (navigate) => {
  try {
    await signOut(auth);
    navigate("/");
  } catch (error) {
    console.error(error);
  }
};