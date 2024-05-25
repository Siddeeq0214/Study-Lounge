import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import useResourceManagement from '@/hooks/useResources'; // Import the updated useResourceManagement hook
import { Resource } from '@/atoms/resourceAtom';

const ResourceList: React.FC = () => {
  const { listResources, listUserResources, deleteResource, updateResource } = useResourceManagement();
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [editFileName, setEditFileName] = useState('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredByUser, setFilteredByUser] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [manageMode, setManageMode] = useState<boolean>(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(null);


  useEffect(() => {
    handleShowAll()
  }, []);

  const fetchResources = async () => {
    try {
      const fetchedResources = await listResources();
      if (fetchedResources) {
        setResources(fetchedResources);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  // Function to display success or error messages
  const displayMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
  };

  const handleDelete = (resource: Resource) => {
    setResourceToDelete(resource);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    if (resourceToDelete) {
      try {
        await deleteResource(resourceToDelete.id);
        setResources(prevResources => prevResources.filter(resource => resource.id !== resourceToDelete?.id));
        displayMessage('File deleted successfully!');
      } catch (error) {
        console.error('Error deleting resource:', error);
        displayMessage('Error deleting resource!');
      }
    }
    setDeleteConfirmationOpen(false);
  };

  const handleEdit = async () => {
    if (selectedResource && editFileName.trim() !== '') {
      try {
        await updateResource(selectedResource.id, { name: editFileName }, () => {
          // Update resource list state with the new name
          setResources(prevResources =>
              prevResources.map(resource =>
                  resource.id === selectedResource.id ? { ...resource, name: editFileName } : resource
              )
          );
          displayMessage('File updated successfully!');
        });
        setEditFileName('');
        setSelectedResource(null);
      } catch (error) {
        console.error('Error updating resource:', error);
        displayMessage('Error updating resource!');
      }
    }
  };

  const handleViewFile = (url: string) => {
    window.open(url, '_blank');
  };

  const closeFileViewer = () => {
    setViewFile(null);
  };

  const handleManageResources = async () => {
    try {
      const userResources = await listUserResources(); // Change 'userResources' to 'listUserResources'
      if (userResources) {
        setResources(userResources);
        setManageMode(false);
      }
    } catch (error) {
      console.error('Error fetching user resources:', error);
    }
  };

  const handleShowAll = async () => {
    try {
      const userResources = await listResources(); // Change 'userResources' to 'listUserResources'
      if (userResources) {
        setResources(userResources);
        setManageMode(true);
      }
    } catch (error) {
      console.error('Error fetching user resources:', error);
    }
  };

  const filteredResources = filteredByUser
      ? resources.filter(resource => resource.userId === 'public')
      : resources.filter(resource =>
          resource.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
      <div>
        {/* Display success or error message */}
        {message && <div style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</div>}
        <TextField
            label="Search Files"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
        />
        <Button onClick={handleManageResources} variant="contained" color="primary" style={{ margin: '0 10px' }}>
          Manage My Files
        </Button>
        <Button onClick={handleShowAll} variant="contained" color="primary">
          View All Files
        </Button>
        <List>
          {filteredResources.map(resource => (
              <ListItem key={resource.id} sx={{ border: '1px solid #ccc', borderRadius: '8px', marginBottom: '8px' }}>
                <ListItemText primary={resource.name} secondary={`Type: ${resource.fileType}`} /> {/* Display file extension */}
                <Button onClick={() =>  handleViewFile(resource.url)} color="primary">View</Button>
                {!manageMode && (
                    <React.Fragment>
                      <Button onClick={() => handleDelete(resource)} color="secondary">Delete</Button>
                      <Button onClick={() => setSelectedResource(resource)}>Edit</Button>
                    </React.Fragment>
                )}
              </ListItem>
          ))}
        </List>
        <Dialog open={Boolean(selectedResource)} onClose={() => setSelectedResource(null)}>
          <DialogTitle>Edit File Name</DialogTitle>
          <DialogContent>
            <TextField
                label="File Name"
                value={editFileName}
                onChange={(e) => setEditFileName(e.target.value)}
                variant="outlined"
                fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEdit} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={() => setSelectedResource(null)} variant="outlined" color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete the file "{resourceToDelete?.name}"?
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmDelete} color="primary">
              Confirm
            </Button>
            <Button onClick={() => setDeleteConfirmationOpen(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
};

export default ResourceList;
function setViewFile(arg0: null) {
  throw new Error('Function not implemented.');
}

