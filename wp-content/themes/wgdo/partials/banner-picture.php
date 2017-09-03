<?php
	$banner_picture = get_field('page_banner');

	/**
	 * Check if 'cachedBG' cookie exists, then generate correct markup:
	 * - If high-res picture is already cached --> just set it as background without the data-attributes
	 * - Otherwise --> default markup with data-attributes, waiting for JS swapping treatment	
	 */
	function get_banner_picture() {
	
		if($banner_picture = get_field('page_banner')) {

			$id = $banner_picture['id'];
			$src_small = $banner_picture['sizes']['medium'];
			$src_large = $banner_picture['url'];
			$is_cached = false;

			// Check cookie if this image has already been cached
			if(isset($_COOKIE['cachedBG'])){
				$cached_ids = explode('|', $_COOKIE['cachedBG']);
				$is_cached = in_array($id, $cached_ids);
			}

			$out = '<div class="gu-Banner__picture" ';

			if($is_cached){
				$out .= 'style="background-image: url('.$src_large.')" ';
			}
			else {
				$out .= 'style="background-image: url('.$src_small.')" ';
				$out .= 'data-banner-big="'.esc_attr($src_large).'" ';
			}
			$out .= 'data-banner-id="'.$id.'" ></div>';
			
			echo $out;
		}
	}

	get_banner_picture();
?>