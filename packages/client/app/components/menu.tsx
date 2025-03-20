import { AiOutlineProduct } from "react-icons/ai";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { LuUsersRound } from "react-icons/lu";
import { SiMaterialformkdocs, SiStagetimer } from "react-icons/si";
import { TbInvoice } from "react-icons/tb";

interface MenuSectionSpecification {
  title: string;
  items: MenuItemSpecification[];
}

/* TODO: remove hard-coded values */
const userRoles = ["admin"];

interface MenuItemSpecification {
  icon: any;
  label: string;
  href: string;
  visible: string[];
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
      },
      {
        icon: <AiOutlineProduct />,
        label: "Products",
        href: "/products",
        visible: ["admin"],
      },
      {
        icon: <SiStagetimer />,
        label: "Stages",
        href: "/stages",
        visible: ["admin"],
      },
      {
        icon: <SiMaterialformkdocs />,
        label: "Materials",
        href: "/materials",
        visible: ["admin"],
      },
      {
        icon: <TbInvoice />,
        label: "Bill of Materials",
        href: "/boms",
        visible: ["admin"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <IoIosLogOut />,
        label: "Logout",
        href: "/logout",
        visible: ["admin"],
      },
      {
        icon: <IoIosLogIn />,
        label: "Login",
        href: "/login",
        visible: ["admin"],
      },
    ],
  },
];

export const Menu = () => {
  return (
    <div className="sticky top-4 !mt-6 !mx-4">
      {MENU_DATA.map((section) => {
        return (
          <div className="fles flex-col gap-2" key={section.title}>
            <span className="hidden lg:block !my-4">{section.title}</span>
            {section.items.map((item) => {
              if (item.visible.some((role) => userRoles.includes(role))) {
                return (
                  <a
                    href={item.href}
                    className="!py-2 flex items-center justify-center lg:justify-start gap-4 md:!px-2 hover:bg-sky-50 rounded-md"
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
