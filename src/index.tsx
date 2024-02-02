import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Root from "./routes/root";
import Profile from "./routes/profile";
import Login from "./routes/Login";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";
import Dashboard from "./routes/Dashboard";
import ErrorPage from "./pages/error-page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./static/index.css";
import "./static/reset.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="*" element={<ErrorPage/>} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Root />} errorElement={<ErrorPage />} />
        </Route>
        <Route path="/signup" element={<Login />} />
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
