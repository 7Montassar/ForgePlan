import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar/sidebar";

const Layout = () => {
  return (
    <div className="flex  h-screen ">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Layout;
