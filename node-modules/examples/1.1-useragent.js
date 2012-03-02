var uap = require('ua-parser');

require('./run')("Parsed", "user agent strings", uap.parse);

