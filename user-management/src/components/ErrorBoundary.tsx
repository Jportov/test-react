import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Chamado quando um erro acontece durante a renderização
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Chamado depois do erro — útil para logging
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          gap={2}
          p={3}
        >
          <ErrorOutline color="error" sx={{ fontSize: 64 }} />
          <Typography variant="h5" component="h1">
            Algo deu errado
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Ocorreu um erro inesperado na aplicação. Tente novamente.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {this.state.error?.message}
          </Typography>
          <Button variant="contained" onClick={this.handleReset}>
            Tentar Novamente
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;