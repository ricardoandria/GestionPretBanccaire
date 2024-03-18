import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AddButton from './src/components/AddButton';
import LocationScreens from './src/screens/LocationScreens';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

type Props = {};

const queryClient = new QueryClient();

const App = (props: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationScreens />
    </QueryClientProvider>
  );
};

export default App;
