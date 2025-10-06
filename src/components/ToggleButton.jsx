const ToggleButton = ({id, label, selectedMenu, setSelectedMenu}) => {
  const isSelected = id === selectedMenu;

  return (
      <button
        onClick={() => setSelectedMenu(isSelected ? null : id)}
        className={`w-fit px-6 h-[52px] border-2 rounded-full text-[16px]
          ${isSelected ? "border-accent bg-primary font-bold text-white"
          : "border-primary bg-white font-normal text-black"}`}
      >
        {label}
      </button>
  );
}

export default ToggleButton;