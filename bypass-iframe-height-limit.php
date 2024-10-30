<?php
/**
 * Plugin Name:     Bypass Iframe Height Limit
 * Description:     WordPress sets a height limit of 1000px on embedded iFrames where the height is set dynamically. This plugin allows you to bypass that limitation.
 * Author:          Justin Carboneau
 * Text Domain:     bypass-iframe-height-limit
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Bypass_Iframe_Height_Limit
 */

// Your code starts here.

function bypass_iframe_height_limit_init() {
	wp_register_script('bypass', plugin_dir_url( __FILE__ ) . 'js/bypass.js', '', '', true);
    wp_enqueue_script('bypass');
}

add_action('wp_enqueue_scripts', 'bypass_iframe_height_limit_init');
