import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  });

export const createUser = async (userData: any) => {
  console.log(userData);
  console.log('Password to hash:', userData.password);
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const { username, email, profile_picture, last_login, is_admin } = userData;
  const result = await pool.query(`
  INSERT INTO users (user_id, username, email, password, profile_picture, last_login, is_admin) 
  VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6) RETURNING *
`, [username, email, hashedPassword, profile_picture, last_login, is_admin]);

  return result.rows[0];
};

export const updateUser = async (id: string, userData: any) => {
  const columns: string[] = [];
  const values = [];
  Object.keys(userData).forEach((key, i) => {
    columns.push(`${key} = $${i + 2}`);
    values.push(userData[key]);
  });
  values.push(id);
  const result = await pool.query(`UPDATE users SET ${columns.join(", ")} WHERE user_id = $1 RETURNING *`, values);
  return result.rows[0];
};

export const deleteUser = async (id: string) => {
  await pool.query(`DELETE FROM users WHERE user_id = $1`, [id]);
};

export const loginUser = async (username: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
  const user = result.rows[0];
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
};

export const getUserById = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
    return result.rows[0];
  };  

export const getUserByEmail = async (email: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};

export default pool; 