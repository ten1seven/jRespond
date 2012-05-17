/*
	jRespond holds a list of user-defined functions that are either fired or destroyed
	based on media breakpoint. Because jRespond was built to be browser agnostic, it does NOT
	sniff for media queries in the CSS. All media breakpoints need to be defined manually.
*/
(function(win,doc,undefine) {
	
	// let's be serious here...
	'use strict';
	
	win.jRespond = function(breakpoints) {
		
		// array for registered functions
		var mediaListeners = [],
		
			// array of media query breakpoints; adjust as needed
			mediaBreakpoints = breakpoints,
			
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
			
			if (testForCurr(elm['breakpoint'])) {
				elm['enter'].call();
			}
		};
		
		// loops through all registered functions and determines if they should be fired
		var cycleThrough = function() {
			
			for (var i = 0; i < mediaListeners.length; i++) {
				if (testForCurr(mediaListeners[i]['breakpoint'])) {
					mediaListeners[i]['enter'].call();
				}
			}
		};
		
		// checks for the correct breakpoint against the mediaBreakpoints list
		var returnBreakpoint = function(width) {
			
			for (var i = 0; i < mediaBreakpoints.length; i++) {
				if (width >= mediaBreakpoints[i]['enter'] && width <= mediaBreakpoints[i]['exit'] && curr !== mediaBreakpoints[i]['label']) {
					
					// update curr variable
					curr = mediaBreakpoints[i]['label'];
					
					// run the loop
					cycleThrough();
					
					// print out results
					console.log('current breakpoint: ' + curr);
					$('#test').text('current breakpoint: ' + curr);
				}
			}
		};
		
		// takes the breakpoint/s arguement from an object and tests it against the current state
		var testForCurr = function(elm) {
			
			if (typeof elm === 'object') {
				if (elm.join().indexOf(curr) >= 0) {
					return true;
				}
			} else if (typeof elm === 'string') {
				if (curr === elm) {
					return true;
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
		
		// make addFunction public
		return {
			'addFunc': function(elm) { addFunction(elm); }
		};
	
	};
	
}(this,this.document));