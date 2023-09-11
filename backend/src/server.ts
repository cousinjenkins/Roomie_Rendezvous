import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import './config/db';
import userRoutes from './routes/users';
import profilesRouter from './routes/profiles';
import messagesRouter from './routes/messages'
import matchesRouter from './routes/matches'
import disputesRouter from './routes/disputes';
import cors from 'cors';
import proxyRouter from './routes/proxy';




const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/profiles', profilesRouter);
app.use('/messages', messagesRouter);
app.use('/matches', matchesRouter);
app.use('/disputes', disputesRouter);
app.use('/', proxyRouter);


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});