const fetchData = async (query) => {
  const { searchToken, searchTerm, searchPhrase } = query;
  const url = `https://utterancem7y2pxrbo4flbmnscuwqn.herokuapp.com/api/${searchToken}/${searchTerm}/${searchPhrase}`;
  try {
    return fetch(url).then(results => {
      return results.json();
    });
  } catch (err) {
    return {
      err: err
    };
  };
}

const parseData = data => {
  const result = [];
  for (const i in data) {
    result.push({
      id: data[i].id,
      title: data[i].title,
      captions: data[i].matches.map(match => match.start),
      thumbnail: data[i].thumbnail.url
    });
  }
  return result;
}

const mergeData = (extantData, newData) => {
  const knownIds = extantData.map(item => item.id);
  const filteredData = parseData(newData).filter(item =>
    knownIds.indexOf(item.id) === -1
  );
  return [ ...extantData, ...filteredData ];
}

export {
  fetchData,
  parseData,
  mergeData
};
