import { Pool } from 'pg';
import { Message } from '../types';  // You might want to define types in a separate file

const pool = new Pool(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT)
      }
);

export const createMessage = async (message: Message): Promise<Message> => {
    const result = await pool.query(
        'INSERT INTO Messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *',
        [message.sender_id, message.receiver_id, message.content]
    );
    return result.rows[0];
};


export const getMessagesForReceiver = async (receiverProfileId: string): Promise<Message[]> => {
    const query = `
        SELECT m.* 
        FROM Messages m 
        JOIN profiles p ON m.receiver_id = p.user_id 
        WHERE p.profile_id = $1;
    `;

    const result = await pool.query(query, [receiverProfileId]);
    return result.rows;
};


export const getUserIdFromProfileId = async (profileId: string): Promise<string | null> => {
    const query = `
        SELECT u.user_id 
        FROM users u 
        JOIN profiles p ON u.user_id = p.user_id 
        WHERE p.profile_id = $1;
    `;

    const result = await pool.query(query, [profileId]);
    
    if (result.rows.length > 0) {
        return result.rows[0].user_id;
    } else {
        return null;
    }
}

