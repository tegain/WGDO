
<?php $home_member = get_field('home_member'); ?>

<section id="home-projects" class="gu-Home-projects container<?php if ($home_member): ?> has-members<?php endif; ?>">
    <?php if ($home_member) : ?>
        <div class="gu-Home-members">
            <h3 class="gu-Home-members__heading"><?php echo $home_member["home_member_title"]; ?></h3>
            <div class="gu-Home-members__content"><?php echo $home_member["home_member_content"]; ?></div>
            <a href="<?php echo $home_member['home_member_link']; ?>" class="gu-Home-members__link">Devenir adhérent</a>
        </div>
    <?php endif; ?>

    <div class="gu-Projects-wrapper">
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
                    <h2 class="gu-Project-home__title" data-arrow="›">
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
    </div>
</section>