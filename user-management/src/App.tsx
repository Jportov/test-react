import React, { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

const UserPageWithQuery = React.lazy(() => import('./pages/UserPageWithQuery'));

function App() {
  return (
    <Suspense
      fallback={
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      }
    >
      <UserPageWithQuery />
    </Suspense>
  );
}

export default App;