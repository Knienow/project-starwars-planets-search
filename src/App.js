import React from 'react';
import './App.css';
import MyProvider from './contexts/MyProvider';
import Table from './components/Table';
import Header from './components/Header';
import FilterNumbers from './components/FilterNumbers';

function App() {
  return (
    <MyProvider>
      <Header />
      <FilterNumbers />
      <Table />
    </MyProvider>
  );
}

export default App;
