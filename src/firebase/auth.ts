import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    // Create user document
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      emailVerified: false,
      isProfileCompleted: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Send verification email
    await sendEmailVerification(user);

    return {
      status: true,
      message: "Verification email sent. Please check your inbox.",
    };
  } catch (error: any) {
    throw new Error(error?.message || "Signup failed. Please try again.");
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    // Refresh user data
    await user.reload();

    if (!user.emailVerified) {
      return {
        status: false,
        message: "Please verify your email before logging in.",
      };
    }

    const userRef = doc(db, "users", user.uid);

    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User profile not found.");
    }

    await updateDoc(userRef, {
      emailVerified: true,
      isOnline: true,
      lastSeen: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const userData = userDoc.data();

    return {
      status: true,
      message: "Login successful!",
      user,
      isFirstTimeUser: !userData?.isProfileCompleted,
      userData,
    };
  } catch (error: any) {
    throw new Error(error?.message || "Login failed. Please try again.");
  }
};
