import { Request, Response } from 'express';
import { createProfile, getProfileById, updateProfile, deleteProfile, getAllProfilesModel, getCurrentProfileModel } from '../models/profiles';

export const getProfile = async (req: Request, res: Response) => {
    try {
        const profile = await getProfileById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        const profileComplete = Boolean(profile.first_name && profile.last_name && profile.bio && profile.date_of_birth && profile.gender && profile.hobbies && profile.language_spoken && profile.looking_to_move_date && profile.pet && profile.smoker && profile.university);
        return res.status(200).json({ ...profile, profileComplete }); // ensuring profile is complete
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error', error: 'An unknown error occurred' });
        }
    }
};

export const getAllProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await getAllProfilesModel();
        return res.status(200).json(profiles);
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error', error: 'An unknown error occurred' });
        }
    }
};


export const addProfile = async (req: Request, res: Response) => {
    console.log((req as any).user.userId)

    try {
        const profileData = {
            ...req.body,
            user_id: (req as any).user.userId
        };        
        // console.log("Received profile data:", req.body);

        console.log(profileData)

        const profile = await createProfile(profileData);
        return res.status(201).json(profile);
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error', error: 'An unknown error occurred' });
        }
    }
};

export const updateExistingProfile = async (req: Request, res: Response) => {
    try {
        const updatedProfile = await updateProfile(req.params.id, req.body);
        if (!updatedProfile) {
            return res.status(400).json({ message: 'Failed to update profile' });
        }
        return res.status(200).json(updatedProfile);
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error', error: 'An unknown error occurred' });
        }
    }
};

export const removeProfile = async (req: Request, res: Response) => {
    try {
        const success = await deleteProfile(req.params.id);
        if (!success) {
            return res.status(400).json({ message: 'Failed to delete profile' });
        }
        return res.status(204).send();
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error', error: 'An unknown error occurred' });
        }
    }
};

export const getCurrentProfile = async (req: Request, res: Response) => {
    console.log("Inside getCurrentProfile Controller");
    try {
        const userId = (req as any).user.userId;
        const profile = await getCurrentProfileModel(userId);

        if (!profile) {
            return res.status(404).json({ message: 'Current user profile not found' });
        }
        return res.status(200).json(profile);
    } catch (error) {
        console.error("Error in getCurrentProfile:", error);
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error', error: 'An unknown error occurred' });
        }
    }
};
