<?php
/*
Template Name: Home
*/
get_header(); ?>

<div id="gu-main" class="gu-Main" data-template="home">
    <div id="gu-content" class="gu-Home">
    <!-- HOME :: SLIDER -->

    <?php if( have_rows('home_slider') ): ?>
    <section id="gu-Home-slider" class="gu-Home-slider swiper-container">
        <div class="swiper-wrapper">
            <?php while( have_rows('home_slider') ): the_row();

                if( get_row_layout() == 'home_slider_slide' ):
                    $slidePicture = get_sub_field('home_slider_slide_img');
                    $slideTitle = get_sub_field('home_slider_slide_title');
                    $slideText = get_sub_field('home_slider_slide_desc');

                    $slideHasLink = get_sub_field('home_slider_slide_haslink');
                    $slideLinkUrl = get_sub_field('home_slider_slide_link');
                    $slideLinkLabel = get_sub_field('home_slider_slide_linktext');
            ?>
                <!-- Slide -->
                <div class="gu-Home-slide swiper-slide"
                     data-picture="<?php echo $slidePicture['url']; ?>"
                     data-small-picture="<?php echo $slidePicture['sizes']['medium_large']; ?>">

                    <div class="gu-Home-slide__inner">
                        <?php if ($slideTitle): ?>
                            <strong class="gu-Home-slide__heading"><?php echo $slideTitle; ?></strong>
                        <?php endif; ?>

                        <?php if ($slideText): ?>
                            <span class="gu-Home-slide__text"><?php echo $slideText; ?></span>
                        <?php endif; ?>

                        <?php if ($slideHasLink): ?>
                            <a href="<?php echo $slideLinkUrl; ?>" class="gu-Home-slide__link">
                                <span><?php if ($slideLinkLabel) { echo $slideLinkLabel; } else { echo _e('En savoir plus', 'wgdo'); }?></span>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            <?php
                endif; // End Slide
                endwhile; 
            ?>
        </div>

        <!-- Slider navigation -->
        <div class="gu-Home-slider__nav">
            <div class="gu-Home-slider__navBtn gu-Home-slider__navPrev">
                <svg width="12" height="21">
                    <use xlink:href="#icon-arrowPrev"></use>
                </svg>
            </div>
            <div class="gu-Home-slider__navBtn gu-Home-slider__navNext">
                <svg width="12" height="21">
                    <use xlink:href="#icon-arrowNext"></use>
                </svg>
            </div>
        </div>
    </section>
    <?php endif; // End Slider ?>


    <!-- HOME :: INTRODUCTION -->
    <section id="home-text" class="gu-Home-text gu-Page">
        <div class="gu-Home-text__container">
            <?php
                $contentPicture = get_field("home_content_picture");
                if ($contentPicture):

                //echo '<pre>'; print_r($contentPicture); echo '</pre>';
            ?>
            <div class="gu-Home-text__picture">
                <img src="<?php echo $contentPicture['sizes']['medium']; ?>"
                     data-srcset="<?php echo $contentPicture['sizes']['medium']; ?> <?php echo $contentPicture['sizes']['medium-width']; ?>w, <?php echo $contentPicture['url']; ?> <?php echo $contentPicture['width']; ?>w"
                     sizes="(min-width: 768px) 40vw, 100%"
                     alt="<?php the_title(); ?>"
                     class="lazyload" />
            </div>
            <?php endif; ?>

            <div class="gu-Home-text__inner">
                <?php 
                    /**
                    * Page subtitle
                    */
                    $subtitle = get_field( "page_subtitle" );
                    if ($subtitle):
                ?>
                    <span class="gu-Page-subtitle"><?php echo $subtitle; ?></span>
                <?php endif; ?>

                <h1 class="gu-Page-title" data-heading><?php the_title(); ?></h1>

                <?php if (have_posts()): while (have_posts()) : the_post(); ?>
                <div class="gu-Page-content">
                    <?php the_content(); ?>
                </div>
                <?php endwhile; endif; ?>
            </div>
        </div>
    </section>


    <!-- HOME :: LATEST NEWS -->
    <?php get_template_part('partials/home-news'); ?>

    <!-- HOME :: PROJECTS -->
    <?php get_template_part('partials/home-projets'); ?>

    <!-- HOME :: JOBS & INTERNSHIPS -->
    <?php get_template_part('partials/home-jobs'); ?>
    
    </div> <!-- /.gu-Home -->
</div>

<?php get_footer(); ?>