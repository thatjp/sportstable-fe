import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavLink from "../navLink/NavLink";
import Button from "../button/Button";
import SpanLine from "../spanLine/SpanLine";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { setSideBarOpen } from "../../features/globalSlice";

import { logout } from "../../requests/axios";

const profileLinks = ["Profile", "History", "My Picks"];
const sportsLinks = ["Basketball"];

const SideBar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarOpen = useSelector<IRootState, boolean>(
    (state) => state.global.sidebarOpen
  );

  const clickHandler = () => {
    // @ts-ignore
    const items = JSON.parse(localStorage.getItem("token" || '""'));
    logout(items.access, items.refresh);
    navigate("/signup");
  };

  const handleClose = () => {
    // Only close on mobile devices
    if (window.innerWidth < 768) { // 768px is the md breakpoint in Tailwind
      dispatch(setSideBarOpen());
    }
  };

  return (
    <>
      {/* Backdrop overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          sidebarOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
      
      {/* Sidebar */}
      <nav className={`
        bg-blue-200 h-screen w-full fixed left-0 top-0 
        transition-all duration-300 ease-in-out flex flex-col
        md:w-64 md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        z-50
      `}>
        {/* Close button - only visible on mobile */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-blue-300 transition-colors md:hidden"
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex-1 overflow-y-auto pt-16 md:pt-0">
          {profileLinks.map((link, idx) => {
            return <NavLink key={`${link}-` + idx} link={link} />;
          })}
          <SpanLine width="4/5" />
          <h1 className="display m-2">Sports</h1>
          {sportsLinks.map((link, idx) => {
            return <NavLink key={`${link}-` + idx} link={link} />;
          })}
          <SpanLine width="4/5" />
        </div>
        <div className="mt-auto p-4 border-t border-blue-300">
          <Link to="/settings" className="block mb-2">Settings</Link>
          <Button
            text="Log Out"
            type="submit"
            handleClick={() => clickHandler()}
          />
        </div>
      </nav>
    </>
  );
};

export default SideBar;
