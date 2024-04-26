import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser} = useAuthContext()

  const login = async ({ username, password }) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", {
        username: username,
        password: password,
      });

      const result = await res.data;
      console.log(res);
      setLoading(false);

      const localStorageData = {
        username: result.username,
        userID: result.userID,
      };
      
      localStorage.setItem("user", JSON.stringify(localStorageData));
      setAuthUser(localStorageData)
      toast.success(result.message);

    } catch (error) {
      console.log("naaa", error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}

export default useLogin;
