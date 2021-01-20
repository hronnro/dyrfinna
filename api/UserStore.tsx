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