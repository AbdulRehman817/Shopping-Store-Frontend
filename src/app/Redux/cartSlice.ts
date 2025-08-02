import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Product and CartItem types
export interface Product {
  _id: string;
  name: string;
  price: number;
  [key: string]: any; // For other product fields
}

export interface CartItem extends Product {
  quantity: number;
}

// Redux state type
interface CartState {
  cart: CartItem[];
  items: Product[];
  totalQuantity: number;
  totalPrice: number;
  searchTerm: string;
  filteredProducts: Product[];
}

// Fetch products from API
export const fetchProducts = createAsyncThunk<Product[]>(
  "cart/fetchProducts",
  async () => {
    const response = await fetch(
      `https://chosen-millie-abdulrehmankashif-fdcd41d5.koyeb.app/api/v1/getProduct`
    );
    const data = await response.json();
    return data.products; // Assuming API returns { products: [...] }
  }
);

const initialState: CartState = {
  cart: [],
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  searchTerm: "",
  filteredProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingItem >= 0) {
        state.cart[existingItem].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
    getCartTotal: (state) => {
      const { totalPrice, totalQuantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const itemTotal = cartItem.price * cartItem.quantity;
          cartTotal.totalQuantity += cartItem.quantity;
          cartTotal.totalPrice += itemTotal;
          return cartTotal;
        },
        {
          totalQuantity: 0,
          totalPrice: 0,
        }
      );
      state.totalQuantity = totalQuantity;
      state.totalPrice = parseInt(totalPrice.toFixed(2));
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    increaseItemQuantity: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decreaseItemQuantity: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0 && state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredProducts = state.items.filter((product) =>
        product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    restoreCart: (state) => {
      state.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        state.filteredProducts = state.searchTerm
          ? state.items.filter((product) =>
              product.name
                .toLowerCase()
                .includes(state.searchTerm.toLowerCase())
            )
          : state.items;
      }
    );
  },
});

export const {
  setSearchTerm,
  restoreCart,
  setCart,
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  addToCart,
  getCartTotal,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
