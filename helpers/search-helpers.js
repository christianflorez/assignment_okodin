const parseSearch = (search, locations) => {
  let results = {
    locationId: locations
  };

  if (search.profile.minAge) {
    results.age = { $gte: search.profile.minAge };
  }

  if (search.profile.maxAge) {
    results.age = { $lte: search.profile.maxAge };
  }

  delete search.profile.minAge;
  delete search.profile.maxAge;

  for (let key in search.profile) {
    results[key] = search.profile[key];
  }

  return results;
};

module.exports = {
  parseSearch
};