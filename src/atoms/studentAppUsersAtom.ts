import { atom } from "recoil";
import {FieldValue} from "firebase/firestore";
export const StudentAppUser_CollectionName = "users";

export interface StudentAppUser {
  studentId: number;
  firstName: string;
  lastName: string;
  dob: string | Date | null;
  email: string;
  id?: string | null;
  createdAt?: FieldValue;
  updatedAt?: FieldValue;
}

export interface RegistrationForm { // create form
  studentId: number;
  firstName: string;
  lastName: string;
  dob: string | Date;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginForm { // create form
  email: string;
  password: string;
}

export interface ForgotPasswordForm { // create form
  email: string;
}

export interface StudentAppUserForm { // edit form for profile page
  studentId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
}

interface StudentAppUserState {
  user?: StudentAppUser | null;
}

const defaultStudentAppUserState: StudentAppUserState = {
  user: null
};

export const studentAppUserState = atom<StudentAppUserState>({
  key: "studentAppUserState",
  default: defaultStudentAppUserState
});
