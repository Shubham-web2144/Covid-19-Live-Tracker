// Sorting country name by cases number...
export const sortData = (data) => {
  const sortData = [...data];
  sortData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortData;
};
