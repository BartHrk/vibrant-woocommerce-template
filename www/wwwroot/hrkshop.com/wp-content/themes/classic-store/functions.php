<?php
if (!defined('ABSPATH')) {
    exit;
}

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
 * Add Custom Product Tabs
 */
function add_custom_product_tabs( $tabs ) {
    // Remove the default reviews tab
    unset($tabs['reviews']);

    // Add a custom specifications tab
    $tabs['specifications_tab'] = array(
        'title'    => __( 'Specifications', 'your-theme-textdomain' ),
        'priority' => 20,
        'callback' => 'custom_specifications_tab_content'
    );

    // Add a custom shipping tab
    $tabs['shipping_tab'] = array(
        'title'    => __( 'Shipping', 'your-theme-textdomain' ),
        'priority' => 30,
        'callback' => 'custom_shipping_tab_content'
    );

    // Add your custom tab (previously reviews)
    $tabs['custom_info_tab'] = array(
        'title'    => __( 'Additional Info', 'your-theme-textdomain' ), // Change this title to whatever you want
        'priority' => 40,
        'callback' => 'custom_info_tab_content'
    );

    return $tabs;
}
add_filter( 'woocommerce_product_tabs', 'add_custom_product_tabs' );

/**
 * Add Custom Meta Boxes for Tab Content
 */
function add_product_tabs_meta_boxes() {
    add_meta_box(
        'specifications_tab_content',
        __( 'Specifications Tab Content', 'your-theme-textdomain' ),
        'specifications_tab_meta_box',
        'product',
        'normal',
        'default'
    );

    add_meta_box(
        'shipping_tab_content',
        __( 'Shipping Tab Content', 'your-theme-textdomain' ),
        'shipping_tab_meta_box',
        'product',
        'normal',
        'default'
    );

    add_meta_box(
        'custom_info_tab_content',
        __( 'Additional Info Tab Content', 'your-theme-textdomain' ), // Change this title to match your tab
        'custom_info_tab_meta_box',
        'product',
        'normal',
        'default'
    );
}
add_action( 'add_meta_boxes', 'add_product_tabs_meta_boxes' );

/**
 * Meta Box Callbacks
 */
function specifications_tab_meta_box( $post ) {
    wp_nonce_field( 'save_specifications_tab', 'specifications_tab_nonce' );
    $specifications = get_post_meta( $post->ID, '_specifications_tab_content', true );
    wp_editor( $specifications, 'specifications_tab_content', array(
        'textarea_name' => 'specifications_tab_content',
        'media_buttons' => true,
        'tinymce'      => true,
        'textarea_rows'=> 10
    ) );
}

function shipping_tab_meta_box( $post ) {
    wp_nonce_field( 'save_shipping_tab', 'shipping_tab_nonce' );
    $shipping = get_post_meta( $post->ID, '_shipping_tab_content', true );
    wp_editor( $shipping, 'shipping_tab_content', array(
        'textarea_name' => 'shipping_tab_content',
        'media_buttons' => true,
        'tinymce'      => true,
        'textarea_rows'=> 10
    ) );
}

function custom_info_tab_meta_box( $post ) {
    wp_nonce_field( 'save_custom_info_tab', 'custom_info_tab_nonce' );
    $custom_info = get_post_meta( $post->ID, '_custom_info_tab_content', true );
    wp_editor( $custom_info, 'custom_info_tab_content', array(
        'textarea_name' => 'custom_info_tab_content',
        'media_buttons' => true,
        'tinymce'      => true,
        'textarea_rows'=> 10
    ) );
}

/**
 * Save Meta Box Content
 */
function save_product_tabs_meta( $post_id ) {
    // Check if our nonces are set and verify them
    if ( !isset( $_POST['specifications_tab_nonce'] ) || 
         !wp_verify_nonce( $_POST['specifications_tab_nonce'], 'save_specifications_tab' ) ) {
        return;
    }

    if ( !isset( $_POST['shipping_tab_nonce'] ) || 
         !wp_verify_nonce( $_POST['shipping_tab_nonce'], 'save_shipping_tab' ) ) {
        return;
    }

    if ( !isset( $_POST['custom_info_tab_nonce'] ) || 
         !wp_verify_nonce( $_POST['custom_info_tab_nonce'], 'save_custom_info_tab' ) ) {
        return;
    }

    // Save specifications tab content
    if ( isset( $_POST['specifications_tab_content'] ) ) {
        update_post_meta(
            $post_id,
            '_specifications_tab_content',
            wp_kses_post( $_POST['specifications_tab_content'] )
        );
    }

    // Save shipping tab content
    if ( isset( $_POST['shipping_tab_content'] ) ) {
        update_post_meta(
            $post_id,
            '_shipping_tab_content',
            wp_kses_post( $_POST['shipping_tab_content'] )
        );
    }

    // Save custom info tab content
    if ( isset( $_POST['custom_info_tab_content'] ) ) {
        update_post_meta(
            $post_id,
            '_custom_info_tab_content',
            wp_kses_post( $_POST['custom_info_tab_content'] )
        );
    }
}
add_action( 'save_post_product', 'save_product_tabs_meta' );

/**
 * Tab Content Display Callbacks
 */
function custom_specifications_tab_content() {
    global $post;
    $content = get_post_meta( $post->ID, '_specifications_tab_content', true );
    echo apply_filters( 'the_content', $content );
}

function custom_shipping_tab_content() {
    global $post;
    $content = get_post_meta( $post->ID, '_shipping_tab_content', true );
    echo apply_filters( 'the_content', $content );
}

function custom_info_tab_content() {
    global $post;
    $content = get_post_meta( $post->ID, '_custom_info_tab_content', true );
    echo apply_filters( 'the_content', $content );
}

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

// Enqueue scripts and styles
function modern_store_scripts() {
    wp_enqueue_style('modern-store-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_script('modern-store-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'modern_store_scripts');

// Register widget areas
function modern_store_widgets_init() {
    register_sidebar(array(
        'name'          => esc_html__('Sidebar', 'modern-store'),
        'id'            => 'sidebar-1',
        'description'   => esc_html__('Add widgets here.', 'modern-store'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>'
    ));
}
add_action('widgets_init', 'modern_store_widgets_init');
