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
	            containerAlignedSlides: {
	                active: true
	            },
	            //centeredSlides: true,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTRhOTMwMThmZTU5Y2MxNjg4ZmYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2Zvcm1zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9ob21lLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9zb2NpYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3pDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFxQyxxQ0FBcUM7O0FBRTFFO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixxQkFBcUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYixVQUFTO0FBQ1QsTUFBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQSxVQUFTOzs7QUFHVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQsTUFBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQSx3Qjs7Ozs7O0FDcExBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMOztBQUVBLHVCOzs7Ozs7QUMvREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhOztBQUViO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0Esb0JBQW1CLEVBQUU7QUFDckIsb0JBQW1CLEVBQUU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOzs7QUFHTDs7QUFFQSx5QiIsImZpbGUiOiJidWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDk0YTkzMDE4ZmU1OWNjMTY4OGZmIiwiLy89IGluY2x1ZGUgLi4vLi4vLi4vYm93ZXJfY29tcG9uZW50cy9mb3VuZGF0aW9uL2pzL2ZvdW5kYXRpb24uanNcbnZhciBERUJVRyA9IHRydWU7XG52YXIgRm9ybXMgPSByZXF1aXJlKCcuL21vZHVsZXMvZm9ybXMnKSxcblx0SG9tZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9ob21lJyksXG5cdFNvY2lhbCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9zb2NpYWwnKTtcblxuLyoqXG4gKiBERUJVRyBNT0RFXG4gKi9cbmlmIChERUJVRyA9PT0gZmFsc2UpIHtcblx0Y29uc29sZSA9IHt9O1xuXHR3aW5kb3cuY29uc29sZSA9IGNvbnNvbGU7XG5cdGNvbnNvbGUubG9nID0gZnVuY3Rpb24oKXt9O1xuXHRjb25zb2xlLndhcm4gPSBmdW5jdGlvbigpe307XG5cdGNvbnNvbGUuZXJyb3IgPSBmdW5jdGlvbigpe307XG59XG5cbmpRdWVyeSAoIGZ1bmN0aW9uKCQpIHtcblx0Y29uc29sZS5sb2coJ0RPTSBsb2FkZWQnKTtcblxuXHR2YXIgR3JlZW5VbmlvbiA9IG5ldyBTaXRlQ29udHJvbGxlcigkKTtcblx0R3JlZW5Vbmlvbi5pbml0KCk7XG5cblx0aWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRlbXBsYXRlPVwiaG9tZVwiXScpKSB7XG5cdFx0SG9tZS5zdGFydCgpO1xuXHRcdGNvbnNvbGUubG9nKCdIb21lIHN0YXJ0KCknKVxuXHR9XG59KTtcblxuZnVuY3Rpb24gU2l0ZUNvbnRyb2xsZXIgKCQpIHtcblx0c2VsZi5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdC8vRm9ybXNcblx0XHRGb3Jtcy5zZWxlY3RzKCk7XG5cdFx0Rm9ybXMuc2VhcmNoRm9ybSgpO1xuXHRcdEZvcm1zLm5ld3NsZXR0ZXJGb3JtKCk7XG5cblx0XHQvLyBTb2NpYWwgR2xvYmFsXG5cdFx0U29jaWFsLm5ldHdvcmtNb2RhbCgpO1xuXHR9O1xuXG5cdHJldHVybiBzZWxmO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvc3JjL2pzL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgRm9ybXMgPSB7XG5cbiAgICAvKipcbiAgICAgKiBGb3JtcyAnU2VsZWN0JyBtYW5hZ2VyXG4gICAgICogVHJhbnNmb3JtcyAnc2VsZWN0cycgYXMgbm9ybWFsIGxpc3QgdG8gY3VzdG9taXplIHRoZW0gZWFzaWx5XG4gICAgICovXG4gICAgc2VsZWN0czogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQoJ3NlbGVjdCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgYWN0aXZlT3B0aW9uQ2xhc3MgPSAnaXMtQWN0aXZlJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQgQ1NTIGNsYXNzIHRvIGhpZGUgdGhlICdzZWxlY3QnIHRhZy5cbiAgICAgICAgICAgICAqIENyZWF0ZSB0aGUgbGlzdCB3cmFwcGVyICgnLmd1LUZvcm0tc2VsZWN0X193cmFwcGVyJylcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2lzLUhpZGRlbicpOyBcbiAgICAgICAgICAgICR0aGlzLndyYXAoJzxkaXYgY2xhc3M9XCJndS1Gb3JtLXNlbGVjdF9fd3JhcHBlclwiPjwvZGl2PicpO1xuICAgICAgICAgICAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJndS1Gb3JtLXNlbGVjdF9fc2VsZWN0ZWRcIj48L2Rpdj4nKTtcblxuICAgICAgICAgICAgdmFyICRzdHlsZWRTZWxlY3QgPSAkdGhpcy5uZXh0KCcuZ3UtRm9ybS1zZWxlY3RfX3NlbGVjdGVkJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgYW4gb3B0aW9uIGlzIGFscmVhZHkgc2VsZWN0ZWQgKGhhcyAnc2VsZWN0ZWQnIHByb3BlcnR5KSwgZGlzcGxheXMgaXQgYXMgdGhlIHNlbGVjdGVkIG9wdGlvblxuICAgICAgICAgICAgICogT3RoZXJ3aXNlLCBkaXNwbGF5cyB0aGUgZmlyc3Qgb3B0aW9uIGJ5IGRlZmF1bHQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICggJHRoaXMuZmluZCgnb3B0aW9uW3NlbGVjdGVkXScpLmxlbmd0aCApwqB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT3B0aW9uVmFsdWUgPSAkdGhpcy5jaGlsZHJlbignb3B0aW9uW3NlbGVjdGVkXScpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCR0aGlzLmNoaWxkcmVuKCdvcHRpb25bc2VsZWN0ZWRdJykudGV4dCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoMCkudGV4dCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyICRsaXN0ID0gJCgnPHVsIC8+JywgeyAnY2xhc3MnOiAnZ3UtRm9ybS1zZWxlY3RfX29wdGlvbnMnIH0pLmluc2VydEFmdGVyKCRzdHlsZWRTZWxlY3QpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFwcGVuZCBlYWNoICdvcHRpb24nIHZhbHVlIHRvIGEgbmV3ICdsaScgdGFnIGluc2lkZSB0aGUgbGlzdFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mT3B0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICByZWw6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS52YWwoKVxuICAgICAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFkZCAnZGF0YS1hY3RpdmUtb3B0aW9uJyBhdHRyaWJ1dGUgdG8gdGhlIGN1cnJlbnQgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJGxpc3RJdGVtcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdGVkT3B0aW9uVmFsdWUgIT09ICd1bmRlZmluZWQnICYmICQodGhpcykuYXR0cigncmVsJykgPT0gc2VsZWN0ZWRPcHRpb25WYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtYWN0aXZlLW9wdGlvbicsICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNlbGVjdGVkT3B0aW9uVmFsdWUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignSWwgblxcJ3kgYSBwYXMgZGUgbGFuZ3VlIHPDqWxlY3Rpb25uw6llIDogbGEgdmFyaWFibGUgXCJzZWxlY3RlZE9wdGlvblZhbHVlXCIgblxcJ2V4aXN0ZSBwYXMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFdmVudHMgbGlzdGVuZXJzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgJCgnLmd1LUZvcm0tc2VsZWN0X19zZWxlY3RlZC4nKyBhY3RpdmVPcHRpb25DbGFzcykubm90KHRoaXMpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhhY3RpdmVPcHRpb25DbGFzcykubmV4dCgnLmd1LUZvcm0tc2VsZWN0X19vcHRpb25zJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoYWN0aXZlT3B0aW9uQ2xhc3MpLm5leHQoJy5ndS1Gb3JtLXNlbGVjdF9fb3B0aW9ucycpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKGFjdGl2ZU9wdGlvbkNsYXNzKTtcbiAgICAgICAgICAgICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSk7XG4gICAgICAgICAgICAgICAgJGxpc3QuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQ2hlY2tzIGlmIFBvbHlsYW5nIFdvcmRwcmVzcyBwbHVnaW4ncyAndXJsc19wb2x5bGFuZzInIChvYmplY3QpIHZhcmlhYmxlIGlzIGFscmVhZHkgaW5pdGlhbGl6ZWQgaW4gdGhlIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICogSWYgaXQgaXMsIGNvcGllcyBpdHMgbG9naWM6IGNoYW5nZSB3aW5kb3cgbG9jYXRpb24gZGVwZW5kaW5nIG9mIHRoZSBzZWxlY3RlZCBsYW5ndWFnZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdXJsc19wb2x5bGFuZzIgIT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB1cmxzX3BvbHlsYW5nMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gdXJsc19wb2x5bGFuZzJbJCh0aGlzKS5hdHRyKCdyZWwnKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMYSB2YXJpYWJsZSBcInVybHNfcG9seWxhbmcyXCIgblxcJ2VzdCBwYXMgZMOpZmluaWUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEhpZGUgc2VsZWN0IGxpc3Qgd2hlbiBjbGlja2luZyBvbiB0aGUgZG9jdW1lbnRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5yZW1vdmVDbGFzcyhhY3RpdmVPcHRpb25DbGFzcyk7XG4gICAgICAgICAgICAgICAgJGxpc3QuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2VhcmNoIGZvcm0gbWFuYWdlclxuICAgICAqL1xuICAgIHNlYXJjaEZvcm06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRmb3JtID0gJCgnI2d1LXNlYXJjaCcpLFxuICAgICAgICAgICAgJGZvcm1XcmFwcGVyID0gJCgnLmd1LVNlYXJjaF9fd3JhcHBlcicpLFxuICAgICAgICAgICAgJGZvcm1Ub2dnbGVyID0gJCgnLmd1LVNlYXJjaF9fdG9nZ2xlcicpLFxuICAgICAgICAgICAgdG9nZ2xlQXR0ciA9ICdkYXRhLXRvZ2dsZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIaWRlIC8gU2hvdyBmb3JtIGZ1bmN0aW9ucyAobWFuYWdlIGRpc3BsYXkgd2l0aCAnZGF0YS10b2dnbGVkJyBhdHRyaWJ1dGUpXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBzaG93U2VhcmNoICgpIHtcbiAgICAgICAgICAgICRmb3JtV3JhcHBlci5hdHRyKHRvZ2dsZUF0dHIsIHRydWUpO1xuICAgICAgICAgICAgJGZvcm1Ub2dnbGVyLmF0dHIodG9nZ2xlQXR0ciwgdHJ1ZSk7XG4gICAgICAgICAgICAkKCdib2R5JykuYXR0cignZGF0YS1uby1zY3JvbGwnLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoaWRlU2VhcmNoICgpIHtcbiAgICAgICAgICAgICRmb3JtV3JhcHBlci5hdHRyKHRvZ2dsZUF0dHIsIGZhbHNlKTtcbiAgICAgICAgICAgICRmb3JtVG9nZ2xlci5hdHRyKHRvZ2dsZUF0dHIsIGZhbHNlKTtcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVBdHRyKCdkYXRhLW5vLXNjcm9sbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRvZ2dsZSBmb3JtIGJ5IGNsaWNraW5nIG9uIHRoZSBidXR0b25cbiAgICAgICAgICovXG4gICAgICAgICRmb3JtVG9nZ2xlci5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJGZvcm1XcmFwcGVyLmF0dHIodG9nZ2xlQXR0cikgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgICAgc2hvd1NlYXJjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaGlkZVNlYXJjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSGlkZSBGb3JtIHdoZW4gY2xpY2tpbmcgb24gZG9jdW1lbnQgKGJ1dCBub3Qgb24gZm9ybSlcbiAgICAgICAgICovXG4gICAgICAgICRmb3JtLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ3UtU2VhcmNoX193cmFwcGVyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaGlkZVNlYXJjaCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhpZGUgZm9ybSB3aGVuIHByZXNzaW5nICdFc2NhcGUnIGtleVxuICAgICAgICAgKi9cbiAgICAgICAgJChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNyAmJiAkZm9ybVdyYXBwZXIuYXR0cih0b2dnbGVBdHRyKSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgIGhpZGVTZWFyY2goKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIE5ld3NsZXR0ZXIgZm9ybVxuICAgICAqL1xuICAgIG5ld3NsZXR0ZXJGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkd2lkZ2V0ID0gJCgnLndpZGdldF9uZXdzbGV0dGVyd2lkZ2V0bWluaW1hbCcpLFxuICAgICAgICAgICAgJGZvcm1GaWVsZCA9ICR3aWRnZXQuZmluZCgnLnRucC1lbWFpbCcpO1xuXG4gICAgICAgICRmb3JtRmllbGQuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHdpZGdldC5hZGRDbGFzcygnaXMtRm9jdXNlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoJGZvcm1GaWVsZC52YWwoKSAhPT0gJycpIHtcbiAgICAgICAgICAgICR3aWRnZXQuYWRkQ2xhc3MoJ2lzLUZvY3VzZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvc3JjL2pzL21vZHVsZXMvZm9ybXMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEhvbWUgPSB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0IEhvbWUgZnVuY3Rpb25zIG5lZWRlZCBvbiBsb2FkXG4gICAgICovXG4gICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zbGlkZXJTd2lwZXIoKTtcbiAgICAgICAgdGhpcy5uZXdzU3dpcGVyKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhvbWUgU2xpZGVyIHN3aXBlclxuICAgICAqIEBkb2M6IGh0dHA6Ly9pZGFuZ2Vyby51cy9zd2lwZXIvYXBpL1xuICAgICAqL1xuICAgIHNsaWRlclN3aXBlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVkZWZpbmUgU3dpcGVyIGxheW91dCBjbGFzc2VzXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgc3dpcGVyQ29udGFpbmVyQ2xhc3MgPSAnZ3UtSG9tZS1zbGlkZXInLFxuICAgICAgICAgICAgc3dpcGVyV3JhcHBlckNsYXNzID0gc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX3dyYXBwZXInLFxuICAgICAgICAgICAgc3dpcGVyU2xpZGVDbGFzcyA9ICdndS1Ib21lLXNsaWRlJztcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbml0IE5ld3Mgc3dpcGVyXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyICgnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzLCB7XG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICBncmFiQ3Vyc29yOiB0cnVlLFxuICAgICAgICAgICAgcHJldkJ1dHRvbjogJy4nKyBzd2lwZXJDb250YWluZXJDbGFzcyArJ19fbmF2UHJldicsXG4gICAgICAgICAgICBuZXh0QnV0dG9uOiAnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzICsnX19uYXZOZXh0J1xuICAgICAgICB9KSBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSG9tZSBOZXdzIHN3aXBlclxuICAgICAqIEBkb2M6IGh0dHA6Ly9pZGFuZ2Vyby51cy9zd2lwZXIvYXBpL1xuICAgICAqL1xuICAgIG5ld3NTd2lwZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZGVmaW5lIFN3aXBlciBsYXlvdXQgY2xhc3Nlc1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHN3aXBlckNvbnRhaW5lckNsYXNzID0gJ2d1LU5ld3Mtc3dpcGVyJyxcbiAgICAgICAgICAgIHN3aXBlcldyYXBwZXJDbGFzcyA9IHN3aXBlckNvbnRhaW5lckNsYXNzICsnX193cmFwcGVyJyxcbiAgICAgICAgICAgIHN3aXBlclNsaWRlQ2xhc3MgPSAnZ3UtTmV3cy1wb3N0JztcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbml0IE5ld3Mgc3dpcGVyXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyICgnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzLCB7XG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICAgICAgICAgIGNvbnRhaW5lckFsaWduZWRTbGlkZXM6IHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvL2NlbnRlcmVkU2xpZGVzOiB0cnVlLFxuICAgICAgICAgICAgZ3JhYkN1cnNvcjogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZCdXR0b246ICcuJysgc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX25hdlByZXYnLFxuICAgICAgICAgICAgbmV4dEJ1dHRvbjogJy4nKyBzd2lwZXJDb250YWluZXJDbGFzcyArJ19fbmF2TmV4dCdcbiAgICAgICAgfSkgXG4gICAgfSwgXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvc3JjL2pzL21vZHVsZXMvaG9tZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgU29jaWFsID0ge1xuXG4gICAgLyoqXG4gICAgICogSW5pdCBTb2NpYWwgbmV0d29ya3MgbW9kYWwgKGZvciBRUkNvZGUgc2NhbiBwdXJwb3NlKVxuICAgICAqL1xuICAgIG5ldHdvcmtNb2RhbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG5ldHdvcmtzV2lkZ2V0ID0gJCgnLmd1LUZvb3Rlci1zb2NpYWxfX25ldHdvcmtzJyksXG4gICAgICAgICAgICAkaXRlbXNXaXRoTW9kYWwgPSAkbmV0d29ya3NXaWRnZXQuZmluZCgnW2RhdGEtbmV0d29yay1oYXNtb2RhbF0nKSxcbiAgICAgICAgICAgIGFjdGl2ZUNsYXNzID0gJ2lzLUFjdGl2ZSc7XG5cbiAgICAgICAgJGl0ZW1zV2l0aE1vZGFsLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICRpdGVtID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgJGl0ZW0uZmluZCgnYScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBvciBoaWRlIG1vZGFsXG4gICAgICAgICAgICAgICAgaWYgKCRpdGVtLmlzKCcuJysgYWN0aXZlQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICRpdGVtLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRpdGVtc1dpdGhNb2RhbC5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICRpdGVtLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZHJhd01vZGFsKCRpdGVtLCAkaXRlbS5kYXRhKCdvcHRpb25zJykpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRHJhdyBzb2NpYWwgbmV0d29yayBtb2RhbFxuICAgICAgICAgKiBAcGFyYW0geyp9IGl0ZW0gPSBMaXN0IGl0ZW0gKGpRdWVyeSBlbGVtZW50KVxuICAgICAgICAgKiBAcGFyYW0geyp9IG9wdGlvbnMgPSBNb2RhbCBvcHRpb25zIGluIEhUTUwgYXR0cmlidXRlIChKU09OKVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZHJhd01vZGFsIChpdGVtLCBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoaXRlbSAmJiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyICRpdGVtID0gaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxPcHRpb25zID0gb3B0aW9ucztcblxuICAgICAgICAgICAgICAgIC8vIERyYXcgTW9kYWwgaWYgb3B0aW9ucyBleGlzdFxuICAgICAgICAgICAgICAgIGlmIChtb2RhbE9wdGlvbnMuYWNjb3VudCAmJiBtb2RhbE9wdGlvbnMucXJjb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkbW9kYWwgPSAkKCc8ZGl2IGNsYXNzPVwiZ3UtRm9vdGVyLXNvY2lhbF9fbW9kYWxcIj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsLmFwcGVuZCgnPHN0cm9uZz5AJysgbW9kYWxPcHRpb25zLmFjY291bnQgKyc8L3N0cm9uZz4nKTtcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsLmFwcGVuZCgnPGltZyBzcmM9XCInKyBtb2RhbE9wdGlvbnMucXJjb2RlICsnXCIgYWx0PVwiJysgbW9kYWxPcHRpb25zLmFjY291bnQgKydcIiAvPicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBtb2RhbCB0byBpdGVtXG4gICAgICAgICAgICAgICAgICAgICRtb2RhbC5hcHBlbmRUbygkaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU29jaWFsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL3NvY2lhbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9