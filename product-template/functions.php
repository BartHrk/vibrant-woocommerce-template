
<?php
/**
 * Add this code to your theme's functions.php file
 */

// Enqueue product gallery scripts and styles
function custom_product_gallery_scripts() {
    if (is_product()) {
        wp_enqueue_style(
            'custom-product-gallery',
            get_template_directory_uri() . '/assets/css/product-template.css',
            array(),
            '1.0.0'
        );
        
        wp_enqueue_script(
            'custom-product-gallery',
            get_template_directory_uri() . '/assets/js/product-gallery.js',
            array('jquery'),
            '1.0.0',
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'custom_product_gallery_scripts');

// Override WooCommerce template
function custom_product_gallery_template_override() {
    if (is_product()) {
        remove_action('woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20);
        add_action('woocommerce_before_single_product_summary', 'custom_product_gallery_template', 20);
    }
}
add_action('template_redirect', 'custom_product_gallery_template_override');

function custom_product_gallery_template() {
    wc_get_template('single-product/product-image.php');
}
