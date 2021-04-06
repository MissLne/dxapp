module.exports = {
    navigateTo({ url, query }) {
      let newUrl = url;
      newUrl += '?';
      Object.keys(query).forEach((item, index) => {
        newUrl += `${item}=${query[item]}&`;
      });
      wx.navigateTo({
        url: newUrl
      });
    },
    redirectTo({ url, query }) {
      let newUrl = url;
      newUrl += '?';
      Object.keys(query).forEach((item, index) => {
        newUrl += `${item}=${query[item]}&`;
      });
      wx.redirectTo({
        url: newUrl
      });
    },
  };