import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useLogout() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/auth/logout");

      setLoading(false);
      localStorage.removeItem("user");
      setAuthUser(null);
      toast.success(res.data.message);

    } catch (error) {
      console.log("naaa", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
}

export default useLogout;
