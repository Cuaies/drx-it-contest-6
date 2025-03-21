import { AiOutlineLogin, AiOutlineProduct } from "react-icons/ai";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { LuUsersRound } from "react-icons/lu";
import { SiMaterialformkdocs, SiStagetimer } from "react-icons/si";
import { TbInvoice } from "react-icons/tb";
import { useProvideAuth } from "../hooks";

export const Menu = () => {
  const { user, logout } = useProvideAuth();

  interface MenuSectionSpecification {
    title: string;
    items: MenuItemSpecification[];
  }

  interface MenuItemSpecification {
    icon: any;
    label: string;
    href: string;
    visible: string[];
    onClick?: (e: any) => void;
    requireAuth: boolean;
    requireUnauth: boolean;
  }

  const MENU_DATA: MenuSectionSpecification[] = [
    {
      title: "MENU",
      items: [
        {
          icon: <LuUsersRound />,
          label: "Users",
          href: "/users",
          visible: ["admin"],
          requireAuth: true,
          requireUnauth: false,
        },
        {
          icon: <AiOutlineProduct />,
          label: "Products",
          href: "/products",
          visible: ["admin"],
          requireAuth: true,
          requireUnauth: false,
        },
        {
          icon: <SiStagetimer />,
          label: "Stages",
          href: "/stages",
          visible: ["admin"],
          requireAuth: true,
          requireUnauth: false,
        },
        {
          icon: <SiMaterialformkdocs />,
          label: "Materials",
          href: "/materials",
          visible: ["admin"],
          requireAuth: true,
          requireUnauth: false,
        },
        {
          icon: <TbInvoice />,
          label: "Bills of Materials",
          href: "/boms",
          visible: ["admin"],
          requireAuth: true,
          requireUnauth: false,
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          icon: <IoIosLogOut />,
          label: "Logout",
          href: "/",
          visible: ["admin"],
          onClick: (e) => {
            logout();
          },
          requireAuth: true,
          requireUnauth: false,
        },
        {
          icon: <AiOutlineLogin />,
          label: "Register",
          href: "/register",
          visible: ["admin"],
          requireAuth: false,
          requireUnauth: true,
        },
        {
          icon: <IoIosLogIn />,
          label: "Login",
          href: "/login",
          visible: ["admin"],
          requireAuth: false,
          requireUnauth: true,
        },
      ],
    },
  ];

  return (
    <div className="sticky top-4 !mt-6 !mx-4">
      {MENU_DATA.map((section) => {
        return (
          <div className="fles flex-col gap-2" key={section.title}>
            <span className="hidden lg:block !my-4">{section.title}</span>
            {section.items.map((item) => {
              if (
                item.visible.some((role) =>
                  user?.roleName ? user.roleName === role : true,
                )
              ) {
                if (item.requireAuth && !user) {
                  return;
                } else if (item.requireUnauth && user) {
                  return;
                }

                return (
                  <a
                    href={item.href}
                    className="!py-2 flex items-center justify-center lg:justify-start gap-4 md:!px-2 hover:bg-sky-50 rounded-md"
                    onClick={item.onClick}
                  >
                    {item.icon}
                    <span className="hidden lg:block">{item.label}</span>
                  </a>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};
