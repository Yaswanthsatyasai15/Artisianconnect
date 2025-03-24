document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from local storage or database
    loadCartItemsForCheckout();
    
    // Set up form validation and navigation between checkout steps
    setupCheckoutForm();
  });
  
  function loadCartItemsForCheckout() {
    showLoading();
    
    // Get cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('artisanConnectCart')) || [];
    
    if (cartItems.length === 0) {
      // If cart is empty, redirect to cart page
      alert('Your cart is empty. Please add items before checking out.');
      window.location.href = 'cart.html';
      return;
    }
    
    // Display cart items in checkout
    displayCheckoutItems(cartItems);
    
    // Calculate and display totals
    updateCheckoutTotals(cartItems);
    
    hideLoading();
  }
  
  function displayCheckoutItems(cartItems) {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    
    checkoutItemsContainer.innerHTML = cartItems.map(item => `
      <div class="checkout-item">
        <div class="item-details">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h3>${item.name}</h3>
            <p>By ${item.artisan}</p>
          </div>
        </div>
        <div class="item-price">$${item.price.toFixed(2)}</div>
        <div class="item-quantity">x ${item.quantity}</div>
        <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
  }
  
  function updateCheckoutTotals(cartItems) {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${subtotal.toFixed(2)}`; // Simplified for example
  }
  
  function setupCheckoutForm() {
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    const confirmationScreen = document.getElementById('confirmation-screen');
    const backToShippingButton = document.getElementById('back-to-shipping');
    const continueShoppingButton = document.getElementById('continue-shopping');
    
    // Navigate to payment form when shipping form is submitted
    shippingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate shipping form
      if (validateShippingForm()) {
        shippingForm.style.display = 'none';
        paymentForm.style.display = 'block';
        
        // Update active step
        document.querySelector('.checkout-steps .step:nth-child(1)').classList.remove('active');
        document.querySelector('.checkout-steps .step:nth-child(2)').classList.add('active');
      }
    });
    
    // Navigate back to shipping form
    backToShippingButton.addEventListener('click', function() {
      paymentForm.style.display = 'none';
      shippingForm.style.display = 'block';
      
      // Update active step
      document.querySelector('.checkout-steps .step:nth-child(2)').classList.remove('active');
      document.querySelector('.checkout-steps .step:nth-child(1)').classList.add('active');
    });
    
    // Complete order when payment form is submitted
    paymentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate payment form
      if (validatePaymentForm()) {
        // Process payment and complete order
        completeOrder();
      }
    });
    
    // Continue shopping after confirmation
    continueShoppingButton.addEventListener('click', function() {
      // Clear cart and redirect to home page
      clearCart();
      window.location.href = 'index.html';
    });
  }
  
  function completeOrder() {
    // Show loading indicator
    showLoading();
    
    // In a real application, this would process the payment and save the order
    
    // For this example, we'll simulate a successful payment
    setTimeout(() => {
      // Hide payment form and show confirmation
      document.getElementById('payment-form').style.display = 'none';
      document.getElementById('confirmation-screen').style.display = 'block';
      
      // Update active step
      document.querySelector('.checkout-steps .step:nth-child(2)').classList.remove('active');
      document.querySelector('.checkout-steps .step:nth-child(3)').classList.add('active');
      
      // Clear cart
      clearCart();
      
      hideLoading();
    }, 1500);
  }
  
  function clearCart() {
    localStorage.removeItem('artisanConnectCart');
    document.getElementById('cart-count').textContent = '0';
  }
  
  function validateShippingForm() {
    const fullname = document.getElementById('fullname').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const zipcode = document.getElementById('zipcode').value.trim();
    
    if (fullname === '' || address === '' || city === '' || state === '' || zipcode === '') {
      alert('Please fill in all required shipping information.');
      return false;
    }
    
    return true;
  }
  
  function validatePaymentForm() {
    const cardnumber = document.getElementById('cardnumber').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    
    if (cardnumber === '' || expiry === '' || cvv === '') {
      alert('Please fill in all required payment information.');
      return false;
    }
    
    return true;
  }
  
  function showLoading() {
    document.querySelector('main').innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Processing your order...</p>
      </div>
    `;
  }
  
  function hideLoading() {
    // Reload the page content to remove loading spinner
    window.location.reload();
  }