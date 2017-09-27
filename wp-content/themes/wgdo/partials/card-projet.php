<?php
    $excerpt = substr(strip_tags(get_the_content()), 0, 150);
	$contentLength = strlen(get_the_content());
?>

<!-- article -->
<article id="post-<?php the_ID(); ?>" <?php post_class('gu-Project-card'); ?> >
    <!-- post thumbnail -->
    <?php if ( has_post_thumbnail()) : // Check if thumbnail exists ?>
        <a class="gu-Project-card__picture" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
            <?php the_post_thumbnail(array(120,120)); // Declare pixel size you need inside the array ?>
        </a>
    <?php endif; ?>
    <!-- /post thumbnail -->

    <!-- post title -->
    <h2 class="gu-Project-card__title <?php if (!is_user_logged_in()) :?>js-gu-User-loggedOut<?php endif; ?>">
        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
    </h2>
    <!-- /post title -->

    <!-- post details -->
    <span class="gu-Project-card__date">
        <time datetime="<?php the_time('Y-m-d'); ?> <?php the_time('H:i'); ?>">
            <?php _e('Publié le ', 'wgdo'); the_date(); ?>
        </time>
    </span>
    <!-- /post details -->
    
    <div class="gu-Project-card__content">
        <?php
            echo $excerpt;
            if ($contentLength > 150) echo '...';
        ?>
    </div>

    <a href="<?php the_permalink(); ?>" class="gu-Project-card__link <?php if (!is_user_logged_in()) :?>js-gu-User-loggedOut<?php endif; ?>">
        <?php if ( ! is_user_logged_in() ) { ?>
            <svg class="gu-Icon gu-Icon-login">
                <use xlink:href="#icon-login"></use>
            </svg>
            <span><?php echo _e('Connectez-vous pour voir le projet', 'wgdo'); ?></span>
        <?php
            } else {
        ?>
            <span><?php echo _e('Voir le projet', 'wgdo'); ?></span>
            <svg class="gu-Icon gu-Icon-rightArrow">
                <use xlink:href="#icon-arrowRight"></use>
            </svg>
        <?php } ?>
    </a>

    <?php //edit_post_link(); ?>

</article>
<!-- /article -->