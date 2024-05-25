import { useEffect, useState } from "react";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { taskCollectionName, Task, taskAtom } from "@/atoms/taskAtom";
import { useRecoilState } from "recoil";
import { StudentAppUser_CollectionName } from "@/atoms/studentAppUsersAtom";

const useTask = () => {
  const [taskLoading, setTaskLoading] = useState<boolean>(false);
  const [authUser, authUserLoading] = useAuthState(auth);
  const [tasks, setTasks] = useRecoilState(taskAtom); // Use recoil state instead of local state

  useEffect(() => {
    const fetchData = async () => {
      if (authUser && !authUserLoading) {
        setTaskLoading(true);
        try {
          const querySnapshot = await getDocs(collection(firestore, `${StudentAppUser_CollectionName}/${authUser.uid}/${taskCollectionName}`));
          const fetchedTasks: Task[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            fetchedTasks.push({
              id: doc.id,
              title: data.title,
              description: data.description,
              completed: data.completed || false,
            });
          });
          setTasks(fetchedTasks); // Update tasks in recoil state
        } catch (error) {
          console.error("Error fetching tasks: ", error);
        }
        setTaskLoading(false);
      }
    };

    fetchData();
  }, [authUser, authUserLoading, setTasks]);

  const addTask = async (task: Task) => {
    if (authUser && !authUserLoading) {
      try {
        await setDoc(doc(collection(firestore, `${StudentAppUser_CollectionName}/${authUser.uid}/${taskCollectionName}`)), task);
        setTasks([...tasks, task]); // Update tasks in recoil state
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  const deleteTask = async (taskId: string) => {
    if (authUser && !authUserLoading) {
      try {
        await deleteDoc(doc(collection(firestore, `${StudentAppUser_CollectionName}/${authUser.uid}/${taskCollectionName}`), taskId));
        setTasks(tasks.filter(task => task.id !== taskId)); // Update tasks in recoil state
      } catch (error) {
        console.error("Error deleting task: ", error);
      }
    }
  };

  const updateTask = async (taskId: string, updatedTask: Task) => {
    if (authUser && !authUserLoading) {
      try {
        await setDoc(doc(collection(firestore, `${StudentAppUser_CollectionName}/${authUser.uid}/${taskCollectionName}`), taskId), updatedTask);
        setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task))); // Update tasks in recoil state
      } catch (error) {
        console.error("Error updating task: ", error);
      }
    }
  }

  return {
    tasks,
    taskLoading,
    addTask,
    deleteTask,
    updateTask
  };
};

export default useTask;
