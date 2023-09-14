import { Request, Response } from 'express';
import { createMessage, getMessagesForReceiver, getUserIdFromProfileId } from '../models/messages';
import { ExtendedRequest } from '../types'

export const sendMessage = async (req: ExtendedRequest, res: Response): Promise<Response> => {
    console.log("Inside sendMessage function. Received data:", req.body);

    const { receiver_id: receiverProfileId, content } = req.body;
    
    // Get the actual user ID associated with the profile ID
    const receiverUserId = await getUserIdFromProfileId(receiverProfileId);

    if (!receiverUserId) {
        return res.status(404).json({ message: "Receiver not found" });
    }

    try {
        const sender_id = req.user?.userId; // Extracting user_id from JWT payload
        if (!sender_id) {
            return res.status(401).json({ message: "User not authenticated." });
        }
        
        const messageData = {
            content,
            sender_id,
            receiver_id: receiverUserId // <-- use the user ID here
        };
        
        const message = await createMessage(messageData);
        console.log("Message saved successfully. Saved data:", message);
        return res.status(201).json(message);
    } catch (error) {
        console.error(error); // log error for debugging
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error', error: 'An unknown error occurred' });
        }
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        // to ensure the receiver_id is provided
        if(!req.query.receiver_id) {
            return res.status(400).json({ message: "receiver_id query parameter is required" });
        }
        const messages = await getMessagesForReceiver(req.query.receiver_id as string);
        return res.status(200).json(messages);
    } catch (error) {
        console.error(error); // log error for debugging
        if (typeof error === 'object' && error !== null && 'message' in error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error', error: 'An unknown error occurred' });
        }
    }
};
