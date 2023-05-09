const sortAsc = (tmpData, attribute, lessOne) => tmpData.sort((a, b) => {
  const x = Number.isNaN(Number(a[attribute]))
    ? Number.POSITIVE_INFINITY : Number(a[attribute]);
  const y = Number.isNaN(Number(b[attribute]))
    ? Number.POSITIVE_INFINITY : Number(b[attribute]);
  return x < y ? lessOne : 1;
});

const sortDesc = (tmpData, attribute, lessOne) => tmpData.sort((a, b) => {
  const x = Number.isNaN(Number(a[attribute]))
    ? Number.NEGATIVE_INFINITY : Number(a[attribute]);
  const y = Number.isNaN(Number(b[attribute]))
    ? Number.NEGATIVE_INFINITY : Number(b[attribute]);
  return x < y ? 1 : lessOne;
});

export const filterAscDesc = (attribute, order, filterData, setFilterData) => {
  let tmpData = [...filterData];
  const lessOne = -1;
  tmpData = order === 'ASC' ? sortAsc(tmpData, attribute, lessOne)
    : sortDesc(tmpData, attribute, lessOne);
  setFilterData(tmpData);
};
