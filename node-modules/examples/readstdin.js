var lastline = "";

var handle = function() {};
var done = function() {};

process.stdin.on('data', function(chunk) {
	lastline += chunk;
	var lines = lastline.split(/\n/);
	lastline = lines.pop();
	for(var i=0; i<lines.length; i++) {
		var line = lines[i];
		handle(line);
	}
}).on('end', function() {
	if(lastline)
		handle(lastline);
	done();
});

module.exports = function(online, onend) {
	handle = online;
	done = onend;

	process.stdin.resume();
}

