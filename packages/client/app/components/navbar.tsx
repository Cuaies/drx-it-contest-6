import { LuCircleUserRound } from "react-icons/lu";
import { useProvideAuth } from "../hooks";
import ThemeToggleButton from "./themeToggle";

export const Navbar = () => {
  const { user } = useProvideAuth();

  return (
    <div className="flex items-center justify-between !px-4 !py-2 bg-white rounded-xl shadow-xs bg-white text-black dark:text-white dark:bg-gray-900">
      <div className=""></div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center !mx-4">
          <ThemeToggleButton />
        </div>
        <div className="flex items-center justify-center gap-2 text-xl bold">
          {user && (
            <div className="flex flex-col">
              <span className="font-semibold text-[16px]">{user.name}</span>
              <span className="text-[12px] text-gray-500 text-right">
                {user.roleName}
              </span>
            </div>
          )}
          <LuCircleUserRound size={30} />
        </div>
      </div>
    </div>
  );
};
