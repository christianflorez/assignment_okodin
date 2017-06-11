const getMatches = (likees, likers) => {
  let results = [];
  likees.forEach(likee => {
    likers.forEach(liker => {
      if (JSON.stringify(liker) === JSON.stringify(likee)) {
        results.push(liker);
      }
    });
  });

  return results;
};


module.exports = {
  getMatches
};