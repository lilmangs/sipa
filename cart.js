document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.querySelector('.cart-container');
  const cartSummary = document.querySelector('.cart-summary');

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#333';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = 9999;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }

  function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is currently empty.</p>';
      cartSummary.innerHTML = '<p>Total: ₱0.00</p>';
      return;
    }

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemEl = document.createElement('div');
      itemEl.classList.add('cart-item');
      itemEl.innerHTML = `
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>Price: ₱${item.price.toFixed(2)}</p>
          <p>
            Quantity:
            <input type="number" min="1" value="${item.quantity}" class="qty-input" data-index="${index}">
          </p>
          <p>Subtotal: ₱${itemTotal.toFixed(2)}</p>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;
      cartContainer.appendChild(itemEl);
    });

    cartSummary.innerHTML = `
      <p>Total: ₱${total.toFixed(2)}</p>
      <button class="checkout-btn">Proceed to Checkout</button>
      <button class="clear-cart-btn" style=" margin-top: 10px;
  background-color:rgb(245, 75, 75);
  border: none;
  color: white;
  padding: 12px 60px;
  border-radius: 7px;
  cursor: pointer;">Clear Cart</button>
    `;

    // Quantity input handler
    document.querySelectorAll('.qty-input').forEach(input => {
      input.addEventListener('input', e => {
        const i = e.target.dataset.index;
        const val = parseInt(e.target.value);
        if (val >= 1) {
          cart[i].quantity = val;
          localStorage.setItem('cart', JSON.stringify(cart));
          renderCart();
        }
      });
    });

    // Remove button handler
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = btn.dataset.index;
        const removedItem = cart[i];
        cart.splice(i, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        showToast(`${removedItem.name} removed from cart`);
        renderCart();
      });
    });

    // Clear cart handler
    document.querySelector('.clear-cart-btn')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear the entire cart?')) {
        localStorage.removeItem('cart');
        showToast('Cart cleared');
        renderCart();
      }
    });

    // Checkout button (placeholder action)
    document.querySelector('.checkout-btn')?.addEventListener('click', () => {
      alert('Proceeding to checkout...');
    });
  }

  renderCart();
});
