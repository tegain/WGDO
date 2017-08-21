var Forms = require('./modules/forms'),
	Home = require('./modules/home'),
	Social = require('./modules/social'),
	Login = require('./modules/login');

jQuery ( function($) {
	console.log('DOM loaded');

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
