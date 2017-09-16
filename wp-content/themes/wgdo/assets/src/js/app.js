var GreenUnion = {};
var SHOW_GRID = false;

GreenUnion.Settings = require('./modules/settings');
GreenUnion.Banner = require('./modules/banner');
GreenUnion.Forms = require('./modules/forms');
GreenUnion.Home = require('./modules/home');
GreenUnion.Social = require('./modules/social');
GreenUnion.Login = require('./modules/login');
GreenUnion.Projects = require('./modules/projects');

jQuery ( function($) {
	$('html').removeClass('no-js').addClass('js');


	if (SHOW_GRID) {
		var $grid = '<div class="grid">';
		for (var i = 0; i < 12; i++) {
			$grid += '<span></span>';
		}
		$grid += '</div>';
		$('body').prepend($grid);
	}


	/**
	 ON DOM READY : HOME PAGE
	 ========================================== */
	if (document.querySelector('[data-template="home"]')) {
		GreenUnion.Home.start();
		console.info('Home start() : OK');
	}
});


/**
 * DEFERRED SCRIPTS
 */
window.addEventListener('load', function () {
	var App = new SiteController($);
	App.init();

	if (!document.querySelector('[data-template="home"]')) {
		/**
		 DEFER : PAGE BANNER
		 ========================================== */
		GreenUnion.Banner.init();
	}

	if (document.querySelector('[data-template="projects"]')) {
		/**
		 DEFER : PROJECTS LIST
		 ========================================== */
		GreenUnion.Projects.manageList();
	}
});

function SiteController ($) {
	self.init = function () {
		//Forms
		GreenUnion.Forms.selects();
		GreenUnion.Forms.searchForm();
		GreenUnion.Forms.newsletterForm();

		// Social Global
		GreenUnion.Social.networkModal();

		/**
		 DEFER : HOME PAGE
		 ========================================== */
		GreenUnion.Home.newsSwiper();
		GreenUnion.Home.jobsSwiper();

		/**
		 DEFER : LOGIN MODAL
		 ========================================== */
		GreenUnion.Login.loadForm('.gu-User__account');
	};

	return self;
}
