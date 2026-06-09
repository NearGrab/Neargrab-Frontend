import apiClient from '../../../shared/services/apiClient';

export const authService = {
  async login({ email, password }) {
    const { data } = await apiClient.post('/api/v1/auth/login', { email, password });
    return data;
  },

  async signup(payload) {
    const { data } = await apiClient.post('/api/v1/auth/signup', payload);
    return data;
  },

  async googleLogin(payload) {
    const { data } = await apiClient.post('/api/v1/auth/google', payload);
    return data;
  },

  async requestOtp(payload) {
    const { data } = await apiClient.post('/api/v1/auth/otp/request', payload);
    return data;
  },

  async verifyOtp(payload) {
    const { data } = await apiClient.post('/api/v1/auth/otp/verify', payload);
    return data;
  },

  async refresh(refreshToken) {
    const { data } = await apiClient.post('/api/v1/auth/refresh', { refreshToken });
    return data;
  },

  async logout() {
    const { data } = await apiClient.post('/api/v1/auth/logout');
    return data;
  },

  async logoutAll() {
    const { data } = await apiClient.post('/api/v1/auth/logout-all');
    return data;
  },

  async getMe() {
    const { data } = await apiClient.get('/api/v1/me');
    return data;
  }
};
