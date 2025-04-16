import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQRCode();
  }, []);

  const fetchQRCode = async () => {
    try {
      const response = await axios.get('/api/qrcodes/me');
      setQrCode(response.data.data);
    } catch (err) {
      setError('Failed to load QR code');
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = async () => {
    try {
      setError('');
      const response = await axios.post('/api/qrcodes/generate');
      setQrCode(response.data.data);
    } catch (err) {
      setError('Failed to generate QR code');
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Welcome, {user?.name || 'User'}!
            </Typography>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your QR Code
              </Typography>
              {qrCode ? (
                <Box sx={{ textAlign: 'center' }}>
                  <img
                    src={qrCode.code}
                    alt="QR Code"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    Scanned {qrCode.scanCount} times
                  </Typography>
                  {qrCode.lastScanned && (
                    <Typography variant="body2" color="textSecondary">
                      Last scanned: {new Date(qrCode.lastScanned).toLocaleString()}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    You don't have a QR code yet
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={generateQRCode}
                  >
                    Generate QR Code
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Stats
                </Typography>
                <Typography variant="body1">
                  Profile Views: Coming soon
                </Typography>
                <Typography variant="body1">
                  Connections Made: Coming soon
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 