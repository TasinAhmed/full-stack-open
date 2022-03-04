exports.dummy = (blogs) => {
  return 1;
};

exports.totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0);
};

exports.favoriteBlog = (blogs) => {
  let fav = null;

  blogs.reduce((maxLikes, item) => {
    if (Math.max(maxLikes, item.likes) === maxLikes) {
      return maxLikes;
    } else {
      fav = item;
      return item.likes;
    }
  }, 0);

  return fav;
};
