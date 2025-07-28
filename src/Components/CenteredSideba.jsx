import React, { useState } from "react";
import { Bot, LayoutDashboard, Plug, BadgeDollarSign , Home } from "lucide-react";
import { Link, NavLink , useNavigate  } from "react-router-dom";

const CenteredSidebar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const navigationItems = [
     { id: "home", label: "Home", icon: Home },
    { id: "agents", label: "AI Agents", icon: Bot },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "integrations", label: "Integrations", icon: Plug },
    { id: "pricing", label: "Pricing", icon: BadgeDollarSign },
  ];

const handleItemClick = (id) => {
  setActiveItem(id);
  console.log("Navigating to:", id);

  const routes = {
      home: "/",
    agents: "/agents",
    dashboard: "/dashboard",
    integrations: "/integrations",
    pricing: "/pricing",
   
  };

  navigate(routes[id] || "/");
};


  return (
    <>
      {/* Centered Sidebar on large screens */}
      <div className="hidden lg:flex fixed left-6 top-1/2   z-50">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-3 flex flex-col space-y-3 animate-slideInScale">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isSpecial = item.isSpecial;

            return (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110 active:scale-95
                    ${
                      isSpecial
                        ? "bg-black text-white hover:bg-gray-800"
                        : isActive
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                    }`}
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${
                      index * 0.08 + 0.2
                    }s both`,
                  }}
                >
                  <Icon className="w-5 h-5" />

                  {/* Active indicator */}
                  {isActive && !isSpecial && (
                    <div className="absolute -right-1 -top-1 w-3 h-3 bg-blue-500 rounded-full shadow-sm animate-scaleIn">
                      <div className="w-full h-full bg-blue-500 rounded-full animate-pulseIndicator" />
                    </div>
                  )}
                </button>

                {/* Tooltip */}
                {hoveredItem === item.id && (
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap z-50 shadow-xl animate-tooltipFadeIn">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tailwind-style animations */}
      <style jsx>{`
        @keyframes slideInScale {
          from {
            transform: translateY(-50%) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateY(-50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes pulseIndicator {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes tooltipFadeIn {
          from {
            transform: translateX(-10px) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        .animate-slideInScale {
          animation: slideInScale 0.8s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out both;
        }
        .animate-pulseIndicator {
          animation: pulseIndicator 2s ease-in-out infinite;
        }
        .animate-tooltipFadeIn {
          animation: tooltipFadeIn 0.2s ease-out both;
        }
      `}</style>
    </>
  );
};

export default CenteredSidebar;
