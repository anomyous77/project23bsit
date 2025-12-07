// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Show home page by default
    showPage('home');
    
    // Initialize all functionality
    initNavigation();
    initSearch();
    initForms();
    initScrollTop();
    initAccessibility();
    
    // Load initial content
    loadPopularClasses();
    loadAllClasses();
    initMap();
});

// Requirement 11: Page Navigation and Scrolling
function initNavigation() {
    // Handle navigation clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('.nav-link') || e.target.matches('.page-link')) {
            e.preventDefault();
            const page = e.target.getAttribute('data-page');
            if (page) {
                showPage(page);
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(nav => {
                    nav.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        }
    });
}

function showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Requirement 3: Search Bar Functionality
function initSearch() {
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.addEventListener('focus', function() {
            this.style.width = '100%';
        });
        
        searchBar.addEventListener('blur', function() {
            if (!this.value) {
                this.style.width = '50px';
            }
        });
        
        searchBar.addEventListener('input', function() {
            // Implement search functionality
            performSearch(this.value);
        });
    }
}

function performSearch(query) {
    if (query.length > 2) {
        console.log('Searching for:', query);
        // In a real application, this would make an API call
    }
}

// Requirement 11: Scroll to Top Functionality
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Requirement 9: Map Initialization
function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Simple map placeholder - in real implementation, use Google Maps or Leaflet
        mapElement.innerHTML = `
            <div style="width:100%;height:100%;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);display:flex;align-items:center;justify-content:center;color:white;font-weight:600;">
                <div class="text-center">
                    <i class="fas fa-map-marker-alt fa-3x mb-3"></i>
                    <p>WorldGym Fitness Location</p>
                    <p>123 Fitness Street, Sports City</p>
                </div>
            </div>
        `;
    }
}

// Requirement 8: Accessibility Features
function initAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.id = 'main-content';
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            const searchBar = document.querySelector('.search-bar');
            if (searchBar && document.activeElement === searchBar) {
                searchBar.blur();
            }
        }
    });
}

// Requirement 13: Text Limit Functionality
function initForms() {
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    
    if (messageInput && charCount) {
        messageInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;
            
            if (currentLength > 1000) {
                charCount.style.color = 'var(--primary-color)';
            } else {
                charCount.style.color = '#777';
            }
        });
    }
}

// Requirement 12: Image Hover Enhancement
function enhanceImageHover() {
    // Match your actual classes: service-img, trainer-img
    const images = document.querySelectorAll('.service-img img, .trainer-img img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Call this after loading dynamic content
setTimeout(enhanceImageHover, 1000);
