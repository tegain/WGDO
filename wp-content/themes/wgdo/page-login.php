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

if ( ! is_user_logged_in() ) { // Display WordPress login form:
    $args = array(
        'redirect' => admin_url(), 
        'form_id' => 'loginform-custom',
        'label_username' => __( 'Username custom text' ),
        'label_password' => __( 'Password custom text' ),
        'label_remember' => __( 'Remember Me custom text' ),
        'label_log_in' => __( 'Log In custom text' ),
        'remember' => true
    );
    wp_login_form( $args );
} else { // If logged in:
    wp_loginout( home_url() ); // Display "Log Out" link.
    echo " | ";
    wp_register('', ''); // Display "Site Admin" link.
}
?>

<?php get_footer(); ?>