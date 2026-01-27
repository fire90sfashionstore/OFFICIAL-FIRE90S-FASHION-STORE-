// JS for FIRE90S Fashion Store

// Shared Components Data
const components = {
    navbar: `
        <div class="container nav-content">
            <a href="index.html" class="logo">FIRE90S FASHION <span class="fire-text">STORE</span></a>
            <div class="mobile-menu-btn" onclick="toggleMenu()">☰</div>
            <div class="nav-links" id="navLinks">
                <a href="index.html">Home</a>
                <a href="shop.html">Shop</a>
                <div style="display: flex; gap: 20px; align-items: center;">
                    <a href="contact.html">Contact</a>
                    <div class="cart-icon-container" onclick="toggleCart()">
                        <span style="font-size: 1.2rem;">🛒</span>
                        <div class="cart-count" id="cartCount">0</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    footer: `
        <div class="container footer-content">
            <div class="footer-col">
                <a href="index.html" class="logo">FIRE90S FASHION <span class="fire-text">STORE</span></a>
                <p style="margin-top: 1rem; opacity: 0.7; max-width: 300px;">
                    Premium 90s inspired fashion. Wholesale & Print on Demand services available.
                </p>
            </div>
            <div class="footer-col">
                <h4>Shop</h4>
                <ul>
                    <li><a href="shop.html">All Products</a></li>
                    <li><a href="shop.html">New Arrivals</a></li>
                    <li><a href="shop.html">Best Sellers</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Support</h4>
                <ul>
                    <li><a href="contact.html">Contact Us</a></li>
                    <li><a href="#">Shipping</a></li>
                    <li><a href="#">Returns</a></li>
                </ul>
            </div>
        </div>
        <div class="copyright">
            &copy; 2026 FIRE90S FASHION STORE. All rights reserved.
        </div>
    `,
    cartSidebar: `
        <div class="cart-overlay" id="cartOverlay" onclick="toggleCart()"></div>
        <div class="cart-sidebar" id="cartSidebar">
            <div class="cart-header">
                <h3>Your Cart</h3>
                <div class="close-cart" onclick="toggleCart()">×</div>
            </div>
            <div class="cart-body" id="cartBody">
                <!-- Cart Items will be rendered here -->
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span id="cartTotal">$0.00</span>
                </div>
                <button class="btn" style="width: 100%;">Checkout</button>
            </div>
        </div>
    `
};

// Cart State
let cart = JSON.parse(localStorage.getItem('fire90s_cart')) || [];

// Render Components
function renderComponents() {
    const navContainer = document.getElementById('navbar');
    const footerContainer = document.getElementById('footer');

    if (navContainer) navContainer.innerHTML = components.navbar;
    if (footerContainer) footerContainer.innerHTML = components.footer;

    // Inject Cart Sidebar
    if (!document.getElementById('cartSidebar')) {
        document.body.insertAdjacentHTML('beforeend', components.cartSidebar);
    }

    // Set active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    updateCartUI();
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Cart Functions
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    renderCartContents();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('fire90s_cart', JSON.stringify(cart));
        updateCartUI();

        // Open sidebar to show added item
        const sidebar = document.getElementById('cartSidebar');
        if (!sidebar.classList.contains('active')) {
            toggleCart();
        } else {
            renderCartContents();
        }
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('fire90s_cart', JSON.stringify(cart));
    updateCartUI();
    renderCartContents();
}

function updateCartUI() {
    const count = document.getElementById('cartCount');
    if (count) count.innerText = cart.length;
}

function renderCartContents() {
    const cartBody = document.getElementById('cartBody');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartBody.innerHTML = '<p style="text-align: center; opacity: 0.6; margin-top: 50px;">Your cart is empty.</p>';
        cartTotal.innerText = '$0.00';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        // Parse price removing $ sign
        const priceVal = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        total += priceVal;

        html += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
                <div class="remove-item" onclick="removeFromCart(${index})">🗑️</div>
            </div>
        `;
    });

    cartBody.innerHTML = html;
    cartTotal.innerText = '$' + total.toFixed(2);
}

