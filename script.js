// JS for FIRE90S Fashion Store

// Shared Components Data
const components = {
    navbar: `
        <div class="container nav-content">
            <a href="index.html" class="logo">FIRE90S <span class="fire-text">STORE</span></a>
            <div class="mobile-menu-btn" onclick="toggleMenu()">☰</div>
            <div class="nav-links" id="navLinks">
                <a href="index.html">Home</a>
                <a href="shop.html">Shop</a>
                <a href="contact.html">Contact</a>
            </div>
        </div>
    `,
    footer: `
        <div class="container footer-content">
            <div class="footer-col">
                <a href="index.html" class="logo">FIRE90S <span class="fire-text">STORE</span></a>
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
    `
};

// Render Components
function renderComponents() {
    const navContainer = document.getElementById('navbar');
    const footerContainer = document.getElementById('footer');

    if (navContainer) navContainer.innerHTML = components.navbar;
    if (footerContainer) footerContainer.innerHTML = components.footer;

    // Set active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Initialize
document.addEventListener('DOMContentLoaded', renderComponents);
