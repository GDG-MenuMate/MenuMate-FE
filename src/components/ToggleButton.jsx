const ToggleButton = ({id, label, selectedMenu, setSelectedMenu, setCategory}) => {
  const isSelected = id === selectedMenu;

  const handleClick = () => {
    if (isSelected) {
      setSelectedMenu(null);
      setCategory(null);
    } else {
      setSelectedMenu(id);
      setCategory(id);
    }
  }

  return (
      <button
        onClick={handleClick}
        className={`w-fit px-6 h-[52px] border-2 rounded-full text-[16px]
          ${isSelected ? "border-accent bg-primary font-bold text-white"
          : "border-primary bg-white font-normal text-black"}`}
      >
        {label}
      </button>
  );
}

export default ToggleButton;