const parseSearch = (search, locations) => {
  let results = {
    locationId: locations
  };

  if (search) {
    if (search.profile.minAge && search.profile.maxAge) {
      results.age = {
        $between: [search.profile.minAge, search.profile.maxAge]
      };
    } else {
      if (search.profile.minAge) {
        results.age = { $gte: search.profile.minAge };
      }
      if (search.profile.maxAge) {
        results.age = { $lte: search.profile.maxAge };
      }
    }
    
    if (search.profile.minHeight && search.profile.maxHeight) {
      results.height = {
        $between: [searc.profile.minHeight, search.profile.maxHeight]
      };
    } else {
      if (search.profile.minHeight) {
        results.height = { $gte: search.profile.minHeight };
      }
      if (search.profile.maxHeight) {
        results.height = { $lte: search.profile.maxHeight };
      }
    }


    delete search.profile.minAge;
    delete search.profile.maxAge;
    delete search.profile.minHeight;
    delete search.profile.maxHeight;

    for (let key in search.profile) {
      if (search.profile[key]) {
        results[key] = search.profile[key];
      }
    }
  }

  return results;
};

module.exports = {
  parseSearch
};