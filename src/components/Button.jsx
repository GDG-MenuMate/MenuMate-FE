const Button = ({children, onClick, type="button"}) => {
  return (
      <button
        type={type}
        onClick={onClick}
        className="bg-primary text-white font-bold text-base px-6 py-[18px] rounded-full
        hover:bg-accent
        active:scale-95
        transition-transform duration-150"
      >
        {children}
      </button>
  )
}

export default Button;