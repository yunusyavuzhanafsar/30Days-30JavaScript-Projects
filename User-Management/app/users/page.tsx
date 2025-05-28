'use client';

import { Alert, Container, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef, } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material'; // Edit ve Delete ikonlarını import ettik

import ConfirmDialog from '../components/ConfirmDialog';
import { User } from '../types/User';
import UserForm from '../components/UserForm';
import { initialUsers } from '../utils/initialUsers';
import { useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [filterText, setFilterText] = useState('');
  
  // Snackbar kullanımı
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleCreateOrUpdate = (user: User) => {
    if (users.some(u => u.id === user.id)) {
      setUsers(users.map(u => (u.id === user.id ? user : u)));
      setSnackbarMessage('Kullanıcı başarıyla güncellendi!');
    } else {
      setUsers([...users, user]);
      setSnackbarMessage('Kullanıcı başarıyla eklendi!');
    }
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setSelectedUser(null);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setSnackbarMessage('Kullanıcı başarıyla silindi!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    }
    setIsConfirmOpen(false);
    setUserToDelete(null);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'İsim', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'Email', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'İşlemler',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: '8px' }} // Tüm buton grubuna üstten boşluk verdim hizalama maddesi
        >
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
            sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }} // Hover rengi ekledim
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => handleDeleteClick(params.row)}
            sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }} // Hover rengi ekledim
          >
            <Delete />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: '#1976d2', fontWeight: 'bold' }}
      >
        Kullanıcı Yönetimi
      </Typography>

      <Stack spacing={2} mb={4}>
        <UserForm onSubmit={handleCreateOrUpdate} initialData={selectedUser} />
      </Stack>

      <TextField
  label="Ara"
  variant="outlined"
  value={filterText}
  onChange={(e) => setFilterText(e.target.value)}
  size="small" // Küçük boyut ekledim
  sx={{
    position: 'absolute', // Sayfanın sağ üstüne yerleştirmek için
    top: 80, // Üstten mesafe
    right: 423, // Sağdan mesafe
    width: '180px', // Genişliği biraz daha genişletmek
    backgroundColor: 'white', // Beyaz arka plan
    borderRadius: '8px', // Yuvarlatılmış köşeler
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px', // İç elemanların da yuvarlatılması
    },
    '& .MuiInputLabel-root': {
      color: '#1976d2', // Etiket rengi
      fontWeight: 'bold',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1976d2', // Kenar çizgisi rengi
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#115293', // Hoverda kenar çizgisi rengi
    },
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Hafif gölge
    transition: 'all 0.3s ease', // Yumuşak geçiş animasyonu
    mb: 1,
  }}
/>

<DataGrid
  rows={filteredUsers}
  columns={columns}
  getRowId={(row) => row.id}
  autoHeight={false} // Otomatik yükseklik kapalı
  density="comfortable" // Satır aralıkları rahat (opsiyonel)
  sx={{
    height: 500, // <<<<<<<<<<<<<< Scroll için yüksekliği sabitliyoruz
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#1976d2',
      color: 'white',
      fontSize: 16,
    },
    '& .MuiDataGrid-cell': {
      fontSize: 14,
    },
    borderRadius: 2,
    boxShadow: 2,
    overflow: 'auto', // Scroll için overflow
  }}
/>


      <ConfirmDialog
        open={isConfirmOpen}
        title="Bilgilendirme"
        content="Bu kullanıcıyı silmek istediğinize emin misiniz?"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1750}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '150%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
