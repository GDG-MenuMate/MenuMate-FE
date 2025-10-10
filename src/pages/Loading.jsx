import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useMenuStore from "../store/useMenuStore.js";

function Loading() {
  const navigate = useNavigate();
  const { category, prompt, price, meals, campus, searchTriggered } = useMenuStore();

  /*
  useEffect(() => {
    if (!searchTriggered) {
      console.warn("허가되지 않은 접근 감지, 메인으로 리다이렉트");
      navigate("/");
    }
  }, [searchTriggered, navigate]);
  */

  // 디버깅용
  useEffect(() => {
    console.log("[Category 페이지 진입]");
    console.log("현재 전역 상태:", { category, prompt });
  }, []);

  const text = "식단을 짜고 있어요 . . .";

  const textVariants = {
    animate: {
      y: [0, -8, 0],
    }
  }

  return(
      <div className="min-h-screen flex font-jua text-white text-[32px] items-center justify-center">
        {text.split("").map((char, i) => (
            <motion.span
                key={i}
                variants={textVariants}
                initial="initial"
                animate="animate"
                transition={{
                  delay: i * 0.1, // 글자마다 순차 딜레이
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 2, // 한 문장 끝나고 살짝 쉬었다 반복
                  ease: "easeInOut",
                }}
            >
              {char === " " ? "\u00A0" // 띄어쓰기 유지
                  : char}
            </motion.span>
        ))}
      </div>
  );
}

export default Loading;