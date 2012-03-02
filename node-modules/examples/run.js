var did_what="", to_what="", parseline=function() {};

var debug=false;
if(process.argv.length == 3 && process.argv[2] == '-d')
	debug=true;

var counter=0;
function handle(line) {
	counter++;
	var parsed = parseline(line);
	if(debug) {
		console.log(line);
		console.log(parsed);
		console.log("");
	}
}

function done() {
	console.log("\n\n\n%s %d %s", did_what, counter, to_what);
	console.timeEnd("in");
}

console.time("in");


module.exports = function(do_what, to, how) {
	did_what = do_what;
	to_what = to;
	parseline = how;
	require('./readstdin')(handle, done);
}
