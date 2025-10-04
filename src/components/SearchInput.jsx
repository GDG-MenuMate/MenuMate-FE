import { useState } from "react";
import useMenuStore from "../store/useMenuStore.js";
import BaseSearchBox from "./BaseSearchBox.jsx";
import SearchIcon from "../assets/SearchIcon.svg";
import SearchIconAccent from "../assets/SearchIconAccent.svg";

const SearchInput = () => {
  const [input, setInput] = useState("");
  const setPrompt = useMenuStore((state) => state.setPrompt);

  const [hovered, setHovered] = useState(false);

  const handleSearch = () => {
    if (input.trim() === "") return;
    setPrompt(input);
  }

  return (
      <BaseSearchBox>
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="어떤 메뉴를 찾고 있나요? (예: 든든한)"
            className="w-[243px] ml-4 text-[15px] focus:outline-none text-left"
        />
        <button
            onClick={handleSearch}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-center justify-center"
        >
          <img
            src={hovered ? SearchIconAccent : SearchIcon}
            alt="search"
            className="absolute right-4 w-8 h-8"
          />
        </button>
      </BaseSearchBox>
  );
}

export default SearchInput;