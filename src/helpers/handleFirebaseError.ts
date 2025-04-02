import { FirebaseError } from 'firebase/app';

export const handleFirebaseError = (error: unknown) => {
  let message = '';

  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No user found with that email. Please sign up first.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-email':
        message = 'The email address is not valid.';
        break;
      case 'auth/weak-password':
        message = 'The password is too weak. Please choose a stronger password.';
        break;
      case 'auth/invalid-credential':
        message = 'Invalid Cridentials';
        break;
      default:
        message = error.message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = String(error);
  }
  return message
};
