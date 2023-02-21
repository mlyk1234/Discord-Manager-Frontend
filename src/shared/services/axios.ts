import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://test-api.securo.dev";

export const getJWT = async () => {
  const jwt = localStorage.getItem("access_token");
  return { headers: { "Authorization": `Bearer ${jwt}` } }
}

export default axios;