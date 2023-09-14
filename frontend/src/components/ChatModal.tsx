import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, List, ListItem, ListItemText, Box, Typography, Paper, Divider, LinearProgress } from '@mui/material';
import { grey } from '@mui/material/colors';

interface Message {
  sender_id: string;
  receiver_id: string;
  content: string;
}

type ChatModalProps = {
  receiverId: string | null;
  onClose: () => void;
};

const ChatModal: React.FC<ChatModalProps> = ({ receiverId, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!receiverId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching messages for receiverId:", receiverId); // CL

        const response = await fetch(`http://localhost:3000/messages/?receiver_id=${receiverId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch messages.');
        }

        const data = await response.json();
        console.log("Fetched messages:", data); // <-- Log here
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError('Failed to fetch messages. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [receiverId]);

  const sendMessage = async () => {
    try {
      setLoading(true);
      setError(null);

      const messageData = {
        receiver_id: receiverId!,
        content: inputMessage
      };

      console.log("Sending message with data:", messageData); //logging

      const response = await fetch('http://localhost:3000/messages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message.');
      }

      const data = await response.json();
      console.log("Received response from server after sending message:", data); // <-- Log here
      setMessages(prev => [...prev, data]);
      setInputMessage('');
    } catch (err) {
      console.error("Error sending message:", err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={Boolean(receiverId)}
      onClose={onClose}
      aria-labelledby="chat-modal-title"
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{
          width: '80%',
          maxWidth: '400px',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography id="chat-modal-title" variant="h6" align="center">Chat</Typography>
          <Divider />
          {loading && <LinearProgress />}
          <List sx={{ overflowY: 'auto', flexGrow: 1, bgcolor: grey[800], p: 1 }}>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText primary={message.content} />
              </ListItem>
            ))}
          </List>
          <TextField
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message"
            fullWidth
            disabled={loading}
            variant="outlined"
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button onClick={sendMessage} disabled={loading} variant="contained">Send</Button>
            <Button onClick={onClose} color="error" variant="contained">Close Chat</Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ChatModal;

