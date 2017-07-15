/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	//= include ../../../bower_components/foundation/js/foundation.js
	var DEBUG = true;
	var Forms = __webpack_require__(1),
		Home = __webpack_require__(2);
	
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	var Forms = {
	
	    /**
	     * Forms 'Select' manager
	     * Transforms 'selects' as normal list to customize them easily
	     */
	    selects: function () {
	
	        $('select').each(function () {
	            var $this = $(this),
	                numberOfOptions = $(this).children('option').length,
	                activeOptionClass = 'is-Active';
	            
	            /**
	             * Add CSS class to hide the 'select' tag.
	             * Create the list wrapper ('.gu-Form-select__wrapper')
	             */
	            $this.addClass('is-Hidden'); 
	            $this.wrap('<div class="gu-Form-select__wrapper"></div>');
	            $this.after('<div class="gu-Form-select__selected"></div>');
	
	            var $styledSelect = $this.next('.gu-Form-select__selected');
	            
	            /**
	             * If an option is already selected (has 'selected' property), displays it as the selected option
	             * Otherwise, displays the first option by default.
	             */
	            if ( $this.find('option[selected]').length ) {
	                var selectedOptionValue = $this.children('option[selected]').val();
	
	                $styledSelect.text($this.children('option[selected]').text());
	            }
	            else {
	                $styledSelect.text($this.children('option').eq(0).text());
	            }
	            
	            var $list = $('<ul />', { 'class': 'gu-Form-select__options' }).insertAfter($styledSelect);
	            
	            /**
	             * Append each 'option' value to a new 'li' tag inside the list
	             */
	            for (var i = 0; i < numberOfOptions; i++) {
	                $('<li />', {
	                    text: $this.children('option').eq(i).text(),
	                    rel: $this.children('option').eq(i).val()
	                }).appendTo($list);
	            }
	        
	            var $listItems = $list.children('li');
	            
	            /**
	             * Add 'data-active-option' attribute to the current language
	             */
	            $listItems.each(function () {
	                if (typeof selectedOptionValue !== 'undefined' && $(this).attr('rel') == selectedOptionValue) {
	                    $(this).attr('data-active-option', '');
	                }
	                else if (typeof selectedOptionValue == 'undefined') {
	                    console.error('Il n\'y a pas de langue sélectionnée : la variable "selectedOptionValue" n\'existe pas');
	                }
	            });
	
	            /**
	             * Events listeners
	             */
	            $styledSelect.click(function(e) {
	                e.stopPropagation();
	                $('.gu-Form-select__selected.'+ activeOptionClass).not(this).each(function(){
	                    $(this).removeClass(activeOptionClass).next('.gu-Form-select__options').hide();
	                });
	                $(this).toggleClass(activeOptionClass).next('.gu-Form-select__options').toggle();
	            });
	        
	            $listItems.click(function(e) {
	                e.stopPropagation();
	                $styledSelect.text($(this).text()).removeClass(activeOptionClass);
	                $this.val($(this).attr('rel'));
	                $list.hide();
	
	                /**
	                 * Checks if Polylang Wordpress plugin's 'urls_polylang2' (object) variable is already initialized in the document
	                 * If it is, copies its logic: change window location depending of the selected language
	                 */
	                if (typeof urls_polylang2 !== 'undefined' || typeof urls_polylang2 !== null) {
	                    location.href = urls_polylang2[$(this).attr('rel')];
	                }
	                else {
	                    console.error('La variable "urls_polylang2" n\'est pas définie')
	                }
	            });
	            
	            /**
	             * Hide select list when clicking on the document
	             */
	            $(document).click(function() {
	                $styledSelect.removeClass(activeOptionClass);
	                $list.hide();
	            });
	
	        });
	    },
	
	
	    /**
	     * Search form manager
	     */
	    searchForm: function () {
	        var $form = $('#gu-search'),
	            $formWrapper = $('.gu-Search__wrapper'),
	            $formToggler = $('.gu-Search__toggler'),
	            toggleAttr = 'data-toggled';
	
	        /**
	         * Hide / Show form functions (manage display with 'data-toggled' attribute)
	         */
	        function showSearch () {
	            $formWrapper.attr(toggleAttr, true);
	            $formToggler.attr(toggleAttr, true);
	            $('body').attr('data-no-scroll', '');
	        }
	
	        function hideSearch () {
	            $formWrapper.attr(toggleAttr, false);
	            $formToggler.attr(toggleAttr, false);
	            $('body').removeAttr('data-no-scroll');
	        }
	
	        /**
	         * Toggle form by clicking on the button
	         */
	        $formToggler.click(function () {
	            if ($formWrapper.attr(toggleAttr) == "false") {
	                showSearch();
	            }
	            else {
	                hideSearch();
	            }
	        });
	
	        /**
	         * Hide Form when clicking on document (but not on form)
	         */
	        $form.click(function (e) {
	            e.stopPropagation();
	        });
	
	        $('.gu-Search__wrapper').click(function () {
	            hideSearch();
	        });
	        
	
	        /**
	         * Hide form when pressing 'Escape' key
	         */
	        $(document).keyup(function(e) {
	            if (e.keyCode == 27 && $formWrapper.attr(toggleAttr) == "true") {
	                hideSearch()
	            }
	        });
	
	    },
	}
	
	module.exports = Forms;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	var Home = {
	
	    /**
	     * Init Home functions needed on load
	     */
	    start: function () {
	        this.sliderSwiper();
	        this.newsSwiper();
	    },
	
	    /**
	     * Home Slider swiper
	     * @doc: http://idangero.us/swiper/api/
	     */
	    sliderSwiper: function () {
	        /**
	         * Redefine Swiper layout classes
	         */
	        var swiperContainerClass = 'gu-Home-slider',
	            swiperWrapperClass = swiperContainerClass +'__wrapper',
	            swiperSlideClass = 'gu-Home-slide';
	        
	        /**
	         * Init News swiper
	         */
	        var mySwiper = new Swiper ('.'+ swiperContainerClass, {
	            loop: false,
	            slidesPerView: 1,
	            grabCursor: true,
	            prevButton: '.'+ swiperContainerClass +'__navPrev',
	            nextButton: '.'+ swiperContainerClass +'__navNext'
	        }) 
	    },
	
	    /**
	     * Home News swiper
	     * @doc: http://idangero.us/swiper/api/
	     */
	    newsSwiper: function () {
	        /**
	         * Redefine Swiper layout classes
	         */
	        var swiperContainerClass = 'gu-News-swiper',
	            swiperWrapperClass = swiperContainerClass +'__wrapper',
	            swiperSlideClass = 'gu-News-post';
	        
	        /**
	         * Init News swiper
	         */
	        var mySwiper = new Swiper ('.'+ swiperContainerClass, {
	            loop: false,
	            slidesPerView: 'auto',
	            centeredSlides: true,
	            grabCursor: true,
	            prevButton: '.'+ swiperContainerClass +'__navPrev',
	            nextButton: '.'+ swiperContainerClass +'__navNext'
	        }) 
	    }, 
	};
	
	module.exports = Home;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWM2ZTBjZTNlYmQ5ZDgxNDI1N2EiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2Zvcm1zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9ob21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3BDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFxQyxxQ0FBcUM7O0FBRTFFO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixxQkFBcUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYixVQUFTO0FBQ1QsTUFBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOzs7QUFHVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQsTUFBSztBQUNMOztBQUVBLHdCOzs7Ozs7QUNuS0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMOztBQUVBLHVCIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZWM2ZTBjZTNlYmQ5ZDgxNDI1N2EiLCIvLz0gaW5jbHVkZSAuLi8uLi8uLi9ib3dlcl9jb21wb25lbnRzL2ZvdW5kYXRpb24vanMvZm91bmRhdGlvbi5qc1xyXG52YXIgREVCVUcgPSB0cnVlO1xyXG52YXIgRm9ybXMgPSByZXF1aXJlKCcuL21vZHVsZXMvZm9ybXMnKSxcclxuXHRIb21lID0gcmVxdWlyZSgnLi9tb2R1bGVzL2hvbWUnKTtcclxuXHJcbi8qKlxyXG4gKiBERUJVRyBNT0RFXHJcbiAqL1xyXG5pZiAoREVCVUcgPT09IGZhbHNlKSB7XHJcblx0Y29uc29sZSA9IHt9O1xyXG5cdHdpbmRvdy5jb25zb2xlID0gY29uc29sZTtcclxuXHRjb25zb2xlLmxvZyA9IGZ1bmN0aW9uKCl7fTtcclxuXHRjb25zb2xlLndhcm4gPSBmdW5jdGlvbigpe307XHJcblx0Y29uc29sZS5lcnJvciA9IGZ1bmN0aW9uKCl7fTtcclxufVxyXG5cclxualF1ZXJ5ICggZnVuY3Rpb24oJCkge1xyXG5cdGNvbnNvbGUubG9nKCdET00gbG9hZGVkJyk7XHJcblxyXG5cdHZhciBHcmVlblVuaW9uID0gbmV3IFNpdGVDb250cm9sbGVyKCQpO1xyXG5cdEdyZWVuVW5pb24uaW5pdCgpO1xyXG5cclxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGVtcGxhdGU9XCJob21lXCJdJykpIHtcclxuXHRcdEhvbWUuc3RhcnQoKTtcclxuXHRcdGNvbnNvbGUubG9nKCdIb21lIHN0YXJ0KCknKVxyXG5cdH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBTaXRlQ29udHJvbGxlciAoJCkge1xyXG5cdHNlbGYuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFxyXG5cdFx0Rm9ybXMuc2VsZWN0cygpO1xyXG5cdFx0Rm9ybXMuc2VhcmNoRm9ybSgpO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiBzZWxmO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEZvcm1zID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9ybXMgJ1NlbGVjdCcgbWFuYWdlclxyXG4gICAgICogVHJhbnNmb3JtcyAnc2VsZWN0cycgYXMgbm9ybWFsIGxpc3QgdG8gY3VzdG9taXplIHRoZW0gZWFzaWx5XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVPcHRpb25DbGFzcyA9ICdpcy1BY3RpdmUnO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEFkZCBDU1MgY2xhc3MgdG8gaGlkZSB0aGUgJ3NlbGVjdCcgdGFnLlxyXG4gICAgICAgICAgICAgKiBDcmVhdGUgdGhlIGxpc3Qgd3JhcHBlciAoJy5ndS1Gb3JtLXNlbGVjdF9fd3JhcHBlcicpXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnaXMtSGlkZGVuJyk7IFxyXG4gICAgICAgICAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwiZ3UtRm9ybS1zZWxlY3RfX3dyYXBwZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJndS1Gb3JtLXNlbGVjdF9fc2VsZWN0ZWRcIj48L2Rpdj4nKTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkc3R5bGVkU2VsZWN0ID0gJHRoaXMubmV4dCgnLmd1LUZvcm0tc2VsZWN0X19zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIElmIGFuIG9wdGlvbiBpcyBhbHJlYWR5IHNlbGVjdGVkIChoYXMgJ3NlbGVjdGVkJyBwcm9wZXJ0eSksIGRpc3BsYXlzIGl0IGFzIHRoZSBzZWxlY3RlZCBvcHRpb25cclxuICAgICAgICAgICAgICogT3RoZXJ3aXNlLCBkaXNwbGF5cyB0aGUgZmlyc3Qgb3B0aW9uIGJ5IGRlZmF1bHQuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBpZiAoICR0aGlzLmZpbmQoJ29wdGlvbltzZWxlY3RlZF0nKS5sZW5ndGggKcKge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT3B0aW9uVmFsdWUgPSAkdGhpcy5jaGlsZHJlbignb3B0aW9uW3NlbGVjdGVkXScpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uW3NlbGVjdGVkXScpLnRleHQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKDApLnRleHQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHsgJ2NsYXNzJzogJ2d1LUZvcm0tc2VsZWN0X19vcHRpb25zJyB9KS5pbnNlcnRBZnRlcigkc3R5bGVkU2VsZWN0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBcHBlbmQgZWFjaCAnb3B0aW9uJyB2YWx1ZSB0byBhIG5ldyAnbGknIHRhZyBpbnNpZGUgdGhlIGxpc3RcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZPcHRpb25zOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICQoJzxsaSAvPicsIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnZhbCgpXHJcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgdmFyICRsaXN0SXRlbXMgPSAkbGlzdC5jaGlsZHJlbignbGknKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBZGQgJ2RhdGEtYWN0aXZlLW9wdGlvbicgYXR0cmlidXRlIHRvIHRoZSBjdXJyZW50IGxhbmd1YWdlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAkbGlzdEl0ZW1zLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RlZE9wdGlvblZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiAkKHRoaXMpLmF0dHIoJ3JlbCcpID09IHNlbGVjdGVkT3B0aW9uVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtYWN0aXZlLW9wdGlvbicsICcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RlZE9wdGlvblZhbHVlID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignSWwgblxcJ3kgYSBwYXMgZGUgbGFuZ3VlIHPDqWxlY3Rpb25uw6llIDogbGEgdmFyaWFibGUgXCJzZWxlY3RlZE9wdGlvblZhbHVlXCIgblxcJ2V4aXN0ZSBwYXMnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogRXZlbnRzIGxpc3RlbmVyc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmd1LUZvcm0tc2VsZWN0X19zZWxlY3RlZC4nKyBhY3RpdmVPcHRpb25DbGFzcykubm90KHRoaXMpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKGFjdGl2ZU9wdGlvbkNsYXNzKS5uZXh0KCcuZ3UtRm9ybS1zZWxlY3RfX29wdGlvbnMnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoYWN0aXZlT3B0aW9uQ2xhc3MpLm5leHQoJy5ndS1Gb3JtLXNlbGVjdF9fb3B0aW9ucycpLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCQodGhpcykudGV4dCgpKS5yZW1vdmVDbGFzcyhhY3RpdmVPcHRpb25DbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSk7XHJcbiAgICAgICAgICAgICAgICAkbGlzdC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBDaGVja3MgaWYgUG9seWxhbmcgV29yZHByZXNzIHBsdWdpbidzICd1cmxzX3BvbHlsYW5nMicgKG9iamVjdCkgdmFyaWFibGUgaXMgYWxyZWFkeSBpbml0aWFsaXplZCBpbiB0aGUgZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAqIElmIGl0IGlzLCBjb3BpZXMgaXRzIGxvZ2ljOiBjaGFuZ2Ugd2luZG93IGxvY2F0aW9uIGRlcGVuZGluZyBvZiB0aGUgc2VsZWN0ZWQgbGFuZ3VhZ2VcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmxzX3BvbHlsYW5nMiAhPT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHVybHNfcG9seWxhbmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybHNfcG9seWxhbmcyWyQodGhpcykuYXR0cigncmVsJyldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignTGEgdmFyaWFibGUgXCJ1cmxzX3BvbHlsYW5nMlwiIG5cXCdlc3QgcGFzIGTDqWZpbmllJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogSGlkZSBzZWxlY3QgbGlzdCB3aGVuIGNsaWNraW5nIG9uIHRoZSBkb2N1bWVudFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKGFjdGl2ZU9wdGlvbkNsYXNzKTtcclxuICAgICAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2ggZm9ybSBtYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHNlYXJjaEZvcm06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJGZvcm0gPSAkKCcjZ3Utc2VhcmNoJyksXHJcbiAgICAgICAgICAgICRmb3JtV3JhcHBlciA9ICQoJy5ndS1TZWFyY2hfX3dyYXBwZXInKSxcclxuICAgICAgICAgICAgJGZvcm1Ub2dnbGVyID0gJCgnLmd1LVNlYXJjaF9fdG9nZ2xlcicpLFxyXG4gICAgICAgICAgICB0b2dnbGVBdHRyID0gJ2RhdGEtdG9nZ2xlZCc7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhpZGUgLyBTaG93IGZvcm0gZnVuY3Rpb25zIChtYW5hZ2UgZGlzcGxheSB3aXRoICdkYXRhLXRvZ2dsZWQnIGF0dHJpYnV0ZSlcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBzaG93U2VhcmNoICgpIHtcclxuICAgICAgICAgICAgJGZvcm1XcmFwcGVyLmF0dHIodG9nZ2xlQXR0ciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICRmb3JtVG9nZ2xlci5hdHRyKHRvZ2dsZUF0dHIsIHRydWUpO1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYXR0cignZGF0YS1uby1zY3JvbGwnLCAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoaWRlU2VhcmNoICgpIHtcclxuICAgICAgICAgICAgJGZvcm1XcmFwcGVyLmF0dHIodG9nZ2xlQXR0ciwgZmFsc2UpO1xyXG4gICAgICAgICAgICAkZm9ybVRvZ2dsZXIuYXR0cih0b2dnbGVBdHRyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVBdHRyKCdkYXRhLW5vLXNjcm9sbCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVG9nZ2xlIGZvcm0gYnkgY2xpY2tpbmcgb24gdGhlIGJ1dHRvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgICRmb3JtVG9nZ2xlci5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkZm9ybVdyYXBwZXIuYXR0cih0b2dnbGVBdHRyKSA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHNob3dTZWFyY2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpZGVTZWFyY2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIaWRlIEZvcm0gd2hlbiBjbGlja2luZyBvbiBkb2N1bWVudCAoYnV0IG5vdCBvbiBmb3JtKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgICRmb3JtLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5ndS1TZWFyY2hfX3dyYXBwZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGhpZGVTZWFyY2goKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGlkZSBmb3JtIHdoZW4gcHJlc3NpbmcgJ0VzY2FwZScga2V5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgJChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3ICYmICRmb3JtV3JhcHBlci5hdHRyKHRvZ2dsZUF0dHIpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBoaWRlU2VhcmNoKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9ybXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvc3JjL2pzL21vZHVsZXMvZm9ybXMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhvbWUgPSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0IEhvbWUgZnVuY3Rpb25zIG5lZWRlZCBvbiBsb2FkXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJTd2lwZXIoKTtcclxuICAgICAgICB0aGlzLm5ld3NTd2lwZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb21lIFNsaWRlciBzd2lwZXJcclxuICAgICAqIEBkb2M6IGh0dHA6Ly9pZGFuZ2Vyby51cy9zd2lwZXIvYXBpL1xyXG4gICAgICovXHJcbiAgICBzbGlkZXJTd2lwZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWRlZmluZSBTd2lwZXIgbGF5b3V0IGNsYXNzZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgc3dpcGVyQ29udGFpbmVyQ2xhc3MgPSAnZ3UtSG9tZS1zbGlkZXInLFxyXG4gICAgICAgICAgICBzd2lwZXJXcmFwcGVyQ2xhc3MgPSBzd2lwZXJDb250YWluZXJDbGFzcyArJ19fd3JhcHBlcicsXHJcbiAgICAgICAgICAgIHN3aXBlclNsaWRlQ2xhc3MgPSAnZ3UtSG9tZS1zbGlkZSc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5pdCBOZXdzIHN3aXBlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBteVN3aXBlciA9IG5ldyBTd2lwZXIgKCcuJysgc3dpcGVyQ29udGFpbmVyQ2xhc3MsIHtcclxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIGdyYWJDdXJzb3I6IHRydWUsXHJcbiAgICAgICAgICAgIHByZXZCdXR0b246ICcuJysgc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX25hdlByZXYnLFxyXG4gICAgICAgICAgICBuZXh0QnV0dG9uOiAnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzICsnX19uYXZOZXh0J1xyXG4gICAgICAgIH0pIFxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvbWUgTmV3cyBzd2lwZXJcclxuICAgICAqIEBkb2M6IGh0dHA6Ly9pZGFuZ2Vyby51cy9zd2lwZXIvYXBpL1xyXG4gICAgICovXHJcbiAgICBuZXdzU3dpcGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVkZWZpbmUgU3dpcGVyIGxheW91dCBjbGFzc2VzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIHN3aXBlckNvbnRhaW5lckNsYXNzID0gJ2d1LU5ld3Mtc3dpcGVyJyxcclxuICAgICAgICAgICAgc3dpcGVyV3JhcHBlckNsYXNzID0gc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX3dyYXBwZXInLFxyXG4gICAgICAgICAgICBzd2lwZXJTbGlkZUNsYXNzID0gJ2d1LU5ld3MtcG9zdCc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5pdCBOZXdzIHN3aXBlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBteVN3aXBlciA9IG5ldyBTd2lwZXIgKCcuJysgc3dpcGVyQ29udGFpbmVyQ2xhc3MsIHtcclxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICAgICAgICAgIGdyYWJDdXJzb3I6IHRydWUsXHJcbiAgICAgICAgICAgIHByZXZCdXR0b246ICcuJysgc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX25hdlByZXYnLFxyXG4gICAgICAgICAgICBuZXh0QnV0dG9uOiAnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzICsnX19uYXZOZXh0J1xyXG4gICAgICAgIH0pIFxyXG4gICAgfSwgXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvc3JjL2pzL21vZHVsZXMvaG9tZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9