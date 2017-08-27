var Home = {

    /**
     * Init Home functions needed on load
     */
    start: function () {
        this.sliderSwiper();
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
            $swiperSlide = $('.gu-Home-slide');

	    /**
	     * Init News swiper
	     */
	    new Swiper ('#'+ swiperContainerClass, {
		    loop: false,
		    slidesPerView: 1,
		    grabCursor: true,
		    prevButton: '.'+ swiperContainerClass +'__navPrev',
		    nextButton: '.'+ swiperContainerClass +'__navNext',
		    lazyLoading: true,
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
            $('.gu-Home-text__inner').css('margin-left', mainContainerOffset);
        }
        else {
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
            mainContainerOffset = $('.container').offset().left;
        
        /**
         * Init News swiper
         */
        new Swiper ('#'+ swiperContainerClass, {
            loop: false,
            slidesPerView: 'auto',
            slidesOffsetBefore: mainContainerOffset,
            grabCursor: true,
            prevButton: '.'+ swiperContainerClass +'__navPrev',
            nextButton: '.'+ swiperContainerClass +'__navNext'
        });
    },


	/**
	 * Home Jobs swiper
	 * @doc: http://idangero.us/swiper/api/
	 */
	jobsSwiper: function () {
		/**
		 * Redefine Swiper layout classes
		 */
		var swiperContainerClass = 'gu-Jobs-swiper';

		/**
		 * Init News swiper
		 */
		new Swiper ('#'+ swiperContainerClass, {
			loop: false,
			direction: 'vertical',
			slidesPerView: 1,
			prevButton: '.'+ swiperContainerClass +'__navPrev',
			nextButton: '.'+ swiperContainerClass +'__navNext',
			lazyLoading: true
		});
	}
};

module.exports = Home;