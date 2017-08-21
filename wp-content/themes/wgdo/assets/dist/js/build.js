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
	        this.textLayout();
	
	        // Wait for complete load before initializing News swiper
	        $(window).on( 'load', this.newsSwiper() );
	
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
	            $swiperSlide = $('.gu-Home-slide');
	
		    /**
		     * Init News swiper
		     */
		    var homeSlider = new Swiper ('.'+ swiperContainerClass, {
			    loop: false,
			    slidesPerView: 1,
			    grabCursor: true,
			    prevButton: '.'+ swiperContainerClass +'__navPrev',
			    nextButton: '.'+ swiperContainerClass +'__navNext',
			    lazyLoading: true,
			    //observer: true,
	            onInit: function () {
		            $swiperSlide.each(function () {
			            var _slide = $(this),
				            _slideBG = $(window).width() > 800 ? _slide.data('picture') : _slide.data('small-picture');
	
			            _slide.css('background-image', 'url('+ _slideBG +')');
		            });
	            }
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
//# sourceMappingURL=build.js.map