import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Form = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = false;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/register", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          toast.success("Account created successfully!");
          navigate("/login");
        }
      })

      .catch((err) => {
        console.log(err);
        if (err.response.status === 409) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong!");
        }
      });
  };
  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="">
      <form class="max-w-md mx-auto mt-[50px] " onSubmit={handleSubmit}>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="name"
            name="name"
            id="name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Full Name "
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            required
          />
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
        </div>
        <div class=" w-full mb-5 group">
          <input
            name="role"
            id="role"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Admin/User"
            onChange={(e) => setValues({ ...values, role: e.target.value })}
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={navigateToLogin}
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
