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
    // Firebase only allows to query for 10 items with the `with - in` clause.
    // To get around that we split the pets id into chunks of 10 and then combine
    // the results at the end
    const petChunks = chunk(user.pets, 10);
    const promises = petChunks.map((petChunk: string[]) => {
      return db
        .collection("pets")
        .where("id", "in", petChunk)
        .get()
        .then((snapshot) => {
          let pets: Pet[] = [];
          snapshot.forEach((doc) => {
            pets.push(doc.data());
          });
          return pets;
        });
    });
    const allPets = await Promise.all(promises);
    return allPets.flat();
  } else return [];
};

/**
 * A function that splits an array into chunks with the maximum size of "size"
 * Example: chunk([1,2,3,4,5], 2) => [[1,2], [3,4], [5]]
 */
function chunk(array: any[], size: number) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}
