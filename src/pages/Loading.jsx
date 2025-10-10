import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMenuStore from "../store/useMenuStore.js";

function Loading() {
  const navigate = useNavigate();
  const { searchTriggered } = useMenuStore();

  /*
  useEffect(() => {
    if (!searchTriggered) {
      console.warn("허가되지 않은 접근 감지, 메인으로 리다이렉트");
      navigate("/");
    }
  }, [searchTriggered, navigate]);
  */

  return(
      <div className="min-h-screen flex font-jua text-white text-[32px] items-center justify-center">
        식단을 짜고 있어요. . .
      </div>
  );
}

export default Loading;