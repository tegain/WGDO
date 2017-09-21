<?php
/*
 *  Author: Todd Motto | @toddmotto
 *  URL: html5blank.com | @html5blank
 *  Custom functions, support, custom post types and more.
 */

/*------------------------------------*\
	External Modules/Files
\*------------------------------------*/

// Load any external files you have here
include (TEMPLATEPATH . '/functions/acf.php' );
include (TEMPLATEPATH . '/functions/shortcodes.php' );
include (TEMPLATEPATH . '/functions/custom-post-types.php' );


/*------------------------------------*\
	Theme Support
\*------------------------------------*/

if (!isset($content_width))
{
    $content_width = 900;
}

if (function_exists('add_theme_support'))
{
    // Add Menu Support
    add_theme_support('menus');

    // Add Thumbnail Theme Support
    add_theme_support('post-thumbnails');
    add_image_size('large', 800, '', true); // Large Thumbnail
    add_image_size('medium', 640, '', true); // Medium Thumbnail
    add_image_size('small', 320, '', true); // Small Thumbnail
    add_image_size('custom-size', 700, 200, true); // Custom Thumbnail Size call using the_post_thumbnail('custom-size');

    // Add Support for Custom Backgrounds - Uncomment below if you're going to use
    /*add_theme_support('custom-background', array(
	'default-color' => 'FFF',
	'default-image' => get_template_directory_uri() . '/img/bg.jpg'
    ));*/

    // Add Support for Custom Header - Uncomment below if you're going to use
    /*add_theme_support('custom-header', array(
	'default-image'			=> get_template_directory_uri() . '/img/headers/default.jpg',
	'header-text'			=> false,
	'default-text-color'		=> '000',
	'width'				=> 1000,
	'height'			=> 198,
	'random-default'		=> false,
	'wp-head-callback'		=> $wphead_cb,
	'admin-head-callback'		=> $adminhead_cb,
	'admin-preview-callback'	=> $adminpreview_cb
    ));*/

    // Enables post and comment RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Localisation Support
    load_theme_textdomain('wgdo', get_template_directory() . '/languages');
}

/*------------------------------------*\
	Functions
\*------------------------------------*/

// HTML5 Blank navigation
function get_main_nav()
{
    wp_nav_menu(
	array(
		'theme_location'  => 'header-menu',
		'menu'            => 'header-menu',
		'container'       => false,
		'menu_class'      => 'gu-Header-menu',
        'menu_id'         => 'gu-header-menu',
		'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
        'link_before'     => '<span>',
        'link_after'     => '</span>',
		'echo'            => true,
		'fallback_cb'     => 'wp_page_menu',
		'depth'           => 0,
		)
	);
}

function get_footer_nav() {
    wp_nav_menu(
	array(
		'theme_location'  => 'footer-menu',
		'menu'            => 'footer-menu',
		'container'       => false,
		'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
		'echo'            => true,
		'fallback_cb'     => 'wp_page_menu',
		'depth'           => 0,
		)
	);
}

// Load HTML5 Blank scripts (header.php)
function html5blank_header_scripts()
{
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
        wp_register_script('wgdo-vendors-js', get_template_directory_uri() . '/assets/dist/js/vendors.js', array('jquery'), '1.0.0', true); // Vendors scripts
        wp_register_script('wgdo-js', get_template_directory_uri() . '/assets/dist/js/build.js', array('jquery'), '1.0.0', true); // App scripts

        wp_enqueue_script('wgdo-vendors-js'); // Enqueue it!
        wp_enqueue_script('wgdo-js');
    }
}

function dequeue_jquery_migrate( &$scripts){
	if(!is_admin()){
		$scripts->remove( 'jquery');
		$scripts->add( 'jquery', false, array( 'jquery-core' ), '1.10.2' );
	}
}

function modify_jquery_version() {
    if (!is_admin()) {
        wp_deregister_script('jquery');
		wp_deregister_script('wp-embed');
    }
}

function set_new_jquery() {
    if (!is_admin()) {
        wp_register_script('jquery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js', false, '3.2.1');
        wp_enqueue_script('jquery');
    }
}

function wpb_add_google_fonts() {
    wp_enqueue_style( 'gf-montserrat', 'https://fonts.googleapis.com/css?family=Montserrat:400,600,700', false, false, 'screen' );
    wp_enqueue_style( 'gf-playfair', 'https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i', false, false, 'screen' );
}

