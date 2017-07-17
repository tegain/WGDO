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