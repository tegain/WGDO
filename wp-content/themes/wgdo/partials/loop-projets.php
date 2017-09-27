<?php if (have_posts()): while (have_posts()) : the_post();

	get_template_part('partials/card-projet');
	
	endwhile;
else: ?>

	<!-- article -->
	<article>
		<h2><?php _e( 'Sorry, nothing to display.', 'wgdo' ); ?></h2>
	</article>
	<!-- /article -->

<?php endif; ?>
