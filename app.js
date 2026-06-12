// Mock product database
const products = [
    { id: 1, name: "Baguio Broccoli", price: 180 },
    { id: 2, name: "Fresh Strawberries", price: 250 },
    { id: 3, name: "Wombok (Chinese Cabbage)", price: 90 }
];

let cart = [];

// Render products to the page
function renderProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        productList.innerHTML += `
            <div class="card">
                <h3>${product.name}</h3>
                <p>₱${product.price} / kg</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

// Handle cart logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        cartItems.innerHTML += `<li>${item.name} - ₱${item.price} <button onclick="removeFromCart(${index})" style="padding:2px 5px; background:red;">X</button></li>`;
        total += item.price;
    });

    cartTotal.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Automate the order submission
async function processCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const orderData = {
        orderDate: new Date().toISOString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0)
    };

    console.log("Preparing to send order:", orderData);

    // TODO: Replace with your chosen endpoint (e.g., Firebase Firestore addDoc or Web3Forms fetch request)
    alert("Order automated and sent successfully! Your friend will receive the details.");
    
    // Clear cart after successful order
    cart = [];
    updateCartUI();
}

// Initialize
renderProducts();
