import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from './api';

// const initialState = {

//   products: [],
//   checkedBrands: [],
//   checkedCategorys: [],
// };

// export const orebiSlice = createSlice({
//   name: "orebi",
//   initialState,
//   reducers: {
//     setUserInfo: (state, action) => {
//       state.userInfo = action.payload;
//     },
//     addToCart: (state, action) => {
//       const item = state.products.find(
//         (item) => item._id === action.payload._id
//       );
//       if (item) {
//         item.quantity += action.payload.quantity;
//       } else {
//         state.products.push(action.payload);
//       }
//       toast.success("Produto adicionado ao carrinho");
//     },
//     increaseQuantity: (state, action) => {
//       const item = state.products.find(
//         (item) => item._id === action.payload._id
//       );
//       if (item) {
//         item.quantity++;
//       }
//     },
//     decreaseQuantity: (state, action) => {
//       const item = state.products.find(
//         (item) => item._id === action.payload._id
//       );
//       if (item.quantity === 1) {
//         item.quantity = 1;
//       } else {
//         item.quantity--;
//       }
//     },
//     deleteItem: (state, action) => {
//       state.products = state.products.filter(
//         (item) => item._id !== action.payload
//       );
//       toast.error("Produto removido do carrinho");
//     },
//     resetCart: (state) => {
//       state.products = [];
//     },
//     toggleBrand: (state, action) => {
//       const brand = action.payload;
//       const isBrandChecked = state.checkedBrands.some(
//         (b) => b._id === brand._id
//       );
//       if (isBrandChecked) {
//         state.checkedBrands = state.checkedBrands.filter(
//           (b) => b._id !== brand._id
//         );
//       } else {
//         state.checkedBrands.push(brand);
//       }
//     },
//     toggleCategory: (state, action) => {
//       const category = action.payload;
//       const isCategoryChecked = state.checkedCategorys.some(
//         (b) => b._id === category._id
//       );
//       if (isCategoryChecked) {
//         state.checkedCategorys = state.checkedCategorys.filter(
//           (b) => b._id !== category._id
//         );
//       } else {
//         state.checkedCategorys.push(category);
//       }
//     },

//   },
// });

const login = async (email, password) => {
  try {
    const response = await api.post('auth/login', { email, password });

    // Captura o token do corpo da resposta e salva no localStorage
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
};

const register = async (user) => {
  try {
    const response = await api.post('auth/register', user);
    return response.data;
  } catch (error) {
    console.error('Erro ao realizar registro:', error); // Corrigido para registro
    throw error;
  }
};

const getProfile = async (idUser) => {
  try {
    const response = await api.get(`auth/profile/${idUser}`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error('Erro ao realizar registro:', error); // Corrigido para registro
    throw error;
  }
}

const updateProfile = async (idUser, user) => {
  try {
    const response = await api.put(`auth/profile/${idUser}`, user);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error('Erro ao realizar registro:', error); // Corrigido para registro
    throw error;
  }
}

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// export const {
//   setUserInfo,
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
//   deleteItem,
//   resetCart,
//   toggleBrand,
//   toggleCategory,
// } = orebiSlice.actions;

// export default orebiSlice.reducer;


export default { login, logout, register, getCurrentUser, getProfile, updateProfile};
