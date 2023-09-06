import { Pool } from 'pg';
import { Profile } from '../types';

const pool = new Pool(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT)
      }
);

export const getProfileById = async (id: string): Promise<Profile | null> => {
    const result = await pool.query('SELECT * FROM profiles WHERE profile_id = $1', [id]);
    return result.rows[0] || null;
};

export const createProfile = async (profile: Profile): Promise<Profile> => {
    const result = await pool.query(
        'INSERT INTO profiles (user_id, first_name, last_name, gender, date_of_birth, bio, smoker, pet, hobbies, language_spoken, looking_to_move_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', 
        [profile.user_id, profile.first_name, profile.last_name, profile.gender, profile.date_of_birth, profile.bio, profile.smoker, profile.pet, profile.hobbies, profile.language_spoken, profile.looking_to_move_date]
    );
    return result.rows[0];
};

export const updateProfile = async (id: string, profileData: Profile): Promise<Profile | null> => {
    const result = await pool.query(
        'UPDATE profiles SET user_id = $1, first_name = $2, last_name = $3, gender = $4, date_of_birth = $5, bio = $6, smoker = $7, pet = $8, hobbies = $9, language_spoken = $10, looking_to_move_date = $11 WHERE profile_id = $12 RETURNING *', 
        [profileData.user_id, profileData.first_name, profileData.last_name, profileData.gender, profileData.date_of_birth, profileData.bio, profileData.smoker, profileData.pet, profileData.hobbies, profileData.language_spoken, profileData.looking_to_move_date, id]
    );

    if (result.rowCount === 0) {
        return null;
    }
    return result.rows[0];
};

export const deleteProfile = async (id: string): Promise<boolean> => {
    const result = await pool.query('DELETE FROM profiles WHERE profile_id = $1', [id]);
    return result.rowCount > 0;
};



