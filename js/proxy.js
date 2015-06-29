var badgeOn = function () {
  chrome.browserAction.setBadgeBackgroundColor({
    "color": [255, 0, 0, 255]
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

  enable: function () {
    var self = this;
    var config = {
      mode: "fixed_servers",
      rules: {
        proxyForHttp: {
          scheme: "socks5",
          host: "127.0.0.1"
        },
        bypassList: ["http://localhost:4444"]
      }
    };

    chrome.proxy.settings.set({value: config, scope: 'regular'}, function () {
      badgeOn();
      self.enabled = true;
    });
  },

  disable: function () {
    var self = this;
    var config = {
      mode: "direct"
    };

    chrome.proxy.settings.set({value: config, scope: 'regular'}, function () {
      badgeOff();
      self.enabled = false;
    });
  },

  toggle: function () {
    if (this.enabled) {
      this.disable();
    } else {
      this.enable();
    }
  }
};

// chrome.browserAction.onClicked.addListener(function (t) {
//   proxy.toggle();
// });

// disable on startup
// proxy.disable();
