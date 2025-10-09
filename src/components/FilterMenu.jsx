import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "./base/Dropdown.jsx";
import useMenuStore from "../store/useMenuStore";

const FilterMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const { filters, setFilter } = useMenuStore();

  // 로컬 상태 (적용 버튼 누르기 전까지 반영 안 됨)
  const [localPrice, setLocalPrice] = useState(filters.price);
  const [localMeal, setLocalMeal] = useState(filters.meal);
  const [localLocation, setLocalLocation] = useState(filters.location);

  // 메뉴를 열 때(또는 전역 필터가 바뀔 때) 로컬 상태 동기화
  useEffect(() => {
    if (openMenu === "price") setLocalPrice(filters.price);
    if (openMenu === "meal") setLocalMeal(filters.meal);
    if (openMenu === "location") setLocalLocation(filters.location);
  }, [openMenu, filters]);

  // 끼니 토글 (최소 1개 유지)
  const toggleMeal = (meal) => {
    if (localMeal.includes(meal)) {
      setLocalMeal(localMeal.filter((m) => m !== meal));
    } else {
      setLocalMeal([...localMeal, meal]);
    }
  };

  // 위치 토글 (최소 1개 유지)
  const toggleLocation = (loc) => {
    if (localLocation.includes(loc)) {
      setLocalLocation(localLocation.filter((l) => l !== loc));
    } else {
      setLocalLocation([...localLocation, loc]);
    }
  };

  return (
      <div className="flex gap-2">
        {/* 가격 */}
        <Dropdown id="price" label="가격" openMenu={openMenu} setOpenMenu={setOpenMenu}>
          <div className="flex flex-row gap-2">
            <div className="relative flex items-center">
              <input
                  type="number"
                  placeholder="최소 가격"
                  className="w-[100px] h-[31px] border border-[#ADADAD] bg-[#F5F5F5] text-[11px] rounded pl-2"
                  onChange={(e) =>
                      setLocalPrice({...localPrice, min: Number(e.target.value)})
                  }
                  value={localPrice.min ?? ""}
              />
              <span
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px]">
                원
              </span>
            </div>
            <span className="text-[14px] mt-[6px]">-</span>
            <div className="relative flex items-center">
              <input
                  type="number"
                  placeholder="최대 가격"
                  className="w-[100px] h-[31px] border border-[#ADADAD] bg-[#F5F5F5] text-[11px] rounded pl-2"
                  onChange={(e) =>
                      setLocalPrice({...localPrice, max: Number(e.target.value)})
                  }
                  value={localPrice.max ?? ""}
              />
              <span
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px]">
                원
              </span>
            </div>
            <button
                className="ml-[11px] w-[49px] h-[31px] bg-primary text-white text-[14px] font-semibold rounded-lg hover:bg-accent"
                onClick={() => {
                  setFilter("price", localPrice);
                  setOpenMenu(null);
                }}
            >
              적용
            </button>
          </div>
        </Dropdown>

        {/* 끼니 */}
        <Dropdown id="meal" label="끼니" openMenu={openMenu}
                  setOpenMenu={setOpenMenu}>
          <div className="flex gap-[7px]">
            {["아침", "점심", "저녁"].map((meal) => (
                <button
                    key={meal}
                    onClick={() => toggleMeal(meal)}
                    className={`w-[69px] h-[31px] rounded-full ${
                        localMeal.includes(meal)
                            ? "bg-primary text-white text-[14px] font-semibold border-2 border-accent"
                            : "bg-white text-black text-[14px] border-2 border-primary"
                    }`}
                >
                  {meal}
                </button>
            ))}
          </div>
          <button
              className="ml-4 w-[49px] h-[31px] bg-primary text-white text-[14px] font-semibold rounded-lg hover:bg-accent"
              onClick={() => {
                if (localMeal.length === 0) {
                  toast.error("끼니는 하나 이상 선택해야 합니다.");
                  return;
                }
                setFilter("meal", localMeal);
                setOpenMenu(null);
              }}
          >
            적용
          </button>
        </Dropdown>

        {/* 위치 */}
        <Dropdown id="location" label="위치" openMenu={openMenu}
                  setOpenMenu={setOpenMenu}>
          <div className="flex gap-[9px]">
            {["문과 캠퍼스", "이과 캠퍼스"].map((loc) => (
                <button
                    key={loc}
                    onClick={() => toggleLocation(loc)}
                    className={`w-[107px] h-[31px] rounded-full ${
                        localLocation.includes(loc)
                            ? "bg-primary text-white text-[14px] font-semibold border-2 border-accent"
                            : "bg-white text-black text-[14px] border-2 border-primary"
                    }`}
                >
                  {loc}
                </button>
            ))}
          </div>
          <button
              className="ml-[15px] w-[49px] h-[31px] bg-primary text-white text-[14px] font-semibold rounded-lg hover:bg-accent"
              onClick={() => {
                if (localLocation.length === 0) {
                  toast.error("위치는 하나 이상 선택해야 합니다.");
                  return;
                }
                setFilter("location", localLocation);
                setOpenMenu(null);
              }}
          >
            적용
          </button>
        </Dropdown>
      </div>
  );
};

export default FilterMenu;
