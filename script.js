/* --- Homepage --- */
document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('heroVideo');

    if (videoContainer && video) {
        video.muted = true; 
        video.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });

        videoContainer.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
});


/* --- CART  --- */

const cartHTML = `
<div class="cart-sidebar" id="cartSidebar">
    <div class="cart-header">
        <h3>Your Shakes</h3>
        <span style="font-size:2rem; cursor:pointer;" onclick="toggleCart()">&times;</span>
    </div>
    <div class="cart-items" id="cartItemsContainer">
        <div style="text-align:center; padding:20px; color:#777;">Your cart is empty 🥤</div>
    </div>
    <div class="cart-footer">
        <div class="price-row" style="margin-bottom:20px;">
            <span>Total:</span>
            <strong id="cartTotal">Rs. 0</strong>
        </div>
        <button class="btn primary-btn" style="width:100%" onclick="showCheckoutPopup()">Checkout</button>
    </div>
</div>
`;

const popupHTML = `
<div class="modal-overlay" id="checkoutModal">
    <div class="modal-content" style="border: 4px solid var(--secondary); background: #FFF9E6;">
        <span class="close-modal" onclick="closeCheckoutPopup()">&times;</span>
        <span style="font-size: 4rem; display: block; margin-bottom: 10px;">🏪</span>
        <h3 style="font-family: var(--font-heading); color: var(--primary); font-size: 2rem; margin-bottom: 10px;">Whoops!</h3>
        <p style="font-size: 1.2rem; margin-bottom: 20px;">Online ordering is currently cooling off.</p>
        <p><strong>Come visit us at Colombo 07</strong> for the freshest experience!</p>
        <button class="btn primary-btn" onclick="closeCheckoutPopup()">Got it!</button>
    </div>
</div>
`;

// Inject HTML
const cartPlaceholder = document.getElementById('cart-placeholder');
const popupPlaceholder = document.getElementById('checkout-modal-placeholder');
if(cartPlaceholder) cartPlaceholder.innerHTML = cartHTML;
if(popupPlaceholder) popupPlaceholder.innerHTML = popupHTML;

// Cart Logic
let cart = JSON.parse(localStorage.getItem('mm_cart')) || [];
updateCartUI();

function addToCart(title, price, img) {
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ title, price, img, qty: 1 });
    }
    saveCart();
    updateCartUI();
    toggleCart();
}

function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('mm_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const countSpan = document.getElementById('cart-count');
    const totalSpan = document.getElementById('cartTotal');
    
    if(!container) return;

    container.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:20px; color:#777;">Your cart is empty 🥤</div>';
    } else {
        cart.forEach(item => {
            total += item.price * item.qty;
            count += item.qty;
            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.title}">
                    <div style="flex:1;">
                        <h4 style="font-family: var(--font-heading);">${item.title}</h4>
                        <p>Rs. ${item.price} x ${item.qty}</p>
                    </div>
                    <div class="remove-item" onclick="removeFromCart('${item.title}')"><i class="fas fa-trash"></i></div>
                </div>`;
        });
    }
    if(countSpan) countSpan.innerText = count;
    if(totalSpan) totalSpan.innerText = 'Rs. ' + total;
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    if(sidebar) sidebar.classList.toggle('open');
}

function showCheckoutPopup() {
    document.getElementById('checkoutModal').style.display = 'flex';
    toggleCart();
}

function closeCheckoutPopup() {
    document.getElementById('checkoutModal').style.display = 'none';

}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburgerIcon = document.querySelector('.hamburger i');
    
    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
    } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
}