// Load HTML5 Blank conditional scripts
function html5blank_conditional_scripts()
{
    // if (is_page('pagenamehere')) {
    //     wp_register_script('scriptname', get_template_directory_uri() . '/js/scriptname.js', array('jquery', 'ahha-js'), '1.0.0'); // Conditional script(s)
    //     wp_enqueue_script('scriptname'); // Enqueue it!
    // }
}

// Load HTML5 Blank styles
function html5blank_styles()
{
    wp_register_style('wgdo-styles', get_template_directory_uri() . '/assets/dist/css/main.css', array(), '1.0', 'screen');
    wp_enqueue_style('wgdo-styles'); // Enqueue it!
}

// Register HTML5 Blank Navigation
function register_html5_menu()
{
    register_nav_menus(array( // Using array to specify more menus if needed
        'header-menu' => __('Header Menu', 'wgdo'), // Main Navigation
        'footer-menu' => __('Footer Menu', 'wgdo'), // Main Navigation
    ));
}

// Remove the <div> surrounding the dynamic navigation to cleanup markup
function my_wp_nav_menu_args($args = '')
{
    $args['container'] = false;    return $args;
}

// Remove Injected classes, ID's and Page ID's from Navigation <li> items
function my_css_attributes_filter($var)
{
    return is_array($var) ? array() : '';
}

// Remove invalid rel attribute values in the categorylist
function remove_category_rel_from_category_list($thelist)
{
    return str_replace('rel="category tag"', 'rel="tag"', $thelist);
}

// Add page slug to body class, love this - Credit: Starkers Wordpress Theme
function add_slug_to_body_class($classes)
{
    global $post;
    // if (is_home()) {
    //     $key = array_search('blog', $classes);
    //     if ($key > -1) {
    //         unset($classes[$key]);
    //     }
    // } elseif (is_page()) {
    //     $classes[] = sanitize_html_class($post->post_name);
    // } elseif (is_singular()) {
    //     $classes[] = sanitize_html_class($post->post_name);
    // }

    return $classes;
}

// Remove the width and height attributes from inserted images
function remove_width_attribute( $html ) {
   $html = preg_replace( '/(width|height)="\d*"\s/', "", $html );
   return $html;
}


// If Dynamic Sidebar Exists
if (function_exists('register_sidebar'))
{
    // Define Sidebar Widget Area 1
    register_sidebar(array(
        'name' => __('Topbar', 'wgdo'),
        'description' => __('Widgets dans le header', 'wgdo'),
        'id' => 'widget-area-1',
        'before_widget' => '<div id="%1$s" class="%2$s">',
        'after_widget' => '</div>',
        'before_title' => '<strong>',
        'after_title' => '</strong>'
    ));

    // Define Sidebar Widget Area 2
    register_sidebar(array(
        'name' => __('Newsletter', 'wgdo'),
        'description' => __('Widget d\'inscription à la newsletter', 'wgdo'),
        'id' => 'widget-area-2',
        'before_widget' => '<div id="%1$s" class="%2$s">',
        'after_widget' => '</div>',
        'before_title' => '<strong>',
        'after_title' => '</strong>'
    ));

    // Define Sidebar Widget Area 2
    register_sidebar(array(
        'name' => __('Footer', 'wgdo'),
        'description' => __('Widgets footer', 'wgdo'),
        'id' => 'widget-area-3',
        'before_widget' => '<div id="%1$s" class="%2$s">',
        'after_widget' => '</div>',
        'before_title' => '<strong>',
        'after_title' => '</strong>'
    ));
}

// Remove wp_head() injected Recent Comment styles
function my_remove_recent_comments_style()
{
    global $wp_widget_factory;
    remove_action('wp_head', array(
        $wp_widget_factory->widgets['WP_Widget_Recent_Comments'],
        'recent_comments_style'
    ));
}

// Pagination for paged posts, Page 1, Page 2, Page 3, with Next and Previous Links, No plugin
function html5wp_pagination()
{
    global $wp_query;
    $big = 999999999;
    echo paginate_links(array(
        'base' => str_replace($big, '%#%', get_pagenum_link($big)),
        'format' => '?paged=%#%',
        'current' => max(1, get_query_var('paged')),
        'total' => $wp_query->max_num_pages
    ));
}



