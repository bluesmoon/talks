// See http://tech.bluesmoon.info/2008/10/add-drag-and-drop-to-any-website-yui26.html
(function () {
	var s = document.createElement('SCRIPT');
	s.src = "http://yui.yahooapis.com/combo?2.6.0/build/yahoo-dom-event/yahoo-dom-event.js&2.6.0/build/dragdrop/dragdrop-min.js";
	document.body.appendChild(s);

	var divs = document.getElementsByTagName('DIV');
	var mk_drag = function() {
		if(typeof YAHOO === "undefined" || typeof YAHOO.util === "undefined" || typeof YAHOO.util.DD === "undefined") {
			setTimeout(mk_drag, 100);
			return;
		}
		for(var i = divs.length-1; i>=0; i--) {
			var dd = new YAHOO.util.DD(divs[i]);
			divs[i].style.cursor="move";
		}

		alert("Made " + divs.length + " DIVs draggable");
	};

	mk_drag();
}());
