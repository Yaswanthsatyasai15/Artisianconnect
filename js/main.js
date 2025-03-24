// Main JavaScript for ArtisanConnect
document.addEventListener('DOMContentLoaded', function() {
    // Load featured artisans
    loadFeaturedArtisans();
    
    // Add event listeners for navigation
    setupNavigation();
});

function loadFeaturedArtisans() {
    const artisanCardsContainer = document.querySelector('.artisan-cards');
    
    // In a real application, this data would come from a database
    const featuredArtisans = [
        {
            id: 1,
            name: "Maria Rodriguez",
            location: "Mexico City, MX",
            profilePicture: "img/artisan1.jpg",
            products: 42
        },
        {
            id: 2,
            name: "Ahmed Ali",
            location: "Cairo, EG",
            profilePicture: "img/artisan2.jpg",
            products: 28
        },
        {
            id: 3,
            name: "Sophie Dupont",
            location: "Paris, FR",
            profilePicture: "img/artisan3.jpg",
            products: 35
        },
        {
            id: 4,
            name: "Lena Schmidt",
            location: "Berlin, DE",
            profilePicture: "img/artisan4.jpg",
            products: 51
        }
    ];
    
    featuredArtisans.forEach(artisan => {
        const artisanCard = document.createElement('div');
        artisanCard.className = 'artisan-card';
        
        artisanCard.innerHTML = `
            <img src="${artisan.profilePicture}" alt="${artisan.name}">
            <div class="artisan-info">
                <h3>${artisan.name}</h3>
                <p>${artisan.location}</p>
                <p>${artisan.products} products</p>
            </div>
        `;
        
        artisanCardsContainer.appendChild(artisanCard);
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href');
            navigateTo(targetPage);
        });
    });
}

function navigateTo(page) {
    // This would typically load the requested page
    // For this static example, we're just logging the navigation
    console.log(`Navigating to: ${page}`);
}