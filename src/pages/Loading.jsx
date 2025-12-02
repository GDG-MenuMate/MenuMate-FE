import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useMenuStore from "../store/useMenuStore.js";

function Loading() {
  const navigate = useNavigate();
  const { category, prompt, price, meals, campus, dietInfo,
    searchTriggered, setSearchTriggered, results, setResults, setError,
    setStep, resetAll
  } = useMenuStore();

  useEffect(() => {
    if (!searchTriggered) {
      console.warn("허가되지 않은 접근 감지, 메인으로 리다이렉트");
      resetAll();
      navigate("/");
    }
  }, [searchTriggered, navigate]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const body = {
          category,
          dietInfo,
          campus,
          meals,
          price,
          prompt: prompt || "",
        };

        // debug
        console.log("요청 보냄:", body);

        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/recommend`,
            body,
            { headers: { "Content-Type": "application/json" }}
        );

        console.log("응답 수신:", res.data);

        setResults([
          ...(res.data.recommendations.BREAKFAST || []),
          ...(res.data.recommendations.LUNCH || []),
          ...(res.data.recommendations.DINNER || []),
        ]);
        setSearchTriggered(false);
      } catch (err) {
        console.error("요청 실패:", err);
        setError(err);
        setSearchTriggered(false);
        alert(err.response?.data?.msg || "메뉴 검색에 실패했습니다.");
        resetAll();
        navigate("/");
      }
    };

    if (searchTriggered) fetchMenus();
  }, [searchTriggered]);

  useEffect(() => {
    if (results && results.length > 0) {
      setStep({start: false, first: false});

      console.log("[로딩 페이지] 현재 결과: ", results);

      // React 렌더링 사이클을 한 번 거친 후 navigate
      requestAnimationFrame(() => {
        navigate("/result", {
          replace: true,
          state: { fetchedResults: results } // 데이터 전달
        });
      });
    }
  }, [results]);

  // 디버깅용
  useEffect(() => {
    console.log("[Category 페이지 진입]");
    console.log("현재 전역 상태:", { category, prompt, price, meals, campus });
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