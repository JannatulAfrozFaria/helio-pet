// DOM Elements
const addToCartBtn = document.querySelector('.add-button');
const drawer = document.getElementById('cart-drawer');
const overlay = document.getElementById('overlay');
const closeDrawerBtn = document.getElementById('close-drawer');
const checkoutButton = document.querySelector('.checkout-button');
const countDisplay = document.getElementById('drawer-count');
const actualPrice = document.getElementById('drawer-actual-price');
const comparePrice = document.getElementById('drawer-compare-price');
const totalPriceDisplay = document.getElementById('drawer-total-price');
const deleteButton = document.getElementById('delete-product');
const notification = document.querySelector('.notification');
const drawerContent = document.querySelector('.drawer-content');
const justifyEnd = document.querySelector('.justify-end');

// Main product elements
const mainComparePrice = document.querySelector('.flex-price .compare-price');
const mainActualPrice = document.querySelector('.flex-price .actual-price');
const mainNumberDisplay = document.querySelector('.number.large-screen');
const mainMobileNumber = document.querySelector('.mobile-buttons .number');

// Quantity controls
const mainMinusBtn = document.querySelector('.round-button.large-screen');
const mainPlusBtn = document.querySelectorAll('.round-button.large-screen')[1];
const mainMobileMinus = document.querySelector('.mobile-buttons .round-button');
const mainMobilePlus = document.querySelectorAll('.mobile-buttons .round-button')[1];

// Initial values
let count = 1;
const unitActualPrice = 249;
const unitComparePrice = 369;
let isCartEmpty = false;

// Update all displays with current quantity and prices
function updateAllDisplays() {
  // Update quantity displays
  countDisplay.textContent = count;
  mainNumberDisplay.textContent = count;
  mainMobileNumber.textContent = count;
  
  // Calculate prices
  const totalPrice = (unitActualPrice * count).toFixed(2);
  const totalComparePrice = (unitComparePrice * count).toFixed(2);
  
  // Update main product prices
  mainComparePrice.textContent = `$${totalComparePrice}`;
  mainActualPrice.textContent = `$${totalPrice}`;
  
  // Update drawer prices
  actualPrice.textContent = `$${totalPrice}`;
  comparePrice.textContent = `$${totalComparePrice}`;
  totalPriceDisplay.textContent = `$${totalPrice}`;
}

// Handle quantity changes
function handleQuantityChange(change) {
  const newCount = count + change;
  if (newCount >= 1) {
    count = newCount;
    updateAllDisplays();
  }
}

// Set up event listeners for quantity controls
mainMinusBtn.addEventListener('click', () => handleQuantityChange(-1));
mainPlusBtn.addEventListener('click', () => handleQuantityChange(1));
mainMobileMinus.addEventListener('click', () => handleQuantityChange(-1));
mainMobilePlus.addEventListener('click', () => handleQuantityChange(1));

// Drawer quantity controls
document.getElementById('drawer-plus').addEventListener('click', () => handleQuantityChange(1));
document.getElementById('drawer-minus').addEventListener('click', () => handleQuantityChange(-1));

// Delete product from cart
deleteButton.addEventListener('click', () => {
  drawerContent.style.display = 'none';
  justifyEnd.style.display = 'none';
  notification.textContent = 'Your cart is empty';
  notification.classList.add('empty-cart-message');
  isCartEmpty = true;
});

// Open drawer with current quantity
addToCartBtn.addEventListener('click', () => {
  if (isCartEmpty) {
    // Reset cart if it was empty
    drawerContent.style.display = 'flex';
    justifyEnd.style.display = 'block';
    notification.textContent = '🎉Your order is eligible standard free shipping.';
    notification.classList.remove('empty-cart-message');
    isCartEmpty = false;
  }
  
  drawer.classList.add('open');
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

// Close drawer function
function closeDrawer() {
  drawer.classList.remove('open');
  overlay.style.display = 'none';
  document.body.style.overflow = '';
}

// Close drawer when clicking X
closeDrawerBtn.addEventListener('click', closeDrawer);

// Close drawer when clicking checkout
checkoutButton.addEventListener('click', () => {
  closeDrawer();
  console.log('Proceeding to checkout with', count, 'items');
});

// Close drawer when clicking outside (on overlay)
overlay.addEventListener('click', closeDrawer);

// Initialize displays
updateAllDisplays();