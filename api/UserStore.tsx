import { firebase } from "../firebase";
import "firebase/firestore";

import { User } from "../FirestoreModels";
const db = firebase.firestore();

export const createUser = (user: User) => {
  const db = firebase.firestore();
  db.collection("users")
    .doc(user.id)
    .set({
      id: user.id,
      name: user.name,
      phoneNumber: user.phoneNumber ? user.phoneNumber : null,
      email: user.email ? user.email : null,
      profilePhoto: user.profilePhoto ? user.profilePhoto : null,
    })
    .then(() => {
      console.log("successfully created user", user);
    })
    .catch((err) => console.log(err));
};

export const getUser = async (userId: string) => {
  const db = firebase.firestore();
  var usersRef = db.collection("users").doc(userId);
  const user = await usersRef.get();
  return user.data();
};

export const updateUser = (user: User) => {
  const db = firebase.firestore();
  db.collection("users").doc(user.id).update(user);
};
