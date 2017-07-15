//= include ../../../bower_components/foundation/js/foundation.js
var DEBUG = true;
var Forms = require('./modules/forms'),
	Home = require('./modules/home');

/**
 * DEBUG MODE
 */
if (DEBUG === false) {
	console = {};
	window.console = console;
	console.log = function(){};
	console.warn = function(){};
	console.error = function(){};
}

jQuery ( function($) {
	console.log('DOM loaded');

	var GreenUnion = new SiteController($);
	GreenUnion.init();

	if (document.querySelector('[data-template="home"]')) {
		Home.start();
		console.log('Home start()')
	}
});

function SiteController ($) {
	self.init = function () {
		
		Forms.selects();
		Forms.searchForm();
	};

	return self;
}
