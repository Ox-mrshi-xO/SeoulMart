const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  modeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const cartBtn = document.getElementById('cartBtn');
const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCart');
const checkoutBtn = document.getElementById('checkout');

let cart = [];

cartBtn.addEventListener('click', () => {
  cartPanel.classList.add('show');
});

closeCart.addEventListener('click', () => {
  cartPanel.classList.remove('show');
});

document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.closest('.product-card');
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    const existing = cart.find(item => item.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, price, qty: 1 });
    updateCart();

    showAddedMessage(btn);
  });
});

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} (₱${item.price}) 
      <div>
        <button onclick="changeQty(${index}, -1)">−</button>
        ${item.qty}
        <button onclick="changeQty(${index}, 1)">+</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: ₱${total}`;
}

window.changeQty = function (index, amount) {
  cart[index].qty += amount;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCart();
};

clearCartBtn.addEventListener('click', () => {
  cart = [];
  updateCart();
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert('Thank you for shopping at SeoulMart!');
    cart = [];
    updateCart();
    cartPanel.classList.remove('show');
  }
});

function showAddedMessage(button) {
  let msg = document.createElement('span');
  msg.textContent = 'Added to cart!';
  msg.className = 'added-msg';
  button.after(msg);

  setTimeout(() => {
    msg.remove();
  }, 2000);
}

const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  formMsg.textContent = 'Thank you for your message!';
  contactForm.reset();
  setTimeout(() => (formMsg.textContent = ''), 3000);
});
