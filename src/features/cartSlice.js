import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultValue = {
  cartItems: [],
  numItemsCart: 0,
  cartTotal: 0,
  orderTotal: 0,
};

const getDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultValue;
};

const cartSlice = createSlice({
  name: "cart",
  // mengambil data yang disimpan di local storage, jika data tidak ada maka akan menggunakan nilai default
  initialState: getDataFromLocalStorage(),
  reducers: {
    // fungsi untuk menambahkan barang ke keranjang
    addItem: (state, action) => {
      // mengambil data dari action.payload, di mana data tersebut berisi informasi produk yang akan ditambahkan
      const { product } = action.payload;

      // mencari item di dalam state.cartItems berdasarkan id yang sama dengan product.cartId
      const item = state.cartItems.find(
        (item) => item.cartId === product.cartId
      );

      // jika item sudah ada di dalam keranjang, maka akan menambahkan jumlah produk
      if (item) {
        item.amount += product.amount;
      } else {
        // jika item belum ada, maka akan menambahkan item baru ke dalam state.cartItems
        state.cartItems.push(product);
      }

      // menghitung jumlah produk di dalam state.numItemsCart dan state.cartTotal
      state.numItemsCart += product.amount;
      state.cartTotal += product.price * product.amount;
      state.orderTotal = state.cartTotal;

      // menyimpan state ke dalam local storage
      localStorage.setItem("cart", JSON.stringify(state));
      // menampilkan toast yang berisi pesan
      toast.success("Produk ditambahkan ke keranjang");
    },
  },
});


export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;