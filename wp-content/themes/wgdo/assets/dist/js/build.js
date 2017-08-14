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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWU0NmJiMDVjZjZjNzQxM2FlMDUiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2Zvcm1zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9ob21lLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9zb2NpYWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2xvZ2luLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9tb2RhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdkNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXFDLHFDQUFxQzs7QUFFMUU7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1Q7QUFDQTs7QUFFQSx3Qjs7Ozs7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEQ7QUFDQTtBQUNBLE1BQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQSx3QiIsImZpbGUiOiJidWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGFlNDZiYjA1Y2Y2Yzc0MTNhZTA1IiwidmFyIEZvcm1zID0gcmVxdWlyZSgnLi9tb2R1bGVzL2Zvcm1zJyksXG5cdEhvbWUgPSByZXF1aXJlKCcuL21vZHVsZXMvaG9tZScpLFxuXHRTb2NpYWwgPSByZXF1aXJlKCcuL21vZHVsZXMvc29jaWFsJyksXG5cdExvZ2luID0gcmVxdWlyZSgnLi9tb2R1bGVzL2xvZ2luJyk7XG5cbmpRdWVyeSAoIGZ1bmN0aW9uKCQpIHtcblx0Y29uc29sZS5sb2coJ0RPTSBsb2FkZWQnKTtcblxuXHR2YXIgR3JlZW5VbmlvbiA9IG5ldyBTaXRlQ29udHJvbGxlcigkKTtcblx0R3JlZW5Vbmlvbi5pbml0KCk7XG5cblxuXHQvKipcblx0IEhPTUUgUEFHRSBcblx0ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXHRpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGVtcGxhdGU9XCJob21lXCJdJykpIHtcblx0XHRIb21lLnN0YXJ0KCk7XG5cdFx0Y29uc29sZS5sb2coJ0hvbWUgc3RhcnQoKScpXG5cdH1cblxuXG5cdC8qKlxuXHQgTE9HSU4gTU9EQUwgXG5cdCA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblx0TG9naW4ubG9hZEZvcm0oJy5ndS1Vc2VyX19hY2NvdW50Jyk7XG59KTtcblxuZnVuY3Rpb24gU2l0ZUNvbnRyb2xsZXIgKCQpIHtcblx0c2VsZi5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHRcdC8vRm9ybXNcblx0XHRGb3Jtcy5zZWxlY3RzKCk7XG5cdFx0Rm9ybXMuc2VhcmNoRm9ybSgpO1xuXHRcdEZvcm1zLm5ld3NsZXR0ZXJGb3JtKCk7XG5cblx0XHQvLyBTb2NpYWwgR2xvYmFsXG5cdFx0U29jaWFsLm5ldHdvcmtNb2RhbCgpO1xuXHR9O1xuXG5cdHJldHVybiBzZWxmO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvc3JjL2pzL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgRm9ybXMgPSB7XG5cbiAgICAvKipcbiAgICAgKiBGb3JtcyAnU2VsZWN0JyBtYW5hZ2VyXG4gICAgICogVHJhbnNmb3JtcyAnc2VsZWN0cycgYXMgbm9ybWFsIGxpc3QgdG8gY3VzdG9taXplIHRoZW0gZWFzaWx5XG4gICAgICovXG4gICAgc2VsZWN0czogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQoJ3NlbGVjdCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBudW1iZXJPZk9wdGlvbnMgPSAkKHRoaXMpLmNoaWxkcmVuKCdvcHRpb24nKS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgYWN0aXZlT3B0aW9uQ2xhc3MgPSAnaXMtQWN0aXZlJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQgQ1NTIGNsYXNzIHRvIGhpZGUgdGhlICdzZWxlY3QnIHRhZy5cbiAgICAgICAgICAgICAqIENyZWF0ZSB0aGUgbGlzdCB3cmFwcGVyICgnLmd1LUZvcm0tc2VsZWN0X193cmFwcGVyJylcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2lzLUhpZGRlbicpOyBcbiAgICAgICAgICAgICR0aGlzLndyYXAoJzxkaXYgY2xhc3M9XCJndS1Gb3JtLXNlbGVjdF9fd3JhcHBlclwiPjwvZGl2PicpO1xuICAgICAgICAgICAgJHRoaXMuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJndS1Gb3JtLXNlbGVjdF9fc2VsZWN0ZWRcIj48L2Rpdj4nKTtcblxuICAgICAgICAgICAgdmFyICRzdHlsZWRTZWxlY3QgPSAkdGhpcy5uZXh0KCcuZ3UtRm9ybS1zZWxlY3RfX3NlbGVjdGVkJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgYW4gb3B0aW9uIGlzIGFscmVhZHkgc2VsZWN0ZWQgKGhhcyAnc2VsZWN0ZWQnIHByb3BlcnR5KSwgZGlzcGxheXMgaXQgYXMgdGhlIHNlbGVjdGVkIG9wdGlvblxuICAgICAgICAgICAgICogT3RoZXJ3aXNlLCBkaXNwbGF5cyB0aGUgZmlyc3Qgb3B0aW9uIGJ5IGRlZmF1bHQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICggJHRoaXMuZmluZCgnb3B0aW9uW3NlbGVjdGVkXScpLmxlbmd0aCApwqB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT3B0aW9uVmFsdWUgPSAkdGhpcy5jaGlsZHJlbignb3B0aW9uW3NlbGVjdGVkXScpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC50ZXh0KCR0aGlzLmNoaWxkcmVuKCdvcHRpb25bc2VsZWN0ZWRdJykudGV4dCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICRzdHlsZWRTZWxlY3QudGV4dCgkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoMCkudGV4dCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyICRsaXN0ID0gJCgnPHVsIC8+JywgeyAnY2xhc3MnOiAnZ3UtRm9ybS1zZWxlY3RfX29wdGlvbnMnIH0pLmluc2VydEFmdGVyKCRzdHlsZWRTZWxlY3QpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFwcGVuZCBlYWNoICdvcHRpb24nIHZhbHVlIHRvIGEgbmV3ICdsaScgdGFnIGluc2lkZSB0aGUgbGlzdFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mT3B0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgJCgnPGxpIC8+Jywge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkdGhpcy5jaGlsZHJlbignb3B0aW9uJykuZXEoaSkudGV4dCgpLFxuICAgICAgICAgICAgICAgICAgICByZWw6ICR0aGlzLmNoaWxkcmVuKCdvcHRpb24nKS5lcShpKS52YWwoKVxuICAgICAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRsaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgJGxpc3RJdGVtcyA9ICRsaXN0LmNoaWxkcmVuKCdsaScpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFkZCAnZGF0YS1hY3RpdmUtb3B0aW9uJyBhdHRyaWJ1dGUgdG8gdGhlIGN1cnJlbnQgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJGxpc3RJdGVtcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdGVkT3B0aW9uVmFsdWUgIT09ICd1bmRlZmluZWQnICYmICQodGhpcykuYXR0cigncmVsJykgPT0gc2VsZWN0ZWRPcHRpb25WYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2RhdGEtYWN0aXZlLW9wdGlvbicsICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHNlbGVjdGVkT3B0aW9uVmFsdWUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignSWwgblxcJ3kgYSBwYXMgZGUgbGFuZ3VlIHPDqWxlY3Rpb25uw6llIDogbGEgdmFyaWFibGUgXCJzZWxlY3RlZE9wdGlvblZhbHVlXCIgblxcJ2V4aXN0ZSBwYXMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFdmVudHMgbGlzdGVuZXJzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICRzdHlsZWRTZWxlY3QuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgJCgnLmd1LUZvcm0tc2VsZWN0X19zZWxlY3RlZC4nKyBhY3RpdmVPcHRpb25DbGFzcykubm90KHRoaXMpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhhY3RpdmVPcHRpb25DbGFzcykubmV4dCgnLmd1LUZvcm0tc2VsZWN0X19vcHRpb25zJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoYWN0aXZlT3B0aW9uQ2xhc3MpLm5leHQoJy5ndS1Gb3JtLXNlbGVjdF9fb3B0aW9ucycpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgJGxpc3RJdGVtcy5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAkc3R5bGVkU2VsZWN0LnRleHQoJCh0aGlzKS50ZXh0KCkpLnJlbW92ZUNsYXNzKGFjdGl2ZU9wdGlvbkNsYXNzKTtcbiAgICAgICAgICAgICAgICAkdGhpcy52YWwoJCh0aGlzKS5hdHRyKCdyZWwnKSk7XG4gICAgICAgICAgICAgICAgJGxpc3QuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQ2hlY2tzIGlmIFBvbHlsYW5nIFdvcmRwcmVzcyBwbHVnaW4ncyAndXJsc19wb2x5bGFuZzInIChvYmplY3QpIHZhcmlhYmxlIGlzIGFscmVhZHkgaW5pdGlhbGl6ZWQgaW4gdGhlIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICogSWYgaXQgaXMsIGNvcGllcyBpdHMgbG9naWM6IGNoYW5nZSB3aW5kb3cgbG9jYXRpb24gZGVwZW5kaW5nIG9mIHRoZSBzZWxlY3RlZCBsYW5ndWFnZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdXJsc19wb2x5bGFuZzIgIT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB1cmxzX3BvbHlsYW5nMiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gdXJsc19wb2x5bGFuZzJbJCh0aGlzKS5hdHRyKCdyZWwnKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdMYSB2YXJpYWJsZSBcInVybHNfcG9seWxhbmcyXCIgblxcJ2VzdCBwYXMgZMOpZmluaWUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEhpZGUgc2VsZWN0IGxpc3Qgd2hlbiBjbGlja2luZyBvbiB0aGUgZG9jdW1lbnRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJHN0eWxlZFNlbGVjdC5yZW1vdmVDbGFzcyhhY3RpdmVPcHRpb25DbGFzcyk7XG4gICAgICAgICAgICAgICAgJGxpc3QuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogU2VhcmNoIGZvcm0gbWFuYWdlclxuICAgICAqL1xuICAgIHNlYXJjaEZvcm06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRmb3JtID0gJCgnI2d1LXNlYXJjaCcpLFxuICAgICAgICAgICAgJGZvcm1XcmFwcGVyID0gJCgnLmd1LVNlYXJjaF9fd3JhcHBlcicpLFxuICAgICAgICAgICAgJGZvcm1Ub2dnbGVyID0gJCgnLmd1LVNlYXJjaF9fdG9nZ2xlcicpLFxuICAgICAgICAgICAgdG9nZ2xlQXR0ciA9ICdkYXRhLXRvZ2dsZWQnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIaWRlIC8gU2hvdyBmb3JtIGZ1bmN0aW9ucyAobWFuYWdlIGRpc3BsYXkgd2l0aCAnZGF0YS10b2dnbGVkJyBhdHRyaWJ1dGUpXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBzaG93U2VhcmNoICgpIHtcbiAgICAgICAgICAgICRmb3JtV3JhcHBlci5hdHRyKHRvZ2dsZUF0dHIsIHRydWUpO1xuICAgICAgICAgICAgJGZvcm1Ub2dnbGVyLmF0dHIodG9nZ2xlQXR0ciwgdHJ1ZSk7XG4gICAgICAgICAgICAkKCdib2R5JykuYXR0cignZGF0YS1uby1zY3JvbGwnLCAnJyk7XG4gICAgICAgICAgICAkZm9ybVdyYXBwZXIuZmluZCgnLmd1LVNlYXJjaF9faW5wdXQnKS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGlkZVNlYXJjaCAoKSB7XG4gICAgICAgICAgICAkZm9ybVdyYXBwZXIuYXR0cih0b2dnbGVBdHRyLCBmYWxzZSk7XG4gICAgICAgICAgICAkZm9ybVRvZ2dsZXIuYXR0cih0b2dnbGVBdHRyLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQXR0cignZGF0YS1uby1zY3JvbGwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUb2dnbGUgZm9ybSBieSBjbGlja2luZyBvbiB0aGUgYnV0dG9uXG4gICAgICAgICAqL1xuICAgICAgICAkZm9ybVRvZ2dsZXIuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCRmb3JtV3JhcHBlci5hdHRyKHRvZ2dsZUF0dHIpID09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgICAgIHNob3dTZWFyY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGhpZGVTZWFyY2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhpZGUgRm9ybSB3aGVuIGNsaWNraW5nIG9uIGRvY3VtZW50IChidXQgbm90IG9uIGZvcm0pXG4gICAgICAgICAqL1xuICAgICAgICAkZm9ybS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmd1LVNlYXJjaF9fd3JhcHBlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhpZGVTZWFyY2goKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIaWRlIGZvcm0gd2hlbiBwcmVzc2luZyAnRXNjYXBlJyBrZXlcbiAgICAgICAgICovXG4gICAgICAgICQoZG9jdW1lbnQpLmtleXVwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMjcgJiYgJGZvcm1XcmFwcGVyLmF0dHIodG9nZ2xlQXR0cikgPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICBoaWRlU2VhcmNoKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBOZXdzbGV0dGVyIGZvcm1cbiAgICAgKi9cbiAgICBuZXdzbGV0dGVyRm9ybTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJHdpZGdldCA9ICQoJy53aWRnZXRfbmV3c2xldHRlcndpZGdldG1pbmltYWwnKSxcbiAgICAgICAgICAgICRmb3JtRmllbGQgPSAkd2lkZ2V0LmZpbmQoJy50bnAtZW1haWwnKTtcblxuICAgICAgICAkZm9ybUZpZWxkLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICR3aWRnZXQuYWRkQ2xhc3MoJ2lzLUZvY3VzZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCRmb3JtRmllbGQudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAkd2lkZ2V0LmFkZENsYXNzKCdpcy1Gb2N1c2VkJyk7XG4gICAgICAgIH1cbiAgICB9LFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1zO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL3NyYy9qcy9tb2R1bGVzL2Zvcm1zLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIb21lID0ge1xuXG4gICAgLyoqXG4gICAgICogSW5pdCBIb21lIGZ1bmN0aW9ucyBuZWVkZWQgb24gbG9hZFxuICAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2xpZGVyU3dpcGVyKCk7XG4gICAgICAgIHRoaXMubmV3c1N3aXBlcigpO1xuICAgICAgICB0aGlzLnRleHRMYXlvdXQoKTtcblxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoSG9tZS50ZXh0TGF5b3V0KCksIDIwMDApO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSG9tZSBTbGlkZXIgc3dpcGVyXG4gICAgICogQGRvYzogaHR0cDovL2lkYW5nZXJvLnVzL3N3aXBlci9hcGkvXG4gICAgICovXG4gICAgc2xpZGVyU3dpcGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWRlZmluZSBTd2lwZXIgbGF5b3V0IGNsYXNzZXNcbiAgICAgICAgICovXG4gICAgICAgIHZhciBzd2lwZXJDb250YWluZXJDbGFzcyA9ICdndS1Ib21lLXNsaWRlcicsXG4gICAgICAgICAgICBzd2lwZXJXcmFwcGVyQ2xhc3MgPSBzd2lwZXJDb250YWluZXJDbGFzcyArJ19fd3JhcHBlcicsXG4gICAgICAgICAgICBzd2lwZXJTbGlkZUNsYXNzID0gJ2d1LUhvbWUtc2xpZGUnO1xuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluaXQgTmV3cyBzd2lwZXJcbiAgICAgICAgICovXG4gICAgICAgIHZhciBob21lU2xpZGVyID0gbmV3IFN3aXBlciAoJy4nKyBzd2lwZXJDb250YWluZXJDbGFzcywge1xuICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgZ3JhYkN1cnNvcjogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZCdXR0b246ICcuJysgc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX25hdlByZXYnLFxuICAgICAgICAgICAgbmV4dEJ1dHRvbjogJy4nKyBzd2lwZXJDb250YWluZXJDbGFzcyArJ19fbmF2TmV4dCcsXG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuXG4gICAgdGV4dExheW91dDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbWFpbkNvbnRhaW5lck9mZnNldCA9ICQoJy5jb250YWluZXInKS5vZmZzZXQoKS5sZWZ0O1xuXG4gICAgICAgIGlmIChtYWluQ29udGFpbmVyT2Zmc2V0ICE9PSAwKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdQb3NpdGl2ZSBvZmZzZXQ6ICcsIG1haW5Db250YWluZXJPZmZzZXQpXG4gICAgICAgICAgICAkKCcuZ3UtSG9tZS10ZXh0X19pbm5lcicpLmNzcygnbWFyZ2luLWxlZnQnLCBtYWluQ29udGFpbmVyT2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ09mZnNldDogJywgbWFpbkNvbnRhaW5lck9mZnNldClcbiAgICAgICAgICAgICQoJy5ndS1Ib21lLXRleHRfX2lubmVyJykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIEhvbWUgTmV3cyBzd2lwZXJcbiAgICAgKiBAZG9jOiBodHRwOi8vaWRhbmdlcm8udXMvc3dpcGVyL2FwaS9cbiAgICAgKi9cbiAgICBuZXdzU3dpcGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWRlZmluZSBTd2lwZXIgbGF5b3V0IGNsYXNzZXNcbiAgICAgICAgICovXG4gICAgICAgIHZhciBzd2lwZXJDb250YWluZXJDbGFzcyA9ICdndS1OZXdzLXN3aXBlcicsXG4gICAgICAgICAgICBzd2lwZXJXcmFwcGVyQ2xhc3MgPSBzd2lwZXJDb250YWluZXJDbGFzcyArJ19fd3JhcHBlcicsXG4gICAgICAgICAgICBzd2lwZXJTbGlkZUNsYXNzID0gJ2d1LU5ld3MtcG9zdCcsXG4gICAgICAgICAgICBtYWluQ29udGFpbmVyT2Zmc2V0ID0gJCgnLmNvbnRhaW5lcicpLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdCBOZXdzIHN3aXBlclxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIG5ld3NTbGlkZXIgPSBuZXcgU3dpcGVyICgnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzLCB7XG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcbiAgICAgICAgICAgIHNsaWRlc09mZnNldEJlZm9yZTogbWFpbkNvbnRhaW5lck9mZnNldCxcbiAgICAgICAgICAgIGdyYWJDdXJzb3I6IHRydWUsXG4gICAgICAgICAgICBwcmV2QnV0dG9uOiAnLicrIHN3aXBlckNvbnRhaW5lckNsYXNzICsnX19uYXZQcmV2JyxcbiAgICAgICAgICAgIG5leHRCdXR0b246ICcuJysgc3dpcGVyQ29udGFpbmVyQ2xhc3MgKydfX25hdk5leHQnLFxuICAgICAgICB9KTtcbiAgICB9LCBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSG9tZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9ob21lLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBTb2NpYWwgPSB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0IFNvY2lhbCBuZXR3b3JrcyBtb2RhbCAoZm9yIFFSQ29kZSBzY2FuIHB1cnBvc2UpXG4gICAgICovXG4gICAgbmV0d29ya01vZGFsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkbmV0d29ya3NXaWRnZXQgPSAkKCcuZ3UtRm9vdGVyLXNvY2lhbF9fbmV0d29ya3MnKSxcbiAgICAgICAgICAgICRpdGVtc1dpdGhNb2RhbCA9ICRuZXR3b3Jrc1dpZGdldC5maW5kKCdbZGF0YS1uZXR3b3JrLWhhc21vZGFsXScpLFxuICAgICAgICAgICAgYWN0aXZlQ2xhc3MgPSAnaXMtQWN0aXZlJztcblxuICAgICAgICAkaXRlbXNXaXRoTW9kYWwuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJGl0ZW0gPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAkaXRlbS5maW5kKCdhJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBTaG93IG9yIGhpZGUgbW9kYWxcbiAgICAgICAgICAgICAgICBpZiAoJGl0ZW0uaXMoJy4nKyBhY3RpdmVDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW0ucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW1zV2l0aE1vZGFsLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgJGl0ZW0uYWRkQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkcmF3TW9kYWwoJGl0ZW0sICRpdGVtLmRhdGEoJ29wdGlvbnMnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEcmF3IHNvY2lhbCBuZXR3b3JrIG1vZGFsXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gaXRlbSA9IExpc3QgaXRlbSAoalF1ZXJ5IGVsZW1lbnQpXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gb3B0aW9ucyA9IE1vZGFsIG9wdGlvbnMgaW4gSFRNTCBhdHRyaWJ1dGUgKEpTT04pXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBkcmF3TW9kYWwgKGl0ZW0sIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChpdGVtICYmIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGl0ZW0gPSBpdGVtLFxuICAgICAgICAgICAgICAgICAgICBtb2RhbE9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgICAgICAgICAgICAgLy8gRHJhdyBNb2RhbCBpZiBvcHRpb25zIGV4aXN0XG4gICAgICAgICAgICAgICAgaWYgKG1vZGFsT3B0aW9ucy5hY2NvdW50ICYmIG1vZGFsT3B0aW9ucy5xcmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRtb2RhbCA9ICQoJzxkaXYgY2xhc3M9XCJndS1Gb290ZXItc29jaWFsX19tb2RhbFwiPicpO1xuICAgICAgICAgICAgICAgICAgICAkbW9kYWwuYXBwZW5kKCc8c3Ryb25nPkAnKyBtb2RhbE9wdGlvbnMuYWNjb3VudCArJzwvc3Ryb25nPicpO1xuICAgICAgICAgICAgICAgICAgICAkbW9kYWwuYXBwZW5kKCc8aW1nIHNyYz1cIicrIG1vZGFsT3B0aW9ucy5xcmNvZGUgKydcIiBhbHQ9XCInKyBtb2RhbE9wdGlvbnMuYWNjb3VudCArJ1wiIC8+Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIG1vZGFsIHRvIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgJG1vZGFsLmFwcGVuZFRvKCRpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTb2NpYWw7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvc3JjL2pzL21vZHVsZXMvc29jaWFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBGb3JtcyA9IHJlcXVpcmUoJy4vZm9ybXMnKSxcclxuICAgIE1vZGFsID0gcmVxdWlyZSgnLi9tb2RhbCcpO1xyXG5cclxudmFyIExvZ2luID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBsb2dpbiBmb3JtIGluIEFqYXhcclxuICAgICAqIEBwYXJhbSBsaW5rIFtqUXVlcnkgZWxlbWVudF0gPT4gTGluayB0byBpbml0IGZyb20gKHdpdGggaXRzICdocmVmJyBhdHRyaWJ1dGUpXHJcbiAgICAgKi9cclxuICAgIGxvYWRGb3JtOiBmdW5jdGlvbiAobGluaykge1xyXG4gICAgICAgIHZhciAkbG9naW5CdG4gPSAkKGxpbmspLFxyXG4gICAgICAgICAgICBsb2dpblVSTCA9ICRsb2dpbkJ0bi5hdHRyKCdocmVmJyksXHJcbiAgICAgICAgICAgIGlzTG9nZ2VkID0gJCgnYm9keScpLmlzKCcubG9nZ2VkLWluJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJGxvZ2luQnRuLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHZhciAkYnRuID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiAtIENoZWNrIGZvciBhbHJlYWR5IGxvZ2dlZC1pbiB1c2Vyc1xyXG4gICAgICAgICAgICAgKiAtIFByZXZlbnQgcmVkaXJlY3QgYnkgY2xpY2tpbmcgb24gdGhlIGxpbmtcclxuICAgICAgICAgICAgICogLSBqUXVlcnkgbG9hZCgpIHRoZSBmb3JtIGVsZW1lbnQgb24gdGhlIHRhcmdldCBVUkwsIHRoZW4gcmVxdWVzdCBNb2RhbC5jcmVhdGUoKSBtZXRob2QsIHRvIGFwcGVuZCBjb250ZW50IGludG8gYSBuZXcgbW9kYWxcclxuICAgICAgICAgICAgICogLSBDYWxsIHNlbGYgc3VibWl0Rm9ybSgpIG1ldGhvZCB3aGVuIHVzZXIgc3VibWl0cyBmb3JtXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBpZiAoaXNMb2dnZWQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICRidG4uYXR0cignZGF0YS1sb2FkaW5nJywgdHJ1ZSk7IC8vIENTUyBwdXJwb3NlXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBsb2dpbk1vZGFsQ2xhc3MgPSAnZ3UtTW9kYWwtbG9naW4nO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogQ2hlY2sgZm9yIGFscmFkeSBleGlzdGluZyBtb2RhbCB3aXRoIHRoaXMgY2xhc3MsXHJcbiAgICAgICAgICAgICAgICAgKiBpbiBvcmRlciB0byBqdXN0IHNob3cgaXQgaW5zdGVhZCBvZiByZXF1ZXN0aW5nIGFnYWluXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGlmICgkKCcuJysgbG9naW5Nb2RhbENsYXNzKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBNb2RhbC5zaG93KCcuJysgbG9naW5Nb2RhbENsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICBMb2dpbi5zdWJtaXRGb3JtKCcjZ3UtTG9naW4tZm9ybScsIGxvZ2luVVJMKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkbG9naW5Gb3JtID0gJCgnPGRpdiAvPicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkbG9naW5Gb3JtLmxvYWQobG9naW5VUkwgKycgI2d1LUxvZ2luLWF1dGhlbnRpZmljYXRpb24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRidG4uYXR0cignZGF0YS1sb2FkaW5nJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RhbC5jcmVhdGUoJGxvZ2luRm9ybSwgbG9naW5Nb2RhbENsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9naW4uc3VibWl0Rm9ybSgnI2d1LUxvZ2luLWZvcm0nLCBsb2dpblVSTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBamF4IExvZ2luXHJcbiAgICAgKiBAcGFyYW0gZm9ybSBbc3RyaW5nXSA9PiBjbGFzcy9JRC9ldGMuIG9mIHRoZSBmb3JtIHRvIHN1Ym1pdFxyXG4gICAgICogQHBhcmFtIFVybFRvUmVkaXJlY3QgW3N0cmluZ10gPT4gVVJMIHRvIHJlZGlyZWN0IHVzZXIgdG8gYWZ0ZXIgbG9nZ2luZyBpblxyXG4gICAgICovXHJcbiAgICBzdWJtaXRGb3JtOiBmdW5jdGlvbiAoZm9ybSwgVXJsVG9SZWRpcmVjdCkge1xyXG4gICAgICAgIHZhciBmb3JtID0gZm9ybTtcclxuXHJcbiAgICAgICAgJChmb3JtKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgJGZvcm0gPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgZG9ubmVlcyA9ICRmb3JtLnNlcmlhbGl6ZSgpO1xyXG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gJGZvcm0uYXR0cignYWN0aW9uJyk7XHJcblxyXG4gICAgICAgICAgICAkZm9ybS5hdHRyKFwiZGF0YS1zZW5kaW5nXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgJC5wb3N0KGFjdGlvbiwgZG9ubmVlcywgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBDaGVjayBmb3IgV29yZHByZXNzIGxvZ2luIGVycm9yIGFuZCBkaXNwbGF5cyB0aGVtXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGlmICgkKGRhdGEpLmZpbmQoJyNsb2dpbl9lcnJvcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkZXJyb3JNc2cgPSAkKGRhdGEpLmZpbmQoJyNsb2dpbl9lcnJvcicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkZXJyb3JDb250YWluZXIgPSAoJCgnLmd1LUxvZ2luLWVycm9yJykubGVuZ3RoKSA/ICQoJy5ndS1Mb2dpbi1lcnJvcicpIDogJCgnPGRpdiBjbGFzcz1cImd1LUxvZ2luLWVycm9yXCIgLz4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJGVycm9yQ29udGFpbmVyLmh0bWwoJycpLnByZXBlbmQoJGVycm9yTXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAkZm9ybS5wcmVwZW5kKCRlcnJvckNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIFJlZGlyZWN0cyB1c2VyIHRvIFVSTCBvbmNlIGxvZ2dlZCBpblxyXG4gICAgICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gVXJsVG9SZWRpcmVjdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTG9naW47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvc3JjL2pzL21vZHVsZXMvbG9naW4uanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1vZGFsID0ge1xyXG4gICAgcGFyYW1zOiB7XHJcbiAgICAgICAgZGVmYXVsdENsYXNzOiAnZ3UtTW9kYWwtZGVmYXVsdCcsXHJcbiAgICAgICAgY2xvc2VCdG5DbGFzczogJ2d1LU1vZGFsLWNsb3NlJyxcclxuICAgICAgICBjbG9zZWRNb2RhbENsYXNzOiAnZ3UtTW9kYWwtaXNDbG9zZWQnLFxyXG4gICAgICAgIGJvZHlBdHRyaWJ1dGU6ICdkYXRhLWhhc01vZGFsJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBNb2RhbFxyXG4gICAgICogQHBhcmFtIGNvbnRlbnQgW2h0bWwgb2JqZWN0XSA9PiBUaGUgY29udGVudCB0byBkaXNwbGF5IGluc2lkZSBtb2RhbFxyXG4gICAgICogQHBhcmFtIG1vZGFsY2xhc3MgW3N0cmluZ10gPT4gb3B0aW9uYWwgc3BlY2lmaWMgY2xhc3MgYWRkZWQgdG8gdGhlIG1vZGFsXHJcbiAgICAgKiBcclxuICAgICAqIENyZWF0ZSBhIG1vZGFsIEhUTUwgZWxlbWVudCBhbmQgYXBwZW5kIGNvbnRlbnQgaW5zaWRlXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRlbnQsIG1vZGFsY2xhc3MpIHtcclxuICAgICAgICB2YXIgbW9kYWxDbGFzcyA9IChtb2RhbGNsYXNzKSA/IG1vZGFsY2xhc3MgOiBNb2RhbC5wYXJhbXMuZGVmYXVsdENsYXNzLFxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBhIG1vZGFsIGFscmVhZHkgZXhpc3RzLCB0aGVuIHJlc2V0IGl0cyBjb250ZW50IGluc3RlYWQgb2YgY3JlYXRpbmcgYSBuZXcgb25lXHJcbiAgICAgICAgICAgICRtb2RhbCA9ICgkKCcjZ3UtTW9kYWwnKS5sZW5ndGgpID9cclxuICAgICAgICAgICAgICAgICAgICAgICQoJyNndS1Nb2RhbCcpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICQoJzxkaXYgaWQ9XCJndS1Nb2RhbFwiIGNsYXNzPVwiZ3UtTW9kYWwgJysgbW9kYWxDbGFzcyArJ1wiIC8+Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnYm9keScpLmF0dHIoTW9kYWwucGFyYW1zLmJvZHlBdHRyaWJ1dGUsIHRydWUpOyAgICAgICAgICAgICBcclxuICAgICAgICAkbW9kYWwuaHRtbCgnJykucmVtb3ZlQ2xhc3MoTW9kYWwucGFyYW1zLmNsb3NlZE1vZGFsQ2xhc3MpO1xyXG4gICAgICAgICRtb2RhbC5hcHBlbmQoJzxidXR0b24gY2xhc3M9XCInKyBNb2RhbC5wYXJhbXMuY2xvc2VCdG5DbGFzcyArJ1wiIC8+Jyk7XHJcbiAgICAgICAgJG1vZGFsLmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICAkbW9kYWwuYXBwZW5kVG8oJ2JvZHknKTtcclxuXHJcbiAgICAgICAgLy8gQ2xvc2UgbW9kYWxcclxuICAgICAgICAkbW9kYWwuZmluZCgnLicrIE1vZGFsLnBhcmFtcy5jbG9zZUJ0bkNsYXNzKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgTW9kYWwuY2xvc2UoJG1vZGFsKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNob3cgZXhpc3RpbmcgKGJ1dCBoaWRkZW4pIG1vZGFsXHJcbiAgICAgKi9cclxuICAgIHNob3c6IGZ1bmN0aW9uIChtb2RhbCkge1xyXG4gICAgICAgIGlmIChtb2RhbCAmJiAhJChtb2RhbCsnOnZpc2libGUnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgJChtb2RhbCkucmVtb3ZlQ2xhc3MoTW9kYWwucGFyYW1zLmNsb3NlZE1vZGFsQ2xhc3MpO1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYXR0cihNb2RhbC5wYXJhbXMuYm9keUF0dHJpYnV0ZSwgdHJ1ZSk7IFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2UgLyBIaWRlIG1vZGFsXHJcbiAgICAgKi9cclxuICAgIGNsb3NlOiBmdW5jdGlvbiAobW9kYWwpIHtcclxuICAgICAgICB2YXIgJG1vZGFsID0gbW9kYWw7XHJcblxyXG4gICAgICAgICRtb2RhbC5hZGRDbGFzcyhNb2RhbC5wYXJhbXMuY2xvc2VkTW9kYWxDbGFzcyk7XHJcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUF0dHIoTW9kYWwucGFyYW1zLmJvZHlBdHRyaWJ1dGUpO1xyXG4gICAgfSxcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBNb2RhbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9zcmMvanMvbW9kdWxlcy9tb2RhbC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9