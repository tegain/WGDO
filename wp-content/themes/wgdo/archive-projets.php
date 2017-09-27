<?php get_header(); ?>


	<div class="gu-Banner">
		<!-- BANNER :: PICTURE -->
		<?php get_template_part('partials/banner-picture'); ?>

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

		<div class="gu-Main__header">
			<?php
				$projectsTitle = get_field('projects_title', 'option');
				$projectsIntroduction = get_field('projects_introduction', 'option');
				$terms = get_terms( array(
					'taxonomy' => 'project-category',
					'hide_empty' => false,
				) );
			?>
			<div class="container">
				<div class="gu-Main__header-content">
					<?php
						if ($projectsTitle): echo '<h2 class="gu-Main__header-title" data-heading>'.$projectsTitle.'</h2>'; endif;
						if ($projectsIntroduction): echo '<div class="gu-Main__header-introduction">'.$projectsIntroduction.'</div>'; endif;
					?>
				</div>

				<div class="gu-Filter">
					<div class="gu-Filter-label"><?php _e('Filtrer l\'affichage des projets par secteur d\'activité', 'wgdo'); ?></div>
					<div class="gu-Filter-dropdown">
						<select id="gu-Filter-select">
                            <option data-id="*" value="<?php _e('Tous les projets', 'wgdo'); ?>" class="ajax js-gu-Filter-option_all"><?php _e('Tous les projets', 'wgdo'); ?></option>
							<?php
								//echo '<pre>'; print_r($terms); echo '</pre>';
								foreach($terms as $term) {
                                    echo '<option data-id="'. $term->term_id .'" class="ajax" value="'. $term->name .'">'. $term->name .'</option>';
								}
							?>
						</select>
					</div>
				</div>
			</div>
		</div>

    	<div class="gu-Main__inner container">
		<!-- section -->
		<section>
			<div id="gu-Projects-list" class="gu-Projects-list">
				<?php get_template_part('partials/loop-projets'); ?>
			</div>

			<?php get_template_part('partials/pagination'); ?>

		</section>
		<!-- /section -->
		</div>
	</div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
