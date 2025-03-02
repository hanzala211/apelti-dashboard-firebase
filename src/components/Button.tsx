interface ButtonProps {
  btnText: string,
  handleClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ btnText, handleClick }) => {

  return <button onClick={handleClick} className={`bg-basicGreen hover:bg-opacity-70 md:text-[16px] transition-all duration-200 text-basicWhite p-2 rounded-full text-[14px]`}>
    {btnText}
  </button>
}

export default Button