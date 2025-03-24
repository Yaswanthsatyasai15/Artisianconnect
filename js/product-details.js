document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
      showError('Product not found');
      return;
    }
    
    // Load product details
    loadProductDetails(productId);
    
    // Set up event listeners
    setupThumbnailClicks();
    setupAddToCart();
    setupBuyNow();
    setupReviewSubmission();
  });
  
  function loadProductDetails(productId) {
    showLoading();
    
    // In a real application, this would fetch data from the database
    // For this example, we'll use mock data
    
    // Mock product data
    const product = {
      id: productId,
      name: "Handmade Ceramic Bowl",
      description: "This beautiful ceramic bowl is handcrafted by skilled artisans using traditional techniques. Perfect for serving or as a decorative piece, it brings a touch of elegance to any dining table. Each bowl is unique, with subtle variations in glaze and form that showcase the artisan's craftsmanship.",
      price: 45.99,
      mainImage: "img/products/ceramic-bowl-main.jpg",
      images: [
        "img/products/ceramic-bowl-1.jpg",
        "img/products/ceramic-bowl-2.jpg",
        "img/products/ceramic-bowl-3.jpg"
      ],
      category: "Tableware",
      availability: "In Stock",
      rating: 4.8,
      reviewsCount: 24,
      artisan: {
        id: 1,
        name: "Maria Rodriguez",
        profileUrl: "artisan-profile.html?id=1"
      }
    };
    
    // Update UI with product data
    document.getElementById('main-product-image').src = product.mainImage;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description').innerHTML = `<p>${product.description}</p>`;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-availability').textContent = product.availability;
    document.getElementById('rating-count').textContent = `(${product.reviewsCount})`;
    
    // Update artisan link
    const artisanLink = document.getElementById('product-artisan').querySelector('a');
    artisanLink.textContent = product.artisan.name;
    artisanLink.href = product.artisan.profileUrl;
    
    // Load thumbnails
    loadThumbnails(product.images);
    
    // Load reviews
    loadReviews(productId);
    
    // Load related products
    loadRelatedProducts(productId, product.category);
    
    // Hide loading indicator
    hideLoading();
  }
  
  function loadThumbnails(images) {
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    
    images.forEach((image, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
      thumbnail.dataset.image = image;
      
      thumbnail.innerHTML = `<img src="${image}" alt="Product thumbnail">`;
      
      thumbnail.addEventListener('click', function() {
        setActiveThumbnail(this);
        document.getElementById('main-product-image').src = this.dataset.image;
      });
      
      thumbnailContainer.appendChild(thumbnail);
    });
  }
  
  function setActiveThumbnail(thumbnail) {
    document.querySelectorAll('.thumbnail').forEach(thumb => {
      thumb.classList.remove('active');
    });
    
    thumbnail.classList.add('active');
  }
  
  function setupThumbnailClicks() {
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        setActiveThumbnail(this);
        document.getElementById('main-product-image').src = this.dataset.image;
      });
    });
  }
  
  function setupAddToCart() {
    const addToCartButton = document.getElementById('add-to-cart');
    const quantityInput = document.getElementById('quantity');
    
    addToCartButton.addEventListener('click', function() {
      const quantity = parseInt(quantityInput.value) || 1;
      
      if (quantity <= 0) {
        showError('Please enter a valid quantity');
        return;
      }
      
      const productId = new URLSearchParams(window.location.search).get('id');
      
      if (!productId) {
        showError('Product not found');
        return;
      }
      
      addToCart(productId, quantity);
    });
  }
  
  function setupBuyNow() {
    const buyNowButton = document.getElementById('buy-now');
    
    buyNowButton.addEventListener('click', function() {
      const quantityInput = document.getElementById('quantity');
      const quantity = parseInt(quantityInput.value) || 1;
      
      if (quantity <= 0) {
        showError('Please enter a valid quantity');
        return;
      }
      
      const productId = new URLSearchParams(window.location.search).get('id');
      
      if (!productId) {
        showError('Product not found');
        return;
      }
      
      buyNow(productId, quantity);
    });
  }
  
  function addToCart(productId, quantity) {
    // In a real application, this would add the product to the shopping cart
    // and update the cart count in the UI
    
    console.log(`Adding product ${productId} with quantity ${quantity} to cart`);
    
    // Update cart count
    const currentCount = parseInt(document.getElementById('cart-count').textContent) || 0;
    document.getElementById('cart-count').textContent = currentCount + quantity;
    
    showSuccess('Product added to cart!');
  }
  
  function buyNow(productId, quantity) {
    // In a real application, this would navigate to the checkout page
    // with the selected product and quantity
    
    console.log(`Buying product ${productId} with quantity ${quantity}`);
    
    // For this example, we'll just show a message
    showSuccess('Redirecting to checkout...');
    
    // In a real application, you would redirect to the checkout page
    // with the product and quantity as parameters
    // setTimeout(() => {
    //   window.location.href = `checkout.html?product=${productId}&quantity=${quantity}`;
    // }, 1500);
  }
  
  function loadReviews(productId) {
    const reviewsContainer = document.querySelector('.reviews-container');
    
    // In a real application, this would fetch reviews from the database
    // For this example, we'll use mock data
    
    // Mock reviews data
    const reviews = [
      {
        id: 1,
        rating: 5,
        text: "Absolutely love this bowl! The craftsmanship is amazing and it's even more beautiful in person. Highly recommend this artisan.",
        user: "Sarah Johnson",
        date: "2023-05-15"
      },
      {
        id: 2,
        rating: 4,
        text: "Great quality and beautiful design. The shipping was faster than expected. Will definitely purchase from this artisan again.",
        user: "Michael Chen",
        date: "2023-05-10"
      },
      {
        id: 3,
        rating: 5,
        text: "This bowl is a perfect addition to my dining table. The color and glaze are stunning. The artisan was also very responsive when I had a question.",
        user: "Emily Rodriguez",
        date: "2023-05-05"
      }
    ];
    
    if (reviews.length === 0) {
      reviewsContainer.innerHTML = '<p class="no-reviews">No reviews yet for this product.</p>';
      return;
    }
    
    reviewsContainer.innerHTML = reviews.map(review => `
      <div class="review-card">
        <div class="review-header">
          <h4>${review.user}</h4>
          <div class="review-rating">★★★★★</div>
        </div>
        <p class="review-text">${review.text}</p>
        <p class="review-date">${formatDate(review.date)}</p>
      </div>
    `).join('');
  }
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  function setupReviewSubmission() {
    const submitReviewButton = document.getElementById('submit-review');
    const reviewText = document.getElementById('review-text');
    
    submitReviewButton.addEventListener('click', function() {
      const ratingInputs = document.querySelectorAll('input[name="rating"]');
      let selectedRating = null;
      
      ratingInputs.forEach(input => {
        if (input.checked) {
          selectedRating = input.value;
        }
      });
      
      if (!selectedRating) {
        showError('Please select a rating');
        return;
      }
      
      if (!reviewText.value.trim()) {
        showError('Please write a review');
        return;
      }
      
      submitReview(selectedRating, reviewText.value);
    });
  }
  
  function submitReview(rating, text) {
    // In a real application, this would submit the review to the server
    
    console.log(`Submitting review with rating ${rating} and text: ${text}`);
    
    showSuccess('Thank you for your review!');
    
    // Clear the form
    document.querySelectorAll('input[name="rating"]').forEach(input => {
      input.checked = false;
    });
    
    document.getElementById('review-text').value = '';
  }
  
  function loadRelatedProducts(productId, category) {
    const relatedProductsContainer = document.querySelector('.product-grid');
    
    // In a real application, this would fetch related products from the database
    // For this example, we'll use mock data
    
    // Mock related products data
    const relatedProducts = [
      {
        id: 101,
        name: "Handmade Ceramic Mug",
        price: 24.99,
        image: "img/products/ceramic-mug.jpg",
        category: "Tableware"
      },
      {
        id: 102,
        name: "Ceramic Serving Platter",
        price: 69.99,
        image: "img/products/ceramic-platter.jpg",
        category: "Tableware"
      },
      {
        id: 103,
        name: "Set of 4 Ceramic Bowls",
        price: 159.99,
        image: "img/products/ceramic-bowl-set.jpg",
        category: "Tableware"
      }
    ];
    
    relatedProductsContainer.innerHTML = relatedProducts.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <a href="product-details.html?id=${product.id}" class="btn btn-outline">View Details</a>
        </div>
      </div>
    `).join('');
  }
  
  function showLoading() {
    document.querySelector('main').innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    `;
  }
  
  function hideLoading() {
    // Reload the page content to remove loading spinner
    window.location.reload();
  }
  
  function showError(message) {
    document.querySelector('main').innerHTML = `
      <div class="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>${message}</p>
        <a href="product-listing.html" class="btn">Back to Products</a>
      </div>
    `;
  }
  
  function showSuccess(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }