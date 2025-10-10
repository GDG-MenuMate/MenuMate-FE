const BaseSearchBox = ({children, color = "primary" }) => {
  return (
      <div
          className={`relative flex items-center w-[316px] h-[60px] border-2 rounded-full bg-white
          ${color === "primary" ? "border-primary"
              : "border-accent active:scale-95 transition-transform duration-100"}`}
      >
        {children}
      </div>
  );
}

export default BaseSearchBox;