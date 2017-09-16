		<footer id="gu-footer" class="gu-Footer">
			<div class="gu-Footer-inner container">
				<?php get_sidebar('newsletter'); ?>
				<?php get_sidebar('footer'); ?>
			</div>
		</footer>
		
		
		<!--[if lt IE 9 ]><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script><![endif]-->

		<?php wp_footer(); ?>

		<!-- TODO: ADD GOOGLE ANALYTICS -->
		<?php echo get_num_queries(); ?> queries in <?php timer_stop(1); ?> seconds.

	</body>
</html>
