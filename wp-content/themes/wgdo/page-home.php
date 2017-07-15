<?php
/*
Template Name: Home
*/
get_header(); ?>

<div id="gu-main" class="gu-Main" data-template="home">
    <div id="gu-content" class="gu-Home">
    <!-- HOME :: SLIDER -->

    <?php if( have_rows('home_slider') ): ?>
    <section id="home-slider" class="gu-Home-slider swiper-container">
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
                <div class="gu-Home-slide swiper-slide" style="background-image: url(<?php echo $slidePicture; ?>);">
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
        <div class="gu-Home-slider__nav gu-Home-slider__navPrev">Prev</div>
        <div class="gu-Home-slider__nav gu-Home-slider__navNext">Next</div>
    </section>
    <?php endif; // End Slider ?>


    <!-- HOME :: INTRODUCTION -->
    <section id="home-text" class="gu-Home-text">

        <?php 
            /**
             * Page subtitle
             */
            $subtitle = get_field( "page_subtitle" );
            if ($subtitle):
        ?>
            <span class="gu-Page-subtitle"><?php echo $subtitle; ?></span>
        <?php endif; ?>

        <h1 class="gu-Page-title"><?php the_title(); ?></h1>

        <?php if (have_posts()): while (have_posts()) : the_post(); ?>
        <div class="gu-Page-content">
            <?php the_content(); ?>
        </div>
        <?php endwhile; endif; ?>
    </section>


    <!-- HOME :: LATEST NEWS -->
    <section id="home-news" class="gu-Home-news">
        <div class="gu-Heading gu-Heading__h2">Actualités</div>

        <div class="gu-News-swiper swiper-container">

        <div class="gu-News-swiper__nav gu-News-swiper__navPrev">Prev</div>
        <div class="gu-News-swiper__nav gu-News-swiper__navNext">Next</div>

        <div class="gu-News-swiper__wrapper swiper-wrapper">
        <?php
            /**
             * Displays recent news
             */
            $args = array( 'numberposts' => '6' );
            $recent_posts = wp_get_recent_posts( $args );
            foreach( $recent_posts as $recent ){
                //echo '<pre>'; print_r($recent); echo '</pre>';
                $contentLength = strlen($recent["post_content"]);
                $excerpt = substr(strip_tags($recent["post_content"]), 0, 150);
                $picturePath = get_the_post_thumbnail_url( $recent["ID"], 'large' );
                ?>
                <div class="gu-News-post swiper-slide">
                    <div class="gu-News-post__inner">
                        <h2 class="gu-News-post__title">
                            <a href="<?php echo get_permalink($recent["ID"]); ?>" title="<?php echo $recent["post_title"]; ?>">
                                <?php echo $recent["post_title"]; ?>
                            </a>
                        </h2>

                        <div class="gu-News-post__date">
                            <?php echo date_i18n('j M Y', strtotime($recent['post_date'])); ?>
                        </div>

                        <div class="gu-News-post__picture"
                            <?php if ( has_post_thumbnail($recent["ID"]) ) : ?>style="background-image: url(<?php echo $picturePath; ?>)" data-cover-picture <?php endif; ?>></div>

                        <div class="gu-News-post__content">
                            <?php
                                echo $excerpt;
                                if ($contentLength > 150) echo '...';
                            ?>
                        </div>

                        <a class="gu-News-post__link" href="<?php echo get_permalink($recent["ID"]); ?>" title="<?php echo $recent["post_title"]; ?>" data-cover-btn>
                            <span class="button"><?php _e('Lire l\'actualité', 'wgdo'); ?></span>
                        </a>
                    </div>
                </div>
                <?php
            }
            wp_reset_query();
        ?>
        </div>
    </section>


    <!-- HOME :: PROJECTS -->
    <section id="home-projects" class="gu-Home-projects container">
        <div class="gu-Heading gu-Heading__h2">Projets</div>
        <?php
            /**
             * Displays recent projects (custom post type)
             */
            $recent_projects = wp_get_recent_posts(array('post_type' => 'projets', 'numberposts' => '3'));
            foreach( $recent_projects as $project ){
                ?>
                <div class="gu-Project-home">
                    <h2 class="gu-Project-home__title">
                        <a href="<?php echo get_permalink($project["ID"]); ?>" title="<?php echo $project["post_title"]; ?>">
                            <?php echo esc_attr($project["post_title"]); ?>
                        </a>
                    </h2>
                    <div class="gu-Project-home__date"><?php echo _e('Publié le ', 'wgdo'); echo date_i18n('j M Y', strtotime($project['post_date'])); ?></div>
                </div>
                <?php
            }
        ?>
    </section>


    <!-- HOME :: JOBS & INTERNSHIPS -->
    <section id="home-jobs" class="gu-Home-jobs">
        <div class="gu-Heading gu-Heading__h2">Emplois <span class="char-amp">&</span> stages</div>
        <?php
            /**
             * Displays recent jobs offers (custom post type)
             */
            $recent_jobs = wp_get_recent_posts(array('post_type' => 'jobs', 'numberposts' => '6'));
            foreach( $recent_jobs as $job ){
                $terms = get_the_terms( $job["ID"] , 'typeoffre' ); // Get taxonomy

                foreach ( $terms as $term ) {
                    //echo '<pre>'; print_r($job); echo '</pre>';
                    //echo '<li><a href="' . get_permalink($job["ID"]) . '" title="Look '.esc_attr($job["post_title"]).'" >['. $term->name .'] ' .   $job["post_title"].'</a> </li> ';
                ?>
                    <div class="gu-Job-home">
                        <h2 class="gu-Job-home__title">
                            <a href="<?php echo get_permalink($job["ID"]); ?>" title="<?php echo esc_attr($job["post_title"]); ?>">
                                <?php echo esc_attr($job["post_title"]); ?>
                            </a>
                        </h2>
                        <div class="gu-Job-home__desc"><?php echo esc_attr($job["post_content"]); ?></div>
                        <a class="gu-Job-home__link" href="<?php echo get_permalink($job["ID"]); ?>" title="<?php echo esc_attr($job["post_title"]); ?>">Afficher <span class="char-amp">&</span> postuler</a>
                    </div>
                <?php
                }
            }
        ?>
    </section>
    </div> <!-- /.gu-Home -->
</div>

<?php get_footer(); ?>