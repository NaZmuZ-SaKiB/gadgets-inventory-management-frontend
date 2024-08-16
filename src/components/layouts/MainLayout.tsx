import { useState } from "react";
import { Outlet } from "react-router-dom";

import LeftSideBar from "./LeftSideBar";
import TopBar from "./TopBar";

const MainLayout = () => {
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(true);

  return (
    <div>
      <TopBar hidden={sidebarHidden} setHidden={setSidebarHidden} />
      <main className="flex relative">
        <LeftSideBar hidden={sidebarHidden} setHidden={setSidebarHidden} />
        <section className="flex-1 overflow-x-hidden">
          <div className="w-full h-full mx-auto">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainLayout;
