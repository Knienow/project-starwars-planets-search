import React from 'react';
import './App.css';
import MyProvider from './contexts/MyProvider';
import Table from './components/Table';
import Header from './components/Header';

function App() {
  return (
    <MyProvider>
      <Header />
      <Table />
    </MyProvider>
  );
}

export default App;
