document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.closest('.product');

      const productData = {
        id: product.getAttribute('data-id'),
        name: product.getAttribute('data-name'),
        price: parseFloat(product.getAttribute('data-price')),
        image: product.getAttribute('data-image'),
        quantity: 1
      };

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existing = cart.find(item => item.name === productData.name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(productData);
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      // Optional: toast message
      const toast = document.createElement('div');
      toast.textContent = `${productData.name} added to cart`;
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
      setTimeout(() => toast.remove(), 2000);
    });
  });
});
