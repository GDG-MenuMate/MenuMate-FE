import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMenuStore from "../store/useMenuStore.js";
import Background from "../assets/Background.png";
import Highlight from "../assets/Highlight.png";

function Result() {
  const navigate = useNavigate();

  // const { results } = useMenuStore();

  // 테스트용
  const results = [
    { meal: "BREAKFAST", restaurant: "본죽", menu: "소고기죽" },
    { meal: "LUNCH", restaurant: "본죽", menu: "소고기죽" },
    { meal: "DINNER", restaurant: "본죽", menu: "소고기죽" },
  ];

  /*
  useEffect(() => {
    if (!results || results.length === 0) {
      console.warn("허가되지 않은 접근 감지, 메인으로 리다이렉트");
      navigate("/");
    }
  }, [results, navigate]);
  */

  return(
      <div className="flex h-full justify-center bg-cover bg-center"
           style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="flex flex-col mt-[226px] gap-[50px]">
          {results.map((res, i) => (
            <div
                key={i}
                className={`flex justify-end gap-[39px] ${
                  i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
            >
              {/* 지도 */}
              <div className="w-[135px] h-[135px] bg-gray-300" />

              <div
                  className={`flex flex-col w-[113px] font-pen text-[24px] text-black ${
                      i % 2 === 1 && "text-right"
                  }`}>
                <div>{res.meal === 'BREAKFAST' ? '아침'
                    : res.meal === 'LUNCH' ? '점심'
                        : '저녁'}</div>
                <div>{res.restaurant}</div>
                <div>{res.menu}</div>
                <img
                    src={Highlight}
                    className={`absolute w-10 ${
                        i % 2 === 0 ? "mt-6 -ml-1.5" : "mt-6 ml-[77px]"
                    }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default Result;