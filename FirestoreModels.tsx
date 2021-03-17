type userId = string;

// /user/{userId}
export type User = {
  id: userId;
  name: string;
  phoneNumber?: string;
  email?: string;
  profilePhoto?: string;
  pets?: string[];
};

type petId = string;

export type Coordinates = {
  latitude: number;
  longitude: number;
};

// /pet/{petId}
export type Pet = {
  id: petId;
  name: string;
  ownerId: userId;
  photos?: string[];
  chipId?: string;
  petType: string;
  gender: string;
  breed?: string;
  birthDate: Date;
  homeAddress?: Coordinates;
};

type Location = {
  id: string;
  name: string;
  description: string;
  coordinates: Coordinates;
};

type searchId = string;

enum SearchStatus {
  Active = "active",
  Found = "found",
  Closed = "closed",
}

// /search/{searchId}
export type Search = {
  id: searchId;
  petId: petId;
  status: SearchStatus;
  createdAt: Date;
  description: string;
  locations: Location[];
};

enum SearchRole {
  Admin = "admin",
  Member = "member",
}

// /search/{searchId}/members/{userId}
export type SearchMember = {
  id: userId;
  role: SearchRole;
};

type spotId = string;

// /search/{searchId}/spotted/{spotId}
export type PetSpotted = {
  id: spotId;
  userId: userId;
  spottedAt: Date;
  createdAt: Date;
  coordinates: Coordinates;
};

type postId = string;

// /search/{searchId}/feed/{postId}
export type Post = {
  id: postId;
  userId: userId;
  createdAt: Date;
  text: string;
  photo?: string;
};
