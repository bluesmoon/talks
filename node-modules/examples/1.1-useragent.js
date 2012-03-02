var uap = require('ua-parser');

var debug=false;
if(process.argv.length == 3 && process.argv[2] == '-d')
	debug=true;

var counter=0;
function handle(line) {
	counter++;
	var parsed = uap.parse(line);
	if(debug) {
		console.log(line);
		console.log(parsed);
		console.log("");
	}
}

function done() {
	console.log("\n\n\nParsed %d user agent strings", counter);
	console.timeEnd("in");
}

console.time("in");


require('./readstdin')(handle, done);
