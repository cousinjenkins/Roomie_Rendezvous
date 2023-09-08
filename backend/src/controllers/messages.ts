import { Request, Response } from 'express';
import { createMessage, getMessagesForReceiver } from '../models/messages';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const message = await createMessage(req.body);
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
