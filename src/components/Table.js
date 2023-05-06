import React, { useContext, useState, useRef } from 'react';
import MyContext from '../contexts/MyContext';

function Table() {
  const {
    data,
    filterData,
    setFilterData,
    filterState,
    // setFilterState,
  } = useContext(MyContext);

  const [attributes, setAttributes] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const conditions = (planet, shouldAdd) => {
    const lessOne = -1;
    filterState.appliedFilters.forEach((filter) => {
      if (Number.isNaN(Number(planet[filter.attribute]))) {
        shouldAdd += lessOne;
      }
      switch (filter.condition) {
      case 'maior que':
        if (Number(planet[filter.attribute]) <= Number(filter.value)) {
          shouldAdd += lessOne;
        }
        break;
      case 'menor que':
        if (Number(planet[filter.attribute]) >= Number(filter.value)) {
          shouldAdd += lessOne;
        }
        break;
      case 'igual a':
        if (Number(planet[filter.attribute]) !== Number(filter.value)) {
          shouldAdd += lessOne;
        }
        break;
      default:
        console.log('default case');
        break;
      }
    });
    return shouldAdd;
  };

  const applyFilter = () => {
    const tmpData = [];
    const lessOne = -1;
    data.forEach((planet) => {
      let shouldAdd = 0;
      if (filterState.kind !== ''
      && !planet.name.toLowerCase().includes(filterState.kind)) {
        shouldAdd += lessOne;
      }
      shouldAdd = conditions(planet, shouldAdd);
      if (shouldAdd === 0) { tmpData.push(planet); }
    });
    setFilterData(tmpData);
  };

  const changeFilterStateKind = (value) => {
    filterState.kind = value;
    applyFilter();
  };

  const inputAttributeRef = useRef(null);
  const inputConditionRef = useRef(null);
  const inputValueRef = useRef(null);

  const handleClick = () => {
    filterState.appliedFilters.push({
      attribute: inputAttributeRef.current.value,
      condition: inputConditionRef.current.value,
      value: inputValueRef.current.value,
    });

    const forbbidenIndex = -1;
    const indexOf = attributes.indexOf(inputAttributeRef.current.value);
    if (indexOf > forbbidenIndex) {
      const tmpAttributes = [...attributes];
      tmpAttributes.splice(indexOf, 1);
      setAttributes(tmpAttributes);
    }
    applyFilter();
  };

  const addAttributes = (attribute) => {
    const tmpSetAttributes = [...attributes];
    tmpSetAttributes.push(attribute);
    setAttributes(tmpSetAttributes);
  };

  // botão de remover aquele filtro do array appliedFilters
  const deleteAppliedFilter = (attributeName) => {
    const tmpFilters = [...filterState.appliedFilters];
    if (tmpFilters.length > 0) {
      const indexOf = tmpFilters.map((item) => item.attribute).indexOf(attributeName);
      tmpFilters.splice(indexOf, 1);
      filterState.appliedFilters = tmpFilters;
      applyFilter();
      addAttributes(attributeName);
    }
    return true;
  };

  // botão de remover todos os filtros
  const removeAllFilters = () => {
    const tmpAttributes = filterState.appliedFilters.map((filter) => filter.attribute);
    const tmpSetAttributes = [...attributes];
    tmpAttributes.forEach((attribute) => tmpSetAttributes.push(attribute));
    setAttributes(tmpSetAttributes);
    filterState.appliedFilters = [];
    applyFilter();
  };

  return (
    <div>
      <header>
        <h1>Project Star Wars Planets Search</h1>
        <input
          type="text"
          name="filterByName"
          data-testid="name-filter"
          onChange={ (event) => changeFilterStateKind(event.target.value) }
        />
      </header>
      <label htmlFor="">
        Coluna:
        <select
          data-testid="column-filter"
          ref={ inputAttributeRef }
          className="dropbtn"
          name="column"
        >
          {attributes.map((columnTable) => (
            <option
              key={ columnTable }
              value={ columnTable }
            >
              { columnTable }
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="">
        Operador:
        <select
          data-testid="comparison-filter"
          className="dropbtn"
          ref={ inputConditionRef }
          id="select-tag-comparison"
          name="comparison"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <input
        type="number"
        ref={ inputValueRef }
        data-testid="value-filter"
        defaultValue={ 0 }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ removeAllFilters }
      >
        Remover filtros
      </button>
      <div>
        {filterState.appliedFilters.map((item) => (
          <p
            data-testid="filter"
            key={ item.attribute }
          >
            { item.attribute }
            {' '}
            { item.condition }
            {' '}
            { item.value }
            <button
              type="delete"
              onClick={ (event) => {
                deleteAppliedFilter(item.attribute);
                event.preventDefault();
              } }
            >
              X
            </button>
          </p>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate}</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
