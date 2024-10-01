import { Outlet } from "react-router-dom";
import { baseConfig } from "../../config";
import SideBar from "../SideBar";
import Header from "../Header";
import Footer from "../Footer";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      {baseConfig.header ? <Header /> : <></>}
      <SideBar />
      <div className="page-container">
        <Outlet />
      </div>
      {baseConfig.footer ? <Footer /> : <></>}
    </div>
  );
};

export default Layout;
