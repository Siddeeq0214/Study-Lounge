import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import useResourceManagement from '@/hooks/useResources'; // Import the useResourceManagement hook
import { auth } from '@/firebase/clientApp'; // Import Firebase auth

const ResourceUploadForm: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const { uploadResource } = useResourceManagement(); // Get the uploadResource function
  
  // Function to display success message
  const displaySuccessMessage = () => {
    setMessage('File uploaded successfully!');
    setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
  };

  const displayErrorMessage = (error: string) => {
    setMessage(error);
    setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      // Check if the file type is PDF
      if (file.type !== 'application/pdf') {
        displayErrorMessage('File format not supported. Please upload a PDF file.');
        return;
      }

      // Get the current authenticated user's ID
      const userId = auth.currentUser?.uid;

      if (userId) {
        const metadata = {
          fileType: file.type,
          fileSize: file.size,
          uploaderUserId: userId, // Include uploader user ID in metadata
          // Add any other metadata fields as needed
        };

        await uploadResource(file, file.name, metadata); // Pass metadata to the uploadResource function
        displaySuccessMessage(); // Display success message
      } else {
        console.error("No authenticated user found.");
      }
    }
  };

  return (
    <div>
      {/* Display success or error message */}
      {message && <div style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</div>}

      
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the input field
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button component="span" variant="outlined" color="primary" size="small">
          Upload File
        </Button>
      </label>
    </div>
  );
};

export default ResourceUploadForm;
