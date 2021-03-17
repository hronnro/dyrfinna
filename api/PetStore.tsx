import { firebase } from "../firebase";
import "firebase/firestore";

import { User, Pet } from "../FirestoreModels";
import { updateUser } from "./UserStore";

export const createPet = (user: User, pet: Pet) => {
  const db = firebase.firestore();
  const docRef = db.collection("pets").doc();
  console.log("ID", docRef.id);
  docRef
    .set({
      id: docRef.id,
      name: pet.name,
      ownerId: user.id,
      chipId: pet.chipId ? pet.chipId : null,
      petType: pet.petType,
      gender: pet.gender,
      breed: pet.breed ? pet.breed : null,
      birthdate: pet.birthDate,
      homeAddress: pet.homeAddress,
    })
    .then(() => {
      console.log("successfully added pet", pet);
      const updatedUser: User = user.pets
        ? { ...user, pets: [...user.pets, docRef.id] }
        : { ...user, pets: [docRef.id] };
      updateUser(updatedUser);
    })
    .catch((err) => console.log(err));
};
