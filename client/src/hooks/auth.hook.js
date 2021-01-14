import { useState, useCallback, useEffect } from 'react';

const STORAGENAME = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  
  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(STORAGENAME, JSON.stringify({
      userId: id,
      token: jwtToken,
    }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(STORAGENAME);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGENAME));

    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
}