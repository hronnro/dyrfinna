import { firebase } from '../firebase';
import 'firebase/firestore';

import { User } from '../FirestoreModels';

export const createUser = (user: User) => {
    const db = firebase.firestore();
    db.collection("users").doc(user.id).set({
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber ? user.phoneNumber : null,
        email: user.email ? user.email : null,
        profilePhoto: user.profilePhoto ? user.profilePhoto : null
    });
}

export const getUser = async (userId: string) => {
    const db = firebase.firestore();
    var usersRef = db.collection("users").doc(userId);
    const user = await usersRef.get();
    return user.data();
}