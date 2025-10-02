import { useEffect, useRef } from "react";
import chevronDown from "../assets/chevron-down.svg";

const Dropdown = ({ id, label, openMenu, setOpenMenu, children }) => {
  const isOpen = openMenu === id;
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      const toastContainer = document.querySelector(".Toastify");

      // 버튼이나 메뉴 영역이 아니라면 닫기
      if (
          isOpen &&
          buttonRef.current &&
          menuRef.current &&
          !buttonRef.current.contains(e.target) &&
          !menuRef.current.contains(e.target) &&
          !(toastContainer && toastContainer.contains(e.target)) // 토스트 알림은 제외
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setOpenMenu]);

  return (
      <div>
        <div className="relative">
          <button
              ref={buttonRef}
              onClick={() => setOpenMenu(isOpen ? null : id)}
              className="flex items-center justify-center gap-1 w-[90px] h-[35px] text-[14px] border-2 border-primary rounded-full bg-white"
          >
            {label}
            <img
                src={chevronDown}
                alt="chevron"
                className={`absolute right-2 w-4 h-4 transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                }`}
            />
          </button>
        </div>
        {isOpen && (
            <div ref={menuRef} className="absolute left-1/2 transform -translate-x-1/2 mt-[10px]
            w-[327px] h-[86px] bg-white
            border-2 border-primary rounded-[20px]
            shadow-[0_2px_5px_rgba(0,0,0,0.15)]
            flex items-center justify-center">
              {children}
            </div>
        )}
      </div>
  );
};

export default Dropdown;
