import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';

export function Header() {
  const { data, filterState, setFilterData } = useContext(MyContext);

  const applyFilterByName = () => {
    const tmpData = [];
    const lessOne = -1;
    data.forEach((planet) => {
      let shouldAdd = 0;
      if (filterState.kind !== ''
      && !planet.name.toLowerCase().includes(filterState.kind)) {
        shouldAdd += lessOne;
      }
      if (shouldAdd === 0) { tmpData.push(planet); }
    });
    setFilterData(tmpData);
  };

  const changeFilterStateKind = (value) => {
    filterState.kind = value;
    applyFilterByName();
  };

  return (
    <header>
      <h1>Project Star Wars Planets Search</h1>
      <input
        type="text"
        name="filterByName"
        data-testid="name-filter"
        onChange={ (event) => changeFilterStateKind(event.target.value) }
      />
    </header>

  );
}
