import {
  addDoc,
  collection,
  db,
  doc,
  getDoc,
  updateDoc,
  FieldValue,
  Timestamp,
  deleteDoc,
  onSnapshot,
  WhereFilterOp,
  query,
  where,
  setDoc,
  getDocs,
  DocumentData,
} from '@firebaseApp';

export const addDocument = async (collectionName: string, data: unknown) => {
  const addItem = await addDoc(collection(db, collectionName), data);
  return addItem;
};

export const addDocumentWithId = async (
  collectionName: string,
  documentId: string,
  data: unknown
) => {
  const setItem = await setDoc(doc(db, collectionName, documentId), data);
  return setItem;
};

export const getDocument = async (
  collectionName: string,
  documentId: string
) => {
  const docSnap = await getDoc(doc(db, collectionName, documentId));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getDocumentWithFilter = async (collectionName: string, field: string, operator: WhereFilterOp, value: string) => {
  const q = query(collection(db, collectionName), where(field, operator, value))
  const docSnap = await getDocs(q)
  if (docSnap.empty) {
    return null;
  }

  return docSnap.docs.map(doc => doc.data());
}

export const getAllDocumentsOFCollection = async (
  collectionName: string,
) => {
  const docSnap = await getDocs(collection(db, collectionName));
  if (!docSnap.empty) {
    const items = docSnap.docs.map((item) => item.data())
    return items
  } else {
    return null;
  }
};

export const updateDocument = async (
  collectionName: string,
  documentId: string,
  data: { [x: string]: FieldValue | Partial<unknown> | undefined }
) => {
  await updateDoc(doc(db, collectionName, documentId), {
    updatedAt: Timestamp.now(),
    ...data,
  });
};

export const deleteDocument = async (
  collectionName: string,
  documentId: string
) => {
  await deleteDoc(doc(db, collectionName, documentId));
};

export const getRealTimeDataWithFilter = async (
  collectionName: string,
  onUpdate: (data: DocumentData) => void,
  field: string,
  operator: WhereFilterOp,
  value: string
) => {
  const q = query(
    collection(db, collectionName),
    where(field, operator, value)
  );
  const unsubscribe = onSnapshot(q, (querySnapShot) => {
    if (!querySnapShot.empty) {
      const data = querySnapShot.docs.map((item) => ({
        _id: item.id,
        ...item.data(),
      }));
      onUpdate(data);
    }
  });
  return unsubscribe;
};
