interface MyButtonProps {
  text: string;
  type: "submit" | "reset";
  handleClick?: () => void;
}

const Button = ({ text, type, handleClick}: MyButtonProps) => {
  return (
    <>
      <button onClick={handleClick} type={type}>{text}</button>
    </>
  );
};

export default Button;
