var strftime = require('prettydate').strftime;

require('./run')("Formatted", "timestamps", function(line) { return strftime(new Date(parseInt(line)), "%c") });
