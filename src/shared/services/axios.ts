import { useState } from 'react';
import axios from "axios";
import backendUrl from "../constant";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://test-api.securo.dev";

export const getJWT = () => {
  const jwt = localStorage.getItem("access_token");
  return { headers: { "Authorization": `Bearer ${jwt}` } }
}

export const useVerifyJWT = () => {
  const [isErrorJWT, setIsErrorJWT] = useState(false);
  const [isSuccessJWT, setIsSuccessJWT] = useState(false);
  const verifyJWT = async () => {
    try {
      const result = await axios.get(`${backendUrl}/auth/verify-jwt`, {
        ...getJWT()
      });
      console.log('Verification:', result)
      setIsSuccessJWT(true);
    } catch (error) {
      setIsErrorJWT(true);
      throw error
    }
  }

  return {
    verifyJWT,
    isErrorJWT,
    isSuccessJWT
  }
}

export default axios;