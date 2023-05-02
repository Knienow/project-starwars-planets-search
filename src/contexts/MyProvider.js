import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  // criando o estado da app
  const [data, setData] = useState([]);
  const url = 'https://swapi.dev/api/planets';

  // chamada da API
  useEffect(() => {
    const getReturnAPI = async () => {
      const fetchAPI = await fetch(url);
      const { results } = await fetchAPI.json();
      setData(results);
    };
    getReturnAPI();
  }, []);

  return (
    <MyContext.Provider value={ { data } }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
