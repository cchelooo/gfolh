import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: [],

  // Agregar producto al carrito
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Incrementa la cantidad si ya está en el carrito
        return {
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }

      // Si no está en el carrito, se agrega con cantidad 1
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  // Quitar producto del carrito
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  // Vaciar carrito
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
