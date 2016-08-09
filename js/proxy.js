var badgeOn = function () {
  chrome.browserAction.setBadgeBackgroundColor({
    "color": [61, 178, 217, 255]
  });
  chrome.browserAction.setBadgeText({
    "text": "On"
  });
};

var badgeOff = function () {
  chrome.browserAction.setBadgeText({
    "text": ""
  });
};

var proxy = {
  enabled: false,

  enable: function (callback) {
    var self = this;
    var config = {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "socks5",
          host: "127.0.0.1"
        },
        bypassList: ["http://localhost:4444"]
      }
    };

    chrome.proxy.settings.set({value: config, scope: 'regular'}, function () {
      badgeOn();
      self.enabled = true;
      setTimeout(callback, 1000);
    });
  },

  disable: function (callback) {
    var self = this;
    var config = {
      mode: "direct"
    };

    chrome.proxy.settings.set({value: config, scope: 'regular'}, function () {
      badgeOff();
      self.enabled = false;
      callback();
    });
  },

  toggle: function (callback) {
    if (this.enabled) {
      this.disable(callback);
    } else {
      this.enable(callback);
    }
  }
};

// chrome.browserAction.onClicked.addListener(function (t) {
//   proxy.toggle();
// });

// disable on startup
// proxy.disable();
