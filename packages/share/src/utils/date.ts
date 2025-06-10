export const parseDate = (date?: string) => {
  if (date) {
    const [year, month, day] = date.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    return new Date();
  }
};
