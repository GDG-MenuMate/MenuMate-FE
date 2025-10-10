import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMenuStore from "../store/useMenuStore.js";
import BaseSearchBox from "./base/BaseSearchBox.jsx";
import SearchIcon from "../assets/SearchIcon.svg";
import SearchIconAccent from "../assets/SearchIconAccent.svg";

const SearchInput = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const setPrompt = useMenuStore(state => state.setPrompt);
  const setSearchTriggered = useMenuStore(state => state.setSearchTriggered);


  const [hovered, setHovered] = useState(false);

  const handleSearch = () => {
    if (input.trim() === "") return;
    setPrompt(input);
    setSearchTriggered(true);
    navigate("/Loading");
  }

  return (
      <BaseSearchBox>
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
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
            src={SearchIcon}
            alt="search"
            className="absolute right-3 w-9 h-9 p-1 bg-primary rounded-full
              hover:bg-accent"
          />
        </button>
      </BaseSearchBox>
  );
}

export default SearchInput;