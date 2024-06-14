import axios from 'axios';

const API_URL = 'http://your-backend-url.com/api'; // Back URL placehh

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
