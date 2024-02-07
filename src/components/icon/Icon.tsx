import ChevronDown from "../../icons/chevronDown.svg";

interface IconProps {
  iconPath?: string;
  handleClick: () => void;
}

const Icon = ({ handleClick, iconPath }: IconProps) => {
  return (
    <button onClick={() => handleClick()}>
      <img className="w-8" src={ChevronDown} alt="Chevron Down" />
    </button>
  );
};

export default Icon;
