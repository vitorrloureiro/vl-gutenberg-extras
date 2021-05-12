<?php
/**
 * Plugin Name:       VL Gutenberg Extras
 * Plugin URI:        
 * Description:       Extra functionalities to core Gutenberg blocks.
 * Version:           0.0.1
 * Requires at least: 5.7
 * Requires PHP:      7.2
 * Author:            Vitor Loureiro
 * Author URI:        https://vitorloureiro.com
 * License:           
 * License URI:       
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

function my_script_enqueue() {
	wp_enqueue_script( 'vl-gutenberg-extras',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks' )
);
}

function my_stylesheet_enqueue() {
	wp_enqueue_style( 'vl-gutenberg-extras-styles', plugins_url( 'build/styles.css', __FILE__));
}

add_action('enqueue_block_editor_assets','my_script_enqueue');
add_action( 'enqueue_block_assets', 'my_stylesheet_enqueue');