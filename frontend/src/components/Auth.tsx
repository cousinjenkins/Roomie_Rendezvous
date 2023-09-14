import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Alert, Paper, Box } from '@mui/material';
import { useUser } from '../components/userContext';
import { useNavigate } from 'react-router-dom';


const Auth: React.FC = () => {
  const { setUser, setProfile } = useUser();
  const navigate = useNavigate();
  const [isLogIn, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLogIn && formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    const endpoint = isLogIn ? '/login' : '/register'; 

    try {
        const response = await fetch(`http://localhost:3000/users${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const json = await response.json();

            if (isLogIn) {
              setUser(json.user)

              const token = json.token;
              if (token) {
                localStorage.setItem('jwt_token', token);  // Storing the token in local storage
              }
  
              if (json.user.isprofilecomplete) {
                const response = await fetch(`http://localhost:3000/profiles/profiles`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + token
                  },
                });
    
                const jsonData = await response.json()
    
                console.log(jsonData)
                setProfile(jsonData)
              } else {
                setProfile(null)
              }
  
              if (json.user.isprofilecomplete) {
                navigate('/completeProfile')
              } else {
                if (json.user.is_admin) {
                  navigate("/adminDashboard");
              } else {
                  navigate("/dashboard");
              }
              }
            } else {
              navigate("/");
            }
           
        } else {
            setError('error');
        }
    } catch (err) {
        setError("An error occurred.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '10vh' }}>
      <Paper elevation={3} style={{ padding: '20px', borderRadius: '15px' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" gutterBottom>
            {isLogIn ? 'Please log in' : 'Please sign up!'}
          </Typography>
          
          <form onSubmit={handleSubmit}>
            {!isLogIn && (
              
              <TextField 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
              />
            )}
            <TextField 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {!isLogIn && (
              <TextField 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            )}
            {error && <Alert severity="error" style={{ marginTop: '1rem' }}>{error}</Alert>}
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              {isLogIn ? 'Login' : 'Sign Up'}
            </Button>
            <Box mt={3}>
              {isLogIn ? 
                <Button onClick={() => setIsLogin(false)} variant="text" color="inherit">Don't have an account? Sign Up</Button> 
                : 
                <Button onClick={() => setIsLogin(true)} variant="text" color="inherit">Already have an account? Login</Button>
              }
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default Auth;



