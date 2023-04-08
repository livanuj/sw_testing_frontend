// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from 'react-query'
import UserList from './UserList';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
      <ToastContainer theme="colored"/>
    </QueryClientProvider>
  );
}
export default App;

