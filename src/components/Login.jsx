import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  axios.defaults.withCredentials = false;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", loginValues)
      .then((res) => {
        if (res.data.message === "Success") {
          const { token, userInfo } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("role", userInfo.role);

          if (userInfo.role === "Admin") {
            navigate("/users");
            toast.info("You are logged in as an Admin");
          } else {
            navigate("/rahu");
            toast.info("You are logged in as an User");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 500) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      });
  };
  const backToForm = () => {
    navigate("/");
  };
  return (
    <div>
      <form class="max-w-md mx-auto mt-[50px]  " onSubmit={handleSubmit}>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
            onChange={(e) =>
              setLoginValues({ ...loginValues, email: e.target.value })
            }
          />
          <label
            for="email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) =>
              setLoginValues({ ...loginValues, password: e.target.value })
            }
            required
          />
          <label
            for="password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={backToForm}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
          >
            Back
          </button>
          <button
            type="submit"
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
