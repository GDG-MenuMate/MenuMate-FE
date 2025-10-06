import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToggleButton from "../components/ToggleButton.jsx";
import Button from "../components/Button.jsx";
import useMenuStore from "../store/useMenuStore.js";

function Category() {
  const navigate = useNavigate();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const { category, setCategory, setHeight: setGlobalHeight, setWeight: setGlobalWeight } =
      useMenuStore();
  const [selectedMenu, setSelectedMenu] = useState(category);

  const handleClickPrompt = () => {
    navigate('/Prompt');
  }

  const handleClickSelect = () => {
    if (selectedMenu === "diet") {
      if (height.trim() === "" || weight.trim() === "") {
        toast.error("키와 몸무게를 모두 입력해 주세요.");
        return;
      }
      setGlobalHeight(height);
      setGlobalWeight(weight);
    }

    setCategory(selectedMenu);
    navigate("/Prompt");
  }

  // 키, 몸무게 소수점 한 자리까지
  const handleInput = (value, setter) => {
    const regex = /^\d{0,3}(\.\d{0,1})?$/; // 최대 3자리 + 소수점 1자리
    if (regex.test(value) || value === "") {
      setter(value);
    }
  };

  return(
      <div>
        <div className="h-screen mt-[68px] pt-9 pl-[39px] pr-[39px] bg-white rounded-t-[50px] shadow-[0_-1px_10px_rgba(0,0,0,0.15)]">
          <div className="font-jua text-[28px]">카테고리를 선택해 주세요</div>
          <div className="mt-[23px] mb-[23px] flex flex-col gap-[14px]">
            <ToggleButton id="diet" label="다이어트 식단" selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}></ToggleButton>
            <AnimatePresence>
            {selectedMenu === "diet" && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-[30px] flex flex-row gap-5">
                  <div className="relative flex items-center">
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => handleInput(e.target.value, setHeight)}
                        placeholder="키"
                        className="border-2 border-accent w-fit w-[104px] h-[52px] pl-[18px] rounded-full text-[16px]"
                    />
                    <span
                        className="absolute right-[18px] top-1/2 -translate-y-1/2 text-[16px]">
                      cm
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => handleInput(e.target.value, setWeight)}
                        placeholder="몸무게"
                        className="border-2 border-accent w-fit w-[104px] h-[52px] pl-[18px] rounded-full text-[16px]"
                    />
                    <span
                        className="absolute right-[18px] top-1/2 -translate-y-1/2 text-[16px]">
                      kg
                    </span>
                  </div>
                </motion.div>
            )}
            </AnimatePresence>
            <ToggleButton id="vegan" label="채식" selectedMenu={selectedMenu}
                          setSelectedMenu={setSelectedMenu}></ToggleButton>
            <ToggleButton id="low sugar" label="저당" selectedMenu={selectedMenu}
                          setSelectedMenu={setSelectedMenu}></ToggleButton>
            <ToggleButton id="muslim" label="무슬림" selectedMenu={selectedMenu}
                          setSelectedMenu={setSelectedMenu}></ToggleButton>
          </div>
          <div className="flex justify-end">
            {selectedMenu === null
                ? <Button onClick={handleClickPrompt}>프롬프트만 입력하기</Button>
                : <Button onClick={handleClickSelect}>선택 완료</Button>
            }
          </div>
        </div>
      </div>
  );
}

export default Category;