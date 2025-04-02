import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  DocumentData,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  Timestamp,
} from '@firebaseApp';
import {
  addDocument,
  addDocumentWithId,
  getAllDocumentsOFCollection,
  getDocument,
} from '@helpers';

export const useFirebaseAuth = () => {
  const createAccount = async (
    userData: DocumentData,
    companyData: DocumentData
  ) => {
    try {
      const allUsers = await getAllDocumentsOFCollection('users');
      if (allUsers?.some((item) => item.email === userData.email)) {
        throw 'User with this Email already Exists';
      }
      if (allUsers?.some((item) => item.phone === userData.phone)) {
        throw 'User with this Phone Number already Exists';
      }
      const createUser = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const { password, ...removedData } = userData;
      const userRef = doc(db, 'users', createUser.user.uid);
      const addCompany = await addDocument('company', {
        companyName: companyData.companyName,
        admin: userRef,
        users: [],
        numberOfEmployees: companyData.numberOfEmployees,
        businessType: companyData.businessType,
      });
      const companyRef = doc(db, 'company', addCompany.id);
      await addDocumentWithId('users', createUser.user.uid, {
        createdAt: Timestamp.now(),
        _id: createUser.user.uid,
        company: companyRef,
        ...removedData,
      });
      const getUser = await getDocument('users', createUser.user.uid);
      console.log(getUser);
      if (getUser) return getUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const loginAccount = async (data: DocumentData) => {
    try {
      const loginUser = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const getUser = await getDocument('users', loginUser.user.uid);
      return getUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const userAuthChange = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (user) {
          try {
            const userData = await getDocument('users', user.uid);
            resolve(userData);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(null);
        }
      });
    });
  };

  const googleLogin = async () => {
    try {
      const googleCredential = new GoogleAuthProvider()
      const response = await signInWithPopup(auth, googleCredential);
      const userExists = await getDocument('users', response.user.uid);
      if (!userExists) {
        console.log('New user:', response.user);
        return response
      } else {
        return userExists
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const updateUserData = async (userData: DocumentData, companyData: DocumentData) => {
    try {
      const userRef = doc(db, "users", userData._id)
      const companyDoc = await addDocument("company", { ...companyData, company: userRef })
      const companyRef = doc(db, "company", companyDoc.id)
      await addDocumentWithId("users", userData._id, {
        company: companyRef,
        ...userData
      })
      const getUser = await getDocument("users", userData._id)
      return getUser
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const logout = async () => {
    await signOut(auth);
  };

  return {
    createAccount,
    loginAccount,
    userAuthChange,
    logout,
    googleLogin,
    updateUserData
  };
};
