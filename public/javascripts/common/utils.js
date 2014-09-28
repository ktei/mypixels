define(function () {
  return {
    redirect: function (url) {
      window.location.href = location.protocol + "//" + location.host + url;
    }
  };
});