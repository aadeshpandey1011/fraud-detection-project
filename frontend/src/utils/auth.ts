// src/utils/auth.ts

// const TOKEN_KEY = "access_token";

// export const saveToken = (token: string) => {
//   localStorage.setItem(TOKEN_KEY, token);
// };

// export const getToken = (): string | null => {
//   return localStorage.getItem(TOKEN_KEY);
// };

// export const removeToken = () => {
//   localStorage.removeItem(TOKEN_KEY);
// };

// export const isLoggedIn = (): boolean => {
//   return !!getToken();
// };



// const TOKEN_KEY = "access_token";

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};


export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
