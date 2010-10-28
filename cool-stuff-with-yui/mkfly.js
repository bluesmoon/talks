(function () {
	if(window.YUI) {
		YUI().use('anim', function(Y) {
			animate(null, Y);
		});
	} else {
		var s = document.createElement('SCRIPT');
		s.src = "http://yui.yahooapis.com/3.2.0/build/yui/yui-min.js";
		s.onload = function() {
			YUI().use('anim', function(Y) {
				animate(null, Y);
			});
		};
	}

	var divs = document.getElementsByTagName('DIV');

	var random_curve = function(node) {
		var points = [],
		    n = 3,
		    winWidth = node.get('winWidth'),
		    winHeight = node.get('winHeight');
 
		for (var i = 0; i < n; ++i) {
			points.push([
				Math.floor(Math.random() * winWidth),
				Math.floor(Math.random() * winHeight)
			]);
		}
 
		points.push(node.getXY());

		return points;
	};

	var animate = function(ctx, Y) {
		var node = Y.one(divs[Math.floor(Math.random()*divs.length)]),
		    o = {
			"node": node,
			"duration": 1.5,
			"easing": Y.Easing.easeOut,
			"to": {
				"curve": random_curve(node)
			}
		    },
		    a = new Y.Anim(o);

		a.on("end", animate, this, Y);
		a.run();
	};

	document.body.appendChild(s);

}());
