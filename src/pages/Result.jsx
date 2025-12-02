import {useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useMenuStore from "../store/useMenuStore.js";
import html2canvas from "html2canvas";
import Background from "../assets/Background.png";
import Highlight from "../assets/Highlight.png";
import Home from "../assets/Home.svg";
import Export from "../assets/Export.svg";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const { results, resetAll } = useMenuStore();

  const finalResults = location.state?.fetchedResults || results;

  useEffect(() => {
    if (!finalResults || finalResults.length === 0) {
      console.warn("비정상 접근 감지, 메인으로 리다이렉트");
      navigate("/", { replace: true });
      resetAll();
    }

    console.log("[결과 페이지] 현재 결과: ", finalResults);
  }, [finalResults, navigate, resetAll]);

  const handleClickHome = () => {
    resetAll();
    navigate("/");
  }

  const handleExport = () => {
    const element = document.getElementById("capture-area");

    html2canvas(element, {
      useCORS: true, // 외부 이미지 저장
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      ignoreElements: (el) => el.classList.contains("floating-button"),
    }).then((canvas) => {
      // 이미지 데이터 생성
      const link = document.createElement("a");
      link.download = "menumate.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    })
  }

  /* 지도 API */
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  /* URL 생성 */
  const getMapUrl = (lat, lng) => {
    if (!apiKey) {
      console.warn("⚠️ Google Maps API key is missing");
      return "";
    }

    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=135x135&markers=color:red%7C${lat},${lng}&key=${apiKey}`;
  }

  return(
      <div id="capture-area" className="flex relative h-full justify-center bg-primary bg-cover bg-center"
           style={{backgroundImage: `url(${Background})`}}
      >
        <button className="floating-button absolute flex justify-center items-center left-[31px] top-[46px] w-[58px] h-[58px]
                          bg-primary rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.25)]
                          hover:bg-accent
                          active:scale-95
                          transition-transform duration-150"
                onClick={handleClickHome}>
          <img
              src={Home}
              className="w-7 h-7"
          />
        </button>
        <button className="floating-button absolute flex justify-center items-center right-[31px] bottom-[46px] w-[58px] h-[58px]
                          bg-primary rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.25)]
                          hover:bg-accent
                          active:scale-95
                          transition-transform duration-150"
                onClick={handleExport}>
          <img
              src={Export}
              className="w-7 h-7"
          />
        </button>
        <div className="flex flex-col mt-[155px] gap-6">
          {finalResults.map((res, i) => (
              <div
                  key={i}
                  className={`flex min-h-[150px] items-center justify-end gap-[30px] ${
                      i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
              >
                {/* 메뉴 사진, 지도 */}
                <div className="relative flex items-center">
                  {/* 우선은 사진 없이 진행
                  <div
                      className="absolute left-[74px] top-[84px] w-20 h-20 bg-gray-500 rounded-full bg-cover bg-center"
                      style={{backgroundImage: `url(${res.image_url})`}}/>
                  */}
                  <div className="w-[135px] h-[135px] bg-gray-300">
                    <img
                        src={getMapUrl(res.latitude, res.longitude)}
                        alt="지도"
                        className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div
                    className={`flex flex-col w-[145px] font-pen text-[22px] text-black ${
                        i % 2 === 1 ? "items-end text-right" : "items-start"
                    }`}>
                  <div className="relative inline-block text-2xl -mb-2">
                    {res.meals}
                    <span className="text-[18px] ml-1.5 text-gray-500">({res.calories}kcal)</span>
                    <img src={Highlight}
                         className="absolute flex -left-1.5 bottom-[7px] w-10"
                    />
                  </div>
                  <div className="mt-1 leading-tight">
                    <a href={res.url} target="_blank" rel="noopener noreferrer">
                      <div className="text-accent">
                        {res.restaurant_name}
                        <span className="ml-0.5 text-sm">↗</span>
                      </div>
                    </a>
                    <div>
                      {res.name}
                    </div>
                    <div
                        className="text-gray-500 text-[20px]">{res.description}</div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}

export default Result;