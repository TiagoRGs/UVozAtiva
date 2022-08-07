import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Routes from './routes';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  );
}
