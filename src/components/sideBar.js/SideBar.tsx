import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavLink from "../navLink/NavLink";
import Button from "../button/Button";
import SpanLine from "../spanLine/SpanLine";

import { logout } from "../../requests/axios";

const profileLinks = ["Profile", "History", "My Picks"];
const sportsLinks = ["Basketball"];

const SideBar = () => {
  let navigate = useNavigate();
  const clickHandler = () => {
    // @ts-ignore
    const items = JSON.parse(localStorage.getItem("token" || '""'));
    logout(items.access, items.refresh);
    navigate("/signup");
  };

  return (
    <nav className="bg-blue-200 h-screen w-60">
      <div>
        {profileLinks.map((link, idx) => {
          return <NavLink key={`${link}-` + idx} link={link} />;
        })}
        <SpanLine width="4/5" />
        <h1 className="display m-2">Sports</h1>
        {sportsLinks.map((link, idx) => {
          return <NavLink key={`${link}-` + idx} link={link} />;
        })}
        <SpanLine width="4/5" />
        <div className="absolute bottom-0 mx-4 my-2">
          <Link to="/settings">Settings</Link>
          <Button
            text="Log Out"
            type="submit"
            handleClick={() => clickHandler()}
          />
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