// Login page custom
/*
function login_logo_url() {
    return home_url();
}

function custom_login() {
    wp_enqueue_style( 'custom-login', get_stylesheet_directory_uri() . '/style-login.css' );
    wp_enqueue_script( 'custom-login', get_stylesheet_directory_uri() . '/style-login.js' );
}
add_filter( 'login_headerurl', 'login_logo_url' );
add_action( 'login_enqueue_scripts', 'custom_login' );
*/



// Custom Excerpts
function html5wp_index($length) // Create 20 Word Callback for Index page Excerpts, call using html5wp_excerpt('html5wp_index');
{
    return 20;
}

// Create 40 Word Callback for Custom Post Excerpts, call using html5wp_excerpt('html5wp_custom_post');
function html5wp_custom_post($length)
{
    return 40;
}

// Create the Custom Excerpts callback
function html5wp_excerpt($length_callback = '', $more_callback = '')
{
    global $post;
    if (function_exists($length_callback)) {
        add_filter('excerpt_length', $length_callback);
    }
    if (function_exists($more_callback)) {
        add_filter('excerpt_more', $more_callback);
    }
    $output = get_the_excerpt();
    $output = apply_filters('wptexturize', $output);
    $output = apply_filters('convert_chars', $output);
    $output = '<p>' . $output . '</p>';
    echo $output;
}

function display_excerpt($postId, $charlength) {
	$excerpt = get_the_excerpt($postId);
	$charlength++;

	if ( mb_strlen( $excerpt ) > $charlength ) {
		$subex = mb_substr( $excerpt, 0, $charlength - 5 );
		$exwords = explode( ' ', $subex );
		$excut = - ( mb_strlen( $exwords[ count( $exwords ) - 1 ] ) );
		if ( $excut < 0 ) {
			echo mb_substr( $subex, 0, $excut );
		} else {
			echo $subex;
		}
		echo '[...]';
	} else {
		echo $excerpt;
	}
}

// Custom View Article link to Post
function html5_blank_view_article($more)
{
    global $post;
    return '... <a class="view-article" href="' . get_permalink($post->ID) . '">' . __('View Article', 'wgdo') . '</a>';
}

// Remove Admin bar
function remove_admin_bar()
{
    return false;
}

// Remove 'text/css' from our enqueued stylesheet
function html5_style_remove($tag)
{
    return preg_replace('~\s+type=["\'][^"\']++["\']~', '', $tag);
}

// Remove thumbnail width and height dimensions that prevent fluid images in the_thumbnail
function remove_thumbnail_dimensions( $html )
{
    $html = preg_replace('/(width|height)=\"\d*\"\s/', "", $html);
    return $html;
}

// Custom Gravatar in Settings > Discussion
function html5blankgravatar ($avatar_defaults)
{
    $myavatar = get_template_directory_uri() . '/img/gravatar.jpg';
    $avatar_defaults[$myavatar] = "Custom Gravatar";
    return $avatar_defaults;
}

// Threaded Comments
function enable_threaded_comments()
{
    if (!is_admin()) {
        if (is_singular() AND comments_open() AND (get_option('thread_comments') == 1)) {
            wp_enqueue_script('comment-reply');
        }
    }
}

