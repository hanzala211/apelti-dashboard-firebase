import { AuthContextTypes, IUser } from '@types';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useFirebaseAuth } from '@hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants';
import {
  auth,
  browserLocalPersistence,
  browserSessionPersistence,
  DocumentData,
  setPersistence,
  Timestamp,
} from '@firebaseApp';
import { handleFirebaseError } from '@helpers';

const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [isMainLoading, setIsMainLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const {
    createAccount,
    loginAccount,
    userAuthChange,
    googleLogin,
    updateUserData,
  } = useFirebaseAuth();
  const navigate = useNavigate();
  const [newGoogleAcc, setNewGoogleAcc] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const foundUser = await userAuthChange();
        console.log(foundUser);
        setUserData(foundUser as IUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsMainLoading(false);
      }
    };

    fetchUser();
  }, []);

  // useEffect(() => {
  //   if (socketClient !== null) {
  //     socketClient.emit("sendMessage", {
  //       "receiverId": userData?._id,
  //       "message": "ff fvvvrcccom H"
  //     })
  //     socketClient.on("receiveMessage", (data) => console.log(data))
  //   }
  // }, [socketClient])

  const signup = async (sendData: Record<string, unknown>) => {
    try {
      setIsAuthLoading(true);
      setErrorMessage('');
      const userData = {
        firstName: sendData.firstName,
        lastName: sendData.lastName,
        email: sendData.email,
        password: sendData.password,
        phone: sendData.phone,
        role: 'admin',
      };
      const companyData = {
        companyName: sendData.companyName,
        numberOfEmployees: sendData.numberOfEmployees,
        businessType: sendData.businessType,
      };
      const response = await createAccount(userData, companyData);
      console.log(response);
      if (response) {
        setUserData(response as IUser);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(handleFirebaseError(error));
    } finally {
      setIsMainLoading(false);
      setIsAuthLoading(false);
    }
  };

  const login = async (sendData: Record<string, unknown>) => {
    try {
      setIsAuthLoading(true);
      setErrorMessage('');
      const persistence = isRemember
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistence);
      const response = await loginAccount(sendData);
      console.log(response);
      if (response) {
        setUserData(response as IUser);
        if (response.role === 'admin') {
          navigate('/');
        } else {
          navigate(`${ROUTES.messages}`);
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(handleFirebaseError(error));
    } finally {
      setIsMainLoading(false);
      setIsAuthLoading(false);
    }
  };

  const loginGoogle = async () => {
    try {
      setErrorMessage('');
      const userData = await googleLogin();
      console.log(userData);
      if ((userData as DocumentData)._tokenResponse) {
        setNewGoogleAcc(userData);
        navigate(`${ROUTES.auth}/${ROUTES.company_data}`);
      } else {
        setUserData(userData as IUser);
        if ((userData as DocumentData).role === 'admin') {
          navigate('/');
        } else {
          navigate(`${ROUTES.messages}`);
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(handleFirebaseError(error));
    }
  };

  const updateData = async (companyData: DocumentData, phone: string) => {
    try {
      if (!newGoogleAcc) return;
      setIsAuthLoading(true);
      const userData = {
        _id: newGoogleAcc.user.uid,
        firstName: newGoogleAcc._tokenResponse.firstName,
        lastName: newGoogleAcc._tokenResponse.lastName,
        createdAt: Timestamp.now(),
        phone,
        role: 'admin',
      };
      const updatedUser = await updateUserData(userData, companyData);
      console.log(updatedUser);
      if (updatedUser) {
        setUserData(updatedUser as IUser);
        if ((userData as DocumentData).role === 'admin') {
          navigate('/');
        } else {
          navigate(`${ROUTES.messages}`);
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(handleFirebaseError(error));
    } finally {
      setIsAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        isRemember,
        setIsRemember,
        signup,
        login,
        isMainLoading,
        setIsMainLoading,
        errorMessage,
        isAuthLoading,
        setErrorMessage,
        loginGoogle,
        updateData,
        newGoogleAcc,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextTypes => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('use useAuth inside Auth Provider');
  }
  return context;
};
