// init localStorage at startup
localStorage.current = "";
console.log(localStorage.current);

// set disabled at startup
proxy.disable(function() {
  proxid.stop();
});
