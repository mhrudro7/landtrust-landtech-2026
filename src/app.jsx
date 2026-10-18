import React from 'react';
import { AppRoutes } from './routes';
import { MainLayout } from './templates/MainLayout';

export function App() {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
}

export default App;
