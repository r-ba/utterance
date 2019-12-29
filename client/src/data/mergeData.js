import parseData from './parseData';

const mergeData = (extantData, newData) => {
  const knownIds = extantData.map(item => item.id);
  const filteredData = parseData(newData).filter(item =>
    knownIds.indexOf(item.id) === -1
  );
  return [ ...extantData, ...filteredData ];
}

export default mergeData;
