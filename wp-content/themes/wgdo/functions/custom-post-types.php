<?php 
/*------------------------------------*\
	Custom Post Types
\*------------------------------------*/

function create_project_category() {
    register_taxonomy(
        'project-category',
        'projets',
        array(
            //'label' => _e( 'Catégories' ),
            'rewrite' => array( 'slug' => 'project-category' ),
            'hierarchical' => true,
        )
    );
}
add_action( 'init', 'create_project_category' );

function create_post_type() {
    register_post_type( 'projets',
        array(
            'labels' => array(
                'name' => __( 'Projets', 'wgdo' ),
                'singular_name' => __( 'Projet', 'wgdo' ),
                'add_new_item' => __('Ajouter un nouveau projet', 'wgdo')
            ),
            'public' => true,
            'can_export' => true,
            'has_archive' => true,
            'menu_icon' => 'dashicons-portfolio',   // http://www.kevinleary.net/wordpress-dashicons-list-custom-post-type-icons/
            'supports' => array(
                'title',
                'editor',
                'thumbnail',
                'excerpt',
                'custom-fields'
            ),
            'taxonomies'  => array( 'project-category' )
        )
    );

    register_post_type( 'jobs',
        array(
            'labels' => array(
                'name' => __( 'Emplois et stages', 'wgdo' ),
                'singular_name' => __( 'Emploi / Stage', 'wgdo' ),
                'add_new_item' => __('Ajouter un nouvel emploi / stage', 'wgdo')
            ),
            'public' => true,
            'can_export' => true,
            'has_archive' => true,
            'menu_icon' => 'dashicons-welcome-learn-more',   // http://www.kevinleary.net/wordpress-dashicons-list-custom-post-type-icons/
            'supports' => array(
                'title',
                'editor',
                'thumbnail',
                'excerpt',
                'custom-fields'
            ),
            'taxonomies'  => array( 'category' )
        )
    );

    register_taxonomy( 'typeoffre', 'jobs', array( 'hierarchical' => true, 'label' => 'Type d\'offre', 'query_var' => true, 'rewrite' => true ) );
}

add_action( 'init', 'create_post_type' );
add_filter( 'pre_get_posts', 'my_get_posts' );

function my_get_posts( $query ) {
    if ( is_home() )
    $query->set( 'post_type', array( 'projets' ) );

    return $query;
}

function create_post_type_html5()
{
    /*
    register_post_type('html5-blank', // Register Custom Post Type
        array(
        'labels' => array(
            'name' => __('HTML5 Blank Custom Post', 'html5blank'), // Rename these to suit
            'singular_name' => __('HTML5 Blank Custom Post', 'html5blank'),
            'add_new' => __('Add New', 'html5blank'),
            'add_new_item' => __('Add New HTML5 Blank Custom Post', 'html5blank'),
            'edit' => __('Edit', 'html5blank'),
            'edit_item' => __('Edit HTML5 Blank Custom Post', 'html5blank'),
            'new_item' => __('New HTML5 Blank Custom Post', 'html5blank'),
            'view' => __('View HTML5 Blank Custom Post', 'html5blank'),
            'view_item' => __('View HTML5 Blank Custom Post', 'html5blank'),
            'search_items' => __('Search HTML5 Blank Custom Post', 'html5blank'),
            'not_found' => __('No HTML5 Blank Custom Posts found', 'html5blank'),
            'not_found_in_trash' => __('No HTML5 Blank Custom Posts found in Trash', 'html5blank')
        ),
        'public' => true,
        'hierarchical' => true, // Allows your posts to behave like Hierarchy Pages
        'has_archive' => true,
        'supports' => array(
            'title',
            'editor',
            'excerpt',
            'thumbnail'
        ), // Go to Dashboard Custom HTML5 Blank post for supports
        'menu_icon' => 'dashicons-format-status',   // http://www.kevinleary.net/wordpress-dashicons-list-custom-post-type-icons/
        'can_export' => true // Allows export in Tools > Export
    ));
    register_taxonomy(
        'type_of_staff',    // Taxonomy
        'staff',             // Object Type
        array(
            'label' => __( 'Type' ),
            'rewrite' => array( 'slug' => 'type' ),
            'hierarchical' => true, // Is this taxonomy hierarchical like categories or not hierarchical like tags.
        )
    );
    */
}