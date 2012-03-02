var gauss = require('gauss');

var s = new gauss.Vector();

var n = process.argv[2] || 10000;

console.time("Add data");
for(var i=0; i<n; i++) {
	s.push(parseInt(Math.random()*999+1));
}
console.timeEnd("Add data");

console.time("Analyse " + n);
console.log("Mean: %d, Geometric Mean: %d, Median: %d\nDistribution:", s.mean().toFixed(2), s.gmean().toFixed(2), s.median());
console.log(s.distribution());
console.timeEnd("Analyse " + n);
