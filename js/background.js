$(document).ready(function () {
  // init localStorage at startup
  localStorage.current = "";

  // set disabled at startup
  proxy.disable(function() {
    proxid.stop(function (err) {
    });
  });
});
