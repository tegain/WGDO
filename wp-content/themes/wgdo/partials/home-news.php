<section id="home-news" class="gu-Home-news">
    <div class="gu-News-header container">
        <div class="gu-Heading gu-Heading__h2">Actualités</div>
        <a href="#" class="gu-Link-all">
            <em>Toutes</em> <strong>les actualités</strong>
        </a>
    </div>
    <div class="gu-News-swiper swiper-container">

    <div class="gu-News-swiper__nav">
        <div class="gu-News-swiper__navBtn gu-News-swiper__navPrev">
            <svg width="12" height="21">
                <use xlink:href="#icon-arrowPrev"></use>
            </svg>
        </div>
        <div class="gu-News-swiper__navBtn gu-News-swiper__navNext">
            <svg width="12" height="21">
                <use xlink:href="#icon-arrowNext"></use>
            </svg>
        </div>
    </div>

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

            $title = substr(strip_tags($recent["post_title"]), 0, 62);
            $titleLength = strlen($recent["post_title"]);

            $picturePath = get_the_post_thumbnail_url( $recent["ID"], 'large' );
            ?>
            <div class="gu-News-post swiper-slide">
                <div class="gu-News-post__inner">
                    <h2 class="gu-News-post__title">
                        <a href="<?php echo get_permalink($recent["ID"]); ?>" title="<?php echo $recent["post_title"]; ?>">
                            <?php
                                echo $title;
                                if ($titleLength > 62) echo '...';
                            ?>
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