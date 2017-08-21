<section id="home-projects" class="gu-Home-projects container">
    <div class="gu-Projects-header">
        <div class="gu-Heading gu-Heading__h2" data-heading>Projets</div>
        <a href="<?php echo home_url(); ?>/projets/" class="gu-Link-all">
            <em>Tous</em> <strong>les projets</strong>
        </a>
    </div>
    <?php
        /**
            * Displays recent projects (custom post type)
            */
        $recent_projects = wp_get_recent_posts(array('post_type' => 'projets', 'numberposts' => '3'));
        foreach( $recent_projects as $project ){
            ?>
            <div class="gu-Project-home">
                <h2 class="gu-Project-home__title">
                    <a href="<?php echo get_permalink($project['ID']); ?>" title="<?php echo $project['post_title']; ?>">
                        <?php echo esc_attr($project["post_title"]); ?>
                    </a>
                </h2>
                <div class="gu-Project-home__date"><?php echo _e('Publié le ', 'wgdo'); echo date_i18n('j M Y', strtotime($project['post_date'])); ?></div>
                <a href="<?php echo get_permalink($project['ID']); ?>" title="<?php echo $project['post_title']; ?>" data-cover-btn>
                    <span>Voir le projet</span>
                </a>
            </div>
            <?php
        }
    ?>
</section>