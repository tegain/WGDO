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

	var Forms = __webpack_require__(1),
		Home = __webpack_require__(2),
		Social = __webpack_require__(3),
		Login = __webpack_require__(4);
	
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
	            $formWrapper.find('.gu-Search__input').focus();
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
	        this.textLayout();
	
	        $(window).on('resize', function () {
	            setTimeout(Home.textLayout(), 2000);
	        });
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
	        var homeSlider = new Swiper ('.'+ swiperContainerClass, {
	            loop: false,
	            slidesPerView: 1,
	            grabCursor: true,
	            prevButton: '.'+ swiperContainerClass +'__navPrev',
	            nextButton: '.'+ swiperContainerClass +'__navNext',
	        });
	
	    },
	
	
	    textLayout: function () {
	        var mainContainerOffset = $('.container').offset().left;
	
	        if (mainContainerOffset !== 0) {
	            //console.log('Positive offset: ', mainContainerOffset)
	            $('.gu-Home-text__inner').css('margin-left', mainContainerOffset);
	        }
	        else {
	            //console.log('Offset: ', mainContainerOffset)
	            $('.gu-Home-text__inner').removeAttr('style');
	        }
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
	            swiperSlideClass = 'gu-News-post',
	            mainContainerOffset = $('.container').offset().left;
	        
	        /**
	         * Init News swiper
	         */
	        var newsSlider = new Swiper ('.'+ swiperContainerClass, {
	            loop: false,
	            slidesPerView: 'auto',
	            slidesOffsetBefore: mainContainerOffset,
	            grabCursor: true,
	            prevButton: '.'+ swiperContainerClass +'__navPrev',
	            nextButton: '.'+ swiperContainerClass +'__navNext',
	        });
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var Forms = __webpack_require__(1),
	    Modal = __webpack_require__(5);
	
	var Login = {
	
	    /**
	     * Load login form in Ajax
	     * @param link [jQuery element] => Link to init from (with its 'href' attribute)
	     */
	    loadForm: function (link) {
	        var $loginBtn = $(link),
	            loginURL = $loginBtn.attr('href'),
	            isLogged = $('body').is('.logged-in');
	        
	        $loginBtn.click(function (e) {
	            var $btn = $(this);
	
	            /**
	             * - Check for already logged-in users
	             * - Prevent redirect by clicking on the link
	             * - jQuery load() the form element on the target URL, then request Modal.create() method, to append content into a new modal
	             * - Call self submitForm() method when user submits form
	             */
	            if (isLogged == false) {
	                e.preventDefault();
	                $btn.attr('data-loading', true); // CSS purpose
	                
	                var loginModalClass = 'gu-Modal-login';
	
	                /**
	                 * Check for alrady existing modal with this class,
	                 * in order to just show it instead of requesting again
	                 */
	                if ($('.'+ loginModalClass).length) {
	                    Modal.show('.'+ loginModalClass);
	                    Login.submitForm('#gu-Login-form', loginURL);
	                }
	                else {
	                    var $loginForm = $('<div />');
	
	                    $loginForm.load(loginURL +' #gu-Login-authentification', function () {
	                        $btn.attr('data-loading', false);
	                        Modal.create($loginForm, loginModalClass);
	                        Login.submitForm('#gu-Login-form', loginURL);
	                    });
	                }
	            }
	        });
	    },
	
	    /**
	     * Ajax Login
	     * @param form [string] => class/ID/etc. of the form to submit
	     * @param UrlToRedirect [string] => URL to redirect user to after logging in
	     */
	    submitForm: function (form, UrlToRedirect) {
	        var form = form;
	
	        $(form).submit(function(e) {
	            e.preventDefault();
	
	            var $form = $(this);
	            var donnees = $form.serialize();
	            var action = $form.attr('action');
	
	            $form.attr("data-sending", true);
	
	            $.post(action, donnees, function(data) {
	                /**
	                 * Check for Wordpress login error and displays them
	                 */
	                if ($(data).find('#login_error').length) {
	                    var $errorMsg = $(data).find('#login_error'),
	                        $errorContainer = ($('.gu-Login-error').length) ? $('.gu-Login-error') : $('<div class="gu-Login-error" />');
	
	                    $errorContainer.html('').prepend($errorMsg);
	                    $form.prepend($errorContainer);
	                } else {
	                    /**
	                     * Redirects user to URL once logged in
	                     */
	                    window.location.href = UrlToRedirect;
	                }
	            });
	        });
	    }
	}
	
	module.exports = Login;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	var Modal = {
	    params: {
	        defaultClass: 'gu-Modal-default',
	        closeBtnClass: 'gu-Modal-close',
	        closedModalClass: 'gu-Modal-isClosed',
	        bodyAttribute: 'data-hasModal'
	    },
	
	    /**
	     * Create Modal
	     * @param content [html object] => The content to display inside modal
	     * @param modalclass [string] => optional specific class added to the modal
	     * 
	     * Create a modal HTML element and append content inside
	     */
	    create: function (content, modalclass) {
	        var modalClass = (modalclass) ? modalclass : Modal.params.defaultClass,
	            // Check if a modal already exists, then reset its content instead of creating a new one
	            $modal = ($('#gu-Modal').length) ?
	                      $('#gu-Modal') :
	                      $('<div id="gu-Modal" class="gu-Modal '+ modalClass +'" />');
	        
	        $('body').attr(Modal.params.bodyAttribute, true);             
	        $modal.html('').removeClass(Modal.params.closedModalClass);
	        $modal.append('<button class="'+ Modal.params.closeBtnClass +'" />');
	        $modal.append(content);
	        $modal.appendTo('body');
	
	        // Close modal
	        $modal.find('.'+ Modal.params.closeBtnClass).click(function() {
	            Modal.close($modal);
	        });
	    },
	    
	
	    /**
	     * Show existing (but hidden) modal
	     */
	    show: function (modal) {
	        if (modal && !$(modal+':visible').length) {
	            $(modal).removeClass(Modal.params.closedModalClass);
	            $('body').attr(Modal.params.bodyAttribute, true); 
	        }
	    },
	
	
	    /**
	     * Close / Hide modal
	     */
	    close: function (modal) {
	        var $modal = modal;
	
	        $modal.addClass(Modal.params.closedModalClass);
	        $('body').removeAttr(Modal.params.bodyAttribute);
	    },
	}
	
	module.exports = Modal;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmZjMTUyMzFkOGU3N2U2MTExNWEiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2Zvcm1zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9ob21lLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9zb2NpYWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2xvZ2luLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN6Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBcUMscUNBQXFDOztBQUUxRTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVDtBQUNBOztBQUVBLHdCOzs7Ozs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4RDtBQUNBO0FBQ0EsTUFBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBLHdCIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmZjMTUyMzFkOGU3N2U2MTExNWEiLCJ2YXIgRm9ybXMgPSByZXF1aXJlKCcuL21vZHVsZXMvZm9ybXMnKSxcblx0SG9tZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9ob21lJyksXG5cdFNvY2lhbCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9zb2NpYWwnKSxcblx0TG9naW4gPSByZXF1aXJlKCcuL21vZHVsZXMvbG9naW4nKTtcblxualF1ZXJ5ICggZnVuY3Rpb24oJCkge1xuXHRjb25zb2xlLmxvZygnRE9NIGxvYWRlZCcpO1xuXG5cdHZhciBHcmVlblVuaW9uID0gbmV3IFNpdGVDb250cm9sbGVyKCQpO1xuXHRHcmVlblVuaW9uLmluaXQoKTtcblxuXG5cdC8qKlxuXHQgSE9NRSBQQUdFIFxuXHQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZW1wbGF0ZT1cImhvbWVcIl0nKSkge1xuXHRcdEhvbWUuc3RhcnQoKTtcblx0XHRjb25zb2xlLmxvZygnSG9tZSBzdGFydCgpJylcblx0fVxuXG5cblx0LyoqXG5cdCBMT0dJTiBNT0RBTCBcblx0ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHRMb2dpbi5sb2FkRm9ybSgnLmd1LVVzZXJfX2FjY291bnQnKTtcblx0XG5cdFxufSk7XG5cbmZ1bmN0aW9uIFNpdGVDb250cm9sbGVyICgkKSB7XG5cdHNlbGYuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHQvL0Zvcm1zXG5cdFx0Rm9ybXMuc2VsZWN0cygpO1xuXHRcdEZvcm1zLnNlYXJjaEZvcm0oKTtcblx0XHRGb3Jtcy5uZXdzbGV0dGVyRm9ybSgpO1xuXG5cdFx0Ly8gU29jaWFsIEdsb2JhbFxuXHRcdFNvY2lhbC5uZXR3b3JrTW9kYWwoKTtcblx0fTtcblxuXHRyZXR1cm4gc2VsZjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEZvcm1zID0ge1xuXG4gICAgLyoqXG4gICAgICogRm9ybXMgJ1NlbGVjdCcgbWFuYWdlclxuICAgICAqIFRyYW5zZm9ybXMgJ3NlbGVjdHMnIGFzIG5vcm1hbCBsaXN0IHRvIGN1c3RvbWl6ZSB0aGVtIGVhc2lseVxuICAgICAqL1xuICAgIHNlbGVjdHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKCdzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGFjdGl2ZU9wdGlvbkNsYXNzID0gJ2lzLUFjdGl2ZSc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQWRkIENTUyBjbGFzcyB0byBoaWRlIHRoZSAnc2VsZWN0JyB0YWcuXG4gICAgICAgICAgICAgKiBDcmVhdGUgdGhlIGxpc3Qgd3JhcHBlciAoJy5ndS1Gb3JtLXNlbGVjdF9fd3JhcHBlcicpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdpcy1IaWRkZW4nKTsgXG4gICAgICAgICAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwiZ3UtRm9ybS1zZWxlY3RfX3dyYXBwZXJcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICR0aGlzLmFmdGVyKCc8ZGl2IGNsYXNzPVwiZ3UtRm9ybS1zZWxlY3RfX3NlbGVjdGVkXCI+PC9kaXY+Jyk7XG5cbiAgICAgICAgICAgIHZhciAkc3R5bGVkU2VsZWN0ID0gJHRoaXMubmV4dCgnLmd1LUZvcm0tc2VsZWN0X19zZWxlY3RlZCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIGFuIG9wdGlvbiBpcyBhbHJlYWR5IHNlbGVjdGVkIChoYXMgJ3NlbGVjdGVkJyBwcm9wZXJ0eSksIGRpc3BsYXlzIGl0IGFzIHRoZSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgICAgICAqIE90aGVyd2lzZSwgZGlzcGxheXMgdGhlIGZpcnN0IG9wdGlvbiBieSBkZWZhdWx0LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoICR0aGlzLmZpbmQoJ29wdGlvbltzZWxlY3RlZF0nKS5sZW5ndGggKcKge1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZE9wdGlvblZhbHVlID0gJHRoaXMuY2hpbGRyZW4oJ29wdGlvbltzZWxlY3RlZF0nKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uW3NlbGVjdGVkXScpLnRleHQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKDApLnRleHQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHsgJ2NsYXNzJzogJ2d1LUZvcm0tc2VsZWN0X19vcHRpb25zJyB9KS5pbnNlcnRBZnRlcigkc3R5bGVkU2VsZWN0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBcHBlbmQgZWFjaCAnb3B0aW9uJyB2YWx1ZSB0byBhIG5ldyAnbGknIHRhZyBpbnNpZGUgdGhlIGxpc3RcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgICAgICQoJzxsaSAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnRleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyICRsaXN0SXRlbXMgPSAkbGlzdC5jaGlsZHJlbignbGknKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQgJ2RhdGEtYWN0aXZlLW9wdGlvbicgYXR0cmlidXRlIHRvIHRoZSBjdXJyZW50IGxhbmd1YWdlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICRsaXN0SXRlbXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RlZE9wdGlvblZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiAkKHRoaXMpLmF0dHIoJ3JlbCcpID09IHNlbGVjdGVkT3B0aW9uVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWFjdGl2ZS1vcHRpb24nLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RlZE9wdGlvblZhbHVlID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0lsIG5cXCd5IGEgcGFzIGRlIGxhbmd1ZSBzw6lsZWN0aW9ubsOpZSA6IGxhIHZhcmlhYmxlIFwic2VsZWN0ZWRPcHRpb25WYWx1ZVwiIG5cXCdleGlzdGUgcGFzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXZlbnRzIGxpc3RlbmVyc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJy5ndS1Gb3JtLXNlbGVjdF9fc2VsZWN0ZWQuJysgYWN0aXZlT3B0aW9uQ2xhc3MpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoYWN0aXZlT3B0aW9uQ2xhc3MpLm5leHQoJy5ndS1Gb3JtLXNlbGVjdF9fb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGFjdGl2ZU9wdGlvbkNsYXNzKS5uZXh0KCcuZ3UtRm9ybS1zZWxlY3RfX29wdGlvbnMnKS50b2dnbGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgICRsaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCQodGhpcykudGV4dCgpKS5yZW1vdmVDbGFzcyhhY3RpdmVPcHRpb25DbGFzcyk7XG4gICAgICAgICAgICAgICAgJHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpO1xuICAgICAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENoZWNrcyBpZiBQb2x5bGFuZyBXb3JkcHJlc3MgcGx1Z2luJ3MgJ3VybHNfcG9seWxhbmcyJyAob2JqZWN0KSB2YXJpYWJsZSBpcyBhbHJlYWR5IGluaXRpYWxpemVkIGluIHRoZSBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAqIElmIGl0IGlzLCBjb3BpZXMgaXRzIGxvZ2ljOiBjaGFuZ2Ugd2luZG93IGxvY2F0aW9uIGRlcGVuZGluZyBvZiB0aGUgc2VsZWN0ZWQgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHVybHNfcG9seWxhbmcyICE9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgdXJsc19wb2x5bGFuZzIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybHNfcG9seWxhbmcyWyQodGhpcykuYXR0cigncmVsJyldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignTGEgdmFyaWFibGUgXCJ1cmxzX3BvbHlsYW5nMlwiIG5cXCdlc3QgcGFzIGTDqWZpbmllJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBIaWRlIHNlbGVjdCBsaXN0IHdoZW4gY2xpY2tpbmcgb24gdGhlIGRvY3VtZW50XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoYWN0aXZlT3B0aW9uQ2xhc3MpO1xuICAgICAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3JtIG1hbmFnZXJcbiAgICAgKi9cbiAgICBzZWFyY2hGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkZm9ybSA9ICQoJyNndS1zZWFyY2gnKSxcbiAgICAgICAgICAgICRmb3JtV3JhcHBlciA9ICQoJy5ndS1TZWFyY2hfX3dyYXBwZXInKSxcbiAgICAgICAgICAgICRmb3JtVG9nZ2xlciA9ICQoJy5ndS1TZWFyY2hfX3RvZ2dsZXInKSxcbiAgICAgICAgICAgIHRvZ2dsZUF0dHIgPSAnZGF0YS10b2dnbGVkJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogSGlkZSAvIFNob3cgZm9ybSBmdW5jdGlvbnMgKG1hbmFnZSBkaXNwbGF5IHdpdGggJ2RhdGEtdG9nZ2xlZCcgYXR0cmlidXRlKVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc2hvd1NlYXJjaCAoKSB7XG4gICAgICAgICAgICAkZm9ybVdyYXBwZXIuYXR0cih0b2dnbGVBdHRyLCB0cnVlKTtcbiAgICAgICAgICAgICRmb3JtVG9nZ2xlci5hdHRyKHRvZ2dsZUF0dHIsIHRydWUpO1xuICAgICAgICAgICAgJCgnYm9keScpLmF0dHIoJ2RhdGEtbm8tc2Nyb2xsJywgJycpO1xuICAgICAgICAgICAgJGZvcm1XcmFwcGVyLmZpbmQoJy5ndS1TZWFyY2hfX2lucHV0JykuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhpZGVTZWFyY2ggKCkge1xuICAgICAgICAgICAgJGZvcm1XcmFwcGVyLmF0dHIodG9nZ2xlQXR0ciwgZmFsc2UpO1xuICAgICAgICAgICAgJGZvcm1Ub2dnbGVyLmF0dHIodG9nZ2xlQXR0ciwgZmFsc2UpO1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUF0dHIoJ2RhdGEtbm8tc2Nyb2xsJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVG9nZ2xlIGZvcm0gYnkgY2xpY2tpbmcgb24gdGhlIGJ1dHRvblxuICAgICAgICAgKi9cbiAgICAgICAgJGZvcm1Ub2dnbGVyLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgkZm9ybVdyYXBwZXIuYXR0cih0b2dnbGVBdHRyKSA9PSBcImZhbHNlXCIpIHtcbiAgICAgICAgICAgICAgICBzaG93U2VhcmNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBoaWRlU2VhcmNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIaWRlIEZvcm0gd2hlbiBjbGlja2luZyBvbiBkb2N1bWVudCAoYnV0IG5vdCBvbiBmb3JtKVxuICAgICAgICAgKi9cbiAgICAgICAgJGZvcm0uY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5ndS1TZWFyY2hfX3dyYXBwZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBoaWRlU2VhcmNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcblxuICAgICAgICAvKipcbiAgICAgICAgICogSGlkZSBmb3JtIHdoZW4gcHJlc3NpbmcgJ0VzY2FwZScga2V5XG4gICAgICAgICAqL1xuICAgICAgICAkKGRvY3VtZW50KS5rZXl1cChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3ICYmICRmb3JtV3JhcHBlci5hdHRyKHRvZ2dsZUF0dHIpID09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICAgICAgaGlkZVNlYXJjaCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogTmV3c2xldHRlciBmb3JtXG4gICAgICovXG4gICAgbmV3c2xldHRlckZvcm06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR3aWRnZXQgPSAkKCcud2lkZ2V0X25ld3NsZXR0ZXJ3aWRnZXRtaW5pbWFsJyksXG4gICAgICAgICAgICAkZm9ybUZpZWxkID0gJHdpZGdldC5maW5kKCcudG5wLWVtYWlsJyk7XG5cbiAgICAgICAgJGZvcm1GaWVsZC5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkd2lkZ2V0LmFkZENsYXNzKCdpcy1Gb2N1c2VkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgkZm9ybUZpZWxkLnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgJHdpZGdldC5hZGRDbGFzcygnaXMtRm9jdXNlZCcpO1xuICAgICAgICB9XG4gICAgfSxcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb3JtcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9mb3Jtcy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgSG9tZSA9IHtcblxuICAgIC8qKlxuICAgICAqIEluaXQgSG9tZSBmdW5jdGlvbnMgbmVlZGVkIG9uIGxvYWRcbiAgICAgKi9cbiAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNsaWRlclN3aXBlcigpO1xuICAgICAgICB0aGlzLm5ld3NTd2lwZXIoKTtcbiAgICAgICAgdGhpcy50ZXh0TGF5b3V0KCk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KEhvbWUudGV4dExheW91dCgpLCAyMDAwKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhvbWUgU2xpZGVyIHN3aXBlclxuICAgICAqIEBkb2M6IGh0dHA6Ly9pZGFuZ2Vyby51cy9zd2lwZXIvYXBpL1xuICAgICAqL1xuICAgIHNsaWRlclN3aXBlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVkZWZpbmUgU3dpcGVyIGxheW91dCBjbGFzc2VzXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgc3dpcGVyQ29udGFpbmVyQ2xhc3MgPSAnZ3UtSG9tZS1zbGlkZXInLFxuICAgICAgICAgICAgc3dpcGVyV3JhcHBlckNsYXNzID0gc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX3dyYXBwZXInLFxuICAgICAgICAgICAgc3dpcGVyU2xpZGVDbGFzcyA9ICdndS1Ib21lLXNsaWRlJztcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbml0IE5ld3Mgc3dpcGVyXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaG9tZVNsaWRlciA9IG5ldyBTd2lwZXIgKCcuJysgc3dpcGVyQ29udGFpbmVyQ2xhc3MsIHtcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgIGdyYWJDdXJzb3I6IHRydWUsXG4gICAgICAgICAgICBwcmV2QnV0dG9uOiAnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzICsnX19uYXZQcmV2JyxcbiAgICAgICAgICAgIG5leHRCdXR0b246ICcuJysgc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX25hdk5leHQnLFxuICAgICAgICB9KTtcblxuICAgIH0sXG5cblxuICAgIHRleHRMYXlvdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1haW5Db250YWluZXJPZmZzZXQgPSAkKCcuY29udGFpbmVyJykub2Zmc2V0KCkubGVmdDtcblxuICAgICAgICBpZiAobWFpbkNvbnRhaW5lck9mZnNldCAhPT0gMCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnUG9zaXRpdmUgb2Zmc2V0OiAnLCBtYWluQ29udGFpbmVyT2Zmc2V0KVxuICAgICAgICAgICAgJCgnLmd1LUhvbWUtdGV4dF9faW5uZXInKS5jc3MoJ21hcmdpbi1sZWZ0JywgbWFpbkNvbnRhaW5lck9mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdPZmZzZXQ6ICcsIG1haW5Db250YWluZXJPZmZzZXQpXG4gICAgICAgICAgICAkKCcuZ3UtSG9tZS10ZXh0X19pbm5lcicpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBIb21lIE5ld3Mgc3dpcGVyXG4gICAgICogQGRvYzogaHR0cDovL2lkYW5nZXJvLnVzL3N3aXBlci9hcGkvXG4gICAgICovXG4gICAgbmV3c1N3aXBlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVkZWZpbmUgU3dpcGVyIGxheW91dCBjbGFzc2VzXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgc3dpcGVyQ29udGFpbmVyQ2xhc3MgPSAnZ3UtTmV3cy1zd2lwZXInLFxuICAgICAgICAgICAgc3dpcGVyV3JhcHBlckNsYXNzID0gc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX3dyYXBwZXInLFxuICAgICAgICAgICAgc3dpcGVyU2xpZGVDbGFzcyA9ICdndS1OZXdzLXBvc3QnLFxuICAgICAgICAgICAgbWFpbkNvbnRhaW5lck9mZnNldCA9ICQoJy5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluaXQgTmV3cyBzd2lwZXJcbiAgICAgICAgICovXG4gICAgICAgIHZhciBuZXdzU2xpZGVyID0gbmV3IFN3aXBlciAoJy4nKyBzd2lwZXJDb250YWluZXJDbGFzcywge1xuICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAnYXV0bycsXG4gICAgICAgICAgICBzbGlkZXNPZmZzZXRCZWZvcmU6IG1haW5Db250YWluZXJPZmZzZXQsXG4gICAgICAgICAgICBncmFiQ3Vyc29yOiB0cnVlLFxuICAgICAgICAgICAgcHJldkJ1dHRvbjogJy4nKyBzd2lwZXJDb250YWluZXJDbGFzcyArJ19fbmF2UHJldicsXG4gICAgICAgICAgICBuZXh0QnV0dG9uOiAnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzICsnX19uYXZOZXh0JyxcbiAgICAgICAgfSk7XG4gICAgfSwgXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvc3JjL2pzL21vZHVsZXMvaG9tZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgU29jaWFsID0ge1xuXG4gICAgLyoqXG4gICAgICogSW5pdCBTb2NpYWwgbmV0d29ya3MgbW9kYWwgKGZvciBRUkNvZGUgc2NhbiBwdXJwb3NlKVxuICAgICAqL1xuICAgIG5ldHdvcmtNb2RhbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG5ldHdvcmtzV2lkZ2V0ID0gJCgnLmd1LUZvb3Rlci1zb2NpYWxfX25ldHdvcmtzJyksXG4gICAgICAgICAgICAkaXRlbXNXaXRoTW9kYWwgPSAkbmV0d29ya3NXaWRnZXQuZmluZCgnW2RhdGEtbmV0d29yay1oYXNtb2RhbF0nKSxcbiAgICAgICAgICAgIGFjdGl2ZUNsYXNzID0gJ2lzLUFjdGl2ZSc7XG5cbiAgICAgICAgJGl0ZW1zV2l0aE1vZGFsLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICRpdGVtID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgJGl0ZW0uZmluZCgnYScpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBvciBoaWRlIG1vZGFsXG4gICAgICAgICAgICAgICAgaWYgKCRpdGVtLmlzKCcuJysgYWN0aXZlQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICRpdGVtLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRpdGVtc1dpdGhNb2RhbC5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICRpdGVtLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZHJhd01vZGFsKCRpdGVtLCAkaXRlbS5kYXRhKCdvcHRpb25zJykpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRHJhdyBzb2NpYWwgbmV0d29yayBtb2RhbFxuICAgICAgICAgKiBAcGFyYW0geyp9IGl0ZW0gPSBMaXN0IGl0ZW0gKGpRdWVyeSBlbGVtZW50KVxuICAgICAgICAgKiBAcGFyYW0geyp9IG9wdGlvbnMgPSBNb2RhbCBvcHRpb25zIGluIEhUTUwgYXR0cmlidXRlIChKU09OKVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZHJhd01vZGFsIChpdGVtLCBvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoaXRlbSAmJiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdmFyICRpdGVtID0gaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgbW9kYWxPcHRpb25zID0gb3B0aW9ucztcblxuICAgICAgICAgICAgICAgIC8vIERyYXcgTW9kYWwgaWYgb3B0aW9ucyBleGlzdFxuICAgICAgICAgICAgICAgIGlmIChtb2RhbE9wdGlvbnMuYWNjb3VudCAmJiBtb2RhbE9wdGlvbnMucXJjb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkbW9kYWwgPSAkKCc8ZGl2IGNsYXNzPVwiZ3UtRm9vdGVyLXNvY2lhbF9fbW9kYWxcIj4nKTtcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsLmFwcGVuZCgnPHN0cm9uZz5AJysgbW9kYWxPcHRpb25zLmFjY291bnQgKyc8L3N0cm9uZz4nKTtcbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsLmFwcGVuZCgnPGltZyBzcmM9XCInKyBtb2RhbE9wdGlvbnMucXJjb2RlICsnXCIgYWx0PVwiJysgbW9kYWxPcHRpb25zLmFjY291bnQgKydcIiAvPicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBtb2RhbCB0byBpdGVtXG4gICAgICAgICAgICAgICAgICAgICRtb2RhbC5hcHBlbmRUbygkaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU29jaWFsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL3NvY2lhbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgRm9ybXMgPSByZXF1aXJlKCcuL2Zvcm1zJyksXHJcbiAgICBNb2RhbCA9IHJlcXVpcmUoJy4vbW9kYWwnKTtcclxuXHJcbnZhciBMb2dpbiA9IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgbG9naW4gZm9ybSBpbiBBamF4XHJcbiAgICAgKiBAcGFyYW0gbGluayBbalF1ZXJ5IGVsZW1lbnRdID0+IExpbmsgdG8gaW5pdCBmcm9tICh3aXRoIGl0cyAnaHJlZicgYXR0cmlidXRlKVxyXG4gICAgICovXHJcbiAgICBsb2FkRm9ybTogZnVuY3Rpb24gKGxpbmspIHtcclxuICAgICAgICB2YXIgJGxvZ2luQnRuID0gJChsaW5rKSxcclxuICAgICAgICAgICAgbG9naW5VUkwgPSAkbG9naW5CdG4uYXR0cignaHJlZicpLFxyXG4gICAgICAgICAgICBpc0xvZ2dlZCA9ICQoJ2JvZHknKS5pcygnLmxvZ2dlZC1pbicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRsb2dpbkJ0bi5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICB2YXIgJGJ0biA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogLSBDaGVjayBmb3IgYWxyZWFkeSBsb2dnZWQtaW4gdXNlcnNcclxuICAgICAgICAgICAgICogLSBQcmV2ZW50IHJlZGlyZWN0IGJ5IGNsaWNraW5nIG9uIHRoZSBsaW5rXHJcbiAgICAgICAgICAgICAqIC0galF1ZXJ5IGxvYWQoKSB0aGUgZm9ybSBlbGVtZW50IG9uIHRoZSB0YXJnZXQgVVJMLCB0aGVuIHJlcXVlc3QgTW9kYWwuY3JlYXRlKCkgbWV0aG9kLCB0byBhcHBlbmQgY29udGVudCBpbnRvIGEgbmV3IG1vZGFsXHJcbiAgICAgICAgICAgICAqIC0gQ2FsbCBzZWxmIHN1Ym1pdEZvcm0oKSBtZXRob2Qgd2hlbiB1c2VyIHN1Ym1pdHMgZm9ybVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKGlzTG9nZ2VkID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAkYnRuLmF0dHIoJ2RhdGEtbG9hZGluZycsIHRydWUpOyAvLyBDU1MgcHVycG9zZVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgbG9naW5Nb2RhbENsYXNzID0gJ2d1LU1vZGFsLWxvZ2luJztcclxuXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIENoZWNrIGZvciBhbHJhZHkgZXhpc3RpbmcgbW9kYWwgd2l0aCB0aGlzIGNsYXNzLFxyXG4gICAgICAgICAgICAgICAgICogaW4gb3JkZXIgdG8ganVzdCBzaG93IGl0IGluc3RlYWQgb2YgcmVxdWVzdGluZyBhZ2FpblxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBpZiAoJCgnLicrIGxvZ2luTW9kYWxDbGFzcykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTW9kYWwuc2hvdygnLicrIGxvZ2luTW9kYWxDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9naW4uc3VibWl0Rm9ybSgnI2d1LUxvZ2luLWZvcm0nLCBsb2dpblVSTCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGxvZ2luRm9ybSA9ICQoJzxkaXYgLz4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGxvZ2luRm9ybS5sb2FkKGxvZ2luVVJMICsnICNndS1Mb2dpbi1hdXRoZW50aWZpY2F0aW9uJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkYnRuLmF0dHIoJ2RhdGEtbG9hZGluZycsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWwuY3JlYXRlKCRsb2dpbkZvcm0sIGxvZ2luTW9kYWxDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2luLnN1Ym1pdEZvcm0oJyNndS1Mb2dpbi1mb3JtJywgbG9naW5VUkwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWpheCBMb2dpblxyXG4gICAgICogQHBhcmFtIGZvcm0gW3N0cmluZ10gPT4gY2xhc3MvSUQvZXRjLiBvZiB0aGUgZm9ybSB0byBzdWJtaXRcclxuICAgICAqIEBwYXJhbSBVcmxUb1JlZGlyZWN0IFtzdHJpbmddID0+IFVSTCB0byByZWRpcmVjdCB1c2VyIHRvIGFmdGVyIGxvZ2dpbmcgaW5cclxuICAgICAqL1xyXG4gICAgc3VibWl0Rm9ybTogZnVuY3Rpb24gKGZvcm0sIFVybFRvUmVkaXJlY3QpIHtcclxuICAgICAgICB2YXIgZm9ybSA9IGZvcm07XHJcblxyXG4gICAgICAgICQoZm9ybSkuc3VibWl0KGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyICRmb3JtID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGRvbm5lZXMgPSAkZm9ybS5zZXJpYWxpemUoKTtcclxuICAgICAgICAgICAgdmFyIGFjdGlvbiA9ICRmb3JtLmF0dHIoJ2FjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgJGZvcm0uYXR0cihcImRhdGEtc2VuZGluZ1wiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICQucG9zdChhY3Rpb24sIGRvbm5lZXMsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogQ2hlY2sgZm9yIFdvcmRwcmVzcyBsb2dpbiBlcnJvciBhbmQgZGlzcGxheXMgdGhlbVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBpZiAoJChkYXRhKS5maW5kKCcjbG9naW5fZXJyb3InKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGVycm9yTXNnID0gJChkYXRhKS5maW5kKCcjbG9naW5fZXJyb3InKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVycm9yQ29udGFpbmVyID0gKCQoJy5ndS1Mb2dpbi1lcnJvcicpLmxlbmd0aCkgPyAkKCcuZ3UtTG9naW4tZXJyb3InKSA6ICQoJzxkaXYgY2xhc3M9XCJndS1Mb2dpbi1lcnJvclwiIC8+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRlcnJvckNvbnRhaW5lci5odG1sKCcnKS5wcmVwZW5kKCRlcnJvck1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGZvcm0ucHJlcGVuZCgkZXJyb3JDb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgKiBSZWRpcmVjdHMgdXNlciB0byBVUkwgb25jZSBsb2dnZWQgaW5cclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFVybFRvUmVkaXJlY3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExvZ2luO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2xvZ2luLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBNb2RhbCA9IHtcclxuICAgIHBhcmFtczoge1xyXG4gICAgICAgIGRlZmF1bHRDbGFzczogJ2d1LU1vZGFsLWRlZmF1bHQnLFxyXG4gICAgICAgIGNsb3NlQnRuQ2xhc3M6ICdndS1Nb2RhbC1jbG9zZScsXHJcbiAgICAgICAgY2xvc2VkTW9kYWxDbGFzczogJ2d1LU1vZGFsLWlzQ2xvc2VkJyxcclxuICAgICAgICBib2R5QXR0cmlidXRlOiAnZGF0YS1oYXNNb2RhbCdcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgTW9kYWxcclxuICAgICAqIEBwYXJhbSBjb250ZW50IFtodG1sIG9iamVjdF0gPT4gVGhlIGNvbnRlbnQgdG8gZGlzcGxheSBpbnNpZGUgbW9kYWxcclxuICAgICAqIEBwYXJhbSBtb2RhbGNsYXNzIFtzdHJpbmddID0+IG9wdGlvbmFsIHNwZWNpZmljIGNsYXNzIGFkZGVkIHRvIHRoZSBtb2RhbFxyXG4gICAgICogXHJcbiAgICAgKiBDcmVhdGUgYSBtb2RhbCBIVE1MIGVsZW1lbnQgYW5kIGFwcGVuZCBjb250ZW50IGluc2lkZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZW50LCBtb2RhbGNsYXNzKSB7XHJcbiAgICAgICAgdmFyIG1vZGFsQ2xhc3MgPSAobW9kYWxjbGFzcykgPyBtb2RhbGNsYXNzIDogTW9kYWwucGFyYW1zLmRlZmF1bHRDbGFzcyxcclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYSBtb2RhbCBhbHJlYWR5IGV4aXN0cywgdGhlbiByZXNldCBpdHMgY29udGVudCBpbnN0ZWFkIG9mIGNyZWF0aW5nIGEgbmV3IG9uZVxyXG4gICAgICAgICAgICAkbW9kYWwgPSAoJCgnI2d1LU1vZGFsJykubGVuZ3RoKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAkKCcjZ3UtTW9kYWwnKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAkKCc8ZGl2IGlkPVwiZ3UtTW9kYWxcIiBjbGFzcz1cImd1LU1vZGFsICcrIG1vZGFsQ2xhc3MgKydcIiAvPicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoJ2JvZHknKS5hdHRyKE1vZGFsLnBhcmFtcy5ib2R5QXR0cmlidXRlLCB0cnVlKTsgICAgICAgICAgICAgXHJcbiAgICAgICAgJG1vZGFsLmh0bWwoJycpLnJlbW92ZUNsYXNzKE1vZGFsLnBhcmFtcy5jbG9zZWRNb2RhbENsYXNzKTtcclxuICAgICAgICAkbW9kYWwuYXBwZW5kKCc8YnV0dG9uIGNsYXNzPVwiJysgTW9kYWwucGFyYW1zLmNsb3NlQnRuQ2xhc3MgKydcIiAvPicpO1xyXG4gICAgICAgICRtb2RhbC5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgJG1vZGFsLmFwcGVuZFRvKCdib2R5Jyk7XHJcblxyXG4gICAgICAgIC8vIENsb3NlIG1vZGFsXHJcbiAgICAgICAgJG1vZGFsLmZpbmQoJy4nKyBNb2RhbC5wYXJhbXMuY2xvc2VCdG5DbGFzcykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIE1vZGFsLmNsb3NlKCRtb2RhbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93IGV4aXN0aW5nIChidXQgaGlkZGVuKSBtb2RhbFxyXG4gICAgICovXHJcbiAgICBzaG93OiBmdW5jdGlvbiAobW9kYWwpIHtcclxuICAgICAgICBpZiAobW9kYWwgJiYgISQobW9kYWwrJzp2aXNpYmxlJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICQobW9kYWwpLnJlbW92ZUNsYXNzKE1vZGFsLnBhcmFtcy5jbG9zZWRNb2RhbENsYXNzKTtcclxuICAgICAgICAgICAgJCgnYm9keScpLmF0dHIoTW9kYWwucGFyYW1zLmJvZHlBdHRyaWJ1dGUsIHRydWUpOyBcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3NlIC8gSGlkZSBtb2RhbFxyXG4gICAgICovXHJcbiAgICBjbG9zZTogZnVuY3Rpb24gKG1vZGFsKSB7XHJcbiAgICAgICAgdmFyICRtb2RhbCA9IG1vZGFsO1xyXG5cclxuICAgICAgICAkbW9kYWwuYWRkQ2xhc3MoTW9kYWwucGFyYW1zLmNsb3NlZE1vZGFsQ2xhc3MpO1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVBdHRyKE1vZGFsLnBhcmFtcy5ib2R5QXR0cmlidXRlKTtcclxuICAgIH0sXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTW9kYWw7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvc3JjL2pzL21vZHVsZXMvbW9kYWwuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==