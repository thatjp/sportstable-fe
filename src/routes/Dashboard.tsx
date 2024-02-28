import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/navbar/NavBar";
import SideBar from "../components/sideBar.js/SideBar";
import { IRootState } from "../store/store";
import Icon from "../components/icon/Icon";
import { setSideBarOpen } from "../features/globalSlice";
import { addTeams } from "../features/teamsSlice";
import { addTeamGames } from "../features/teamGamesSlice";
import Table from "../components/table/Table";
import{ getNbaTeams, getNbaTeamGames } from '../requests/axios'

const Dashboard = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector<IRootState, boolean>(
    (state) => state.global.sidebarOpen
  );
  const teamGames = useSelector<IRootState, {}>(
    (state) => state.teamGames.games 
  )

  const handleChevronClick = () => {
    dispatch(setSideBarOpen());
  };

  useEffect(() => {
    let token: any = localStorage.getItem('token')
    token = JSON.parse(token)
    
    const getTeams = async () => {
      const teams = await getNbaTeams(token.access)
      const games = await getNbaTeamGames(token.access, 1610612737)
      dispatch(addTeams(teams))
      dispatch(addTeamGames(games)) 
      return teams
    }
    getTeams()
  }, [])
  


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
      {teamGames && <Table teamGames={teamGames} />}
      </div>
    </div>
  );
};

export default Dashboard;
