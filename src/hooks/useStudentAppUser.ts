import {useEffect, useState} from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword
} from "react-firebase-hooks/auth";
import {auth, firestore} from "@/firebase/clientApp";
import {collection, doc, getDocs, query, serverTimestamp, where} from "firebase/firestore";
import {LoginForm, RegistrationForm, StudentAppUser, StudentAppUser_CollectionName} from "@/atoms/studentAppUsersAtom";
import {setDoc} from "@firebase/firestore";
import {useRouter} from "next/router";
import {createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail} from "@firebase/auth";
import {User} from '@stream-io/video-react-sdk'
import AppUtil from "@/AppUtil";

const useStudentAppUser = () => {
  // helper functions from packages
  const router = useRouter();
  const [
    signInWithEmailAndPassword,
    loginUser,
    loginLoading,
    loginError,
  ] = useSignInWithEmailAndPassword(auth);
  const [
    createAuthUserWithEmailAndPassword,
    createdAuthUser,
    createAuthUserLoading,
    createAuthUserError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [authUser, authUserLoading, authUserError] = useAuthState(auth);
  const [streamUser, setStreamUser] = useState<null|User>(null); // for getstreamio stuff

  // define hook states
  const [appUser, setAppUser] = useState<StudentAppUser|null>(null);
  const [appUserLoading, setAppUserLoading] = useState<boolean>(false);
  const [appUserSubmitMsg, setAppUserSubmitMsg] = useState<string | null>(null);

  useEffect(() => {
    if (authUser){
      hookGetAppUser()
      hookGetStreamUser()
    }
  }, [authUser])

  const hookGetAppUser = (): void  => {
    try {
      getUserByEmail(authUser.email).then((r) => {
        setAppUser(r)
      })
    } catch (e) {
      console.log("error occurred:", e)
    }
  }
  const hookGetStreamUser = (): User => {
    if (streamUser){
      return streamUser
    } else {
      if (authUser){
        try {
          const val: User = {
            id: AppUtil.cleanEmail(authUser.email),
            name: authUser.email,
            image: authUser.photoURL
          }
          setStreamUser(val);
          return val;
        } catch (e) {
          console.log('error occurred generating stream user object: ', e)
        }
      }
    }
  }

  const calculateAge = (dob: Date): number => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Email validation
  const checkEmailExists = async (email: string): Promise<boolean> => {
    const usersRef = collection(firestore, StudentAppUser_CollectionName);
    const q = query(usersRef, where("email", "==", email));
    try {
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (e) {
      console.error("Error checking if email exists: ", e);
      return false;
    }
  };

  const registerUser = async (formData: RegistrationForm): Promise<StudentAppUser | null> => {
    setAppUserLoading(true);

    // Validate age
    const age = calculateAge(new Date(formData.dob));
    if (age < 18) {
      setAppUserSubmitMsg("You must be at least 18 years old to register.");
      setAppUserLoading(false);
      return null;
    }

    // Check if the email already exists
    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) {
      setAppUserSubmitMsg("The email address is already in use.");
      setAppUserLoading(false);
      return null;
    }

    let val: StudentAppUser | null = null;
    let authUser = null;

    // Create auth user
    try {
      authUser = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Send verification email
      await sendEmailVerification(authUser.user);
      console.log("Verification email sent.");

      // Optional: Redirect to a waiting page to verify email
      router.push("/auth/verify-email");
    } catch (error) {
      console.error("Error creating auth user in useStudentAppUser.ts -> registerUser : ", error);
      setAppUserLoading(false);
      return null; // Ensure you return null on failure
    }

    // Create app user in your Firestore database
    try {
      let newStudentAppUser: StudentAppUser = {
        studentId: formData.studentId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob,
        email: formData.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(
          doc(firestore, StudentAppUser_CollectionName, authUser.user.uid), // Replace "StudentAppUser" with your collection name
          newStudentAppUser
      );
      newStudentAppUser.id = authUser.user.uid;
      val = newStudentAppUser;
      // await router.push(`/profile`);
    } catch (e) {
      console.error("Error creating app user:", e);
      setAppUserLoading(false);
      return null; // Ensure you return null on failure
    }

    setAppUserLoading(false);
    return val; // Return the newly created user
  }

  async function getUserByEmail(email: string): Promise<StudentAppUser | null> {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("email", "==", email));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return userDoc.data() as StudentAppUser
      } else {
        console.log("No user found with the provided email");
        return null
      }
    } catch (e) {
      console.error("Error getting documents: ", e);
      return null;
    }
  }
  async function getUserByStudentId(studentId: number): Promise<StudentAppUser | null> {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("studentId", "==", studentId));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Convert Timestamps to Date objects
        const createdAt = userData.createdAt?.toDate() || null;
        const updatedAt = userData.updatedAt?.toDate() || null;

        // Construct the StudentAppUser object
        return {
          studentId: userData.studentId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          dob: userData.dob?.toDate() || null, // Assuming dob is also a Timestamp
          email: userData.email,
          id: userDoc.id,
          createdAt,
          updatedAt
        };
      } else {
        console.log("No user found with the provided studentId");
        return null;
      }
    } catch (error) {
      console.error("Error getting documents: ", error);
      return null;
    }
  }

  const loginUsingStudentEmail = async (formData: LoginForm): Promise<void | null> => {
    setAppUserLoading(true);
    try {
      let loginUser = await signInWithEmailAndPassword(formData.email, formData.password)
      if (loginUser){
        setAppUserSubmitMsg("Successfully logged in!")
        await router.push(`/profile`)
      } else {
        setAppUserSubmitMsg("error logging in -> invalid creds")
      }
    } catch (loginError) {
      setAppUserSubmitMsg(loginError.message)
    }
    // if it works, redirect to profile page, else, throw error, prolly in toast
    setAppUserSubmitMsg("Successfully logged in!")
    setAppUserLoading(false);
    await router.push(`/profile`)
  }

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email: ", error);
      alert("Failed to send password reset email. Please try again.");
    }
  };


  return {
    appUser,
    appUserLoading,
    appUserSubmitMsg,
    registerUser,
    // updateAppUser,
    loginUsingStudentEmail,
    forgotPassword,
    streamUser,
  };

};

export default useStudentAppUser;
