import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Typography, Box, TextField, Avatar, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert
} from '@mui/material';
import { Edit, Delete, Visibility, Add, Search } from '@mui/icons-material';
import { employeeAPI } from '../services/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchParams, setSearchParams] = useState({ department: '', position: '' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees');
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleSearch = async () => {
    try {
      const response = await employeeAPI.search(searchParams);
      setEmployees(response.data);
    } catch (err) {
      setError('Search failed');
    }
  };

  const handleDelete = async () => {
    try {
      await employeeAPI.delete(deleteDialog.id);
      setDeleteDialog({ open: false, id: null });
      fetchEmployees();
    } catch (err) {
      setError('Failed to delete employee');
    }
  };

  const clearSearch = () => {
    setSearchParams({ department: '', position: '' });
    fetchEmployees();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Employees</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/employees/add')}>
          Add Employee
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField label="Department" size="small" value={searchParams.department} onChange={(e) => setSearchParams({ ...searchParams, department: e.target.value })} />
          <TextField label="Position" size="small" value={searchParams.position} onChange={(e) => setSearchParams({ ...searchParams, position: e.target.value })} />
          <Button variant="contained" startIcon={<Search />} onClick={handleSearch}>Search</Button>
          <Button variant="outlined" onClick={clearSearch}>Clear</Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white' }}>Photo</TableCell>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Position</TableCell>
              <TableCell sx={{ color: 'white' }}>Department</TableCell>
              <TableCell sx={{ color: 'white' }}>Salary</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.employee_id} hover>
                <TableCell>
                  <Avatar src={emp.profile_picture} alt={emp.first_name}>{emp.first_name?.[0]}</Avatar>
                </TableCell>
                <TableCell>{emp.first_name} {emp.last_name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>${emp.salary?.toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => navigate(`/employees/view/${emp.employee_id}`)}><Visibility /></IconButton>
                  <IconButton color="secondary" onClick={() => navigate(`/employees/edit/${emp.employee_id}`)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => setDeleteDialog({ open: true, id: emp.employee_id })}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {employees.length === 0 && (
              <TableRow><TableCell colSpan={7} align="center">No employees found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this employee?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null })}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmployeeList;
