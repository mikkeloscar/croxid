var template = function (host, active) {
  var activeClass = "";

  if (active) {
    activeClass = ' class="active"';
  }

  var tpl = `<li${activeClass}>
          <div class="host">
            <div class="action">
              <div class="btn"></div>
            </div><div class="info">
              <div class="host-id">${host.Host[0]}</div>
              <div class="hostname">${host.User}@${host.HostName}</div>
              <div class="port">${host.Port}</div>
            </div>
          </div>
        </li>`;

  return tpl;
};

$(document).ready(function () {
  proxid.info(function (err, data) {
    data.sort(function(a, b) {
      return a.Host[0].localeCompare(b.Host[0]);
    });
    data.forEach(function (host) {
      if (localStorage.current !== "" && host.Host[0] === localStorage.current) {
        $("#hosts > ul").append(template(host, true));
      } else {
        $("#hosts > ul").append(template(host));
      }
    });
  });

  $("body").on("click", "li", function (e) {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      localStorage.current = "";

      proxid.stop(function (err) {
        // stop proxy
        proxy.disable();
      });
    } else {
      // find current active
      $(this).parent().find("li.active").removeClass("active");
      $(this).addClass("active");
      localStorage.current = $(this).find(".host-id").text();

      proxid.start(localStorage.current, function (err) {
        // start proxy
        proxy.enable();
      });
    }
  });
});
