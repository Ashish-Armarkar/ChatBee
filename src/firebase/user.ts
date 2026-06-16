import { doc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const updateUser = async (data, uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User profile not found.");
    }

    await updateDoc(userRef, {
      ...data,
      isProfileCompleted: true,
      updatedAt: serverTimestamp(),
    });

    return {
      status: true,
      message: "Profile updated successfully.",
    };
  } catch (error: any) {
    throw new Error(
      error?.message || "Profile update failed. Please try again.",
    );
  }
};

export const getUser = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User profile not found.");
    }

    return {
      status: true,
      message: "Profile updated successfully.",
      data: userDoc.data(),
    };
  } catch (error: any) {
    throw new Error(
      error?.message || "Profile update failed. Please try again.",
    );
  }
};
