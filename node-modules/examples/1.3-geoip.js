var geo = require('geoip-lite');

var debug=false;
if(process.argv.length == 3 && process.argv[2] == '-d')
	debug=true;

var counter=0;
function handle(line) {
	counter++;
	var loc = geo.lookup(line);
	if(debug) {
		console.log("%s", line);
		console.log(loc);
		console.log("");
	}
}

function done() {
	console.log("\n\n\nGeolocated %d IP addresses", counter);
	console.timeEnd("in");
}

console.time("in");

require('./readstdin')(handle, done);
