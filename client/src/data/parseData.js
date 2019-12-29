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

export default parseData;
