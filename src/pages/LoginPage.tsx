import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/theme';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('user@example.com'); // Pre-filled for testing
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray50,
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: colors.primary,
              textAlign: 'center',
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', color: colors.gray600, mb: 3 }}
          >
            Sign in to your account to continue
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              disabled={loading}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
              }
              label="Remember me"
              sx={{ my: 1 }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ my: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </form>

          <Typography variant="body2" sx={{ textAlign: 'center', color: colors.gray600 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: colors.primary, textDecoration: 'none' }}>
              <MuiLink sx={{ cursor: 'pointer', fontWeight: 600 }}>Sign up here</MuiLink>
            </Link>
          </Typography>

          <Typography
            variant="caption"
            sx={{ display: 'block', textAlign: 'center', mt: 3, color: colors.gray600 }}
          >
            Demo: user@example.com / password
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
