import { Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

const Root = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  return (
    <>
      {user ? (
        <Navigate to={'/user/dashboard'} element={<Dashboard />} />
      ) : (
        <Navigate to={'/signup'} element={<Login />} />
      )}
    </>
  );
}

export default Root
