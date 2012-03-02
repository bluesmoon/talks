var Stats = require('fast-stats').Stats;

var s = new Stats({bucket_precision: 50});

var n = process.argv[2] || 10000;

console.time("Add data");
for(var i=0; i<n; i++) {
	s.push(parseInt(Math.random()*999+1));
}
console.timeEnd("Add data");

console.time("Analyse " + n);
console.log("Mean: %d, Geometric Mean: %d, Median: %d\nDistribution:", s.amean().toFixed(2), s.gmean().toFixed(2), s.median());
console.log(s.distribution());
console.timeEnd("Analyse " + n);
