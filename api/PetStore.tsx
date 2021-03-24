import { firebase } from "../firebase";
import "firebase/firestore";

import { User, Pet } from "../FirestoreModels";
import { updateUser } from "./UserStore";

export const createPet = (user: User, pet: Pet) => {
  const db = firebase.firestore();
  const docRef = db.collection("pets").doc();
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
      size: pet.size,
      description: pet.description ? pet.description : null,
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

export const getMyPets = async (user: User) => {
  const db = firebase.firestore();
  if (user.pets) {
    var petsRef = db
      .collection("pets")
      .where("id", "in", user.pets)
      .get()
      .then((snapshot) => {
        let pets: Pet[] = [];
        snapshot.forEach((doc) => {
          pets.push(doc.data());
        });
        return pets;
      });
    return await petsRef;
  } else return [];
};
