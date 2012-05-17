/*
	jRespond holds a list of user-defined functions that are either fired or destroyed
	based on media breakpoint. Because jRespond was built to be browser agnostic, it does NOT
	sniff for media queries in the CSS. All media breakpoints need to be defined manually.
*/
jRespond = (function(window,document,undefined) {
	
	// let's be serious here...
	'use strict';
	
	// array for registered functions
	var mediaListeners = [],
	
		// array of media query breakpoints; adjust as needed
		mediaBreakpoints = [
			{
				'label': 'handheld',
				'enter': 0,
				'exit': 767
			},{
				'label': 'tablet',
				'enter': 768,
				'exit': 979
			},{
				'label': 'laptop',
				'enter': 980,
				'exit': 1199
			},{
				'label': 'desktop',
				'enter': 1200,
				'exit': 10000
			}
		],
		
		// store the current breakpoint
		curr = '',
		
		// window resize event timer stuff
		resizeTimer,
		resizeW = 0,
		resizeTmrFast = 100,
		resizeTmrSlow = 500,
		resizeTmrSpd = resizeTmrSlow;
	
	
	// send media to the mediaListeners array
	var addFunction = function(elm) {
		
		// add function to stack
		mediaListeners.push(elm);
		
		// check to see if it needs to be fired
		for (var i = 0; i < mediaListeners.length; i++) {
			//console.log(mediaListeners[i]);
		}
	};
	
	// checks for the correct breakpoint against the mediaBreakpoints list
	var returnBreakpoint = function(width) {
		
		for (var i = 0; i < mediaBreakpoints.length; i++) {
			if (width >= mediaBreakpoints[i]['enter'] && width <= mediaBreakpoints[i]['exit'] && curr !== mediaBreakpoints[i]['label']) {
				
				console.log(mediaBreakpoints[i]['label']);
				$('#test').text(mediaBreakpoints[i]['label']);
				
				curr = mediaBreakpoints[i]['label'];
			}
		}
	};
	
	// self-calling function that checks the browser width and delegates if it detects a change
	var checkResize = function() {
		
		// get current width
		var w = $(window).width();
		
		// check if the current width has changed
		console.log('w: ' + w + ' // resizeW: ' + resizeW + ' // resizeTmrSpd: ' + resizeTmrSpd);
		
		// if there is a change speed up the timer and fire the returnBreakpoint function
		if (w !== resizeW) {
			resizeTmrSpd = resizeTmrFast;
			resizeW = w;
			
			returnBreakpoint(w);
		
		// otherwise keep on keepin' on
		} else {
			resizeTmrSpd = resizeTmrSlow;
			resizeW = w;
		}
		
		// calls itself on a setTimeout
		setTimeout(checkResize, resizeTmrSpd);
	};
	checkResize();
	
	// make mediaCheck public
	return {
		'addFunc': function(elm) { addFunction(elm); }
	};
	
}(this,this.document));