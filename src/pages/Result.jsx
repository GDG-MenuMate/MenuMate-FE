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
    {
      meal: "아침",
      restaurant_name: "샐러디",
      name: "닭가슴살 샐러드",
      description: "신선한 채소와 닭가슴살이 들어간 건강식",
      calories: 350,
      image_url: "...",
      url: "...",
      latitude: 12.34,
      longitude: 12.34
    },
    {
      meal: "점심",
      restaurant_name: "샐러디",
      name: "닭가슴살 샐러드",
      description: "신선한 채소와 닭가슴살이 들어간 건강식",
      calories: 350,
      image_url: "...",
      url: "...",
      latitude: 12.34,
      longitude: 12.34
    },
    {
      meal: "저녁",
      restaurant_name: "샐러디",
      name: "닭가슴살 샐러드",
      description: "신선한 채소와 닭가슴살이 들어간 건강식",
      calories: 350,
      image_url: "...",
      url: "...",
      latitude: 12.34,
      longitude: 12.34
    }
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
                className={`flex h-[150px] items-center justify-end gap-[30px] ${
                  i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
            >
              {/* 지도 */}
              <div className="w-[135px] h-[135px] bg-gray-300" />

              <div
                  className="flex flex-col w-[150px] font-pen text-[22px] text-black">
                <div>{res.meal}</div>
                <div className="leading-tight">
                  <div>{res.restaurant_name}</div>
                  <div>{res.name}</div>
                  <div
                      className="text-gray-500 text-[20px] text-left">{res.description}</div>
                </div>
                <img
                    src={Highlight}
                    className="absolute w-10 mt-[23px] -ml-1.5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default Result;