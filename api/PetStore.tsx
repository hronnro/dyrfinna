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
      birthdate: pet.birthdate,
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

export const updatePet = (user: User, pet: Pet) => {
  const db = firebase.firestore();
  const docRef = db.collection("pets").doc(pet.id);
  docRef
    .update({
      id: docRef.id,
      name: pet.name,
      ownerId: user.id,
      chipId: pet.chipId ? pet.chipId : null,
      petType: pet.petType,
      gender: pet.gender,
      breed: pet.breed ? pet.breed : null,
      birthdate: pet.birthdate,
      homeAddress: pet.homeAddress,
      size: pet.size,
      description: pet.description ? pet.description : null,
    })
    .then(() => {
      console.log("successfully updated pet", pet);
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
            const data = doc.data();
            console.log("data", data, data.birthdate.seconds);
            const petData = {
              ...data,
              // this is needed since firebase returns a timestamp and not a date object
              // https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
              birthdate: new Date(data.birthdate?.seconds * 1000),
            };
            pets.push(petData);
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
