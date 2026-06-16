import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
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
    const session = {
      status: true,
      message: "Login successful!",
      user,
      isFirstTimeUser: !userData?.isProfileCompleted,
      isProfileCompleted: userData?.isProfileCompleted,
      userData,
    };

    window.localStorage.setItem("session", JSON.stringify(session));
    window.dispatchEvent(new Event("session-updated"));

    return session;
  } catch (error: any) {
    throw new Error(error?.message || "Login failed. Please try again.");
  }
};

export const logoutUser = async () => {
  try {
    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        isOnline: false,
        lastSeen: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    await signOut(auth);

    // Remove Local Storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("session");
    }

    return {
      status: true,
      message: "Logged out successfully.",
    };
  } catch (error: any) {
    throw new Error(error?.message || "Logout failed. Please try again.");
  }
};
