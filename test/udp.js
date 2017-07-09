const dgram = require('dgram');
const Socks = require('socks');

const options = {
  proxy: {
    ipaddress: "localhost",
    port: 1081,
    type: 5,
    command: "associate" // Since we are using associate, we must specify it here.
  },
  target: {
    // When using associate, either set the ip and port to 0.0.0.0:0 or the expected source of incoming udp packets.
    // Note: Some SOCKS servers MAY block associate requests with 0.0.0.0:0 endpoints.
    // Note: ipv4, ipv6, and hostnames are supported here.
    host: "bing.com",
    port: 80
  }
};

Socks.createConnection(options, function (err, socket) {
  if (err) {
    console.log(err);
  } else {
    const pack = Socks.createUDPFrame({host: "bilibili.com", port: 80}, new Buffer("GET /index/data/promote-tag.json HTTP/1.1\r\nHost: bilibili.com\r\n\r\n"));
    socket.write(pack);
  }
});
