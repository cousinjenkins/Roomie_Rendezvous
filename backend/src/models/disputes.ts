import { Pool } from 'pg';
import { Dispute } from '../types';

const pool = new Pool(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT)
      }
);
export const createDispute = async (dispute: Dispute): Promise<Dispute> => {
    const result = await pool.query(
        `INSERT INTO Disputes (reporting_user_id, reported_user_id, reason, status, date_reported)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [dispute.reporting_user_id, dispute.reported_user_id, dispute.reason, 'processing', new Date()]
    );
    return result.rows[0];
};

export const resolveDispute = async (dispute_id: string, resolution: string): Promise<Dispute> => {
    const result = await pool.query(
        `UPDATE Disputes SET resolution = $2, status = 'resolved', date_resolved = $3 WHERE dispute_id = $1 RETURNING *`,
        [dispute_id, resolution, new Date()]
    );
    return result.rows[0];
};

export const listDisputes = async (): Promise<Dispute[]> => {
    const result = await pool.query(`SELECT * FROM Disputes`);
    return result.rows;
};
