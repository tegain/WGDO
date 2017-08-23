var Forms = require('./modules/forms'),
	Home = require('./modules/home'),
	Social = require('./modules/social'),
	Login = require('./modules/login');

jQuery ( function($) {
	$('html').removeClass('no-js').addClass('js');

	var GreenUnion = new SiteController($);
	GreenUnion.init();

	/**
	 HOME PAGE 
	 ========================================== */
	if (document.querySelector('[data-template="home"]')) {
		Home.start();
		console.log('Home start()')
	}


	/**
	 LOGIN MODAL
	 ========================================== */
	Login.loadForm('.gu-User__account');
});

window.addEventListener('load', function () {

});

function SiteController ($) {
	self.init = function () {
		//Forms
		Forms.selects();
		Forms.searchForm();
		Forms.newsletterForm();

		// Social Global
		Social.networkModal();
	};

	return self;
}
