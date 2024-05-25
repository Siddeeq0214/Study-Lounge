import { FC, ReactNode } from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';

interface FullScreenSpinnerProps {
  path?: string;
}

const FullScreenSpinner: FC<FullScreenSpinnerProps> = ({path}) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.palette.background.default,
          zIndex: theme.zIndex.modal + 1,
        }}
      >
        <CircularProgress size={100} />
        {path && (
          <>
            <h1>Loading: {path}</h1>
          </>
        )}
      </Box>
    </>
  );
};


export default FullScreenSpinner;
