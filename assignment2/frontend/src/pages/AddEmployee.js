import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert, Avatar } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { employeeAPI } from '../services/api';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', position: '', salary: '', date_of_joining: '', department: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (profilePicture) data.append('profile_picture', profilePicture);

    try {
      await employeeAPI.create(data);
      navigate('/employees');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>Add Employee</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar src={preview} sx={{ width: 100, height: 100 }} />
          </Box>
          <Button component="label" variant="outlined" startIcon={<CloudUpload />} fullWidth sx={{ mb: 2 }}>
            Upload Photo
            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
          </Button>
          <TextField fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Position" name="position" value={formData.position} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Department" name="department" value={formData.department} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Salary" name="salary" type="number" value={formData.salary} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Date of Joining" name="date_of_joining" type="date" value={formData.date_of_joining} onChange={handleChange} margin="normal" required InputLabelProps={{ shrink: true }} />
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button variant="outlined" fullWidth onClick={() => navigate('/employees')}>Cancel</Button>
            <Button type="submit" variant="contained" fullWidth disabled={loading}>{loading ? 'Adding...' : 'Add Employee'}</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddEmployee;
