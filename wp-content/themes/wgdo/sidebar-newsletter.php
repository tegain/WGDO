<!-- NEWSLETTER FORM & SOCIAL ICONS -->
<section class="gu-Footer-social" role="complementary">
	<div class="gu-Footer-social__newsletter">
		<?php if(!function_exists('dynamic_sidebar') || !dynamic_sidebar('widget-area-2')) ?>
	</div>

	<div class="gu-Footer-social__networks">
		<strong>Suivez-nous :</strong>
		<ul>
			<li data-network="facebook">
				<a href="#" class="gu-Footer-social__link">
					<svg class="gu-Footer-social__icon"><use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/dist/img/svg.svg#icon-facebook"></use></svg>
					<span>Facebook</span>
				</a>
			</li>
			<li data-network="twitter">
				<a href="#" class="gu-Footer-social__link">
					<svg class="gu-Footer-social__icon"><use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/dist/img/svg.svg#icon-twitter"></use></svg>
					<span>Twitter</span>
				</a>
			</li>
			<li data-network="youtube">
				<a href="#" class="gu-Footer-social__link">
					<svg class="gu-Footer-social__icon"><use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/dist/img/svg.svg#icon-youtube"></use></svg>
					<span>Youtube</span>
				</a>
			</li>
			<li data-network="wechat" data-network-hasmodal>
				<a href="#" class="gu-Footer-social__link">
					<svg class="gu-Footer-social__icon"><use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/dist/img/svg.svg#icon-wechat"></use></svg>
					<span>Wechat</span>
				</a>
			</li>
			<li data-network="weibo" data-network-hasmodal>
				<a href="#" class="gu-Footer-social__link">
					<svg class="gu-Footer-social__icon"><use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/dist/img/svg.svg#icon-weibo"></use></svg>
					<span>Weibo</span>
				</a>
			</li>
			<li data-network="youku" data-network-hasmodal>
				<a href="#" class="gu-Footer-social__link">
					<svg class="gu-Footer-social__icon"><use xlink:href="<?php echo get_template_directory_uri(); ?>/assets/dist/img/svg.svg#icon-youku"></use></svg>
					<span>Youku</span>
				</a>
			</li>
		</ul>
	</div>
</section>