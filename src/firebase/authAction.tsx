import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { IUserLogin, IUserRegister } from '../types';
import { auth, facebookProvider, googleProvider } from '../firebase';

export const SignUpWithFirebase = async (user: IUserRegister) => {
  try {
    const { email, password, name } = user;
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(res.user, { displayName: name });
  } catch (error) {
    console.log(error);
  }
};

export const loginWithFirebase = async (user: IUserLogin) => {
  try {
    const { email, password, remember, displayName } = user;

    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );

    await signInWithEmailAndPassword(auth, email, password).catch(error =>
      toast.error('Login failed. Please check your email and password !!')
    );
  } catch (error: any) {
    toast.error(error);
  }
};

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider)
      .then(result => {
        console.log(result.user);
        return result.user;
      })
      .catch(error => toast.error('Login by google failed'));
  } catch (error: any) {
    toast.error(error);
  }
};

export const loginWithFacebook = async () => {
  try {
    await signInWithPopup(auth, facebookProvider)
      .then(result => result.user)
      .catch(error => toast.error('Login by facebook failed'));
  } catch (error: any) {
    toast.error(error);
  }
};

export const ForgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
      .then(result => toast.success('Reset password to success'))
      .catch(error => toast.error('Reset password failed'));
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth)
      .then(result => {})
      .catch(error => toast.error('Log out failed'));
  } catch (error) {
    console.log(error);
  }
};
