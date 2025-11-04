import React from "react";
import { useNavigate } from "react-router-dom";
import SearchStart from "../components/SearchStart.jsx";
import useMenuStore from "../store/useMenuStore.js";

function Main() {
  const navigate = useNavigate();
  const { setStep, resetAll } = useMenuStore();

  const handleClick = () => {
    resetAll();
    setStep({start: true});
    navigate('/Category');
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="font-madimi text-white text-[64px] text-center">MenuMate</div>
        <SearchStart onClick={handleClick}></SearchStart>
      </div>
  );
}

export default Main;
