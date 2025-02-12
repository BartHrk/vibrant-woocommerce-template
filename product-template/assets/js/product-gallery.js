
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const mainImage = document.querySelector('.product-image-zoom');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const lightbox = document.getElementById('product-lightbox');
    const lightboxImage = document.querySelector('.lightbox-content img');
    let isZoomed = false;

    // Thumbnail click handlers
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const newSrc = this.querySelector('img').getAttribute('data-full-size');
            mainImage.src = newSrc;
            if (lightboxImage) {
                lightboxImage.src = newSrc;
            }
        });
    });

    // Zoom functionality
    if (mainImage) {
        mainImage.addEventListener('click', function(e) {
            isZoomed = !isZoomed;
            this.classList.toggle('zoomed');
            
            if (isZoomed) {
                updateZoomPosition(e);
            }
        });

        mainImage.addEventListener('mousemove', function(e) {
            if (isZoomed) {
                updateZoomPosition(e);
            }
        });

        mainImage.addEventListener('mouseleave', function() {
            isZoomed = false;
            this.classList.remove('zoomed');
        });
    }

    // Lightbox functionality
    const lightboxTrigger = document.querySelector('.lightbox-button');
    if (lightboxTrigger && lightbox) {
        lightboxTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            lightbox.classList.add('active');
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }

    // Helper function for zoom positioning
    function updateZoomPosition(e) {
        const rect = mainImage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mainImage.style.transformOrigin = `${x}% ${y}%`;
    }
});
