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
					echo '<ul class="gu-Banner__subnav">';
					foreach( $menu_items as $menu_item ) {
						echo '<li><a href="' . $menu_item->url . '">' . $menu_item->title . '</a></li>';
					}
					echo '</ul>';
				}
			?>
		</div>
	</div>

	<div id="gu-main" class="gu-Main" data-template="projects">
    	<div class="gu-Main__inner container">
		<!-- section -->
		<section>

			

			<?php get_template_part('partials/loop-projets'); ?>

			<?php get_template_part('partials/pagination'); ?>

		</section>
		<!-- /section -->
		</div>
	</div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
