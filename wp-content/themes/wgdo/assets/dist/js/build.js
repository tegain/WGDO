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
		Home = __webpack_require__(2),
		Social = __webpack_require__(3);
	
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
			//Forms
			Forms.selects();
			Forms.searchForm();
			Forms.newsletterForm();
	
			// Social Global
			Social.networkModal();
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
	
	
	    /**
	     * Newsletter form
	     */
	    newsletterForm: function () {
	        var $widget = $('.widget_newsletterwidgetminimal'),
	            $formField = $widget.find('.tnp-email');
	
	        $formField.click(function () {
	            $widget.addClass('is-Focused');
	        });
	
	        if ($formField.val() !== '') {
	            $widget.addClass('is-Focused');
	        }
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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	var Social = {
	
	    /**
	     * Init Social networks modal (for QRCode scan purpose)
	     */
	    networkModal: function () {
	        var $networksWidget = $('.gu-Footer-social__networks'),
	            $itemsWithModal = $networksWidget.find('[data-network-hasmodal]'),
	            activeClass = 'is-Active';
	
	        $itemsWithModal.each(function () {
	            var $item = $(this);
	
	            $item.find('a').click(function (e) {
	                e.preventDefault();
	
	                // Show or hide modal
	                if ($item.is('.'+ activeClass)) {
	                    $item.removeClass(activeClass);
	                }
	                else {
	                    $itemsWithModal.removeClass(activeClass);
	                    $item.addClass(activeClass);
	                }
	            });
	
	            drawModal($item, $item.data('options'));
	        });
	
	        /**
	         * Draw social network modal
	         * @param {*} item = List item (jQuery element)
	         * @param {*} options = Modal options in HTML attribute (JSON)
	         */
	        function drawModal (item, options) {
	            if (item && options) {
	                var $item = item,
	                    modalOptions = options;
	
	                // Draw Modal if options exist
	                if (modalOptions.account && modalOptions.qrcode) {
	                    var $modal = $('<div class="gu-Footer-social__modal">');
	                    $modal.append('<strong>@'+ modalOptions.account +'</strong>');
	                    $modal.append('<img src="'+ modalOptions.qrcode +'" alt="'+ modalOptions.account +'" />');
	
	                    // Append modal to item
	                    $modal.appendTo($item);
	                }
	            }
	        }
	    },
	
	
	}
	
	module.exports = Social;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDIzNWE2ZGMzMmE5YTYyMjJhMWYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2Zvcm1zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9ob21lLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9zb2NpYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3pDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFxQyxxQ0FBcUM7O0FBRTFFO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixxQkFBcUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYixVQUFTO0FBQ1QsTUFBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOzs7QUFHVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQsTUFBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQSx3Qjs7Ozs7O0FDcExBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDs7QUFFQSx1Qjs7Ozs7O0FDNURBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBLG9CQUFtQixFQUFFO0FBQ3JCLG9CQUFtQixFQUFFO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7O0FBR0w7O0FBRUEseUIiLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0MjM1YTZkYzMyYTlhNjIyMmExZiIsIi8vPSBpbmNsdWRlIC4uLy4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvZm91bmRhdGlvbi9qcy9mb3VuZGF0aW9uLmpzXHJcbnZhciBERUJVRyA9IHRydWU7XHJcbnZhciBGb3JtcyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9mb3JtcycpLFxyXG5cdEhvbWUgPSByZXF1aXJlKCcuL21vZHVsZXMvaG9tZScpLFxyXG5cdFNvY2lhbCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9zb2NpYWwnKTtcclxuXHJcbi8qKlxyXG4gKiBERUJVRyBNT0RFXHJcbiAqL1xyXG5pZiAoREVCVUcgPT09IGZhbHNlKSB7XHJcblx0Y29uc29sZSA9IHt9O1xyXG5cdHdpbmRvdy5jb25zb2xlID0gY29uc29sZTtcclxuXHRjb25zb2xlLmxvZyA9IGZ1bmN0aW9uKCl7fTtcclxuXHRjb25zb2xlLndhcm4gPSBmdW5jdGlvbigpe307XHJcblx0Y29uc29sZS5lcnJvciA9IGZ1bmN0aW9uKCl7fTtcclxufVxyXG5cclxualF1ZXJ5ICggZnVuY3Rpb24oJCkge1xyXG5cdGNvbnNvbGUubG9nKCdET00gbG9hZGVkJyk7XHJcblxyXG5cdHZhciBHcmVlblVuaW9uID0gbmV3IFNpdGVDb250cm9sbGVyKCQpO1xyXG5cdEdyZWVuVW5pb24uaW5pdCgpO1xyXG5cclxuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGVtcGxhdGU9XCJob21lXCJdJykpIHtcclxuXHRcdEhvbWUuc3RhcnQoKTtcclxuXHRcdGNvbnNvbGUubG9nKCdIb21lIHN0YXJ0KCknKVxyXG5cdH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBTaXRlQ29udHJvbGxlciAoJCkge1xyXG5cdHNlbGYuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vRm9ybXNcclxuXHRcdEZvcm1zLnNlbGVjdHMoKTtcclxuXHRcdEZvcm1zLnNlYXJjaEZvcm0oKTtcclxuXHRcdEZvcm1zLm5ld3NsZXR0ZXJGb3JtKCk7XHJcblxyXG5cdFx0Ly8gU29jaWFsIEdsb2JhbFxyXG5cdFx0U29jaWFsLm5ldHdvcmtNb2RhbCgpO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiBzZWxmO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEZvcm1zID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9ybXMgJ1NlbGVjdCcgbWFuYWdlclxyXG4gICAgICogVHJhbnNmb3JtcyAnc2VsZWN0cycgYXMgbm9ybWFsIGxpc3QgdG8gY3VzdG9taXplIHRoZW0gZWFzaWx5XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdHM6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVPcHRpb25DbGFzcyA9ICdpcy1BY3RpdmUnO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEFkZCBDU1MgY2xhc3MgdG8gaGlkZSB0aGUgJ3NlbGVjdCcgdGFnLlxyXG4gICAgICAgICAgICAgKiBDcmVhdGUgdGhlIGxpc3Qgd3JhcHBlciAoJy5ndS1Gb3JtLXNlbGVjdF9fd3JhcHBlcicpXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAkdGhpcy5hZGRDbGFzcygnaXMtSGlkZGVuJyk7IFxyXG4gICAgICAgICAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwiZ3UtRm9ybS1zZWxlY3RfX3dyYXBwZXJcIj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJndS1Gb3JtLXNlbGVjdF9fc2VsZWN0ZWRcIj48L2Rpdj4nKTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkc3R5bGVkU2VsZWN0ID0gJHRoaXMubmV4dCgnLmd1LUZvcm0tc2VsZWN0X19zZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIElmIGFuIG9wdGlvbiBpcyBhbHJlYWR5IHNlbGVjdGVkIChoYXMgJ3NlbGVjdGVkJyBwcm9wZXJ0eSksIGRpc3BsYXlzIGl0IGFzIHRoZSBzZWxlY3RlZCBvcHRpb25cclxuICAgICAgICAgICAgICogT3RoZXJ3aXNlLCBkaXNwbGF5cyB0aGUgZmlyc3Qgb3B0aW9uIGJ5IGRlZmF1bHQuXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBpZiAoICR0aGlzLmZpbmQoJ29wdGlvbltzZWxlY3RlZF0nKS5sZW5ndGggKcKge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT3B0aW9uVmFsdWUgPSAkdGhpcy5jaGlsZHJlbignb3B0aW9uW3NlbGVjdGVkXScpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uW3NlbGVjdGVkXScpLnRleHQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKDApLnRleHQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHsgJ2NsYXNzJzogJ2d1LUZvcm0tc2VsZWN0X19vcHRpb25zJyB9KS5pbnNlcnRBZnRlcigkc3R5bGVkU2VsZWN0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBcHBlbmQgZWFjaCAnb3B0aW9uJyB2YWx1ZSB0byBhIG5ldyAnbGknIHRhZyBpbnNpZGUgdGhlIGxpc3RcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZPcHRpb25zOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICQoJzxsaSAvPicsIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlbDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnZhbCgpXHJcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgdmFyICRsaXN0SXRlbXMgPSAkbGlzdC5jaGlsZHJlbignbGknKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBZGQgJ2RhdGEtYWN0aXZlLW9wdGlvbicgYXR0cmlidXRlIHRvIHRoZSBjdXJyZW50IGxhbmd1YWdlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAkbGlzdEl0ZW1zLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RlZE9wdGlvblZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiAkKHRoaXMpLmF0dHIoJ3JlbCcpID09IHNlbGVjdGVkT3B0aW9uVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtYWN0aXZlLW9wdGlvbicsICcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RlZE9wdGlvblZhbHVlID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignSWwgblxcJ3kgYSBwYXMgZGUgbGFuZ3VlIHPDqWxlY3Rpb25uw6llIDogbGEgdmFyaWFibGUgXCJzZWxlY3RlZE9wdGlvblZhbHVlXCIgblxcJ2V4aXN0ZSBwYXMnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogRXZlbnRzIGxpc3RlbmVyc1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmd1LUZvcm0tc2VsZWN0X19zZWxlY3RlZC4nKyBhY3RpdmVPcHRpb25DbGFzcykubm90KHRoaXMpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKGFjdGl2ZU9wdGlvbkNsYXNzKS5uZXh0KCcuZ3UtRm9ybS1zZWxlY3RfX29wdGlvbnMnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoYWN0aXZlT3B0aW9uQ2xhc3MpLm5leHQoJy5ndS1Gb3JtLXNlbGVjdF9fb3B0aW9ucycpLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCQodGhpcykudGV4dCgpKS5yZW1vdmVDbGFzcyhhY3RpdmVPcHRpb25DbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSk7XHJcbiAgICAgICAgICAgICAgICAkbGlzdC5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBDaGVja3MgaWYgUG9seWxhbmcgV29yZHByZXNzIHBsdWdpbidzICd1cmxzX3BvbHlsYW5nMicgKG9iamVjdCkgdmFyaWFibGUgaXMgYWxyZWFkeSBpbml0aWFsaXplZCBpbiB0aGUgZG9jdW1lbnRcclxuICAgICAgICAgICAgICAgICAqIElmIGl0IGlzLCBjb3BpZXMgaXRzIGxvZ2ljOiBjaGFuZ2Ugd2luZG93IGxvY2F0aW9uIGRlcGVuZGluZyBvZiB0aGUgc2VsZWN0ZWQgbGFuZ3VhZ2VcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmxzX3BvbHlsYW5nMiAhPT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHVybHNfcG9seWxhbmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybHNfcG9seWxhbmcyWyQodGhpcykuYXR0cigncmVsJyldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignTGEgdmFyaWFibGUgXCJ1cmxzX3BvbHlsYW5nMlwiIG5cXCdlc3QgcGFzIGTDqWZpbmllJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogSGlkZSBzZWxlY3QgbGlzdCB3aGVuIGNsaWNraW5nIG9uIHRoZSBkb2N1bWVudFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnJlbW92ZUNsYXNzKGFjdGl2ZU9wdGlvbkNsYXNzKTtcclxuICAgICAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWFyY2ggZm9ybSBtYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHNlYXJjaEZvcm06IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJGZvcm0gPSAkKCcjZ3Utc2VhcmNoJyksXHJcbiAgICAgICAgICAgICRmb3JtV3JhcHBlciA9ICQoJy5ndS1TZWFyY2hfX3dyYXBwZXInKSxcclxuICAgICAgICAgICAgJGZvcm1Ub2dnbGVyID0gJCgnLmd1LVNlYXJjaF9fdG9nZ2xlcicpLFxyXG4gICAgICAgICAgICB0b2dnbGVBdHRyID0gJ2RhdGEtdG9nZ2xlZCc7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhpZGUgLyBTaG93IGZvcm0gZnVuY3Rpb25zIChtYW5hZ2UgZGlzcGxheSB3aXRoICdkYXRhLXRvZ2dsZWQnIGF0dHJpYnV0ZSlcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBzaG93U2VhcmNoICgpIHtcclxuICAgICAgICAgICAgJGZvcm1XcmFwcGVyLmF0dHIodG9nZ2xlQXR0ciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICRmb3JtVG9nZ2xlci5hdHRyKHRvZ2dsZUF0dHIsIHRydWUpO1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYXR0cignZGF0YS1uby1zY3JvbGwnLCAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoaWRlU2VhcmNoICgpIHtcclxuICAgICAgICAgICAgJGZvcm1XcmFwcGVyLmF0dHIodG9nZ2xlQXR0ciwgZmFsc2UpO1xyXG4gICAgICAgICAgICAkZm9ybVRvZ2dsZXIuYXR0cih0b2dnbGVBdHRyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVBdHRyKCdkYXRhLW5vLXNjcm9sbCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVG9nZ2xlIGZvcm0gYnkgY2xpY2tpbmcgb24gdGhlIGJ1dHRvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgICRmb3JtVG9nZ2xlci5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkZm9ybVdyYXBwZXIuYXR0cih0b2dnbGVBdHRyKSA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHNob3dTZWFyY2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhpZGVTZWFyY2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIaWRlIEZvcm0gd2hlbiBjbGlja2luZyBvbiBkb2N1bWVudCAoYnV0IG5vdCBvbiBmb3JtKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgICRmb3JtLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5ndS1TZWFyY2hfX3dyYXBwZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGhpZGVTZWFyY2goKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGlkZSBmb3JtIHdoZW4gcHJlc3NpbmcgJ0VzY2FwZScga2V5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgJChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3ICYmICRmb3JtV3JhcHBlci5hdHRyKHRvZ2dsZUF0dHIpID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBoaWRlU2VhcmNoKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTmV3c2xldHRlciBmb3JtXHJcbiAgICAgKi9cclxuICAgIG5ld3NsZXR0ZXJGb3JtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICR3aWRnZXQgPSAkKCcud2lkZ2V0X25ld3NsZXR0ZXJ3aWRnZXRtaW5pbWFsJyksXHJcbiAgICAgICAgICAgICRmb3JtRmllbGQgPSAkd2lkZ2V0LmZpbmQoJy50bnAtZW1haWwnKTtcclxuXHJcbiAgICAgICAgJGZvcm1GaWVsZC5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR3aWRnZXQuYWRkQ2xhc3MoJ2lzLUZvY3VzZWQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCRmb3JtRmllbGQudmFsKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICR3aWRnZXQuYWRkQ2xhc3MoJ2lzLUZvY3VzZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1zO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2Zvcm1zLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIb21lID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdCBIb21lIGZ1bmN0aW9ucyBuZWVkZWQgb24gbG9hZFxyXG4gICAgICovXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVyU3dpcGVyKCk7XHJcbiAgICAgICAgdGhpcy5uZXdzU3dpcGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSG9tZSBTbGlkZXIgc3dpcGVyXHJcbiAgICAgKiBAZG9jOiBodHRwOi8vaWRhbmdlcm8udXMvc3dpcGVyL2FwaS9cclxuICAgICAqL1xyXG4gICAgc2xpZGVyU3dpcGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVkZWZpbmUgU3dpcGVyIGxheW91dCBjbGFzc2VzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIHN3aXBlckNvbnRhaW5lckNsYXNzID0gJ2d1LUhvbWUtc2xpZGVyJyxcclxuICAgICAgICAgICAgc3dpcGVyV3JhcHBlckNsYXNzID0gc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX3dyYXBwZXInLFxyXG4gICAgICAgICAgICBzd2lwZXJTbGlkZUNsYXNzID0gJ2d1LUhvbWUtc2xpZGUnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluaXQgTmV3cyBzd2lwZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyICgnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzLCB7XHJcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBncmFiQ3Vyc29yOiB0cnVlLFxyXG4gICAgICAgICAgICBwcmV2QnV0dG9uOiAnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzICsnX19uYXZQcmV2JyxcclxuICAgICAgICAgICAgbmV4dEJ1dHRvbjogJy4nKyBzd2lwZXJDb250YWluZXJDbGFzcyArJ19fbmF2TmV4dCdcclxuICAgICAgICB9KSBcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb21lIE5ld3Mgc3dpcGVyXHJcbiAgICAgKiBAZG9jOiBodHRwOi8vaWRhbmdlcm8udXMvc3dpcGVyL2FwaS9cclxuICAgICAqL1xyXG4gICAgbmV3c1N3aXBlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZGVmaW5lIFN3aXBlciBsYXlvdXQgY2xhc3Nlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBzd2lwZXJDb250YWluZXJDbGFzcyA9ICdndS1OZXdzLXN3aXBlcicsXHJcbiAgICAgICAgICAgIHN3aXBlcldyYXBwZXJDbGFzcyA9IHN3aXBlckNvbnRhaW5lckNsYXNzICsnX193cmFwcGVyJyxcclxuICAgICAgICAgICAgc3dpcGVyU2xpZGVDbGFzcyA9ICdndS1OZXdzLXBvc3QnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluaXQgTmV3cyBzd2lwZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyICgnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzLCB7XHJcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXHJcbiAgICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBncmFiQ3Vyc29yOiB0cnVlLFxyXG4gICAgICAgICAgICBwcmV2QnV0dG9uOiAnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzICsnX19uYXZQcmV2JyxcclxuICAgICAgICAgICAgbmV4dEJ1dHRvbjogJy4nKyBzd2lwZXJDb250YWluZXJDbGFzcyArJ19fbmF2TmV4dCdcclxuICAgICAgICB9KSBcclxuICAgIH0sIFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIb21lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2hvbWUuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFNvY2lhbCA9IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXQgU29jaWFsIG5ldHdvcmtzIG1vZGFsIChmb3IgUVJDb2RlIHNjYW4gcHVycG9zZSlcclxuICAgICAqL1xyXG4gICAgbmV0d29ya01vZGFsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRuZXR3b3Jrc1dpZGdldCA9ICQoJy5ndS1Gb290ZXItc29jaWFsX19uZXR3b3JrcycpLFxyXG4gICAgICAgICAgICAkaXRlbXNXaXRoTW9kYWwgPSAkbmV0d29ya3NXaWRnZXQuZmluZCgnW2RhdGEtbmV0d29yay1oYXNtb2RhbF0nKSxcclxuICAgICAgICAgICAgYWN0aXZlQ2xhc3MgPSAnaXMtQWN0aXZlJztcclxuXHJcbiAgICAgICAgJGl0ZW1zV2l0aE1vZGFsLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgJGl0ZW0gPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgJGl0ZW0uZmluZCgnYScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBvciBoaWRlIG1vZGFsXHJcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaXMoJy4nKyBhY3RpdmVDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkaXRlbXNXaXRoTW9kYWwucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICRpdGVtLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkcmF3TW9kYWwoJGl0ZW0sICRpdGVtLmRhdGEoJ29wdGlvbnMnKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERyYXcgc29jaWFsIG5ldHdvcmsgbW9kYWxcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGl0ZW0gPSBMaXN0IGl0ZW0gKGpRdWVyeSBlbGVtZW50KVxyXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gb3B0aW9ucyA9IE1vZGFsIG9wdGlvbnMgaW4gSFRNTCBhdHRyaWJ1dGUgKEpTT04pXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZHJhd01vZGFsIChpdGVtLCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtICYmIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkaXRlbSA9IGl0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxPcHRpb25zID0gb3B0aW9ucztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEcmF3IE1vZGFsIGlmIG9wdGlvbnMgZXhpc3RcclxuICAgICAgICAgICAgICAgIGlmIChtb2RhbE9wdGlvbnMuYWNjb3VudCAmJiBtb2RhbE9wdGlvbnMucXJjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRtb2RhbCA9ICQoJzxkaXYgY2xhc3M9XCJndS1Gb290ZXItc29jaWFsX19tb2RhbFwiPicpO1xyXG4gICAgICAgICAgICAgICAgICAgICRtb2RhbC5hcHBlbmQoJzxzdHJvbmc+QCcrIG1vZGFsT3B0aW9ucy5hY2NvdW50ICsnPC9zdHJvbmc+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsLmFwcGVuZCgnPGltZyBzcmM9XCInKyBtb2RhbE9wdGlvbnMucXJjb2RlICsnXCIgYWx0PVwiJysgbW9kYWxPcHRpb25zLmFjY291bnQgKydcIiAvPicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgbW9kYWwgdG8gaXRlbVxyXG4gICAgICAgICAgICAgICAgICAgICRtb2RhbC5hcHBlbmRUbygkaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU29jaWFsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL3NvY2lhbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9