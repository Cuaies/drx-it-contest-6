import { Outlet } from "react-router";
import { Menu } from "../components/menu";
import { GrCode } from "react-icons/gr";

const GenericLayout = () => {
  return (
    <div className="h-screen flex">
      <div className="w-1/6 md:w[8%] lg:w-[16%] xl:w-[14%]">
        <a
          className="logo flex items-center justify-center gap-4 !m-4"
          href="/"
        >
          <GrCode size={42} />
          <span className="hidden lg:block">DRX IT Contest 6</span>
        </a>
        <Menu />
      </div>
      <div className="w-5/6 md:w[92%] lg:w-[84%] xl:w-[86%] bg-stone-100">
        <Outlet />
      </div>
    </div>
  );
};

export default GenericLayout;
