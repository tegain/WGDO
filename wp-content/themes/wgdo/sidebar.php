<!-- Header topbar -->
<!-- Language switcher -->
<div class="gu-LangSwitcher">
	<svg class="gu-LangSwitcher__icon">
		<use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/dist/img/svg.svg#icon-language"></use>
	</svg>
	
	<div class="gu-LangSwitcher__switch">
		<?php if(!function_exists('dynamic_sidebar') || !dynamic_sidebar('widget-area-1')) ?>
	</div>
</div>

<div class="gu-User">
	<!-- Login link -->
	<a href="<?php echo home_url(); ?>/espace-adherents/" title="Login" class="gu-User__account"><?php echo _e('Members', 'wgdo'); ?></a>
	<button class="gu-Search__toggler" data-toggled="false"><?php echo _e('Search', 'wgdo'); ?></button>

	<!-- Search form -->
	<div class="gu-Search__wrapper" data-toggled="false">
		<?php get_template_part('partials/searchform'); ?>
	</div>
</div>

