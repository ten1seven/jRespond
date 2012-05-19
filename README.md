#jRespond

####jRespond is a simple way to globally manage javascript on responsive websites.

Responsive websites that require JavaScript functionality for some breakpoints and not for others need some type of system for triggering the correct funcitons at the correct breakpoint and to also be aware of when a browser is resized across breakpoints. Although switching between breakpoints could be seen as an edge case, a few applications for jRespond are:

* Managing functionalty for initial page load: Even if the browser is never resized, jRespond can help manage what javascript functions are triggered when the page loads.
* Developer testing: jRespond makes it much easier to test in-browser.
* Borderline device widths: Real user browser resizing and device rotation that crosses breakpoints.

If your project only needs to support modern browsers I highly recommend checking out Rob Tarr's <a href="https://github.com/sparkbox/mediaCheck">mediaCheck</a> that uses the <code>matchMedia</code> method. But if you're using <a href="https://github.com/scottjehl/Respond">respond.js</a> as a polyfill to ensure that your site responds on older browsers, jRespond is worth checking out.

##How does it work?

jRespond holds a list of user-defined functions that are either fired or destroyed based on the detected media breakpoint. Because jRespond was built to be browser agnostic, it does NOT sniff for media queries in the stylesheets. All media breakpoints need to be defined when calling jRespond.

``` javascript
// call jRespond and add breakpoints
var jRes = jRespond([
	{
		label: 'handheld',
		enter: 0,
		exit: 768
	},{
		label: 'tablet',
		enter: 768,
		exit: 980
	},{
		label: 'laptop',
		enter: 980,
		exit: 1200
	},{
		label: 'desktop',
		enter: 1200,
		exit: 10000
	}
]);
```

Once running, functions can be registered with jRespond along with a breakpoint.

``` javascript
jRes.addFunc({
	breakpoint: 'desktop',
	enter: function() {
		myInitFunc();
	},
	exit: function() {
		myUnInitFunc();
	}
});
```

Or an array of breakpoints.

``` javascript
jRes.addFunc({
	breakpoint: ['desktop','laptop'],
	enter: function() {
		myInitFunc();
	},
	exit: function() {
		myUnInitFunc();
	}
});
```

##Performance

jRespond is only 1.2kb minified and only polls for the browser width every 500ms. If it detects a change the polling speed is increased to 100ms only until the browser width stops changing.

##Browser Support

IE 7+, Safari 5+, Firefox 3+, Chrome 1+

##Dependencies

None.