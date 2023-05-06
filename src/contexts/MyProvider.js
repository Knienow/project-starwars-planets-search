import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  // criando o estado da app
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // valores iniciais dos selects de valores numéricos
  const [filterState, setFilterState] = useState(
    {
      kind: '',
      appliedFilters: [],
      sortOrder: 'ASC',
    },
  );

  const getReturnAPI = async () => {
    const fetchAPI = await fetch('https://swapi.dev/api/planets');
    const { results } = await fetchAPI.json();
    setData(results);
    setFilterData(results);
  };

  useEffect(() => {
  // chamada da API através da callback
    getReturnAPI();
  }, []);
  // array de dependências vazio para que a API seja chamada somente uma vez

  const valuesContext = useMemo(() => ({
    data,
    filterData,
    setFilterData,
    filterState,
    setFilterState,
  }), [
    data,
    filterData,
    setFilterData,
    filterState,
    setFilterState,
  ]);

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
