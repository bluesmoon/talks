var net = require('net');

var debug=false;
if(process.argv.length == 3 && process.argv[2] == '-d')
	debug=true;

var counter=0;
function handle(line) {
	counter++;
	var ipv = net.isIP(line);
	if(debug) {
		console.log("%s is %d", line, ipv);
	}
}

function done() {
	console.log("\n\n\nParsed %d IP addresses", counter);
	console.timeEnd("in");
}

console.time("in");

require('./readstdin')(handle, done);
