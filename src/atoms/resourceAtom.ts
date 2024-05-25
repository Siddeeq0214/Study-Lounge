import { atom } from "recoil";
import { FieldValue, Timestamp } from "firebase/firestore";

export interface Resource {
  grantedUsers: any;
  file: File;
  id: string | null;
  name: string;
  url: string;
  createdAt: Date | Timestamp | FieldValue;
  userId: string;
  fileType: string;
}
export const generateResourceId = () => (Math.floor(Math.random() * 10000) + 1).toString(); // Generates a unique ID
export const getUnixTimestamp = () => Date.now().toString(); // Generates a timestamp

export const Resource_CollectionName = "resources"; // Collection name for resources in Firestore

export const resourceListAtom = atom<Resource[]>({
  key: "resourceList",
  default: [],
});