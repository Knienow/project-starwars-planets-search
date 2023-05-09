import React from 'react';
import './App.css';
import MyProvider from './contexts/MyProvider';
import { Header } from './components/Header';
import Table from './components/Table';

function App() {
  return (
    <MyProvider>
      <Header />
      <Table />
    </MyProvider>
  );
}

export default App;
