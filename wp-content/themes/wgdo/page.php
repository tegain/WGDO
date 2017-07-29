<?php get_header(); ?>

	<div class="gu-Banner">
		<div class="gu-Banner__container container">
			<div class="gu-Banner__breadcrumbs">
				<?php get_breadcrumb(); ?><em><?php _e( 'Projets', 'wgdo' ); ?></em>
			</div>

			<h1><?php _e( 'Projets', 'wgdo' ); ?></h1>

			<?php
				/**
				 * https://www.minddevelopmentanddesign.com/blog/showing-current-pages-parents-sub-menu-items-custom-nav-menu-wordpress/
				 */
				$section_id = empty( $post->ancestors ) ? $post->ID : end( $post->ancestors );
				$locations = get_nav_menu_locations();
				$menu = wp_get_nav_menu_object( $locations[ 'header-menu' ] ); // 'primary' is our nav menu's name
				$menu_items = wp_get_nav_menu_items( $menu->term_id, array( 'post_parent' => $section_id ) );

				if( !empty( $menu_items ) ) {
					echo '<div class="gu-Banner__subnav"><ul>';
					foreach( $menu_items as $menu_item ) {
						?>
						<li <?php if ($menu_item->object_id == get_the_ID()): ?>class="activee"<?php endif; ?>>
							<a href="<?php echo $menu_item->url; ?>" title="<?php echo $menu_item->title; ?>"><?php echo $menu_item->title; ?></a>
						</li>
						<?php
					}
					echo '</ul></div>';
				}
			?>
			<!-- <pre><?php //print_r($menu_items); ?></pre> -->
		</div>
	</div>

	<div id="gu-main" class="gu-Main" data-template="default">
    	<div class="gu-Main-inner container">
		<!-- section -->
		<section>

			<h1><?php the_title(); ?></h1>

		<?php if (have_posts()): while (have_posts()) : the_post(); ?>

			<!-- article -->
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

				<?php the_content(); ?>

				<?php comments_template( '', true ); // Remove if you don't want comments ?>

				<br class="clear">

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

		</section>
		<!-- /section -->
		</div>
	</div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
