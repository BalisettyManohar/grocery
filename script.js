

// Product data with detailed information
const products = [
    {
        id: 1,
        name: 'Organic Bananas',
        price: 2.99,
        oldPrice: 3.99,
        category: 'fruits',
        image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=800',
        description: 'Sweet and creamy organic bananas, perfect for snacking or baking. Rich in potassium and naturally energizing. Sourced from certified organic farms.',
        nutrition: {
            calories: '89 kcal',
            protein: '1.1g',
            carbs: '22.8g',
            fiber: '2.6g'
        }
    },
    {
        id: 2,
        name: 'Fresh Avocados',
        price: 4.99,
        oldPrice: 6.49,
        category: 'fruits',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=800',
        description: 'Creamy and nutritious Hass avocados. Perfect for guacamole, sandwiches, or as a healthy addition to any meal. Rich in healthy fats and vitamins.',
        nutrition: {
            calories: '160 kcal',
            protein: '2g',
            carbs: '8.5g',
            fiber: '6.7g'
        }
    },
    {
        id: 3,
        name: 'Organic Milk',
        price: 3.49,
        oldPrice: 4.29,
        category: 'dairy',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800',
        description: 'Fresh organic whole milk from grass-fed cows. No artificial hormones or antibiotics. Rich in calcium and vitamin D for strong bones.',
        nutrition: {
            calories: '146 kcal',
            protein: '8g',
            carbs: '12g',
            calcium: '28% DV'
        }
    },
    {
        id: 4,
        name: 'Sourdough Bread',
        price: 5.99,
        oldPrice: 7.49,
        category: 'bakery',
        image: 'https://images.unsplash.com/photo-1555951015-6da899b5c2cd?auto=format&fit=crop&q=80&w=800',
        description: 'Artisanal sourdough bread made with organic flour and our century-old starter. Naturally fermented for better digestion and authentic taste.',
        nutrition: {
            calories: '120 kcal',
            protein: '4g',
            carbs: '23g',
            fiber: '1.2g'
        }
    },
    {
        id: 5,
        name: 'Fresh Spinach',
        price: 2.49,
        oldPrice: 2.99,
        category: 'vegetables',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800',
        description: 'Tender, organic baby spinach leaves. Packed with iron and vitamins. Perfect for salads, smoothies, or cooking.',
        nutrition: {
            calories: '23 kcal',
            protein: '2.9g',
            carbs: '3.6g',
            iron: '15% DV'
        }
    }
];

let cart = [];
let currentCategory = 'all';


const productGrid = document.getElementById('productGrid');
const productDetails = document.getElementById('productDetails');
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const categoryButtons = document.querySelectorAll('.category-btn');


function initStore() {
    renderProducts();
    setupEventListeners();
}

// Calculate discount percentage
function calculateDiscount(oldPrice, newPrice) {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
}

// Render products based on current category
function renderProducts() {
    const filteredProducts = currentCategory === 'all'
        ? products
        : products.filter(product => product.category === currentCategory);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    <span class="old-price">$${product.oldPrice.toFixed(2)}</span>
                    <span class="discount-badge">-${calculateDiscount(product.oldPrice, product.price)}%</span>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id}); event.stopPropagation();">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Show product details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const discount = calculateDiscount(product.oldPrice, product.price);
    
    productGrid.classList.add('hidden');
    productDetails.classList.remove('hidden');
    
    productDetails.querySelector('.product-details-content').innerHTML = `
        <div class="product-details-grid">
            <div class="product-details-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-details-image">
            </div>
            <div class="product-details-info">
                <span class="product-details-category">${product.category}</span>
                <h1>${product.name}</h1>
                <div class="product-details-price">
                    $${product.price.toFixed(2)}
                    <span class="old-price">$${product.oldPrice.toFixed(2)}</span>
                    <span class="discount-badge">-${discount}%</span>
                </div>
                <p class="product-details-description">${product.description}</p>
                
                <div class="product-details-nutrition">
                    <h3>Nutrition Facts</h3>
                    <div class="nutrition-grid">
                        ${Object.entries(product.nutrition).map(([key, value]) => `
                            <div class="nutrition-item">
                                <span class="nutrition-label">${key.replace('_', ' ')}</span>
                                <span class="nutrition-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="features-grid">
                    <div class="feature-item">
                        <div class="feature-icon"></div>
                        <p>Free Delivery</p>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon"></div>
                        <p>Same Day Delivery</p>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon"></div>
                        <p>Quality Guaranteed</p>
                    </div>
                </div>

                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}


function showProductGrid() {
    productGrid.classList.remove('hidden');
    productDetails.classList.add('hidden');
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    cartModal.classList.add('open');
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }
    updateCart();
}

// Toggle cart modal
function toggleCart() {
    cartModal.classList.toggle('open');
}

// Setup event listeners
function setupEventListeners() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            renderProducts();
        });
    });
}

document.addEventListener('DOMContentLoaded', initStore);