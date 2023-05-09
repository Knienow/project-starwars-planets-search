export const conditions = (planet, shouldAdd, filterState) => {
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
    default: console.log('default case');
      break;
    }
  });
  return shouldAdd;
};
