import { atom } from "recoil";
import {FieldValue, Timestamp} from "firebase/firestore";
import {Event} from "react-big-calendar";


export interface IEventInfo extends Event {
  _id: string | null
  course: string
  description: string
}

export interface EventFormData {
  course: string
  description: string
}

export interface DatePickerEventFormData {
  description: string
  course: string
  start?: Date | Timestamp
  end?: Date | Timestamp
}

export const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString() // iso string
export const getUnixTimestamp = () => Date.now().toString(); // iso string
const convertUnixTimestampToDate = (timestamp: string) => {
  return new Date(parseInt(timestamp));
}

export const Calendar_CollectionName = "calendar";


// interface CalendarState {
//   user?: AppUser | null;
// }
//
// const defaultAppUserState: CalendarState = {
//   user: null
// };
//
// export const appUserState = atom<CalendarState>({
//   key: "appUserState",
//   default: defaultAppUserState
// });
