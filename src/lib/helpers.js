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
import emailjs from "@emailjs/browser";

export const filterCountries = (
  countries = [],
  priorityCountries = [],
  whitelist = [],
  blacklist = [],
) => {
  let countriesListedFirst = [];
  let filteredCountries = countries;

  if (whitelist.length > 0) {
    filteredCountries = countries.filter(
      ({ countryShortCode }) => whitelist.indexOf(countryShortCode) > -1,
    );
  } else if (blacklist.length > 0) {
    filteredCountries = countries.filter(
      ({ countryShortCode }) => blacklist.indexOf(countryShortCode) === -1,
    );
  }

  if (priorityCountries.length > 0) {
    // ensure the countries are added in the order in which they are specified by the user
    priorityCountries.forEach((slug) => {
      const result = filteredCountries.find(
        ({ countryShortCode }) => countryShortCode === slug,
      );
      if (result) {
        countriesListedFirst.push(result);
      }
    });

    filteredCountries = filteredCountries.filter(
      ({ countryShortCode }) =>
        priorityCountries.indexOf(countryShortCode) === -1,
    );
  }

  return countriesListedFirst.length
    ? [...countriesListedFirst, ...filteredCountries]
    : filteredCountries;
};

export const filterRegions = (
  regions = [],
  priorityRegions = [],
  whitelist = [],
  blacklist = [],
) => {
  let regionsListedFirst = [];
  let filteredRegions = regions;

  if (whitelist.length > 0) {
    filteredRegions = regions.filter(
      ({ shortCode }) => whitelist.indexOf(shortCode) > -1,
    );
  } else if (blacklist.length > 0) {
    filteredRegions = regions.filter(
      ({ shortCode }) => blacklist.indexOf(shortCode) === -1,
    );
  }

  if (priorityRegions.length > 0) {
    // ensure the Regions are added in the order in which they are specified by the user
    priorityRegions.forEach((slug) => {
      const result = filteredRegions.find(
        ({ shortCode }) => shortCode === slug,
      );
      if (result) {
        regionsListedFirst.push(result);
      }
    });

    filteredRegions = filteredRegions.filter(
      ({ shortCode }) => priorityRegions.indexOf(shortCode) === -1,
    );
  }

  return regionsListedFirst.length
    ? [...regionsListedFirst, ...filteredRegions]
    : filteredRegions;
};

export const getSingleDocument = async (uid, queryKey = "uid") => {
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

export const getTransactionDetail = async (
  requestId,
  docId,
  queryKey = "docRef",
) => {
  const depositRef = collection(db, `${docId}`);
  const document = query(depositRef, where(`${queryKey}`, "==", requestId));

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
  const userDoc = await getSingleDocument(uid);
  const user = { ...currentUser, ...userDoc };
  // changeUserID(user.uid);
  return user;
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

export const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const capitalizeWord = (word = "jd") =>
  word?.charAt(0)?.toUpperCase() + word.slice(1);

export const handleRequestApproval = (
  doc,
  requestType,
  documentId,
  requestId,
) => {
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
            const document = await getSingleDocument(doc?.uid);

            // const field = `${doc.coinType}_balance`;
            await updateFirebaseDb("users", document.docRef, {
              [`${doc.method}`]: increment(
                requestType === "deposit" ? -doc.amount : doc.amount,
              ),
              ledger_balance: increment(
                requestType === "deposit" ? -doc.amount : doc.amount,
              ),
            });

            await updateFirebaseDb(documentId, doc.docRef, {
              isConfirmed: false,
            });
            toast.success(
              `${doc.name} ${requestType} request has been reversed`,
            );
          },
        },
      },
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
          const document = await getSingleDocument(doc?.uid);
          const transaction = await getTransactionDetail(
            requestId,
            `${
              requestType === "deposit"
                ? "depositRequests"
                : "withdrawalRequests"
            }`,
          );
          await updateFirebaseDb("users", document.docRef, {
            [`${doc.method}`]: increment(
              requestType === "deposit" ? doc.amount : -doc.amount,
            ),
            ledger_balance: increment(
              requestType === "deposit" ? doc.amount : -doc.amount,
            ),

            withdrawal_balance: increment(
              requestType === "withdrawal" ? doc.amount : 0,
            ),
          });

          await updateFirebaseDb(documentId, doc.docRef, {
            isConfirmed: true,
          });
          toast.success(`${doc.name} ${requestType} request has been approved`);
          await emailjs.send("service_q3ofwss", "template_8xsvj38", {
            subject: `${capitalizeWord(requestType)} Request Approval`,
            customer_name: `${capitalizeWord(transaction.name)}`,
            request_type: `${capitalizeWord(requestType)}`,
            transaction_id: `${transaction.docRef.slice(0, 7)}`,
            request_method: `${capitalizeWord(transaction.coin)}`,
            request_amount: `$${formatNumberWithCommas(+transaction.amount)}`,
            to_email: `${transaction.email}`,
          });
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

export const deleteDocumentFromDB = async (documentName, documentRefID) => {
  await deleteDoc(doc(db, documentName, documentRefID));
};

export const uploadImage2 = async (image) => {
  const url =
    "https://api.imgbb.com/1/upload?expiration=600&key=fcfbab1bbb8556123872f4b04f744003";
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const uploadImage = async (image) => {
  const url =
    "https://api.imgbb.com/1/upload?expiration=600&key=fcfbab1bbb8556123872f4b04f744003";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ image: image }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
