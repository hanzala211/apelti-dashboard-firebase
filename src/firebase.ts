import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	getDocs,
	getDoc,
	setDoc,
	addDoc,
	query,
	Query,
	where,
	Timestamp,
	updateDoc,
	deleteDoc,
	doc,
	collection,
	onSnapshot,
	FieldValue,
	WhereFilterOp,
	DocumentData,
	DocumentReference
} from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut,
	setPersistence,
	browserLocalPersistence,
	browserSessionPersistence,
} from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions, httpsCallable } from "firebase/functions"
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

connectFunctionsEmulator(functions, "localhost", 5001);

export {
	httpsCallable,
	db,
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	onAuthStateChanged,
	signOut,
	getDocs,
	getDoc,
	setDoc,
	addDoc,
	query,
	Query,
	where,
	Timestamp,
	updateDoc,
	deleteDoc,
	doc,
	collection,
	onSnapshot,
	setPersistence,
	browserLocalPersistence,
	browserSessionPersistence,
	GoogleAuthProvider,
	functions
};

export type { WhereFilterOp, FieldValue, DocumentData, DocumentReference };
