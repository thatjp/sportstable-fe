interface MyButtonProps {
  text: string, 
  type: "submit" | "reset",
}

const Button = ({ text, type }: MyButtonProps) => {
  return (
    <>
      <button type={type}>{text}</button>
    </>
  );
};

export default Button;
