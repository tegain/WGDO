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