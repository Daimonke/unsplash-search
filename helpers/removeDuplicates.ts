const removeDuplicates = (array: any[], key: string) =>
  array.filter((v, i, a) => a.findIndex((v2) => v2[key] === v[key]) === i);

export default removeDuplicates;
