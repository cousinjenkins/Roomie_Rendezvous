import { Pool } from 'pg';
import { Match } from '../types';

const pool = new Pool(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT)
      }
);

export const createMatch = async (match: Match): Promise<Match> => {
    const result = await pool.query(
        'INSERT INTO Matches (user1_id, user2_id, match_score) VALUES ($1, $2, $3) RETURNING *',
        [match.user1_id, match.user2_id, match.match_score]
    );
    return result.rows[0];
};


export const getMatchById = async (matchId: string): Promise<Match> => {
    const result = await pool.query('SELECT * FROM Matches WHERE match_id = $1', [matchId]);
    return result.rows[0];
};

// Add more models as required...
