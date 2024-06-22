import axios from 'axios';

const API_BASE_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth
export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (username, password, role) => {
  const response = await api.post('/auth/register', { username, password, role });
  return response.data;
};

export const getUserRole = async (token) => {
  setAuthToken(token);
  try {
    const response = await api.get('/auth');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user role:', error);
    throw error;
  }
};

// Items
export const createItem = async (item, token) => {
  setAuthToken(token);
  const response = await api.post('/item', item);
  return response.data;
};

export const updateItem = async (id, item, token) => {
  setAuthToken(token);
  const response = await api.put(`/item/${id}`, item);
  return response.data;
};

export const deleteItem = async (id, token) => {
  setAuthToken(token);
  const response = await api.delete(`/item/${id}`);
  return response.data;
};

export const getItem = async (id) => {
  const response = await api.get(`/item/${id}`);
  return response.data;
};

export const getItems = async (limit, lastKey) => {
  const response = await api.get('/items', {
    params: { limit, lastKey },
  });
  return response.data;
};

// Cart
export const addItemToCart = async (itemId, userId, token) => {
  setAuthToken(token);
  const response = await api.post('/cart', { itemId, userId });
  return response.data;
};

export const removeItemFromCart = async (itemId, userId, token) => {
  setAuthToken(token);
  const response = await api.delete('/cart', { data: { itemId, userId } });
  return response.data;
};

export const getUserCart = async (userId, token) => {
  setAuthToken(token);
  const response = await api.get(`/cart/${userId}`);
  return response.data;
};

export const purchaseCart = async (userId, token) => {
  setAuthToken(token);
  const response = await api.post('/buy', { userId });
  return response.data;
};
