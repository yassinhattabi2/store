import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  TextField,
  Avatar,
  IconButton,
  Checkbox,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Helmet } from 'react-helmet';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // To store selected user details
  const [openDialog, setOpenDialog] = useState(false); // To control modal visibility

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleStatus = async (idClient, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${idClient}/toggle-status`, {
        method: 'PUT',
      });
  
      const data = await response.json();
      if (data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.idClient === idClient
              ? { ...user, statue: currentStatus === 'Débloqué' ? 'Bloqué' : 'Débloqué' }
              : user
          )
        );
      } else {
        console.error('Failed to toggle status:', data.error);
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user); // Set the selected user
    setOpenDialog(true); // Open the dialog/modal
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the modal
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) =>
    user.nom.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrint = () => {
    const printContent = document.getElementById('user-table');
    const printWindow = window.open('', '', 'height=500,width=800');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
       <Helmet>
        <title>Client</title>
        
      </Helmet>
      <TextField
        label="Search user..."
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearch}
        value={search}
      />
      {loading ? (
        <Typography variant="h6" align="center">
          Loading users...
        </Typography>
      ) : (
        <>
          <Button variant="contained" onClick={handlePrint} sx={{ marginBottom: 2 }}>
            Print Users
          </Button>
          <TableContainer id="user-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prenom</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telephone</TableCell>
                  <TableCell>Adresse</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.idClient} onClick={() => handleRowClick(user)}>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar src={user.avatar} alt={user.nom} sx={{ mr: 2 }} />
                          {user.nom}
                        </Box>
                      </TableCell>
                      <TableCell>{user.prenom}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.tel}</TableCell>
                      <TableCell>{user.adresse}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          color={user.statue === 'Débloqué' ? 'green' : 'red'}
                        >
                          {user.statue}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleToggleStatus(user.idClient, user.statue)} aria-label="Toggle Status">
                          <Typography color={user.statue === 'Débloqué' ? 'error' : 'primary'}>
                            {user.statue === 'Débloqué' ? 'Bloquer' : 'Débloquer'}
                          </Typography>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      {/* User Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Typography variant="h6">Nom: {selectedUser.nom}</Typography>
              <Typography variant="subtitle1">Prenom: {selectedUser.prenom}</Typography>
              <Typography variant="subtitle1">Email: {selectedUser.email}</Typography>
              <Typography variant="subtitle1">Telephone: {selectedUser.tel}</Typography>
              <Typography variant="subtitle1">Adresse: {selectedUser.adresse}</Typography>
              <Typography variant="subtitle1">Status: {selectedUser.statue}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserTable;
