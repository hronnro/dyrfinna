import { firebase } from '../firebase';

import { User } from '../FirestoreModels';

const db = firebase.firestore();
export const createUser = (user: User) => {
    db.collection("users").doc(user.id).set({
        id: user.id,
        name: user.name
    });
}