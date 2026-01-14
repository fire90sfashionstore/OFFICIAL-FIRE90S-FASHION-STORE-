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
                <a href="contact.html">Contact</a>
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
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Data
const products = [
    // Custom Streetwear Edition
    { id: 1, name: "Vintage Oversized Tee", category: "Custom Streetwear Edition", price: "$29.99", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, name: "90s Cargo Pants", category: "Custom Streetwear Edition", price: "$54.99", img: "https://images.unsplash.com/photo-1549419137-b6f2f293b827?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, name: "Fire Print Hoodie", category: "Custom Streetwear Edition", price: "$65.00", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop" },
    { id: 14, name: "Graffiti Denim Jacket", category: "Custom Streetwear Edition", price: "$89.99", img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop" },
    { id: 15, name: "Retro Tracksuit Bottoms", category: "Custom Streetwear Edition", price: "$45.00", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" },

    // DARE2DREAM TEE
    { id: 7, name: "Dare2Dream Graphic Tee", category: "DARE2DREAM TEE", price: "$34.99", img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1bc9?q=80&w=1000&auto=format&fit=crop" },
    { id: 8, name: "Dreamer Signature Tee", category: "DARE2DREAM TEE", price: "$39.99", img: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1000&auto=format&fit=crop" },
    { id: 16, name: "Limitless Vision Tee", category: "DARE2DREAM TEE", price: "$32.99", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop" },
    { id: 17, name: "Night Sky Dream Tee", category: "DARE2DREAM TEE", price: "$36.99", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop" },

    // Custom Wholesale Dress
    { id: 9, name: "Bulk Order Floral Dress", category: "Custom Wholesale Dress", price: "Contact for Quote", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop" },
    { id: 10, name: "Summer Midi Collection", category: "Custom Wholesale Dress", price: "Contact for Quote", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop" },
    { id: 18, name: "Elegant Evening Gowns (x50)", category: "Custom Wholesale Dress", price: "Contact for Quote", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop" },
    { id: 19, name: "Casual Day Dresses (x100)", category: "Custom Wholesale Dress", price: "Contact for Quote", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop" },

    // Gift Accessories
    { id: 5, name: "Urban Street Cap", category: "Gift Accessories", price: "$24.99", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop" },
    { id: 11, name: "Retro Sunglasses", category: "Gift Accessories", price: "$19.99", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop" },
    { id: 20, name: "Chain Necklace Silver", category: "Gift Accessories", price: "$14.99", img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop" },
    { id: 21, name: "90s Belt Bag", category: "Gift Accessories", price: "$22.99", img: "https://images.unsplash.com/photo-1545648600-0937c569ee09?q=80&w=1000&auto=format&fit=crop" },

    // Machineries (Print on Demand Equipment)
    { id: 12, name: "Heat Press Pro X", category: "Machineries", price: "$299.99", img: "https://images.unsplash.com/photo-1563823251950-8919fac63ad3?q=80&w=1000&auto=format&fit=crop" },
    { id: 13, name: "Embroidery Unit 3000", category: "Machineries", price: "$1200.00", img: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=1000&auto=format&fit=crop" },
    { id: 22, name: "Digital Textile Printer", category: "Machineries", price: "$4500.00", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop" }
];

// Product Functions
function renderProducts(category = 'all') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

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
            <div class="product-card" style="background: var(--color-glass); border: 1px solid var(--color-glass-border); border-radius: 15px; overflow: hidden; transition: 0.3s;">
                <div style="height: 300px; overflow: hidden; background: #222;">
                    <img src="${p.img}" style="width: 100%; height: 100%; object-fit: cover;" alt="${p.name}">
                </div>
                <div style="padding: 20px;">
                    <h3 style="font-size: 1.2rem; margin-bottom: 5px;">${p.name}</h3>
                    <p style="font-size: 0.8rem; opacity: 0.6; margin-bottom: 10px;">${p.category}</p>
                    <p style="color: var(--color-primary); font-weight: 700; font-size: 1.1rem; margin-bottom: 15px;">${p.price}</p>
                    <button class="btn" style="width: 100%; font-size: 0.9rem; padding: 10px;">Add to Cart</button>
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
    renderProducts();

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
});

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}
