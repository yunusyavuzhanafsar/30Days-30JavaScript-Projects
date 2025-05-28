'use client';

import { Button, Container, Stack, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGoToUsers = () => {
    router.push('/users');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
      <Stack spacing={3}>
        <Typography variant="h3" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Hoşgeldiniz
        </Typography>
        <Typography variant="h6">
          Kullanıcı yönetimi sayfasına gitmek için aşağıdaki butona tıklayın.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={handleGoToUsers}
        >
          Kullanıcı Yönetimi Sayfasına Git
        </Button>
      </Stack>
    </Container>
  );
}
