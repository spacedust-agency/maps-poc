import { api } from '../../api-service/axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  password: string;
}

// const getUserProfile = async () => {
//     const url = BASE_API + '/user'
//     const accessToken = localStorage.getItem('accessToken')
//     return axios.get(url, { headers : { Authorization: `Bearer ${accessToken}`}})
// }

const requestOtp = async (phoneNumber: string) => {
  const url = '/verify/requestotp';
  const resp = await api.post(url, { phoneNumber });
  return resp.data;
};

const verifyOtp = async (code: string, sessionId: string) => {
  const url = '/verify/verifyotp';
  const resp = await api.post(url, { code, sessionId });
  return resp.data;
};

const requestEmailVerification = async (email: string) => {
  const url = '/verify/email/create';
  const resp = await api.post(url, { email });
  return resp.data;
};

const verifyEmail = async (token: string) => {
  const url = '/verify/email';
  const resp = await api.post(url, { token });
  return resp.data;
};

const resetEmailCreate = async (email: string) => {
  const url = '/verify/reset/create';
  const resp = await api.post(url, { email });
  return resp.data;
};

const verifyReset = async (token: string) => {
  const url = '/verify/reset';
  const resp = await api.post(url, { token });
  return resp.data;
};

const resetPassword = async (token: string, password: string) => {
  const url = '/reset';
  const resp = await api.post(url, { token, password });
  return resp.data;
};

const login = async (payload: LoginPayload) => {
  return api.post('/login', payload);
};

const register = async (payload: SignupPayload) => {
  return api.post('/signup', payload);
};

const logout = async () => {
  localStorage.clear();
};

export { login, logout, register, requestOtp, verifyOtp, requestEmailVerification, verifyEmail, resetEmailCreate, verifyReset, resetPassword };
