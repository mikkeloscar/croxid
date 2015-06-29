/**
 * proxid API
 */
var proxid = {
  server: "http://localhost:4444",

  /**
   * start connection to host
   *
   * @param - hostname
   */
  start: function (host, callback) {
    $.post(this.server + "/start", { host: host }, function (resp) {
      if (resp.status !== "ok") {
        console.log(resp.msg);
        callback(resp.msg);
      } else {
        callback(null);
      }
    });
  },

  /**
   * stop any connections
   */
  stop: function (callback) {
    $.post(this.server + "/stop", function (resp) {
      if (resp.status !== "ok") {
        console.log(resp.msg);
        callback(resp.msg);
      } else {
        callback(null);
      }
    });
  },

  /**
   * get list of host
   */
  info: function (callback) {
    $.get(this.server + "/info", function (resp) {
      callback(null, resp);
    });
  }
};
