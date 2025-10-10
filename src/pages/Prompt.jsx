import useMenuStore from "../store/useMenuStore.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterMenu from "../components/FilterMenu.jsx";
import SearchInput from "../components/SearchInput.jsx";
import Button from "../components/Button.jsx";
import Filter from "../assets/Filter.svg";
import Arrow_back from "../assets/Arrow_back.svg";

function Prompt() {
  const navigate = useNavigate();
  const { category, dietInfo, setSearchTriggered } = useMenuStore();

  // 디버깅용
  useEffect(() => {
    console.log("[Prompt 페이지 진입]");
    console.log("현재 전역 상태:", { category, dietInfo });
  }, []);

  const handleSearch = () => {
    setSearchTriggered(true);
    navigate("/Loading");
  }

  return(
      <div>
        <div className="h-screen mt-[68px] pt-9 pl-[39px] pr-[39px] bg-white rounded-t-[50px] shadow-[0_-1px_10px_rgba(0,0,0,0.15)]
         flex flex-col">
          <div className="flex flex-row mb-[14px]">
            <img
                src={Filter}
                alt="filter"
                className="w-22 h-22 mr-2"
            />
            <FilterMenu></FilterMenu>
          </div>
          <SearchInput></SearchInput>
          <div className="flex flex-row justify-between mt-[23px]">
            <Button onClick={() => navigate(-1)}>
              <img
                  src={Arrow_back}
                  alt="arrow back"
                  className="w-8 h-8"
              />
            </Button>
            {category != null &&
                <Button children="카테고리만으로 찾기" onClick={handleSearch}></Button>}
          </div>
        </div>
      </div>
  );
}

export default Prompt;