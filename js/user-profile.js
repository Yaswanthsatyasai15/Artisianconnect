document.addEventListener('DOMContentLoaded', function() {
    // Load user profile data
    loadUserProfile();
    
    // Set up edit profile functionality
    setupProfileEditing();
    
    // Load user's listings
    loadUserListings();
});

function loadUserProfile() {
    // In a real application, this data would come from a database
    const userData = {
        id: 123,
        name: "Maria Rodriguez",
        email: "maria@example.com",
        role: "artisan",
        profilePicture: "img/profile.jpg",
        socialMedia: {
            facebook: "https://facebook.com/maria.artisan",
            instagram: "https://instagram.com/maria.artisan",
            twitter: "https://twitter.com/maria.artisan"
        },
        productCount: 42,
        saleCount: 187,
        reviewCount: 145
    };
    
    // Update UI with user data
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-role').textContent = userData.role.charAt(0).toUpperCase() + userData.role.slice(1);
    document.getElementById('profile-picture').src = userData.profilePicture;
    document.getElementById('product-count').textContent = userData.productCount;
    document.getElementById('sale-count').textContent = userData.saleCount;
    document.getElementById('review-count').textContent = userData.reviewCount;
    
    // Update social media links
    const socialLinksContainer = document.querySelector('.social-links');
    socialLinksContainer.innerHTML = `
        <a href="${userData.socialMedia.facebook}" class="social-icon">Facebook</a>
        <a href="${userData.socialMedia.instagram}" class="social-icon">Instagram</a>
        <a href="${userData.socialMedia.twitter}" class="social-icon">Twitter</a>
    `;
}

function setupProfileEditing() {
    const editProfileButton = document.getElementById('edit-profile-btn');
    const manageListingsButton = document.getElementById('manage-listings-btn');
    
    editProfileButton.addEventListener('click', function() {
        // In a real application, this would open an edit profile form
        // For this example, we'll just log the action
        console.log('Edit profile clicked');
        alert('Profile editing functionality would be displayed here.');
    });
    
    manageListingsButton.addEventListener('click', function() {
        // In a real application, this would navigate to the listings management page
        // For this example, we'll just log the action
        console.log('Manage listings clicked');
        alert('Listings management page would be displayed here.');
    });
}

function loadUserListings() {
    const listingsContainer = document.querySelector('.listings-container');
    
    // In a real application, this data would come from a database
    const userProducts = [
        {
            id: 1,
            name: "Handmade Ceramic Bowl",
            description: "Beautifully crafted ceramic bowl for your dining table.",
            price: 45.99,
            image: "img/product1.jpg",
            rating: 4.8
        },
        {
            id: 3,
            name: "Embroidered Tablecloth",
            description: "Traditional embroidered tablecloth with floral patterns.",
            price: 89.99,
            image: "img/product3.jpg",
            rating: 4.6
        },
        {
            id: 6,
            name: "Woven Basket",
            description: "Traditional woven basket made from natural materials.",
            price: 35.50,
            image: "img/product6.jpg",
            rating: 4.7
        }
    ];
    
    userProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <div class="product-rating">
                    ★★★★★ ${product.rating.toFixed(1)}
                </div>
                <div class="product-actions">
                    <button class="edit-listing" data-product-id="${product.id}">Edit</button>
                    <button class="delete-listing" data-product-id="${product.id}">Delete</button>
                </div>
            </div>
        `;
        
        listingsContainer.appendChild(productCard);
    });
    
    // Add event listeners to product action buttons
    document.querySelectorAll('.edit-listing').forEach(button => {
        button.addEventListener('click', function() {
            editListing(this.dataset.productId);
        });
    });
    
    document.querySelectorAll('.delete-listing').forEach(button => {
        button.addEventListener('click', function() {
            deleteListing(this.dataset.productId);
        });
    });
}

function editListing(productId) {
    console.log(`Editing product ${productId}`);
    alert(`Edit form for product ${productId} would be displayed here.`);
}

function deleteListing(productId) {
    if (confirm(`Are you sure you want to delete product ${productId}?`)) {
        console.log(`Deleting product ${productId}`);
        alert(`Product ${productId} has been deleted.`);
    }
}