import { Outlet } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <div className="h-full w-full">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default GlobalLayout;
