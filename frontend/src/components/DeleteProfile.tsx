import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

type DeleteProfileProps = {
    profileId: string;
    onDeleteSuccess: () => void;
    onClose: () => void;
    open: boolean;
};

const DeleteProfile: React.FC<DeleteProfileProps> = ({ profileId, onDeleteSuccess, onClose, open }) => {

    const handleDelete = async () => {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            console.error('Token not found. Please login again.');
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/profiles/${profileId}`, {
                method: 'DELETE',
                headers: headers
            });

            if (!response.ok) {
                throw new Error("Failed to delete profile.");
            }

            onDeleteSuccess();
        } catch (error) {
            console.error("An error occurred while deleting the profile.", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this profile? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="secondary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteProfile;
