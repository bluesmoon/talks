var geo = require('geoip-lite');

require('./run')("Geolocated", "IP addresses", geo.lookup);
