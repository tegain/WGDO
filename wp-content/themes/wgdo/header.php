<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, user-scalable=no">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' : '; } ?><?php bloginfo('name'); ?></title>

		<link href="//www.google-analytics.com" rel="dns-prefetch">
		<link href="//fonts.googleapis.com/" rel="dns-prefetch">
		<link href="//cdnjs.cloudflare.com/" rel="dns-prefetch">
        <link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">

		<!-- Critical CSS -->
		<style><?php include 'wp-content/themes/wgdo/assets/dist/css/critical.css'; ?></style>

		<!-- TYPEKIT / GOOGLE FONTS / FONTS.COM -->
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700">

		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>

		<!-- SVG Store -->
		<div class="is-Hidden">
			<?php include 'wp-content/themes/wgdo/assets/dist/img/svg/sprites.svg'; ?>
		</div>

		<!-- HEADER -->
		<header id="gu-header" class="gu-Header">
			<div class="gu-Header__topbar">
				<?php get_sidebar(); ?>
			</div>

			<div class="gu-Header__mainbar">
				<?php get_main_nav(); ?>
			</div>
			
		</header>
		
		<!-- MAIN -->