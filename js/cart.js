document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from local storage or database
    loadCartItems();
    
    // Set up event listeners
    setupCartUI();
  });
  
  function loadCartItems() {
    showLoading();
    
    // In a real application, this would fetch cart items from the database
    // For this example, we'll use mock data stored in localStorage
    
    // Check if there are saved cart items in localStorage
    let cartItems = JSON.parse(localStorage.getItem('artisanConnectCart')) || [];
    
    if (cartItems.length === 0) {
      hideCartItems();
      showEmptyCart();
    } else {
      showCartItems(cartItems);
      updateCartSummary(cartItems);
      showCartSummary();
    }
    
    hideLoading();
  }
  
  function showCartItems(cartItems) {
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = cartItems.map(item => `
      <div class="cart-item">
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="item-details">
          <h3 class="item-name">${item.name}</h3>
          <p class="item-artisan">By ${item.artisan}</p>
          <p class="item-price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="item-quantity">
          <button class="quantity-btn minus" data-id="${item.id}">-</button>
          <span class="quantity" data-id="${item.id}">${item.quantity}</span>
          <button class="quantity-btn plus" data-id="${item.id}">+</button>
        </div>
        <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
        <button class="btn-remove" data-id="${item.id}">Remove</button>
      </div>
    `).join('');
    
    document.getElementById('cart-items-list').style.display = 'block';
    document.getElementById('empty-cart').style.display = 'none';
  }
  
  function showEmptyCart() {
    document.getElementById('cart-items-list').style.display = 'none';
    document.getElementById('empty-cart').style.display = 'block';
  }
  
  function updateCartSummary(cartItems) {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`; // Simplified for example
    
    // Update cart count in header
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
  }
  
  function setupCartUI() {
    // Set up quantity buttons
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('quantity-btn')) {
        const itemId = e.target.dataset.id;
        const isPlus = e.target.classList.contains('plus');
        
        updateItemQuantity(itemId, isPlus);
      }
      
      if (e.target.classList.contains('btn-remove')) {
        const itemId = e.target.dataset.id;
        removeItemFromCart(itemId);
      }
    });
    
    // Set up checkout button
    document.getElementById('checkout-button').addEventListener('click', function() {
      proceedToCheckout();
    });
  }
  
  function updateItemQuantity(itemId, isPlus) {
    // Get current cart items
    let cartItems = JSON.parse(localStorage.getItem('artisanConnectCart')) || [];
    
    // Find item in cart
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    // Update quantity
    if (isPlus) {
      cartItems[itemIndex].quantity++;
    } else {
      if (cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
      } else {
        // If quantity reaches 1 and it's a minus click, remove the item
        cartItems.splice(itemIndex, 1);
      }
    }
    
    // Save updated cart
    localStorage.setItem('artisanConnectCart', JSON.stringify(cartItems));
    
    // Reload cart display
    loadCartItems();
  }
  
  function removeItemFromCart(itemId) {
    // Get current cart items
    let cartItems = JSON.parse(localStorage.getItem('artisanConnectCart')) || [];
    
    // Filter out the item to remove
    cartItems = cartItems.filter(item => item.id !== itemId);
    
    // Save updated cart
    localStorage.setItem('artisanConnectCart', JSON.stringify(cartItems));
    
    // Reload cart display
    loadCartItems();
  }
  
  function proceedToCheckout() {
    // In a real application, this would navigate to the checkout page
    // with cart items
    
    // For this example, we'll just show a message
    const cartItems = JSON.parse(localStorage.getItem('artisanConnectCart')) || [];
    
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }
    
    window.location.href = 'checkout.html';
  }
  
  function showLoading() {
    document.querySelector('main').innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading cart...</p>
      </div>
    `;
  }
  
  function hideLoading() {
    // Reload the page content to remove loading spinner
    window.location.reload();
  }
  
  function showCartSummary() {
    document.querySelector('.cart-summary').style.display = 'block';
  }
  
  function hideCartSummary() {
    document.querySelector('.cart-summary').style.display = 'none';
  }