


//var z = document.getElementsByTagName("script");
//for (var i=0;i < scripts.length-1;i++)
//{
//  console.log(i, scripts[i]);
//};

/*
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
    var $ = require("jquery")(window);
    $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
      console.log(JSON.stringify(data, null, 2));
    });
    console.log("jsdom window done");
});
*/
var getIP = require('ipware')().get_ip;
app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    console.log(ipInfo);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});
