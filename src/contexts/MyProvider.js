import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  // criando o estado da app
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNameResult, setFilterByNameResult] = useState([]);

  const getReturnAPI = async () => {
    const fetchAPI = await fetch('https://swapi.dev/api/planets');
    const { results } = await fetchAPI.json();
    setData(results);
  };

  useEffect(() => {
  // chamada da API através da callback
    getReturnAPI();
  }, []);
  // array de dependências vazio para que a API seja chamada somente uma vez

  const valuesContext = useMemo(() => ({
    data,
    filterByName,
    setFilterByName,
    filterByNameResult,
    setFilterByNameResult,
  }), [data, filterByName, setFilterByName, filterByNameResult, setFilterByNameResult]);

  return (
    <MyContext.Provider value={ valuesContext }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