// Custom Comments Callback
function html5blankcomments($comment, $args, $depth)
{
	$GLOBALS['comment'] = $comment;
	extract($args, EXTR_SKIP);

	if ( 'div' == $args['style'] ) {
		$tag = 'div';
		$add_below = 'comment';
	} else {
		$tag = 'li';
		$add_below = 'div-comment';
	}
?>
    <!-- heads up: starting < for the html tag (li or div) in the next line: -->
    <<?php echo $tag ?> <?php comment_class(empty( $args['has_children'] ) ? '' : 'parent') ?> id="comment-<?php comment_ID() ?>">
	<?php if ( 'div' != $args['style'] ) : ?>
	<div id="div-comment-<?php comment_ID() ?>" class="comment-body">
	<?php endif; ?>
	<div class="comment-author vcard">
	<?php if ($args['avatar_size'] != 0) echo get_avatar( $comment, $args['180'] ); ?>
	<?php printf(__('<cite class="fn">%s</cite> <span class="says">says:</span>'), get_comment_author_link()) ?>
	</div>
<?php if ($comment->comment_approved == '0') : ?>
	<em class="comment-awaiting-moderation"><?php _e('Your comment is awaiting moderation.') ?></em>
	<br />
<?php endif; ?>

	<div class="comment-meta commentmetadata"><a href="<?php echo htmlspecialchars( get_comment_link( $comment->comment_ID ) ) ?>">
		<?php
			printf( __('%1$s at %2$s'), get_comment_date(),  get_comment_time()) ?></a><?php edit_comment_link(__('(Edit)'),'  ','' );
		?>
	</div>

	<?php comment_text() ?>

	<div class="reply">
	<?php comment_reply_link(array_merge( $args, array('add_below' => $add_below, 'depth' => $depth, 'max_depth' => $args['max_depth']))) ?>
	</div>
	<?php if ( 'div' != $args['style'] ) : ?>
	</div>
	<?php endif; ?>
<?php }

// Async load
function queue_async_scripts($url)
{
    if ( strpos( $url, '#asyncload') === false )
        return $url;
    else if ( is_admin() )
        return str_replace( '#asyncload', '', $url );
    else
	return str_replace( '#asyncload', '', $url )."' async='async";
    }
add_filter( 'clean_url', 'queue_async_scripts', 11, 1 );



//Deletes all CSS classes and id's, except for those listed in the array below
function custom_wp_nav_menu($var) {
  return is_array($var) ? array_intersect($var, array(
		//List of allowed menu classes
		'current_page_item',
		'current_page_parent',
		'current_page_ancestor',
		'first',
		'last',
		'vertical',
		'horizontal',
        'menu-item__button',
        'current-menu-item',
        'active'
		)
	) : '';
}
add_filter('nav_menu_css_class', 'custom_wp_nav_menu');
add_filter('nav_menu_item_id', 'custom_wp_nav_menu');
add_filter('page_css_class', 'custom_wp_nav_menu');


add_filter( 'nav_menu_link_attributes', 'my_nav_menu_attribs', 10, 3 );
function my_nav_menu_attribs( $atts, $item, $args )
{
  // The ID of the target menu item
  $menu_target = 365;

  // inspect $item
  if ($item->ID == $menu_target) {
    $atts['role'] = 'menuitem';
  }
  return $atts;
}

//Replaces "current-menu-item" with "active"
function current_to_active($text){
	$replace = array(
		//List of menu item classes that should be changed to "active"
		'current_page_item' => 'active-page',
		'current_page_parent' => 'active',
		'current_page_ancestor' => 'active-ancestor',
        'current-menu-item' => 'active'
	);
	$text = str_replace(array_keys($replace), $replace, $text);
		return $text;
	}
add_filter ('wp_nav_menu','current_to_active');

//Deletes empty classes and removes the sub menu class
function strip_empty_classes($menu) {
    $menu = preg_replace('/ class=""| class="sub-menu"/','',$menu);
    return $menu;
}
add_filter ('wp_nav_menu','strip_empty_classes');

function dequeue_specific_styles() {
    //----- CSS
    wp_deregister_style('widgetopts-styles'); // 'Widget Options' plugin
    wp_deregister_style('newsletter-subscription'); // 'Widget Options' plugin

    //----- JS
    //wp_deregister_script('devicepx'); // Jetpack
}
add_action( 'wp_print_styles', 'dequeue_specific_styles', 100 );




// add hook
add_filter( 'wp_nav_menu_objects', 'wp_nav_menu_objects_sub_menu', 10, 2 );

