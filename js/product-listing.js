document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupSearch();
    updateCartCount();
  });
  
  function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    // In a real application, this data would come from a database
    const products = [
      {
        id: 1,
        name: "Handmade Ceramic Bowl",
        description: "Beautifully crafted ceramic bowl for your dining table.",
        price: 45.99,
        image: "img/products/ceramic-bowl.jpg",
        artisan: "Maria Rodriguez"
      },
      {
        id: 2,
        name: "Wooden Carving Elephant",
        description: "Hand-carved elephant figurine made from sustainable wood.",
        price: 65.00,
        image: "img/products/wooden-elephant.jpg",
        artisan: "Lena Schmidt"
      },
      {
        id: 3,
        name: "Embroidered Tablecloth",
        description: "Traditional embroidered tablecloth with floral patterns.",
        price: 89.99,
        image: "img/products/tablecloth.jpg",
        artisan: "Maria Rodriguez"
      },
      {
        id: 4,
        name: "Silver Necklace",
        description: "Handmade silver necklace with unique design.",
        price: 125.00,
        image: "img/products/necklace.jpg",
        artisan: "Sophie Dupont"
      },
      {
        id: 5,
        name: "Hand-painted Canvas",
        description: "Original artwork on canvas by local artist.",
        price: 199.99,
        image: "img/products/canvas-art.jpg",
        artisan: "Ahmed Ali"
      },
      {
        id: 6,
        name: "Woven Basket",
        description: "Traditional woven basket made from natural materials.",
        price: 35.50,
        image: "img/products/woven-basket.jpg",
        artisan: "Maria Rodriguez"
      }
    ];
    
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.dataset.id = product.id;
      
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <p class="product-artisan">By ${product.artisan}</p>
          <button class="btn" data-id="${product.id}">Add to Cart</button>
          <a href="product-details.html?id=${product.id}" class="btn btn-outline">View Details</a>
        </div>
      `;
      
      productGrid.appendChild(productCard);
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.product-card .btn').forEach(button => {
      button.addEventListener('click', function() {
        const productId = parseInt(this.dataset.id);
        const product = products.find(p => p.id === productId);
        
        if (product) {
          addToCart(product);
        }
      });
    });
  }
  
  function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    searchButton.addEventListener('click', function() {
      performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch(this.value);
      }
    });
  }
  
  function performSearch(query) {
    if (query.trim() === '') return;
    
    console.log(`Searching for: ${query}`);
    
    // In a real application, this would filter products or make an API call
    // For this example, we'll just log the search
  }
  
  function addToCart(product) {
    // Get current cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('artisanConnectCart')) || [];
    
    // Check if product is already in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // If product exists, increment quantity
      cartItems[existingItemIndex].quantity++;
    } else {
      // If product doesn't exist, add it to cart
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        artisan: product.artisan,
        quantity: 1
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('artisanConnectCart', JSON.stringify(cartItems));
    
    // Update cart count in header
    updateCartCount();
    
    // Show success message
    showSuccess('Product added to cart!');
  }
  
  function updateCartCount() {
    // Calculate total items in cart
    const cartItems = JSON.parse(localStorage.getItem('artisanConnectCart')) || [];
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart count in header
    document.getElementById('cart-count').textContent = totalItems;
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