import { auth, db } from "@/services/firebase";
import { updateUserProfile } from "@/utils/auth";
import { deleteUser } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "sonner";

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

export const getSingleDocument = async (queryKey = "email", uid) => {
  const usersRef = collection(db, "users");
  const document = query(usersRef, where(`${queryKey}`, "==", uid));

  try {
    const querySnapshot = await getDocs(document);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0].data();
      return doc;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserByID = async (uid) => {
  if (!uid) return false;
  const currentUser = auth.currentUser;
  const userDoc = await getSingleDocument("uid", uid);
  const user = { ...currentUser, ...userDoc };
  // changeUserID(user.uid);
  return user;
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // Convert file to Base64
  });
};

export const handleFileSelect = async (file, changeImage) => {
  if (!file) return;
  try {
    const userDetail = await getSingleDocument("uid", auth.currentUser.id);
    // convert to base64
    const base64String = await fileToBase64(file);
    changeImage(base64String);
    await updateUserProfile({
      photoURL: base64String,
    });
    await updateFirebaseDb("users", userDetail.docRef, { photo: base64String });
    localStorage.setItem("dp", JSON.stringify(base64String));

    console.log("Profile photo updated successfully:", base64String);
  } catch (error) {
    console.error("Error updating profile photo:", error.message);
  }
};

export const updateFirebaseDb = async (documentPath, docId, data) => {
  const docRef = doc(db, documentPath, docId);
  await updateDoc(docRef, data);
};

export const capitalizeFirstLettersOfName = (word = "john doe") => {
  return word
    ?.split(" ")
    ?.reduce((prev, curr) => prev + curr[0]?.toUpperCase(), "");
};

export const handleRequestApproval = (doc, requestType, documentId) => {
  if (doc.isConfirmed) {
    toast.info(
      `Click confirm to reverse ${doc.name} ${requestType} request approval`,
      {
        duration: Infinity,
        cancel: {
          label: "Cancel",
          onClick: () => {
            return;
          },
        },
        action: {
          label: "Confirm",
          onClick: async () => {
            const document = await getSingleDocument(doc?.email);

            // const field = `${doc.coinType}_balance`;
            await updateFirebaseDb("users", document.docRef, {
              [`${doc.method}`]: increment(
                requestType === "deposit" ? -doc.amount : doc.amount
              ),
              ledger_balance: increment(
                requestType === "deposit" ? -doc.amount : doc.amount
              ),
            });

            await updateFirebaseDb(documentId, doc.docRef, {
              isConfirmed: false,
            });
            toast.success(
              `${doc.name} ${requestType} request has been reversed`
            );
          },
        },
      }
    );
  } else {
    toast.info(`Click confirm to approve ${doc.name} ${requestType} request`, {
      duration: Infinity,
      cancel: {
        label: "Cancel",
        onClick: () => {
          return;
        },
      },
      action: {
        label: "Confirm",
        onClick: async () => {
          const document = await getSingleDocument(doc?.email);

          await updateFirebaseDb("users", document.docRef, {
            [`${doc.method}`]: increment(
              requestType === "deposit" ? doc.amount : -doc.amount
            ),
            ledger_balance: increment(
              requestType === "deposit" ? doc.amount : -doc.amount
            ),
          });

          await updateFirebaseDb(documentId, doc.docRef, {
            isConfirmed: true,
          });
          toast.success(`${doc.name} ${requestType} request has been approved`);
        },
      },
    });
  }
};

export const deleteUserData = async (uid, user) => {
  const userDoc = await getSingleDocument("uid", uid);
  await deleteUser(user);
  await deleteDoc(doc(db, "users", userDoc.docRef));
};