// filter_hook function to react on sub_menu flag
function wp_nav_menu_objects_sub_menu( $sorted_menu_items, $args ) {
  if ( isset( $args->sub_menu ) ) {
    $root_id = 0;

    // find the current menu item
    foreach ( $sorted_menu_items as $menu_item ) {
      if ( $menu_item->current ) {
        // set the root id based on whether the current menu item has a parent or not
        $root_id = ( $menu_item->menu_item_parent ) ? $menu_item->menu_item_parent : $menu_item->ID;
        break;
      }
    }

    // find the top level parent
    if ( ! isset( $args->direct_parent ) ) {
      $prev_root_id = $root_id;
      while ( $prev_root_id != 0 ) {
        foreach ( $sorted_menu_items as $menu_item ) {
          if ( $menu_item->ID == $prev_root_id ) {
            $prev_root_id = $menu_item->menu_item_parent;
            // don't set the root_id to 0 if we've reached the top of the menu
            if ( $prev_root_id != 0 ) $root_id = $menu_item->menu_item_parent;
            break;
          }
        }
      }
    }

    $menu_item_parents = array();
    foreach ( $sorted_menu_items as $key => $item ) {
      // init menu_item_parents
      if ( $item->ID == $root_id ) $menu_item_parents[] = $item->ID;

      if ( in_array( $item->menu_item_parent, $menu_item_parents ) ) {
        // part of sub-tree: keep!
        $menu_item_parents[] = $item->ID;
      } else if ( ! ( isset( $args->show_parent ) && in_array( $item->ID, $menu_item_parents ) ) ) {
        // not part of sub-tree: away with it!
        unset( $sorted_menu_items[$key] );
      }
    }

    return $sorted_menu_items;
  } else {
    return $sorted_menu_items;
  }
}


/**
 * Generate breadcrumbs
 * @author CodexWorld
 * @authorURL www.codexworld.com
 */
function get_breadcrumb() {
    $separator = "<span class='gu-Breadcrumbs__separator' data-arrow='›'></span>";

    echo '<a href="'.home_url().'" class="gu-Breadcrumbs__item" rel="nofollow">Home</a>';
    if (is_category() || is_single()) {
        echo $separator;
        the_category(' &bull; ');
            if (is_single()) {
                echo $separator;
                the_title();
            }
    } elseif (is_page()) {
        echo $separator;
        echo "<span class='gu-Breadcrumbs__item gu-Breadcrumbs__item-current'>";
        echo the_title();
        echo "</span>";
    } elseif (is_search()) {
        echo $separator ." Search Results for... ";
        echo '<em class="gu-Breadcrumbs__item gu-Breadcrumbs__item-current">';
        echo the_search_query();
        echo '</em>"';
    } else {
        echo $separator;
    }
}

add_action( 'wp_ajax_nopriv_load-filter2', 'prefix_load_term_posts' );
add_action( 'wp_ajax_load-filter2', 'prefix_load_term_posts' );

function prefix_load_term_posts () {
    $term_id = $_POST[ 'term' ];
    $args = array (
        'term' => $term_id,
        'posts_per_page' => -1,
        'order' => 'DESC',
        'tax_query' => array(
            array(
                'taxonomy' => 'project-category',
                'field'    => 'id',
                'terms'    => $term_id,
                'operator' => 'IN'
            ),
        ),
        'post_type' => 'projets'
    );

    global $post;
    $myposts = get_posts( $args );
    ob_start ();

    foreach( $myposts as $post ) : setup_postdata($post);
    
        $excerpt = substr(strip_tags(get_the_content()), 0, 150);
        $contentLength = strlen(get_the_content());
    ?>
        <!-- article -->
        <article id="post-<?php the_ID(); ?>" <?php post_class('gu-Project-card'); ?> >
            <!-- post thumbnail -->
            <?php if ( has_post_thumbnail()) : ?>
                <a class="gu-Project-card__picture" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
                    <?php the_post_thumbnail(array(120,120)); ?>
                </a>
            <?php endif; ?>
            <!-- post title -->
            <h2 class="gu-Project-card__title">
                <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
            </h2>
            <!-- post details -->
            <span class="gu-Project-card__date">
                <time datetime="<?php the_time('Y-m-d'); ?> <?php the_time('H:i'); ?>">
                    <?php the_date(); ?> <?php the_time(); ?>
                </time>
            </span>
            <div class="gu-Project-card__content">
                <?php echo $excerpt; if ($contentLength > 150) echo '...'; ?>
                <a href="<?php the_permalink(); ?>">

                    <span><?php echo _e('Voir le projet', 'wgdo'); ?></span>
                </a>
            </div>
        </article>
    <?php endforeach; ?>

    <?php wp_reset_postdata(); 
    $response = ob_get_contents();
    ob_end_clean();
    echo $response;
    die(1);
}


/*------------------------------------*\
	Actions + Filters + ShortCodes
\*------------------------------------*/

