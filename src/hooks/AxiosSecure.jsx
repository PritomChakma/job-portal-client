import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const axiosInstance = axios.create({
  baseURL: "https://job-portal-server-zeta-two.vercel.app",
  withCredentials: true,
});

const AxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("Error Caught in intrtceptor", error);

        if (error.status === 401 || error.status === 402) {
          console.log("Need to be Logout User");
          signOutUser()
            .then(() => {
              console.log("Logged Out The User");
              navigate("/signIn");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosInstance;
};

export default AxiosSecure;
