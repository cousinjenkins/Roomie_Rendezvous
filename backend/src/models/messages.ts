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


export const getMessagesForReceiver = async (receiverId: string): Promise<Message[]> => {
    const result = await pool.query('SELECT * FROM Messages WHERE receiver_id = $1', [receiverId]);
    return result.rows;
};

// ... other functions for additional features
