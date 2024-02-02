import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const isAuthenticated = !!JSON.parse(localStorage.getItem('token'))
  return (
    <>
      {
        isAuthenticated ? <Outlet /> : <Navigate to="/signup" replace storageKey="token" />
      }
    </>
  );
}

export default PrivateRoute;


