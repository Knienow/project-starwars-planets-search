import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';

function Header() {
  const { filterByName, setFilterByName } = useContext(MyContext);

  // useEffect(() => {
  //   const filterName = data.filter((planet) => planet.name.includes(filterByName));
  //   setFilterByName(filterName);
  // }, []);

  // const handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   switch (name) {
  //   case 'filterByName':
  //     return setFilterByName(value);
  //   default:
  //   }
  // };

  return (
    <header>
      <h1>Project Star Wars Planets Search</h1>
      <input
        type="text"
        name="filterByName"
        value={ filterByName.name }
        data-testid="name-filter"
        onChange={ (event) => setFilterByName(event.target.value) }
      />
    </header>
  );
}

export default Header;
