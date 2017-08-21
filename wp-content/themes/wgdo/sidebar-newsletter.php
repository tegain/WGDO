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
					<svg class="gu-Footer-social__icon"><use xlink:href="#icon-facebook"></use></svg>
					<span>Facebook</span>
				</a>
			</li>
			<li data-network="twitter">
				<a href="#" class="gu-Footer-social__link">
					<svg class="gu-Footer-social__icon"><use xlink:href="#icon-twitter"></use></svg>
					<span>Twitter</span>
				</a>
			</li>
			<li data-network="youtube">
				<a href="#" class="gu-Footer-social__link">
					<svg class="gu-Footer-social__icon"><use xlink:href="#icon-youtube"></use></svg>
					<span>Youtube</span>
				</a>
			</li>
			<li data-network="wechat" data-network-hasmodal data-options='{"account":"wgdoWechat","qrcode":"<?php echo get_template_directory_uri(); ?>/assets/dist/img/qrcodetest.jpg"}'>
				<a href="#" class="gu-Footer-social__link">
					<svg class="gu-Footer-social__icon"><use xlink:href="#icon-wechat"></use></svg>
					<span>Wechat</span>
				</a>
			</li>
			<li data-network="weibo" data-network-hasmodal data-options='{"account":"wgdoWeibo","qrcode":"<?php echo get_template_directory_uri(); ?>/assets/dist/img/qrcodetest.jpg"}'>
				<a href="#" class="gu-Footer-social__link">
					<svg class="gu-Footer-social__icon"><use xlink:href="#icon-weibo"></use></svg>
					<span>Weibo</span>
				</a>
			</li>
			<li data-network="youku" data-network-hasmodal data-options='{"account":"wgdoYouku","qrcode":"<?php echo get_template_directory_uri(); ?>/assets/dist/img/qrcodetest.jpg"}'>
				<a href="#" class="gu-Footer-social__link">
					<svg class="gu-Footer-social__icon"><use xlink:href="#icon-youku"></use></svg>
					<span>Youku</span>
				</a>
			</li>
		</ul>
	</div>
</section>
