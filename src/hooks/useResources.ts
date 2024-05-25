import { useEffect, useState } from "react";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { collection, doc, getDocs, setDoc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject, getMetadata, updateMetadata } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { StudentAppUser_CollectionName, StudentAppUser } from "@/atoms/studentAppUsersAtom";
import { Resource, Resource_CollectionName } from "@/atoms/resourceAtom";

const useResourceManagement = () => {
  const [authUser, authUserLoading, authUserError] = useAuthState(auth);
  const [resourceLoading, setResourceLoading] = useState<boolean>(false);

  // CREATE
  const uploadResource = async (file: File, name: string, metadata: any) => {
    setResourceLoading(true);
    try {
      const resourceRef = ref(storage, `public_resources/${file.name}`);
      await uploadBytes(resourceRef, file, { customMetadata: metadata }); // Pass metadata to uploadBytes function
      const downloadURL = await getDownloadURL(resourceRef);
      
      // Get the current authenticated user's ID
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
  
        // Save the resource with the current user's ID
        const resourceDocRef = doc(firestore, `${Resource_CollectionName}/${file.name}`);
        await setDoc(resourceDocRef, {
          name,
          url: downloadURL,
          createdAt: new Date(),
          userId: userId, // Set the uploader's user ID
          ...metadata // Include additional metadata
        });
        
        console.log("File uploaded successfully!");
      } else {
        console.error("No authenticated user found.");
      }
    } catch (error) {
      console.error("Error uploading resource:", error);
    }
    setResourceLoading(false);
  };
  

  // READ
  const listResources = async (): Promise<Resource[] | null> => {
    let resources = null;
    setResourceLoading(true);
    try {
      const resourcesListRef = ref(storage, `public_resources`);
      const resourcesList = await listAll(resourcesListRef);
      resources = await Promise.all(resourcesList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        const metadata = await getMetadata(item);
        const name = metadata.customMetadata.name || item.name;
        const fileType = metadata.customMetadata.fileType; // Extract fileType from metadata
        return { id: item.name, name, url, createdAt: new Date(), userId: "public", fileType }; // Include fileType in resource object
      }));
      console.log("Resources retrieved successfully:", resources);
    } catch (error) {
      console.error("Error listing resources:", error);
    }
    setResourceLoading(false);
    return resources;
  };

   // READ resources uploaded by the current user
   const listUserResources = async (): Promise<Resource[] | null> => {
    let userResources = null;
    setResourceLoading(true);
    try {
      // Get the current authenticated user's ID
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const userResourcesRef = ref(storage, `public_resources`);
        const userResourcesList = await listAll(userResourcesRef);
        userResources = await Promise.all(userResourcesList.items.map(async (item) => {
          const metadata = await getMetadata(item);
          const uploaderUserId = metadata.customMetadata.uploaderUserId;
          if (uploaderUserId === userId) {
            const url = await getDownloadURL(item);
            const name = metadata.customMetadata.name || item.name;
            const fileType = metadata.customMetadata.fileType;
            return { id: item.name, name, url, createdAt: new Date(), userId: "public", fileType };
          }
          return null;
        }));
        userResources = userResources.filter(resource => resource !== null);
        console.log("User's resources retrieved successfully:", userResources);
      } else {
        console.error("No authenticated user found.");
      }
    } catch (error) {
      console.error("Error listing user's resources:", error);
    }
    setResourceLoading(false);
    return userResources;
  };


  // UPDATE
  const updateResource = async (resourceId: string, newData: Partial<Resource>, onUpdateSuccess: () => void) => {
    setResourceLoading(true);
    try {
      // Get the authenticated user's ID
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("No authenticated user found.");
      }
  
      // Retrieve the uploader's ID from the file's metadata
      const resourceRef = ref(storage, `public_resources/${resourceId}`);
      const metadata = await getMetadata(resourceRef);
      const uploaderUserId = metadata.customMetadata.uploaderUserId;
  
      // Compare the uploader's ID with the authenticated user's ID
      if (userId === uploaderUserId) {
        // Update resource data in Firestore
        const resourceDocRef = doc(firestore, `${Resource_CollectionName}/${resourceId}`);
        await updateDoc(resourceDocRef, newData);
  
        // Update file metadata in Firebase Storage
        await updateMetadata(resourceRef, { customMetadata: { ...metadata.customMetadata, name: newData.name } });
  
        console.log("File updated successfully!");
  
        // Notify the component that the update is successful
        onUpdateSuccess();
      } else {
        throw new Error("User does not have permission to update this resource.");
      }
    } catch (error) {
      console.error("Error updating resource:", error);
      throw error;
    }
    setResourceLoading(false);
  };



  // DELETE
   const deleteResource = async (resourceId: string) => {
    setResourceLoading(true);
    try {
      // Get the authenticated user's ID
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("No authenticated user found.");
      }

      // Retrieve the uploader's ID from the file's metadata
      const resourceRef = ref(storage, `public_resources/${resourceId}`);
      const metadata = await getMetadata(resourceRef);
      const uploaderUserId = metadata.customMetadata.uploaderUserId;

      // Compare the uploader's ID with the authenticated user's ID
      if (userId === uploaderUserId) {
        // Delete the file from Firebase Storage
        await deleteObject(resourceRef);

        // Delete the corresponding document from Firestore
        const resourceDocRef = doc(firestore, `${Resource_CollectionName}/${resourceId}`);
        await deleteDoc(resourceDocRef);

        console.log("File deleted successfully!");
      } else {
        throw new Error("User does not have permission to delete this resource.");
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      throw error;
    }
    setResourceLoading(false);
  };

  return {
    uploadResource,
    listResources,
    listUserResources,
    updateResource,
    deleteResource,
    resourceLoading,
  };
};

export default useResourceManagement;
