// script.js

// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load product details if we are on product.html
document.addEventListener('DOMContentLoaded', function() {
    const productId = getUrlParameter('id');
    if (productId) {
        // We are on product.html
        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(p => p.id === productId);
                if (product) {
                    displayProduct(product);
                    setupQuantityCalculator(product.price);
                } else {
                    document.getElementById('product-detail').innerHTML = '<p>Product not found.</p>';
                }
            });
    }
});

// Display product details on product.html
function displayProduct(product) {
    const container = document.getElementById('product-detail');
    container.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
    `;

    // Set hidden product field
    document.getElementById('hiddenProduct').value = product.name;
    // Initial price update
    updateHiddenPrice(product.price, 1);
}

// Setup quantity input and total calculation
function setupQuantityCalculator(pricePerUnit) {
    const quantityInput = document.getElementById('quantity');
    const totalSpan = document.getElementById('totalPrice');
    const hiddenPrice = document.getElementById('hiddenPrice');
    const hiddenQuantity = document.getElementById('hiddenQuantity');

    function updateTotal() {
        const qty = parseInt(quantityInput.value) || 1;
        const total = pricePerUnit * qty;
        totalSpan.textContent = total.toFixed(2);
        hiddenPrice.value = total.toFixed(2);
        hiddenQuantity.value = qty;
    }

    quantityInput.addEventListener('input', updateTotal);
    updateTotal(); // initial call
}

// Helper to update hidden price (used initially)
function updateHiddenPrice(price, qty) {
    const total = price * qty;
    document.getElementById('hiddenPrice').value = total.toFixed(2);
    document.getElementById('hiddenQuantity').value = qty;
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}