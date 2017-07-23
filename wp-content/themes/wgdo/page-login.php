<?php
/*
Template Name: Espace adhérent
*/
get_header(); ?>

<?php

/**
* TODO
* - Afficher le formulaire uniquement si pas connecté
* - Mettre les liens Logout / Register dans le header et pas ici
* - Modifier les liens
* - Modifier l'URL de la page dans le fichier sidebar.php
*/
?>

<div id="gu-main" class="gu-Main" data-template="login">
    <div class="gu-Main-inner container">
        <div id="gu-Login-authentification" class="gu-Login-authentification">
            <strong class="gu-Login-authentification__heading gu-Heading__h1">Connexion à l'espace adhérent</strong>

            <?php
                if ( ! is_user_logged_in() ) {
                    // Display WordPress login form:
                    $args = array(
                        'redirect' => admin_url(), 
                        'form_id' => 'gu-Login-form',
                        'label_username' => __( 'Identifiant' ),
                        'label_password' => __( 'Mot de passe' ),
                        'label_remember' => __( 'Me reconnecter automatiquement ?' ),
                        'label_log_in' => __( 'Connexion' ),
                        'remember' => true
                    );
                    wp_login_form( $args );
                } else {
                    // If logged in:
                    wp_loginout( home_url() ); // Display "Log Out" link.
                    echo " | ";
                    wp_register('', ''); // Display "Site Admin" link.
                }
            ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>