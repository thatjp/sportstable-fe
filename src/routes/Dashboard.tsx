import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sideBar.js/SideBar";
import { IRootState } from "../store/store";
import Icon from "../components/icon/Icon";
import { setSideBarOpen } from "../features/globalSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector<IRootState, boolean>(
    (state) => state.global.sidebarOpen
  );

  const handleChevronClick = () => {
    dispatch(setSideBarOpen());
  };

  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="bg-blue-200">
          <div className="p-2 float-start w-1/2">Sports Desk</div>
          <div className="float-end">
            <Icon handleClick={() => handleChevronClick()} />
          </div>
        </div>
        <div className={sidebarOpen ? "w-fit" : "invisible"}>
          <SideBar />
        </div>
      </div>
      <div className="flex-1">
        <NavBar />
      </div>
    </div>
  );
};

export default Dashboard;
