import { Request, Response } from 'express';
import { createMatch, getMatchById } from '../models/matches';

export const addMatch = async (req: Request, res: Response) => {
    try {
        const match = await createMatch(req.body);
        return res.status(201).json(match);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error' });
        }
    }
};

export const getMatch = async (req: Request, res: Response) => {
    try {
        const match = await getMatchById(req.params.matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        return res.status(200).json(match);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error' });
        }
    } 
};

