var Settings = require('./settings');

var Banner = {

	/**
	 * Banner lazyloading
	 */
	init: function(){
		var $bgImg = $('.gu-Banner__picture'),
			srcLarge = $bgImg.attr('data-banner-big'),
			id = $bgImg.attr('data-banner-id');

		// if there's a data-banner-big attr present and we're above the breakpoint
		if((typeof srcLarge !== typeof undefined && srcLarge !== false) && $(window).width() >= Settings.breakpoints.large){
			var srcSmall = $bgImg.css('background-image'),
				tmpImg = $('img');

			// preload large image, then swap sources
			tmpImg.onload = this.srcSwap($bgImg, srcSmall, srcLarge);
			tmpImg.src = srcLarge;

			// write the image ID to a cookie
			// once the large version has been cached
			this.setCookie(id);
		}
	},

	/**
	 * Use the 'layered' technique if supported, otherwise just change src
	 * Remove data attr afterwards so it won't run again on resize
	 * @param $bgImg
	 * @param srcSmall
	 * @param srcLarge
	 */
	srcSwap: function($bgImg, srcSmall, srcLarge){
		var bg = 'url('+ srcLarge +')';
		if(Modernizr.multiplebgs) bg += ', '+ srcSmall;
		$bgImg.css({'background-image' : bg}).removeAttr('data-bg-large');
	},

	/**
	 * Set cookie
	 * @param id
	 * @returns {boolean}
	 */
	setCookie: function(id){
		var cachedIds,
			//cookie = document.cookie.replace(/(?:(?:^|.*;s*)cachedBGs*=s*([^;]*).*$)|^.*$/, "$1"),
			cookie = document.cookie.replace(/(?:(?:^|.*;\s*)cachedBG\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
			expdate = new Date(),
			expdays = 365,
			separator = '|';

		if(cookie.length){
			// cookie was previously set, check contents and update
			// if the current ID already exists, bail
			cachedIds = cookie.split(separator);

			if(cachedIds.indexOf(id) > -1){
				return false;
			}
			cachedIds.push(id);
			cachedIds = cachedIds.join(separator);
		}
		else {
			// set initial cookie  
			cachedIds = id;
		}

		// write the cookie
		expdate.setTime(expdate.getTime()+(expdays*24*60*60*1000));
		document.cookie = "cachedBG="+ cachedIds +"; expires="+ expdate.toGMTString() +"; path=/";
	}
};

module.exports = Banner