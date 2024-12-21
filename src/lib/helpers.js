import { auth, db } from "@/services/firebase";
import { deleteUser } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

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

export const filterRegions = (
  regions = [],
  priorityRegions = [],
  whitelist = [],
  blacklist = []
) => {
  let regionsListedFirst = [];
  let filteredRegions = regions;

  if (whitelist.length > 0) {
    filteredRegions = regions.filter(
      ({ shortCode }) => whitelist.indexOf(shortCode) > -1
    );
  } else if (blacklist.length > 0) {
    filteredRegions = regions.filter(
      ({ shortCode }) => blacklist.indexOf(shortCode) === -1
    );
  }

  if (priorityRegions.length > 0) {
    // ensure the Regions are added in the order in which they are specified by the user
    priorityRegions.forEach((slug) => {
      const result = filteredRegions.find(
        ({ shortCode }) => shortCode === slug
      );
      if (result) {
        regionsListedFirst.push(result);
      }
    });

    filteredRegions = filteredRegions.filter(
      ({ shortCode }) => priorityRegions.indexOf(shortCode) === -1
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

export const getSubCollectionDocuments = async (
  parentCollection,
  parentDocId,
  subCollectionName
) => {
  const subCollectionRef = collection(
    db,
    parentCollection,
    parentDocId,
    subCollectionName
  );

  try {
    const querySnapshot = await getDocs(subCollectionRef);
    const documents = querySnapshot.docs.map((doc) => doc.data());
    return documents || [];
  } catch (error) {
    console.error(error);
  }
};

const getSingleSubCollectionDocument = async (
  parentCollection,
  parentDocId,
  subCollectionName,
  queryKey,
  requestId
) => {
  const subCollectionRef = collection(
    db,
    parentCollection,
    parentDocId,
    subCollectionName
  );

  const document = query(
    subCollectionRef,
    where(`${queryKey}`, "==", requestId)
  );
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

export const addDataToSubCollection = async (
  parentCollection,
  parentDocId,
  subCollectionName,
  data
) => {
  const subCollectionRef = doc(
    collection(db, parentCollection, parentDocId, subCollectionName)
  );

  try {
    const updatedData = {
      ...data,
      docRef: subCollectionRef.id,
    };
    await setDoc(subCollectionRef, updatedData);
  } catch (error) {
    console.error(error);
  }
};

export const getTransactionDetail = async (
  requestId,
  documentName,
  queryKey = "docRef"
) => {
  const depositRef = collection(db, `${documentName}`);
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

export const getDocuments = async (requestId, documentName, queryKey) => {
  const depositRef = collection(db, `${documentName}`);
  const document = query(depositRef, where(`${queryKey}`, "==", requestId));
  const documents = [];
  try {
    const querySnapshot = await getDocs(document);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        documents.push(doc.data());
      });
      return documents;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserByID = async (uid) => {
  if (!uid) return false;
  const currentUser = auth.currentUser;
  const userDoc = await getSingleDocument(uid);
  const user = { ...currentUser, ...userDoc };
  return user;
};

export const updateFirebaseDb = async (documentPath, docId, data, callback) => {
  try {
    const docRef = doc(db, documentPath, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    if (error.message.includes("is longer than")) {
      toast.error("File size should be less than 1mb");
      callback();
      return;
    }
    toast.error("Something went wrong. Try again later");
  }
};

export const updateSubCollectionDocument = async (
  parentCollection,
  parentDocId,
  subCollectionName,
  subDocId,
  data
) => {
  const docRef = doc(
    db,
    parentCollection,
    parentDocId,
    subCollectionName,
    subDocId
  );

  try {
    await updateDoc(docRef, data);
  } catch (error) {
    console.Console(error);
  }
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
  userRef
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

            const transactionHistoryDetail =
              await getSingleSubCollectionDocument(
                "users",
                userRef,
                "transactions",
                "id",
                doc.docRef
              );

            await updateSubCollectionDocument(
              "users",
              userRef,
              "transactions",
              transactionHistoryDetail.docRef,
              {
                status: "pending",
              }
            );
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
          const document = await getSingleDocument(doc?.uid);
          const transaction = await getTransactionDetail(
            requestId,
            `${
              requestType === "deposit"
                ? "depositRequests"
                : "withdrawalRequests"
            }`
          );
          await updateFirebaseDb("users", document.docRef, {
            [`${doc.method}`]: increment(
              requestType === "deposit" ? doc.amount : -doc.amount
            ),
            ledger_balance: increment(
              requestType === "deposit" ? doc.amount : -doc.amount
            ),

            withdrawal_balance: increment(
              requestType === "withdrawal" ? doc.amount : 0
            ),
          });

          await updateFirebaseDb(documentId, doc.docRef, {
            isConfirmed: true,
          });

          const transactionHistoryDetail = await getSingleSubCollectionDocument(
            "users",
            userRef,
            "transactions",
            "id",
            doc.docRef
          );

          await updateSubCollectionDocument(
            "users",
            userRef,
            "transactions",
            transactionHistoryDetail.docRef,
            {
              status: "confirmed",
            }
          );

          await emailjs.send("service_q3ofwss", "template_8xsvj38", {
            subject: `${capitalizeWord(requestType)} Request Approval`,
            customer_name: `${capitalizeWord(transaction.name)}`,
            request_type: `${capitalizeWord(requestType)}`,
            transaction_id: `${transaction.docRef.slice(0, 7)}`,
            request_method: `${capitalizeWord(transaction.coin)}`,
            request_amount: `$${formatNumberWithCommas(+transaction.amount)}`,
            to_email: `${transaction.email}`,
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

export const deleteDocumentFromDB = async (documentName, documentRefID) => {
  await deleteDoc(doc(db, documentName, documentRefID));
};

export const processData = (newData, oldData) => {
  // Check if all values in newData are falsy
  const allFalsy = Object.values(newData).every((value) => !value);
  if (allFalsy) return; // Exit if all values are falsy
  // Filter newData to remove falsy values
  const filteredNewData = Object.fromEntries(
    Object.entries(newData).filter(([, value]) => value)
  );
  // Check if filteredNewData is the same as the oldData
  const hasDifferences = Object.entries(filteredNewData).some(
    ([key, value]) => oldData[key] !== value
  );
  if (!hasDifferences) return; // Exit if there are no differences

  // Create a new object with differing values
  const updatedValues = Object.fromEntries(
    Object.entries(filteredNewData).filter(
      ([key, value]) => oldData[key] !== value
    )
  );

  return Object.keys(updatedValues).length > 0 ? updatedValues : null;
};

export const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
};

export const getTimeInMilliseconds = () => Date.now();

export const convertMilliSecondsToFormattedTime = (milliseconds) => {
  const date = new Date(milliseconds);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export const subscribeToSubCollection = (
  parentCollection,
  parentDocId,
  subCollectionName,
  onUpdate
) => {
  const subCollectionRef = collection(
    db,
    parentCollection,
    parentDocId,
    subCollectionName
  );

  // subscribe to real time update
  const unsubscribe = onSnapshot(
    subCollectionRef,
    () => onUpdate(),
    (error) => {
      console.error("Error subscribing to updates: ", error);
    }
  );

  return unsubscribe;
};
