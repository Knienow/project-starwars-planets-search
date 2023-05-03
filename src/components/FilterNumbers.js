import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';
import './FilterNumbers.css';

function FilterNumbers() {
  const {
    filterByNumbers,
    setFilterByNumbers,
    filterState,
    setFilterState,
  } = useContext(MyContext);
  const { column, comparison, value } = filterState[0];
  const initialValue = Number(value);

  const filterData = () => filterByNumbers.filter((item) => {
    if (initialValue || initialValue === 0) {
      if (comparison === 'maior que') {
        return Number(item[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(item[column]) < Number(value);
      }
      return Number(item[column]) === Number(value);
    }
    return item;
  });

  return (
    <div>
      <select
        data-testid="column-filter"
        className="dropbtn"
        name="column"
        onChange={ (event) => setFilterState([{
          ...filterState[0],
          column: event.target.value,
        }]) }
      >
        <option name="population">population</option>
        <option name="orbital_period">orbital_period</option>
        <option name="diameter">diameter</option>
        <option name="rotation_period">rotation_period</option>
        <option name="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        className="dropbtn"
        id="select-tag-comparison"
        name="comparison"
        onChange={ (event) => setFilterState([{
          ...filterState[0],
          comparison: event.target.value,
        }]) }
      >
        <option name="bigger_then">maior que</option>
        <option name="less_than">menor que</option>
        <option name="equal_to">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ (event) => setFilterState([{
          ...filterState[0],
          value: event.target.value,
        }]) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => setFilterByNumbers(() => filterData()) }
      >
        Filtrar
      </button>
    </div>
  );
}

export default FilterNumbers;
