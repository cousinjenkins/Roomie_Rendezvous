import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import './config/db';
import userRoutes from './routes/users';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});