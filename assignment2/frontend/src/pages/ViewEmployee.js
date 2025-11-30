import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Paper, Typography, Box, Avatar, CircularProgress, Button, Grid, Divider } from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';
import { employeeAPI } from '../services/api';

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await employeeAPI.getById(id);
        setEmployee(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return <Container maxWidth="sm" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Container>;
  }

  if (!employee) {
    return <Container maxWidth="sm" sx={{ mt: 4 }}><Typography>Employee not found</Typography></Container>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar src={employee.profile_picture} sx={{ width: 120, height: 120, fontSize: 48 }}>{employee.first_name?.[0]}</Avatar>
        </Box>
        <Typography variant="h4" align="center" gutterBottom>{employee.first_name} {employee.last_name}</Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>{employee.position}</Typography>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}><Typography color="text.secondary">Email</Typography></Grid>
          <Grid item xs={6}><Typography>{employee.email}</Typography></Grid>
          <Grid item xs={6}><Typography color="text.secondary">Department</Typography></Grid>
          <Grid item xs={6}><Typography>{employee.department}</Typography></Grid>
          <Grid item xs={6}><Typography color="text.secondary">Salary</Typography></Grid>
          <Grid item xs={6}><Typography>${employee.salary?.toLocaleString()}</Typography></Grid>
          <Grid item xs={6}><Typography color="text.secondary">Date of Joining</Typography></Grid>
          <Grid item xs={6}><Typography>{new Date(employee.date_of_joining).toLocaleDateString()}</Typography></Grid>
        </Grid>
        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button variant="outlined" startIcon={<ArrowBack />} fullWidth onClick={() => navigate('/employees')}>Back</Button>
          <Button variant="contained" startIcon={<Edit />} fullWidth onClick={() => navigate(`/employees/edit/${id}`)}>Edit</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewEmployee;
