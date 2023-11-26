import { useState } from "react";
import SidebarList from "./SidebarLists";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const SIDEBAR_LISTS = [
  { id: 1, link: "", title: "Logo", icon: "IoLogOut" },
  { id: 2, link: "/", title: "Home", icon: "AiFillHome", },
  { id: 3, link: "/helpermia", title: "Helper Mia", icon: "HiMiniChatBubbleLeftRight"},  
  { id: 4, link: "/dashboard", title: "Health Track", icon: "CgFeed", },
  { id: 5, link: "/setreminder", title: "Health Reminder", icon: "AiOutlinePlus", },
  { id: 6, link: "/insurance", title: "Health Insurance", icon: "BsPeopleFill", },  
];

function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (link:any) => {
    if (link === "") {
      signOut(); // Perform sign out logic
    } else {
      router.push(link);
    }
  };

  return (
    <>
      <div className="relative">
        {/* Mobile Menu Button */}
        <button
          type="button"
          className="block sm:hidden text-gray-400 hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"}
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute sm:hidden bg-[#16151a] top-0 right-0 left-0 mt-14 z-40">
            <div className="py-4 bg-[#16151a]">              
              <ul className="space-y-2 font-medium">              
                {SIDEBAR_LISTS.map((sidebar) => (
                  <SidebarList
                    key={sidebar.id}
                    link={sidebar.link}
                    title={sidebar.title}
                    icon={sidebar.icon}
                    onClick={handleLinkClick}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden sm:block bg-[#16151a] rounded-tl-[3rem] rounded-bl-[3rem] h-screen">
        <div className="overflow-y-auto bg-transparent px-3 py-4 bg-[#16151a]">
          <ul className="space-y-2 font-medium">
            {SIDEBAR_LISTS.map((sidebar) => (
              <SidebarList
                key={sidebar.id}
                link={sidebar.link}
                title={sidebar.title}
                icon={sidebar.icon}
                onClick={handleLinkClick}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;