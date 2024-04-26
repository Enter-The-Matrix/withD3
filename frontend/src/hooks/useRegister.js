import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useRegister() {
  const [loading, setLoading] = useState(false);
  const {setAuthUser}= useAuthContext()
  const register = async ({ username, password, email }) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      const result = await res.data;
      console.log("aaaa:", result);
      setLoading(false);
      const localStorageData = {
        username: result.username,
        userID: result.userID,
      };
      
      localStorage.setItem("user", JSON.stringify(localStorageData));
      setAuthUser(localStorageData)
      toast.success(res.data.message);

    } catch (error) {
      console.log("naaa", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
}

export default useRegister;
