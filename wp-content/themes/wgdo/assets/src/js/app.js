var Forms = require('./modules/forms'),
	Home = require('./modules/home'),
	Social = require('./modules/social'),
	Login = require('./modules/login');

jQuery ( function($) {
	$('html').removeClass('no-js').addClass('js');

	/*
	var $grid = '<div class="grid">';
	for (var i = 0; i < 12; i++) {
		$grid += '<span></span>';
	}
	$grid += '</div>';
	$('body').prepend($grid);
	*/


	/**
	 ON DOM READY : HOME PAGE
	 ========================================== */
	if (document.querySelector('[data-template="home"]')) {
		Home.start();
		console.log('Home start()');
	}
});


/**
 * DEFERRED SCRIPTS
 */
window.addEventListener('load', function () {
	var GreenUnion = new SiteController($);
	GreenUnion.init();
});

function SiteController ($) {
	self.init = function () {
		//Forms
		Forms.selects();
		Forms.searchForm();
		Forms.newsletterForm();

		// Social Global
		Social.networkModal();

		/**
		 DEFER : HOME PAGE
		 ========================================== */
		Home.newsSwiper();
		Home.jobsSwiper();

		/**
		 DEFER : LOGIN MODAL
		 ========================================== */
		Login.loadForm('.gu-User__account');
	};

	return self;
}
