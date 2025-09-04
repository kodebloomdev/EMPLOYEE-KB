import {
  FaHome,
  FaUserPlus,
  FaUsers,
  FaChartBar,
  FaMoneyBillWave,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

/**
 * Props
 * - isOpen: boolean (for mobile slide-in; optional)
 * - isCollapsed: boolean (16px rail vs 64px full)
 * - toggleCollapse: () => void
 * - activeKey: string ("dashboard" | "create" | "team" | "perf" | "fin" | "settings")
 */
const Sidebar = ({
  isOpen = true,
  isCollapsed = false,
  toggleCollapse = () => {},
  activeKey = "dashboard",
}) => {
  const navigate = useNavigate();

  // helper to style active vs hover like your CSS
  const itemClass = (active) =>
    `flex items-center gap-3 px-5 py-3 text-gray-800 transition-all duration-300 
     border-l-4 ${
       active
         ? "bg-gray-100 text-blue-700 border-blue-700"
         : "border-transparent hover:bg-gray-100 hover:text-blue-700 hover:border-blue-700"
     } whitespace-nowrap`;

  const Title = ({ children }) => (
    <div
      className={`px-5 pt-4 pb-2 text-[11px] uppercase tracking-[0.08em] text-gray-500 transition-all duration-300 ${
        isCollapsed ? "hidden" : "block"
      }`}
    >
      {children}
    </div>
  );

  const handlelogout = () => {
    localStorage.removeItem("users");
    navigate("/");
  };

  const Item = ({ icon: Icon, label, active }) => (
    <div className={itemClass(active)}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!isCollapsed && <span className="menu-text">{label}</span>}
    </div>
  );

  return (
    <aside
      className={`h-screen bg-white shadow-[2px_0_10px_rgba(0,0,0,0.05)]
      transition-all duration-300 ease-in-out
      ${isCollapsed ? "w-16" : "w-64"}
      hidden md:flex flex-col fixed top-0 left-0`}
    >
      {/* MAIN NAV */}
      <Title>Main Navigation</Title>
      <Item icon={FaHome} label="Dashboard" active={activeKey === "dashboard"} />
      <NavLink to="/director/create-employee" className="w-full text-left">
      <Item
        icon={FaUserPlus}
        label="Create Employee"
        active={activeKey === "create"}
      />
      </NavLink>
      <Item icon={FaUsers} label="Manage Team" active={activeKey === "team"} />

      {/* REPORTS */}
      <Title>Reports</Title>
      <Item
        icon={FaChartBar}
        label="Performance"
        active={activeKey === "perf"}
      />
      <Item
        icon={FaMoneyBillWave}
        label="Financials"
        active={activeKey === "fin"}
      />

      {/* SETTINGS */}
      <Title>Settings</Title>
      <Item
        icon={FaCog}
        label="Account Settings"
        active={activeKey === "settings"}
      />

      <button onClick={handlelogout} className="w-full text-left">
        <Item icon={FaSignOutAlt} label="Logout" active={false} />
      </button>

      {/* COLLAPSE TOGGLE */}
      <button
        type="button"
        onClick={toggleCollapse}
        className="mt-auto w-full flex justify-end px-5 py-4 text-gray-500 hover:text-gray-700 transition"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <FaChevronRight className="w-4 h-4" />
        ) : (
          <FaChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
