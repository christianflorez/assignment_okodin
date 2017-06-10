const parseParams = (obj) => {
  let results = {};
  for (let key in obj) {
    if (obj[key]) {
      results[key] = obj[key];
    }
  }
  return results;
};


module.exports = {
  parseParams
};