// taskAtom.ts
import { atom } from "recoil";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const taskCollectionName = "tasks"; // Task collection name

export const taskAtom = atom<Task[]>({
  key: 'taskAtom',
  default: [],
});