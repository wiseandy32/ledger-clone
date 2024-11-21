import { auth, db } from "@/services/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const filterCountries = (
  countries = [],
  priorityCountries = [],
  whitelist = [],
  blacklist = []
) => {
  let countriesListedFirst = [];
  let filteredCountries = countries;

  if (whitelist.length > 0) {
    filteredCountries = countries.filter(
      ({ countryShortCode }) => whitelist.indexOf(countryShortCode) > -1
    );
  } else if (blacklist.length > 0) {
    filteredCountries = countries.filter(
      ({ countryShortCode }) => blacklist.indexOf(countryShortCode) === -1
    );
  }

  if (priorityCountries.length > 0) {
    // ensure the countries are added in the order in which they are specified by the user
    priorityCountries.forEach((slug) => {
      const result = filteredCountries.find(
        ({ countryShortCode }) => countryShortCode === slug
      );
      if (result) {
        countriesListedFirst.push(result);
      }
    });

    filteredCountries = filteredCountries.filter(
      ({ countryShortCode }) =>
        priorityCountries.indexOf(countryShortCode) === -1
    );
  }

  return countriesListedFirst.length
    ? [...countriesListedFirst, ...filteredCountries]
    : filteredCountries;
};

export const fetchUserByID = async (id) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", id));

  try {
    const querySnapshot = await getDocs(q);
    const user = auth.currentUser;
    if (!querySnapshot.empty) {
      // querySnapshot.forEach((doc) => {
      // console.log("document: ", doc.data());
      // });
      const doc = querySnapshot.docs[0].data();
      // console.log(doc);
      return { ...doc, ...user };
    } else {
      console.log("no document found!");
    }
  } catch (error) {
    console.error(error);
  }
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // Convert file to Base64
  });
};

export const handleFileSelect = async (file) => {
  if (!file) return;
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", auth.currentUser.uid));
  // console.log()
  try {
    // Convert file to Base64
    const base64String = await fileToBase64(file);
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs[0];
    // console.log(doc.id);

    localStorage.setItem("dp", JSON.stringify(base64String));
    const userDoc = doc(db, "users", docs.id);
    console.log(userDoc);
    // await updateProfile(user, { photoURL: base64String });
    await updateDoc(userDoc, { photoURL: base64String });

    // console.log("Profile photo updated successfully:", base64String);
  } catch (error) {
    console.error("Error updating profile photo:", error.message);
  }
};
