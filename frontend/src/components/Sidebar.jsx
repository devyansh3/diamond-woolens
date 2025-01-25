import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Sidebar } from "flowbite-react";
import { HiUser } from "react-icons/hi";
import {
  AlertCircle,
  AlertTriangle,
  Handshake,
  Receipt,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  BarChart2Icon,
  HouseIcon,
  Users2Icon,
  NotebookPenIcon,
  BookUserIcon,
} from "lucide-react";
import { motion } from "framer-motion";
// import { UserContext } from "../context/UserContext";

function CollapsableSidebar() {
  //   const { currentUser, currentStore, setAuthData } = useContext(UserContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsOpen(screenWidth > 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStoreSelect = (store) => {
    setOpenDropdown(false);
    setAuthData({ store });
    setTimeout(() => {
      navigate("/");
    });
  };

  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const isActive = (path) => location.pathname === path;
  const toggleSidebar = () => setIsOpen(!isOpen);

  //   if (!currentUser) return <div>Loading...</div>;

  return (
    <motion.div
      animate={{ width: isOpen ? 220 : 60 }}
      className="h-full"
      style={{ paddingTop: "60px" }}
    >
      <Sidebar aria-label="Sidebar">
        <div className="h-full flex flex-col justify-between">
          <Sidebar.Items>
            <div className="relative">
              <Button
                className="max-w-[40px] text-red-500 dark:text-red-400"
                onClick={toggleSidebar}
              >
                {isOpen ? (
                  <ArrowLeftCircleIcon className="w-5 h-5" />
                ) : (
                  <ArrowRightCircleIcon className="w-5 h-5" />
                )}
              </Button>

              {/* {isOpen && (
                <Button
                  className="w-full mt-2 max-w-[200px]"
                  style={{ backgroundColor: "#31C48D" }}
                  onClick={toggleDropdown}
                >
                  {currentStore?.area}
                </Button>
              )} */}

              {/* {openDropdown && isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded shadow-lg z-10">
                  {currentUser.stores.map((storeUser) => (
                    <div
                      key={storeUser._id}
                      onClick={() => handleStoreSelect(storeUser.storeId)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    >
                      {storeUser.storeId.area}
                    </div>
                  ))}
                </div>
              )} */}
            </div>

            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={AlertCircle}
                onClick={() => navigate("/")}
                className={`transition-colors duration-300 flex items-center hover:bg-primary-700 ${
                  isActive("/") ? "bg-primary-500" : ""
                } ${isOpen ? "max-w-[200px]" : "max-w-[40px]"}`}
              >
                {isOpen && "Production"}
              </Sidebar.Item>

              <Sidebar.Item
                icon={AlertTriangle}
                onClick={() => navigate("/color")}
                className={`transition-colors duration-300 flex items-center hover:bg-primary-700 ${
                  isActive("/upcomingDeliveries") ? "bg-primary-500" : ""
                } ${isOpen ? "max-w-[200px]" : "max-w-[40px]"}`}
              >
                {isOpen && "Color"}
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>

          {/* {currentUser && (
            <div className="p-2 mt-4 flex items-center">
              <img
                src="https://th.bing.com/th/id/OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ?rs=1&pid=ImgDetMain"
                className="mr-3 w-8 h-8 rounded-full"
                alt="User avatar"
              />
              {isOpen && (
                <div className="text-left flex flex-col">
                  <div className="font-semibold leading-none text-gray-900 dark:text-white mb-0.5">
                    {currentUser.username}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {currentUser.role}
                  </div>
                </div>
              )}
            </div>
          )} */}
        </div>
      </Sidebar>
    </motion.div>
  );
}

export default CollapsableSidebar;
