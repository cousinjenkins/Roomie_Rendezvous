import { Request, Response } from 'express';
import * as DisputesModel from '../models/disputes';

export const addDispute = async (req: Request, res: Response) => {
    try {
        const dispute = await DisputesModel.createDispute(req.body);
        res.status(201).json(dispute);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};

export const resolveADispute = async (req: Request, res: Response) => {
    try {
        const { dispute_id } = req.params;
        const { resolution } = req.body;
        const dispute = await DisputesModel.resolveDispute(dispute_id, resolution);
        res.status(200).json(dispute);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};

export const getAllDisputes = async (req: Request, res: Response) => {
    try {
        const disputes = await DisputesModel.listDisputes();
        res.status(200).json(disputes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
    }
};
