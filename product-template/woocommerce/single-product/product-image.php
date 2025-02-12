
<?php
/**
 * Single Product Image
 */

if (!defined('ABSPATH')) {
    exit;
}

global $product;

$columns           = apply_filters('woocommerce_product_thumbnails_columns', 4);
$post_thumbnail_id = $product->get_image_id();
$wrapper_classes   = apply_filters('woocommerce_single_product_image_gallery_classes', array(
    'woocommerce-product-gallery',
    'woocommerce-product-gallery--with-images',
    'images',
));
?>

<div class="product-gallery">
    <div class="main-image-wrapper">
        <?php
        if ($post_thumbnail_id) {
            $full_size_image = wp_get_attachment_image_src($post_thumbnail_id, 'full');
            $thumbnail = wp_get_attachment_image_src($post_thumbnail_id, 'shop_thumbnail');
            
            echo '<img src="' . esc_url($full_size_image[0]) . '" 
                      alt="' . esc_attr($product->get_name()) . '" 
                      class="product-image-zoom"
                      data-full-size="' . esc_url($full_size_image[0]) . '">';
            
            echo '<button class="lightbox-button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </button>';
        }
        ?>
    </div>

    <div class="gallery-thumbnails">
        <?php
        $attachment_ids = $product->get_gallery_image_ids();
        
        if ($post_thumbnail_id) {
            $html = wc_get_gallery_image_html($post_thumbnail_id, true);
            echo '<div class="thumbnail active">' . $html . '</div>';
        }

        if ($attachment_ids && $product->get_image_id()) {
            foreach ($attachment_ids as $attachment_id) {
                $full_size_image = wp_get_attachment_image_src($attachment_id, 'full');
                echo '<div class="thumbnail">';
                echo wp_get_attachment_image($attachment_id, 'shop_thumbnail', false, array(
                    'data-full-size' => $full_size_image[0]
                ));
                echo '</div>';
            }
        }
        ?>
    </div>

    <div id="product-lightbox">
        <div class="lightbox-content">
            <?php
            if ($post_thumbnail_id) {
                echo wp_get_attachment_image($post_thumbnail_id, 'full');
            }
            ?>
        </div>
    </div>
</div>
