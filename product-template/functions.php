
<?php
/**
 * Theme setup and WooCommerce support
 */

// Theme Setup Function
function your_theme_setup() {
    // Add WooCommerce support
    add_theme_support('woocommerce');
    
    // Optional: Add support for WooCommerce features
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}
add_action('after_setup_theme', 'your_theme_setup');

/**
 * Product Gallery customization
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
