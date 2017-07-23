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
	        var homeSlider = new Swiper ('.'+ swiperContainerClass, {
	            loop: false,
	            slidesPerView: 1,
	            grabCursor: true,
	            prevButton: '.'+ swiperContainerClass +'__navPrev',
	            nextButton: '.'+ swiperContainerClass +'__navNext',
	        });
	
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
	                $btn.attr('data-loading', true);
	                
	                var $loginForm = $('<div />');
	
	                $loginForm.load(loginURL +' #gu-Login-authentification', function () {
	                    $btn.attr('data-loading', false);
	                    Modal.create($loginForm, 'gu-Modal-login');
	
	                    Login.submitForm('#gu-Login-form', loginURL);
	                });
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
	     * @param modalClass [string] => optional specific class added to the modal
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzk0OTcyNDEzNTRmMmIwMmRmNjAiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2Zvcm1zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9ob21lLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9zb2NpYWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2xvZ2luLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN6Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBcUMscUNBQXFDOztBQUUxRTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7O0FBRUEsMEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBLHdCIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzk0OTcyNDEzNTRmMmIwMmRmNjAiLCJ2YXIgRm9ybXMgPSByZXF1aXJlKCcuL21vZHVsZXMvZm9ybXMnKSxcblx0SG9tZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9ob21lJyksXG5cdFNvY2lhbCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9zb2NpYWwnKSxcblx0TG9naW4gPSByZXF1aXJlKCcuL21vZHVsZXMvbG9naW4nKTtcblxualF1ZXJ5ICggZnVuY3Rpb24oJCkge1xuXHRjb25zb2xlLmxvZygnRE9NIGxvYWRlZCcpO1xuXG5cdHZhciBHcmVlblVuaW9uID0gbmV3IFNpdGVDb250cm9sbGVyKCQpO1xuXHRHcmVlblVuaW9uLmluaXQoKTtcblxuXG5cdC8qKlxuXHQgSE9NRSBQQUdFIFxuXHQgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cdGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZW1wbGF0ZT1cImhvbWVcIl0nKSkge1xuXHRcdEhvbWUuc3RhcnQoKTtcblx0XHRjb25zb2xlLmxvZygnSG9tZSBzdGFydCgpJylcblx0fVxuXG5cblx0LyoqXG5cdCBMT0dJTiBNT0RBTCBcblx0ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHRMb2dpbi5sb2FkRm9ybSgnLmd1LVVzZXJfX2FjY291bnQnKTtcblx0XG5cdFxufSk7XG5cbmZ1bmN0aW9uIFNpdGVDb250cm9sbGVyICgkKSB7XG5cdHNlbGYuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0XHQvL0Zvcm1zXG5cdFx0Rm9ybXMuc2VsZWN0cygpO1xuXHRcdEZvcm1zLnNlYXJjaEZvcm0oKTtcblx0XHRGb3Jtcy5uZXdzbGV0dGVyRm9ybSgpO1xuXG5cdFx0Ly8gU29jaWFsIEdsb2JhbFxuXHRcdFNvY2lhbC5uZXR3b3JrTW9kYWwoKTtcblx0fTtcblxuXHRyZXR1cm4gc2VsZjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEZvcm1zID0ge1xuXG4gICAgLyoqXG4gICAgICogRm9ybXMgJ1NlbGVjdCcgbWFuYWdlclxuICAgICAqIFRyYW5zZm9ybXMgJ3NlbGVjdHMnIGFzIG5vcm1hbCBsaXN0IHRvIGN1c3RvbWl6ZSB0aGVtIGVhc2lseVxuICAgICAqL1xuICAgIHNlbGVjdHM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKCdzZWxlY3QnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZPcHRpb25zID0gJCh0aGlzKS5jaGlsZHJlbignb3B0aW9uJykubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGFjdGl2ZU9wdGlvbkNsYXNzID0gJ2lzLUFjdGl2ZSc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQWRkIENTUyBjbGFzcyB0byBoaWRlIHRoZSAnc2VsZWN0JyB0YWcuXG4gICAgICAgICAgICAgKiBDcmVhdGUgdGhlIGxpc3Qgd3JhcHBlciAoJy5ndS1Gb3JtLXNlbGVjdF9fd3JhcHBlcicpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdpcy1IaWRkZW4nKTsgXG4gICAgICAgICAgICAkdGhpcy53cmFwKCc8ZGl2IGNsYXNzPVwiZ3UtRm9ybS1zZWxlY3RfX3dyYXBwZXJcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICR0aGlzLmFmdGVyKCc8ZGl2IGNsYXNzPVwiZ3UtRm9ybS1zZWxlY3RfX3NlbGVjdGVkXCI+PC9kaXY+Jyk7XG5cbiAgICAgICAgICAgIHZhciAkc3R5bGVkU2VsZWN0ID0gJHRoaXMubmV4dCgnLmd1LUZvcm0tc2VsZWN0X19zZWxlY3RlZCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIGFuIG9wdGlvbiBpcyBhbHJlYWR5IHNlbGVjdGVkIChoYXMgJ3NlbGVjdGVkJyBwcm9wZXJ0eSksIGRpc3BsYXlzIGl0IGFzIHRoZSBzZWxlY3RlZCBvcHRpb25cbiAgICAgICAgICAgICAqIE90aGVyd2lzZSwgZGlzcGxheXMgdGhlIGZpcnN0IG9wdGlvbiBieSBkZWZhdWx0LlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoICR0aGlzLmZpbmQoJ29wdGlvbltzZWxlY3RlZF0nKS5sZW5ndGggKcKge1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZE9wdGlvblZhbHVlID0gJHRoaXMuY2hpbGRyZW4oJ29wdGlvbltzZWxlY3RlZF0nKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uW3NlbGVjdGVkXScpLnRleHQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKDApLnRleHQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciAkbGlzdCA9ICQoJzx1bCAvPicsIHsgJ2NsYXNzJzogJ2d1LUZvcm0tc2VsZWN0X19vcHRpb25zJyB9KS5pbnNlcnRBZnRlcigkc3R5bGVkU2VsZWN0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBcHBlbmQgZWFjaCAnb3B0aW9uJyB2YWx1ZSB0byBhIG5ldyAnbGknIHRhZyBpbnNpZGUgdGhlIGxpc3RcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZk9wdGlvbnM7IGkrKykge1xuICAgICAgICAgICAgICAgICQoJzxsaSAvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJHRoaXMuY2hpbGRyZW4oJ29wdGlvbicpLmVxKGkpLnRleHQoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVsOiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudmFsKClcbiAgICAgICAgICAgICAgICB9KS5hcHBlbmRUbygkbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyICRsaXN0SXRlbXMgPSAkbGlzdC5jaGlsZHJlbignbGknKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQgJ2RhdGEtYWN0aXZlLW9wdGlvbicgYXR0cmlidXRlIHRvIHRoZSBjdXJyZW50IGxhbmd1YWdlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICRsaXN0SXRlbXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RlZE9wdGlvblZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiAkKHRoaXMpLmF0dHIoJ3JlbCcpID09IHNlbGVjdGVkT3B0aW9uVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkYXRhLWFjdGl2ZS1vcHRpb24nLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RlZE9wdGlvblZhbHVlID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0lsIG5cXCd5IGEgcGFzIGRlIGxhbmd1ZSBzw6lsZWN0aW9ubsOpZSA6IGxhIHZhcmlhYmxlIFwic2VsZWN0ZWRPcHRpb25WYWx1ZVwiIG5cXCdleGlzdGUgcGFzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRXZlbnRzIGxpc3RlbmVyc1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICAkc3R5bGVkU2VsZWN0LmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICQoJy5ndS1Gb3JtLXNlbGVjdF9fc2VsZWN0ZWQuJysgYWN0aXZlT3B0aW9uQ2xhc3MpLm5vdCh0aGlzKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoYWN0aXZlT3B0aW9uQ2xhc3MpLm5leHQoJy5ndS1Gb3JtLXNlbGVjdF9fb3B0aW9ucycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKGFjdGl2ZU9wdGlvbkNsYXNzKS5uZXh0KCcuZ3UtRm9ybS1zZWxlY3RfX29wdGlvbnMnKS50b2dnbGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgICRsaXN0SXRlbXMuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCQodGhpcykudGV4dCgpKS5yZW1vdmVDbGFzcyhhY3RpdmVPcHRpb25DbGFzcyk7XG4gICAgICAgICAgICAgICAgJHRoaXMudmFsKCQodGhpcykuYXR0cigncmVsJykpO1xuICAgICAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENoZWNrcyBpZiBQb2x5bGFuZyBXb3JkcHJlc3MgcGx1Z2luJ3MgJ3VybHNfcG9seWxhbmcyJyAob2JqZWN0KSB2YXJpYWJsZSBpcyBhbHJlYWR5IGluaXRpYWxpemVkIGluIHRoZSBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAqIElmIGl0IGlzLCBjb3BpZXMgaXRzIGxvZ2ljOiBjaGFuZ2Ugd2luZG93IGxvY2F0aW9uIGRlcGVuZGluZyBvZiB0aGUgc2VsZWN0ZWQgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHVybHNfcG9seWxhbmcyICE9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgdXJsc19wb2x5bGFuZzIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybHNfcG9seWxhbmcyWyQodGhpcykuYXR0cigncmVsJyldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignTGEgdmFyaWFibGUgXCJ1cmxzX3BvbHlsYW5nMlwiIG5cXCdlc3QgcGFzIGTDqWZpbmllJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBIaWRlIHNlbGVjdCBsaXN0IHdoZW4gY2xpY2tpbmcgb24gdGhlIGRvY3VtZW50XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRzdHlsZWRTZWxlY3QucmVtb3ZlQ2xhc3MoYWN0aXZlT3B0aW9uQ2xhc3MpO1xuICAgICAgICAgICAgICAgICRsaXN0LmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3JtIG1hbmFnZXJcbiAgICAgKi9cbiAgICBzZWFyY2hGb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkZm9ybSA9ICQoJyNndS1zZWFyY2gnKSxcbiAgICAgICAgICAgICRmb3JtV3JhcHBlciA9ICQoJy5ndS1TZWFyY2hfX3dyYXBwZXInKSxcbiAgICAgICAgICAgICRmb3JtVG9nZ2xlciA9ICQoJy5ndS1TZWFyY2hfX3RvZ2dsZXInKSxcbiAgICAgICAgICAgIHRvZ2dsZUF0dHIgPSAnZGF0YS10b2dnbGVkJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogSGlkZSAvIFNob3cgZm9ybSBmdW5jdGlvbnMgKG1hbmFnZSBkaXNwbGF5IHdpdGggJ2RhdGEtdG9nZ2xlZCcgYXR0cmlidXRlKVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc2hvd1NlYXJjaCAoKSB7XG4gICAgICAgICAgICAkZm9ybVdyYXBwZXIuYXR0cih0b2dnbGVBdHRyLCB0cnVlKTtcbiAgICAgICAgICAgICRmb3JtVG9nZ2xlci5hdHRyKHRvZ2dsZUF0dHIsIHRydWUpO1xuICAgICAgICAgICAgJCgnYm9keScpLmF0dHIoJ2RhdGEtbm8tc2Nyb2xsJywgJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGlkZVNlYXJjaCAoKSB7XG4gICAgICAgICAgICAkZm9ybVdyYXBwZXIuYXR0cih0b2dnbGVBdHRyLCBmYWxzZSk7XG4gICAgICAgICAgICAkZm9ybVRvZ2dsZXIuYXR0cih0b2dnbGVBdHRyLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQXR0cignZGF0YS1uby1zY3JvbGwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUb2dnbGUgZm9ybSBieSBjbGlja2luZyBvbiB0aGUgYnV0dG9uXG4gICAgICAgICAqL1xuICAgICAgICAkZm9ybVRvZ2dsZXIuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCRmb3JtV3JhcHBlci5hdHRyKHRvZ2dsZUF0dHIpID09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgICAgIHNob3dTZWFyY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGhpZGVTZWFyY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhpZGUgRm9ybSB3aGVuIGNsaWNraW5nIG9uIGRvY3VtZW50IChidXQgbm90IG9uIGZvcm0pXG4gICAgICAgICAqL1xuICAgICAgICAkZm9ybS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmd1LVNlYXJjaF9fd3JhcHBlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhpZGVTZWFyY2goKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIaWRlIGZvcm0gd2hlbiBwcmVzc2luZyAnRXNjYXBlJyBrZXlcbiAgICAgICAgICovXG4gICAgICAgICQoZG9jdW1lbnQpLmtleXVwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMjcgJiYgJGZvcm1XcmFwcGVyLmF0dHIodG9nZ2xlQXR0cikgPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICBoaWRlU2VhcmNoKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBOZXdzbGV0dGVyIGZvcm1cbiAgICAgKi9cbiAgICBuZXdzbGV0dGVyRm9ybTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHdpZGdldCA9ICQoJy53aWRnZXRfbmV3c2xldHRlcndpZGdldG1pbmltYWwnKSxcbiAgICAgICAgICAgICRmb3JtRmllbGQgPSAkd2lkZ2V0LmZpbmQoJy50bnAtZW1haWwnKTtcblxuICAgICAgICAkZm9ybUZpZWxkLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICR3aWRnZXQuYWRkQ2xhc3MoJ2lzLUZvY3VzZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCRmb3JtRmllbGQudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAkd2lkZ2V0LmFkZENsYXNzKCdpcy1Gb2N1c2VkJyk7XG4gICAgICAgIH1cbiAgICB9LFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1zO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2Zvcm1zLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIb21lID0ge1xuXG4gICAgLyoqXG4gICAgICogSW5pdCBIb21lIGZ1bmN0aW9ucyBuZWVkZWQgb24gbG9hZFxuICAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2xpZGVyU3dpcGVyKCk7XG4gICAgICAgIHRoaXMubmV3c1N3aXBlcigpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIb21lIFNsaWRlciBzd2lwZXJcbiAgICAgKiBAZG9jOiBodHRwOi8vaWRhbmdlcm8udXMvc3dpcGVyL2FwaS9cbiAgICAgKi9cbiAgICBzbGlkZXJTd2lwZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZGVmaW5lIFN3aXBlciBsYXlvdXQgY2xhc3Nlc1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHN3aXBlckNvbnRhaW5lckNsYXNzID0gJ2d1LUhvbWUtc2xpZGVyJyxcbiAgICAgICAgICAgIHN3aXBlcldyYXBwZXJDbGFzcyA9IHN3aXBlckNvbnRhaW5lckNsYXNzICsnX193cmFwcGVyJyxcbiAgICAgICAgICAgIHN3aXBlclNsaWRlQ2xhc3MgPSAnZ3UtSG9tZS1zbGlkZSc7XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdCBOZXdzIHN3aXBlclxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGhvbWVTbGlkZXIgPSBuZXcgU3dpcGVyICgnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzLCB7XG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICBncmFiQ3Vyc29yOiB0cnVlLFxuICAgICAgICAgICAgcHJldkJ1dHRvbjogJy4nKyBzd2lwZXJDb250YWluZXJDbGFzcyArJ19fbmF2UHJldicsXG4gICAgICAgICAgICBuZXh0QnV0dG9uOiAnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzICsnX19uYXZOZXh0JyxcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSG9tZSBOZXdzIHN3aXBlclxuICAgICAqIEBkb2M6IGh0dHA6Ly9pZGFuZ2Vyby51cy9zd2lwZXIvYXBpL1xuICAgICAqL1xuICAgIG5ld3NTd2lwZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZGVmaW5lIFN3aXBlciBsYXlvdXQgY2xhc3Nlc1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHN3aXBlckNvbnRhaW5lckNsYXNzID0gJ2d1LU5ld3Mtc3dpcGVyJyxcbiAgICAgICAgICAgIHN3aXBlcldyYXBwZXJDbGFzcyA9IHN3aXBlckNvbnRhaW5lckNsYXNzICsnX193cmFwcGVyJyxcbiAgICAgICAgICAgIHN3aXBlclNsaWRlQ2xhc3MgPSAnZ3UtTmV3cy1wb3N0JyxcbiAgICAgICAgICAgIG1haW5Db250YWluZXJPZmZzZXQgPSAkKCcuY29udGFpbmVyJykub2Zmc2V0KCkubGVmdDtcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbml0IE5ld3Mgc3dpcGVyXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbmV3c1NsaWRlciA9IG5ldyBTd2lwZXIgKCcuJysgc3dpcGVyQ29udGFpbmVyQ2xhc3MsIHtcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxuICAgICAgICAgICAgc2xpZGVzT2Zmc2V0QmVmb3JlOiBtYWluQ29udGFpbmVyT2Zmc2V0LFxuICAgICAgICAgICAgZ3JhYkN1cnNvcjogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZCdXR0b246ICcuJysgc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX25hdlByZXYnLFxuICAgICAgICAgICAgbmV4dEJ1dHRvbjogJy4nKyBzd2lwZXJDb250YWluZXJDbGFzcyArJ19fbmF2TmV4dCcsXG4gICAgICAgIH0pO1xuICAgIH0sIFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBIb21lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2hvbWUuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIFNvY2lhbCA9IHtcblxuICAgIC8qKlxuICAgICAqIEluaXQgU29jaWFsIG5ldHdvcmtzIG1vZGFsIChmb3IgUVJDb2RlIHNjYW4gcHVycG9zZSlcbiAgICAgKi9cbiAgICBuZXR3b3JrTW9kYWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRuZXR3b3Jrc1dpZGdldCA9ICQoJy5ndS1Gb290ZXItc29jaWFsX19uZXR3b3JrcycpLFxuICAgICAgICAgICAgJGl0ZW1zV2l0aE1vZGFsID0gJG5ldHdvcmtzV2lkZ2V0LmZpbmQoJ1tkYXRhLW5ldHdvcmstaGFzbW9kYWxdJyksXG4gICAgICAgICAgICBhY3RpdmVDbGFzcyA9ICdpcy1BY3RpdmUnO1xuXG4gICAgICAgICRpdGVtc1dpdGhNb2RhbC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkaXRlbSA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICRpdGVtLmZpbmQoJ2EnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIC8vIFNob3cgb3IgaGlkZSBtb2RhbFxuICAgICAgICAgICAgICAgIGlmICgkaXRlbS5pcygnLicrIGFjdGl2ZUNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICAkaXRlbS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkaXRlbXNXaXRoTW9kYWwucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAkaXRlbS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRyYXdNb2RhbCgkaXRlbSwgJGl0ZW0uZGF0YSgnb3B0aW9ucycpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERyYXcgc29jaWFsIG5ldHdvcmsgbW9kYWxcbiAgICAgICAgICogQHBhcmFtIHsqfSBpdGVtID0gTGlzdCBpdGVtIChqUXVlcnkgZWxlbWVudClcbiAgICAgICAgICogQHBhcmFtIHsqfSBvcHRpb25zID0gTW9kYWwgb3B0aW9ucyBpbiBIVE1MIGF0dHJpYnV0ZSAoSlNPTilcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGRyYXdNb2RhbCAoaXRlbSwgb3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGl0ZW0gJiYgb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHZhciAkaXRlbSA9IGl0ZW0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsT3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAgICAgICAgICAgICAvLyBEcmF3IE1vZGFsIGlmIG9wdGlvbnMgZXhpc3RcbiAgICAgICAgICAgICAgICBpZiAobW9kYWxPcHRpb25zLmFjY291bnQgJiYgbW9kYWxPcHRpb25zLnFyY29kZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJG1vZGFsID0gJCgnPGRpdiBjbGFzcz1cImd1LUZvb3Rlci1zb2NpYWxfX21vZGFsXCI+Jyk7XG4gICAgICAgICAgICAgICAgICAgICRtb2RhbC5hcHBlbmQoJzxzdHJvbmc+QCcrIG1vZGFsT3B0aW9ucy5hY2NvdW50ICsnPC9zdHJvbmc+Jyk7XG4gICAgICAgICAgICAgICAgICAgICRtb2RhbC5hcHBlbmQoJzxpbWcgc3JjPVwiJysgbW9kYWxPcHRpb25zLnFyY29kZSArJ1wiIGFsdD1cIicrIG1vZGFsT3B0aW9ucy5hY2NvdW50ICsnXCIgLz4nKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgbW9kYWwgdG8gaXRlbVxuICAgICAgICAgICAgICAgICAgICAkbW9kYWwuYXBwZW5kVG8oJGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNvY2lhbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9zb2NpYWwuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIEZvcm1zID0gcmVxdWlyZSgnLi9mb3JtcycpLFxyXG4gICAgTW9kYWwgPSByZXF1aXJlKCcuL21vZGFsJyk7XHJcblxyXG52YXIgTG9naW4gPSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2FkIGxvZ2luIGZvcm0gaW4gQWpheFxyXG4gICAgICogQHBhcmFtIGxpbmsgW2pRdWVyeSBlbGVtZW50XSA9PiBMaW5rIHRvIGluaXQgZnJvbSAod2l0aCBpdHMgJ2hyZWYnIGF0dHJpYnV0ZSlcclxuICAgICAqL1xyXG4gICAgbG9hZEZvcm06IGZ1bmN0aW9uIChsaW5rKSB7XHJcbiAgICAgICAgdmFyICRsb2dpbkJ0biA9ICQobGluayksXHJcbiAgICAgICAgICAgIGxvZ2luVVJMID0gJGxvZ2luQnRuLmF0dHIoJ2hyZWYnKSxcclxuICAgICAgICAgICAgaXNMb2dnZWQgPSAkKCdib2R5JykuaXMoJy5sb2dnZWQtaW4nKTtcclxuICAgICAgICBcclxuICAgICAgICAkbG9naW5CdG4uY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgdmFyICRidG4gPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIC0gQ2hlY2sgZm9yIGFscmVhZHkgbG9nZ2VkLWluIHVzZXJzXHJcbiAgICAgICAgICAgICAqIC0gUHJldmVudCByZWRpcmVjdCBieSBjbGlja2luZyBvbiB0aGUgbGlua1xyXG4gICAgICAgICAgICAgKiAtIGpRdWVyeSBsb2FkKCkgdGhlIGZvcm0gZWxlbWVudCBvbiB0aGUgdGFyZ2V0IFVSTCwgdGhlbiByZXF1ZXN0IE1vZGFsLmNyZWF0ZSgpIG1ldGhvZCwgdG8gYXBwZW5kIGNvbnRlbnQgaW50byBhIG5ldyBtb2RhbFxyXG4gICAgICAgICAgICAgKiAtIENhbGwgc2VsZiBzdWJtaXRGb3JtKCkgbWV0aG9kIHdoZW4gdXNlciBzdWJtaXRzIGZvcm1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmIChpc0xvZ2dlZCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bi5hdHRyKCdkYXRhLWxvYWRpbmcnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyICRsb2dpbkZvcm0gPSAkKCc8ZGl2IC8+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGxvZ2luRm9ybS5sb2FkKGxvZ2luVVJMICsnICNndS1Mb2dpbi1hdXRoZW50aWZpY2F0aW9uJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRidG4uYXR0cignZGF0YS1sb2FkaW5nJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIE1vZGFsLmNyZWF0ZSgkbG9naW5Gb3JtLCAnZ3UtTW9kYWwtbG9naW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTG9naW4uc3VibWl0Rm9ybSgnI2d1LUxvZ2luLWZvcm0nLCBsb2dpblVSTCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFqYXggTG9naW5cclxuICAgICAqIEBwYXJhbSBmb3JtIFtzdHJpbmddID0+IGNsYXNzL0lEL2V0Yy4gb2YgdGhlIGZvcm0gdG8gc3VibWl0XHJcbiAgICAgKiBAcGFyYW0gVXJsVG9SZWRpcmVjdCBbc3RyaW5nXSA9PiBVUkwgdG8gcmVkaXJlY3QgdXNlciB0byBhZnRlciBsb2dnaW5nIGluXHJcbiAgICAgKi9cclxuICAgIHN1Ym1pdEZvcm06IGZ1bmN0aW9uIChmb3JtLCBVcmxUb1JlZGlyZWN0KSB7XHJcbiAgICAgICAgdmFyIGZvcm0gPSBmb3JtO1xyXG5cclxuICAgICAgICAkKGZvcm0pLnN1Ym1pdChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkZm9ybSA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBkb25uZWVzID0gJGZvcm0uc2VyaWFsaXplKCk7XHJcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSAkZm9ybS5hdHRyKCdhY3Rpb24nKTtcclxuXHJcbiAgICAgICAgICAgICRmb3JtLmF0dHIoXCJkYXRhLXNlbmRpbmdcIiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAkLnBvc3QoYWN0aW9uLCBkb25uZWVzLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIENoZWNrIGZvciBXb3JkcHJlc3MgbG9naW4gZXJyb3IgYW5kIGRpc3BsYXlzIHRoZW1cclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoZGF0YSkuZmluZCgnI2xvZ2luX2Vycm9yJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRlcnJvck1zZyA9ICQoZGF0YSkuZmluZCgnI2xvZ2luX2Vycm9yJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRlcnJvckNvbnRhaW5lciA9ICgkKCcuZ3UtTG9naW4tZXJyb3InKS5sZW5ndGgpID8gJCgnLmd1LUxvZ2luLWVycm9yJykgOiAkKCc8ZGl2IGNsYXNzPVwiZ3UtTG9naW4tZXJyb3JcIiAvPicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkZXJyb3JDb250YWluZXIuaHRtbCgnJykucHJlcGVuZCgkZXJyb3JNc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgICRmb3JtLnByZXBlbmQoJGVycm9yQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICogUmVkaXJlY3RzIHVzZXIgdG8gVVJMIG9uY2UgbG9nZ2VkIGluXHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBVcmxUb1JlZGlyZWN0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMb2dpbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9sb2dpbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgTW9kYWwgPSB7XHJcbiAgICBwYXJhbXM6IHtcclxuICAgICAgICBkZWZhdWx0Q2xhc3M6ICdndS1Nb2RhbC1kZWZhdWx0JyxcclxuICAgICAgICBjbG9zZUJ0bkNsYXNzOiAnZ3UtTW9kYWwtY2xvc2UnLFxyXG4gICAgICAgIGNsb3NlZE1vZGFsQ2xhc3M6ICdndS1Nb2RhbC1pc0Nsb3NlZCcsXHJcbiAgICAgICAgYm9keUF0dHJpYnV0ZTogJ2RhdGEtaGFzTW9kYWwnXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIE1vZGFsXHJcbiAgICAgKiBAcGFyYW0gY29udGVudCBbaHRtbCBvYmplY3RdID0+IFRoZSBjb250ZW50IHRvIGRpc3BsYXkgaW5zaWRlIG1vZGFsXHJcbiAgICAgKiBAcGFyYW0gbW9kYWxDbGFzcyBbc3RyaW5nXSA9PiBvcHRpb25hbCBzcGVjaWZpYyBjbGFzcyBhZGRlZCB0byB0aGUgbW9kYWxcclxuICAgICAqIFxyXG4gICAgICogQ3JlYXRlIGEgbW9kYWwgSFRNTCBlbGVtZW50IGFuZCBhcHBlbmQgY29udGVudCBpbnNpZGVcclxuICAgICAqL1xyXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGVudCwgbW9kYWxjbGFzcykge1xyXG4gICAgICAgIHZhciBtb2RhbENsYXNzID0gKG1vZGFsY2xhc3MpID8gbW9kYWxjbGFzcyA6IE1vZGFsLnBhcmFtcy5kZWZhdWx0Q2xhc3MsXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGEgbW9kYWwgYWxyZWFkeSBleGlzdHMsIHRoZW4gcmVzZXQgaXRzIGNvbnRlbnQgaW5zdGVhZCBvZiBjcmVhdGluZyBhIG5ldyBvbmVcclxuICAgICAgICAgICAgJG1vZGFsID0gKCQoJyNndS1Nb2RhbCcpLmxlbmd0aCkgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgJCgnI2d1LU1vZGFsJykgOlxyXG4gICAgICAgICAgICAgICAgICAgICAgJCgnPGRpdiBpZD1cImd1LU1vZGFsXCIgY2xhc3M9XCJndS1Nb2RhbCAnKyBtb2RhbENsYXNzICsnXCIgLz4nKTtcclxuICAgICAgICBcclxuICAgICAgICAkKCdib2R5JykuYXR0cihNb2RhbC5wYXJhbXMuYm9keUF0dHJpYnV0ZSwgdHJ1ZSk7ICAgICAgICAgICAgIFxyXG4gICAgICAgICRtb2RhbC5odG1sKCcnKS5yZW1vdmVDbGFzcyhNb2RhbC5wYXJhbXMuY2xvc2VkTW9kYWxDbGFzcyk7XHJcbiAgICAgICAgJG1vZGFsLmFwcGVuZCgnPGJ1dHRvbiBjbGFzcz1cIicrIE1vZGFsLnBhcmFtcy5jbG9zZUJ0bkNsYXNzICsnXCIgLz4nKTtcclxuICAgICAgICAkbW9kYWwuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgICRtb2RhbC5hcHBlbmRUbygnYm9keScpO1xyXG5cclxuICAgICAgICAvLyBDbG9zZSBtb2RhbFxyXG4gICAgICAgICRtb2RhbC5maW5kKCcuJysgTW9kYWwucGFyYW1zLmNsb3NlQnRuQ2xhc3MpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBNb2RhbC5jbG9zZSgkbW9kYWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZSAvIEhpZGUgbW9kYWxcclxuICAgICAqL1xyXG4gICAgY2xvc2U6IGZ1bmN0aW9uIChtb2RhbCkge1xyXG4gICAgICAgIHZhciAkbW9kYWwgPSBtb2RhbDtcclxuXHJcbiAgICAgICAgJG1vZGFsLmFkZENsYXNzKE1vZGFsLnBhcmFtcy5jbG9zZWRNb2RhbENsYXNzKTtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQXR0cihNb2RhbC5wYXJhbXMuYm9keUF0dHJpYnV0ZSk7XHJcbiAgICB9LFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGFsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL21vZGFsLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=