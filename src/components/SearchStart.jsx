import BaseSearchBox from "./base/BaseSearchBox.jsx";
import SearchIconAccent from "../assets/SearchIconAccent.svg";
import Button from "./Button.jsx";

const SearchStart = ({text = "메뉴 추천을 시작할까요?", onClick}) => {
  return (
      <BaseSearchBox color="accent">
        <button
            onClick={onClick}
            className="relative flex items-center w-full h-full rounded-full cursor-pointer"
        >
          <span className="flex-1 text-center font-bold text-[16px] text-accent">{text}</span>
          <span className="flex items-center justify-center">
            <img
                src={SearchIconAccent}
                alt="search"
                className="absolute right-4 w-8 h-8"
            />
          </span>
        </button>
      </BaseSearchBox>
  );
}

export default SearchStart;