// Add Actions
add_action('init', 'html5blank_header_scripts'); // Add Custom Scripts to wp_head
add_action('wp_print_scripts', 'html5blank_conditional_scripts'); // Add Conditional Page Scripts
add_action('get_header', 'enable_threaded_comments'); // Enable Threaded Comments
add_action('wp_enqueue_scripts', 'html5blank_styles'); // Add Theme Stylesheet
add_action('init', 'register_html5_menu'); // Add HTML5 Blank Menu
add_action('init', 'create_post_type_html5'); // Add our HTML5 Blank Custom Post Type
add_action('widgets_init', 'my_remove_recent_comments_style'); // Remove inline Recent Comment Styles from wp_head()
add_action('init', 'html5wp_pagination'); // Add our HTML5 Pagination
add_action('init', 'modify_jquery_version');
add_action('wp_footer', 'set_new_jquery', 5);

// Remove Actions
remove_action('wp_head', 'feed_links_extra', 3); // Display the links to the extra feeds such as category feeds
remove_action('wp_head', 'feed_links', 2); // Display the links to the general feeds: Post and Comment Feed
remove_action('wp_head', 'rsd_link'); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action('wp_head', 'wlwmanifest_link'); // Display the link to the Windows Live Writer manifest file.
remove_action('wp_head', 'index_rel_link'); // Index link
remove_action('wp_head', 'parent_post_rel_link', 10, 0); // Prev link
remove_action('wp_head', 'start_post_rel_link', 10, 0); // Start link
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // Display relational links for the posts adjacent to the current post.
remove_action('wp_head', 'wp_generator'); // Display the XHTML generator that is generated on the wp_head hook, WP version
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);

// Add Filters
add_filter('avatar_defaults', 'html5blankgravatar'); // Custom Gravatar in Settings > Discussion
add_filter('body_class', 'add_slug_to_body_class'); // Add slug to body class (Starkers build)
add_filter('widget_text', 'do_shortcode'); // Allow shortcodes in Dynamic Sidebar
add_filter('widget_text', 'shortcode_unautop'); // Remove <p> tags in Dynamic Sidebars (better!)
add_filter('wp_nav_menu_args', 'my_wp_nav_menu_args'); // Remove surrounding <div> from WP Navigation
// add_filter('nav_menu_css_class', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> injected classes (Commented out by default)
// add_filter('nav_menu_item_id', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> injected ID (Commented out by default)
// add_filter('page_css_class', 'my_css_attributes_filter', 100, 1); // Remove Navigation <li> Page ID's (Commented out by default)
add_filter('the_category', 'remove_category_rel_from_category_list'); // Remove invalid rel attribute
add_filter('the_excerpt', 'shortcode_unautop'); // Remove auto <p> tags in Excerpt (Manual Excerpts only)
add_filter('the_excerpt', 'do_shortcode'); // Allows Shortcodes to be executed in Excerpt (Manual Excerpts only)
add_filter('excerpt_more', 'html5_blank_view_article'); // Add 'View Article' button instead of [...] for Excerpts
add_filter('show_admin_bar', 'remove_admin_bar'); // Remove Admin bar
add_filter('style_loader_tag', 'html5_style_remove'); // Remove 'text/css' from enqueued stylesheet
add_filter('post_thumbnail_html', 'remove_thumbnail_dimensions', 10); // Remove width and height dynamic attributes to thumbnails
add_filter( 'post_thumbnail_html', 'remove_width_attribute', 10 ); // Remove width and height dynamic attributes to post images
add_filter( 'image_send_to_editor', 'remove_width_attribute', 10 ); // Remove width and height dynamic attributes to post images
add_filter( 'wp_default_scripts', 'dequeue_jquery_migrate' );

// Remove Filters
remove_filter('the_excerpt', 'wpautop'); // Remove <p> tags from Excerpt altogether
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
//add_action( 'wp_enqueue_scripts', 'wpb_add_google_fonts' );


/*------------------------------------*\
    Create an ACF Options Page
    http://www.advancedcustomfields.com/resources/options-page/
 \*------------------------------------*/
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page();

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Contenu Projets',
		'menu_title' 	=> 'Contenu Projets',
		'parent_slug' 	=> 'edit.php?post_type=projets'
	));
}