// Product Functions
function renderProducts(category = 'all') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    // Ensure products data is available
    if (typeof products === 'undefined') {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: red;">Error: Product data not loaded.</p>';
        return;
    }

    let filtered = products;
    if (category !== 'all') {
        filtered = products.filter(p => p.category === category);
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; opacity: 0.7;">No products found in this category.</p>';
        return;
    }

    let html = '';
    filtered.forEach(p => {
        html += `
            <div class="product-card" onclick="window.location.href='product-detail.html?id=${p.id}'" style="background: var(--color-glass); border: 1px solid var(--color-glass-border); border-radius: 15px; overflow: hidden; transition: 0.3s; cursor: pointer;">
                <div style="height: 300px; overflow: hidden; background: #222;">
                    <img src="${p.img}" style="width: 100%; height: 100%; object-fit: cover;" alt="${p.name}">
                </div>
                <div style="padding: 20px;">
                    <h3 style="font-size: 1.2rem; margin-bottom: 5px;">${p.name}</h3>
                    <p style="font-size: 0.8rem; opacity: 0.6; margin-bottom: 10px;">${p.category}</p>
                    <p style="color: var(--color-primary); font-weight: 700; font-size: 1.1rem; margin-bottom: 15px;">${p.price}</p>
                    <button class="btn" style="width: 100%; font-size: 0.9rem; padding: 10px; margin-bottom: 5px;" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
                    <button class="btn" style="width: 100%; font-size: 0.9rem; padding: 10px; background: transparent; border: 1px solid var(--color-primary);" onclick="window.location.href='product-detail.html?id=${p.id}'">View Details</button>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

function filterProducts(category) {
    // Update active button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.innerText === category || (category === 'all' && btn.innerText === 'All')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderProducts(category);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderComponents();

    // Render Home Sections if containers exist
    renderNewArrivals();
    renderBestSellers();

    // Check for category filter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
        // Decode URI component to handle spaces (e.g. %20)
        const category = decodeURIComponent(categoryParam);
        filterProducts(category);
    } else {
        renderProducts();
    }
});

function renderNewArrivals() {
    const container = document.getElementById('new-arrivals-container');
    if (!container) return; // Only on pages with this container

    // Simulating "New Arrivals": taking first 4 products
    const newArrivals = products.slice(0, 4);

    container.innerHTML = newArrivals.map(p => createProductCardHTML(p)).join('');
}

function renderBestSellers() {
    const container = document.getElementById('best-sellers-container');
    if (!container) return;

    // Simulating "Best Sellers": taking 4 random products (e.g. index 4-8)
    const bestSellers = products.slice(4, 8);

    container.innerHTML = bestSellers.map(p => createProductCardHTML(p)).join('');
}

function createProductCardHTML(p) {
    return `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${p.id}'" style="background: var(--color-glass); border: 1px solid var(--color-glass-border); border-radius: 15px; overflow: hidden; transition: 0.3s; cursor: pointer;">
            <div style="height: 300px; overflow: hidden; background: #222;">
                <img src="${p.img}" style="width: 100%; height: 100%; object-fit: cover;" alt="${p.name}">
            </div>
            <div style="padding: 20px;">
                <h3 style="font-size: 1.2rem; margin-bottom: 5px;">${p.name}</h3>
                <p style="font-size: 0.8rem; opacity: 0.6; margin-bottom: 10px;">${p.category}</p>
                <p style="color: var(--color-primary); font-weight: 700; font-size: 1.1rem; margin-bottom: 15px;">${p.price}</p>
                 ${p.price.includes('Contact') ? '' : `<button class="btn" style="width: 100%; font-size: 0.9rem; padding: 10px; margin-bottom: 5px;" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>`}
            </div>
        </div>
    `;
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        // Show modal after a short delay (simulating submission)
        setTimeout(() => {
            document.getElementById('confirmationModal').style.display = 'flex';
            contactForm.reset();
        }, 500);
    });
}


function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function scrollCollections(direction) {
    const container = document.getElementById('collectionCarousel');
    const scrollAmount = 320; // card width + gap

    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Share Modal Logic
function openShareModal() {
    // Check if modal exists
    let modal = document.getElementById("shareModal");
    if (!modal) {
        // Create modal
        const modalHtml = `
            <div id="shareModal" class="share-modal" onclick="closeShareModal(event)">
                <div class="share-content" onclick="event.stopPropagation()">
                    <h3 style="margin-bottom: 10px;">Share this Product</h3>
                    <p style="opacity: 0.7; margin-bottom: 20px;">Share with friends and family!</p>
                    <div class="share-options">
                        <button class="share-btn whatsapp" onclick="shareTo(\"whatsapp\")" title="WhatsApp"><span style="font-size: 1.5rem">??</span></button>
                        <button class="share-btn facebook" onclick="shareTo(\"facebook\")" title="Facebook"><span style="font-size: 1.5rem">??</span></button>
                        <button class="share-btn copy-link" onclick="copyProductLink()" title="Copy Link"><span style="font-size: 1.5rem">??</span></button>
                    </div>
                    <button class="btn" style="margin-top: 25px; padding: 10px 25px; background: transparent; border: 1px solid white;" onclick="closeShareModal(null)">Close</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", modalHtml);
        modal = document.getElementById("shareModal");
    }
    modal.style.display = "flex";
}

function closeShareModal(event) {
    // If event is provided (click outside), close. If null (button click), always close.
    if (!event || event.target.id === "shareModal") {
        const modal = document.getElementById("shareModal");
        if (modal) modal.style.display = "none";
    }
}

function shareTo(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this awesome product from FIRE90S FASHION STORE! ??");

    if (platform === "whatsapp") {
        window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
    } else if (platform === "facebook") {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    }
}

function copyProductLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Link copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

