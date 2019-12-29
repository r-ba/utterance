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

export default fetchData;
