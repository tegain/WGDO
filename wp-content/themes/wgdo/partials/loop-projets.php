<?php if (have_posts()): while (have_posts()) : the_post();

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
		<h2 class="gu-Project-card__title">
			<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
		</h2>
		<!-- /post title -->

		<!-- post details -->
		<span class="gu-Project-card__date">
			<time datetime="<?php the_time('Y-m-d'); ?> <?php the_time('H:i'); ?>">
				<?php the_date(); ?> <?php the_time(); ?>
			</time>
		</span>
		<!-- /post details -->
		
		<div class="gu-Project-card__content">
			<?php
				echo $excerpt;
				if ($contentLength > 150) echo '...';
			?>

			<a href="<?php the_permalink(); ?>">

				<span><?php echo _e('Voir le projet', 'wgdo'); ?></span>
			</a>
		</div>

		<?php edit_post_link(); ?>

	</article>
	<!-- /article -->

<?php endwhile; ?>

<?php else: ?>

	<!-- article -->
	<article>
		<h2><?php _e( 'Sorry, nothing to display.', 'wgdo' ); ?></h2>
	</article>
	<!-- /article -->

<?php endif; ?>
