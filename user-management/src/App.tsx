import React, { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

// Lazy loading — só carrega o UserPage quando necessário
const UserPage = React.lazy(() => import('./pages/UserPage'));

function App() {
  return (
    <Suspense
      fallback={
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      }
    >
      <UserPage />
    </Suspense>
  );
}

export default App;