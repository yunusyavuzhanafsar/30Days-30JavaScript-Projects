'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { User } from '../types/User';

interface UserFormProps {
  onSubmit: (user: User) => void;
  initialData?: User | null;
}

export default function UserForm({ onSubmit, initialData }: UserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // YENİ EKLEDİK

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setIsEditMode(true); // Düzenleme modunda aç
      setOpen(true); // Modalı açık getir
    } else {
      setName('');
      setEmail('');
      setIsEditMode(false); // Oluşturma modunda
    }
    setNameError('');
    setEmailError('');
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNameError('');
    setEmailError('');

    let isValid = true;

    if (!name.trim()) {
      setNameError('İsim alanı boş geçilemez');
      isValid = false;
    } else if (!/^[a-zA-ZıİçÇşŞğĞöÖüÜ]+(?: [a-zA-ZıİçÇşŞğĞöÖüÜ]+)*$/.test(name)) {
      setNameError('İsimde sadece harfler ve boşluk kullanılabilir');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email alanı boş geçilemez');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Geçerli bir email adresi girin');
      isValid = false;
    }

    if (isValid) {
      onSubmit({
        id: initialData?.id || Date.now(),
        name,
        email,
      });
      setName('');
      setEmail('');
      setOpen(false);
      setIsEditMode(false); // İşlem bitince tekrar oluşturma moduna dön
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false);
    setName('');  // Eklendi
    setEmail(''); // Eklendi
    setNameError('');
    setEmailError('');
  };

  const handleOpen = () => {
    setOpen(true);
    setIsEditMode(false);
  };

  return (
    <div>
      {/* Eğer düzenleme modunda değilsek butonu göster */}
      {!isEditMode && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{
            position: 'absolute',
            top: 80,
            right: '25%',
            transform: 'translateX(50%)',
            borderRadius: '10%',
            width: '10px',
            height: '40px',
            fontSize: '28px',
            backgroundColor: '#3f51b5',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          sx={{
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: '#303f9f',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          +
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#3f51b5' }}>
          {isEditMode ? 'Kullanıcı Güncelle' : 'Kullanıcı Oluştur'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ padding: '20px 30px' }}>
            <Stack spacing={3}>
              <TextField
                label="İsim"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                error={!!nameError}
                helperText={nameError}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: '8px',
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ddd',
                  },
                  '& .MuiFormLabel-root': {
                    color: '#757575',
                  },
                  '& .MuiInputBase-root.Mui-error': {
                    borderColor: '#f44336',
                  },
                }}
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                error={!!emailError}
                helperText={emailError}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: '8px',
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ddd',
                  },
                  '& .MuiFormLabel-root': {
                    color: '#757575',
                  },
                  '& .MuiInputBase-root.Mui-error': {
                    borderColor: '#f44336',
                  },
                }}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', padding: '15px 20px' }}>
            <Button onClick={handleClose} color="secondary" variant="outlined" sx={{ fontWeight: 'bold' }}>
              İptal
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                fontWeight: 'bold',
                backgroundColor: '#3f51b5',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              {isEditMode ? 'Güncelle' : 'Oluştur'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
