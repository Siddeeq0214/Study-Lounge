import {useEffect, useState} from "react";
import {auth, firestore} from "@/firebase/clientApp";
import {collection, doc, getDocs, query, serverTimestamp, Timestamp} from "firebase/firestore";
import {deleteDoc, getDoc, setDoc} from "@firebase/firestore";
import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import {Calendar_CollectionName, DatePickerEventFormData, EventFormData, IEventInfo} from "@/atoms/calendarAtom";
import {StudentAppUser_CollectionName} from "@/atoms/studentAppUsersAtom";

const useStudentCalendar = () => {
  // helper functions from packages
  const router = useRouter();
  const [authUser, authUserLoading, authUserError] = useAuthState(auth);

  // define hook states
  const [  studentCalLoading, setStudentCalLoading
  ] = useState<boolean>(false);

  useEffect(() => {

  }, [])

  // CREATE
  const createCalEvent = async (calEvent: IEventInfo) => {
    setStudentCalLoading(true);
    // handle create
    if (authUser != null && !authUserLoading){
      try {
        await setDoc(
            doc(
                firestore,
                `${StudentAppUser_CollectionName}/${authUser.uid}/${Calendar_CollectionName}`,
                calEvent._id
            ),
            calEvent
        )
      } catch (e) {
        console.log(e)
      }
    } else {
      console.log("cal error: couldnt load current user during createCalEvent")
    }
    setStudentCalLoading(false);
  }
  // READ
  // UPDATE
  const updateCalEvent = async (currentEvent: IEventInfo, newData: EventFormData) => {
    setStudentCalLoading(true);
    // handle update
    console.log("updating", newData);
    try {
      const docRef = doc(
          firestore,
          `${StudentAppUser_CollectionName}/${authUser.uid}/${Calendar_CollectionName}`,
          currentEvent._id
      )

      const existingDataDoc = await getDoc(docRef);
      const existingData = existingDataDoc.data() as IEventInfo;

      let data : IEventInfo = {
        ...existingData,
        ...newData,
        // updatedAt: serverTimestamp(),
      }
      // update doc
      const res = await setDoc(
          docRef,
          data as any,
          {merge: true}
      )

      console.log("updated cal event");
    } catch (e) {
      console.error(e);
    }
    setStudentCalLoading(false);
  }
  // DELETE
  const deleteCalEvent = async (id: string) => {
    setStudentCalLoading(true);
    try {
      // get doc ref

      const docRef = doc(
          firestore,
          `${StudentAppUser_CollectionName}/${authUser.uid}/${Calendar_CollectionName}`,
          id
      );

      await deleteDoc(docRef);

    } catch (e) {
      console.error(e);
    }
    setStudentCalLoading(false);
  }
  // LIST
  const listCalEvents = async (): Promise<(IEventInfo)[] | null> => {
    let vals = null;
    setStudentCalLoading(true);
    try {
      const documentDataQuery = query(
          collection(
              firestore,
              `${StudentAppUser_CollectionName}/${authUser.uid}/${Calendar_CollectionName}`,
          )
      )
      const snapshot = await getDocs(documentDataQuery);

      vals = snapshot.docs.map((doc) => ({ ...doc.data() }));

      // https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp#todate
      vals = vals.map((el: DatePickerEventFormData) => {
        if (el.start instanceof Timestamp) {
          el.start = el.start.toDate();
        }
        if (el.end instanceof Timestamp) {
          el.end = el.end.toDate();
        }
        return el;
      })
      console.log(vals);
    } catch (e) {
      console.error(e);
    }
    setStudentCalLoading(false);
    return vals;
  }


  return {
    createCalEvent,
    listCalEvents,
    updateCalEvent,
    deleteCalEvent,
  };

};

export default useStudentCalendar;
