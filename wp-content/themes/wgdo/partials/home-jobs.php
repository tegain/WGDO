<section id="home-jobs" class="gu-Home-jobs">
    <div class="gu-Home-jobs__wrapper container">
        <div class="gu-Heading gu-Heading__h2">Emplois <span class="char-amp">&</span> stages</div>

        <div id="gu-Jobs-swiper" class="gu-Jobs-swiper swiper-container">
            <div class="gu-Jobs-swiper__nav">
                <div class="gu-Jobs-swiper__navBtn gu-Jobs-swiper__navPrev">
                    <svg width="12" height="21">
                        <use xlink:href="#icon-arrowPrev"></use>
                    </svg>
                </div>
                <div class="gu-Jobs-swiper__navBtn gu-Jobs-swiper__navNext">
                    <svg width="12" height="21">
                        <use xlink:href="#icon-arrowNext"></use>
                    </svg>
                </div>
            </div>

            <div class="gu-Jobs-swiper__wrapper swiper-wrapper">
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
                            <div class="gu-Job-home gu-Jobs-slide swiper-slide">
                                <h2 class="gu-Job-home__title">
                                    <a href="<?php echo get_permalink($job["ID"]); ?>" title="<?php echo esc_attr($job["post_title"]); ?>">
                                        <?php if ($term->name) : echo '['. $term->name .']'; endif; ?>
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
            </div>
        </div>
    </div>
</section>