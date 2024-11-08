import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import AboutRahu from "./AboutRahu";
import { toast } from "react-toastify";

const Rahu = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(null);
  const [brahmamuhurata, setBrahmamuhurata] = useState({ start: "", end: "" });
  const [pratahsandhya, setPratahsandhya] = useState({ start: "", end: "" });
  const [madhyasandhya, setMadhyasandhya] = useState({ start: "", end: "" });
  const [sayahnasandhya, setSayahnasandhya] = useState({ start: "", end: "" });
  const [rahukaal, setRahukaal] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(true);
  const [checkRahuLoader, setCheckRahuLoader] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      await axios
        .get("http://localhost:8080/personalInfo", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Response data:", response.data);
          setUserData(response.data.currentUser);
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 403) {
            navigate("/login");
            localStorage.removeItem("token");
          }
        });

      setLoading(false);
    };
    fetchData();
  }, [token]);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logout Successfully!");
    navigate("/login");
  };
  const checkRahu = async () => {
    setCheckRahuLoader(true);
    await axios.get("https://api.rahukaal.info/check").then((response) => {
      console.log(response.data);

      setBrahmamuhurata(response.data.panchang.brahmamuhurata);
      setPratahsandhya(response.data.panchang.pratahsandhya);
      setMadhyasandhya(response.data.panchang.madhyasandhya);
      setSayahnasandhya(response.data.panchang.sayahnasandhya);
      setRahukaal(response.data.panchang.rahukaal);
    });
    setCheckRahuLoader(false);
  };
  const date = new Date();

  return (
    <div className=" bg-gradient-to-br from-rose-50 via-amber-100 to-rose-300  w-full h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center  ">
          <Triangle />
        </div>
      ) : (
        <div>
          <div className="">
            <p className="text-center text-3xl font-bold mb-10 text-yellow-800">
              Welcome back{" "}
              {userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}
            </p>
          </div>
          <div className="bg-[url('/src/images/rahuBg.jpeg')] bg-cover  bg-center bg-no-repeat w-full    max-w-[1000px] m-3 border border-black rounded-xl">
            <div className=" flex justify-evenly p-[10px] w-full max-w-[630px]   ml-auto my-[20px] ">
              <div className=" bg-amber-100 w-full  max-w-[400px] flex flex-col border border-black rounded-xl space-y-2 p-2 mx-auto ">
                <h1 className="text-center font-bold text-yellow-800">Today</h1>
                <p className="text-center text-yellow-800">
                  {date.toDateString()}
                </p>
                <h1 className="text-center font-bold text-yellow-800">
                  Brahmamuhurata
                </h1>
                <p className="text-center text-yellow-800">
                  {brahmamuhurata.start}-{brahmamuhurata.end}
                </p>
                <h1 className="text-center font-bold text-yellow-800">
                  Pratahsandhya
                </h1>
                <p className="text-center text-yellow-800">
                  {pratahsandhya.start}-{pratahsandhya.end}
                </p>

                <h1 className="text-center font-bold text-yellow-800">
                  Madhyasandhya
                </h1>
                <p className="text-center text-yellow-800">
                  {madhyasandhya.start}-{madhyasandhya.end}
                </p>
                <h1 className="text-center font-bold text-yellow-800">
                  Sayahnasandhya
                </h1>
                <p className="text-center text-yellow-800">
                  {sayahnasandhya.start}-{sayahnasandhya.end}
                </p>
                <h1 className="text-center font-bold text-yellow-800">
                  RahuKaal
                </h1>
                <p className="text-center text-yellow-800">
                  {rahukaal.start}-{rahukaal.end}
                </p>
                <a
                  className="text-center font-semibold  text-2xl cursor-pointer text-yellow-800"
                  onClick={() => navigate("/aboutrahu")}
                >
                  About RahuKaal {">>"}
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full max-w-[500px] mx-auto">
            <button
              className=" bg-yellow-800 p-2 rounded-xl m-3 font-medium  hover:bg-yellow-600 ease-in duration-400 text-white "
              onClick={checkRahu}
            >
              Check
            </button>
            {checkRahuLoader && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                <Triangle />
              </div>
            )}
            <div className="h-[2px] border border-gray-300  "></div>
            <button
              className=" bg-yellow-800 p-2 rounded-xl m-3 font-medium hover:bg-yellow-600 ease-in duration-400 text-white"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rahu;
