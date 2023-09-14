import http from 'http'
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
import { Message } from './types';
import { createMessage } from './models/messages';
import { Server as SocketIOServer, Socket } from 'socket.io';
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new SocketIOServer(server);

io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('privateMessage', async (message: Message) => {
        // Save message to DB
        await createMessage(message);

        // Emit message to the specific receiver
        socket.to(message.receiver_id).emit('privateMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});





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