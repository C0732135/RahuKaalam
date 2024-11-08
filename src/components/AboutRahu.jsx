import React from "react";
import { useNavigate } from "react-router-dom";

const AboutRahu = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-rose-50 via-amber-100 to-rose-300 px-4 sm:px-6 lg:px-8   ">
        <div className="flex flex-col md:flex-row shadow-2xl w-full max-w-[700px] mx-auto p-4 bg-white">
          <img
            className=" w-full md:w-1/2 mb-4 md:mb-0 md:mr-3"
            src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Rahu_graha.JPG"
            alt=""
          />
          <div className="bg-gray-400 w-full md:w-[2px] h-[2px] md:h-auto my-4 md:my-0 "></div>
          <div className="flex justify-center items-center mt-4 md:mt-0 md:ml-3">
            <p className="text-center text-yellow-800">
              In Hindu astrology, rāhukāla (Sanskrit: राहुकाल, lit. 'period of
              Rahu') or rāhukālam (Sanskrit: राहुकालम्, romanized: Rāhukālaṃ) is
              an inauspicious period of the day, not considered favourable to
              start any good deed. The rāhukāla spans for approximately 90
              minutes every day between sunrise and sunset. This inauspicious
              period is strictly avoided while calculating muhurtas. However,
              routine tasks that have already been started are regarded to be
              permissible to continue as usual during this period.
            </p>
          </div>
        </div>
        <button
          className="my-6 text-yellow-800 px-4 py-2 border border-yellow-800 rounded-md hover:bg-yellow-100"
          onClick={() => navigate("/rahu")}
        >
          {"<< "}
          Back
        </button>
      </div>
    </>
  );
};

export default AboutRahu;
