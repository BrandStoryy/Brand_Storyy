import React, { useState } from "react";
import { Bot, LayoutDashboard, Plug, BadgeDollarSign, Home } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CenteredSidebar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const navigationItems = [
    { id: "home", label: "Home", icon: Home, color: "from-blue-500 to-cyan-500" },
    { id: "agents", label: "AI Agents", icon: Bot, color: "from-purple-500 to-pink-500" },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "from-green-500 to-emerald-500" },
    { id: "integrations", label: "Integrations", icon: Plug, color: "from-orange-500 to-red-500" },
    { id: "pricing", label: "Pricing", icon: BadgeDollarSign, color: "from-yellow-500 to-amber-500" },
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

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const tooltipVariants = {
    hidden: { opacity: 0, x: -10, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    exit: {
      opacity: 0,
      x: -10,
      scale: 0.9,
      transition: { duration: 0.15 }
    }
  };

  return (
    <>
      {/* Centered Sidebar on large screens */}
      <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-2 flex flex-col space-y-2 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 animate-gradient-shift rounded-3xl" />
          
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative"
              >
                <motion.button
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 group overflow-hidden
                    ${isActive
                      ? "text-white shadow-xl"
                      : "bg-white/10 hover:bg-white/20 text-gray-700 hover:text-white backdrop-blur-sm"
                    }`}
                >
                  {/* Active background gradient */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl`}
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    />
                  )}

                  {/* Hover glow effect */}
                  {isHovered && !isActive && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 rounded-2xl`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.2, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Icon with animation */}
                  <motion.div
                    className="relative z-10"
                    animate={isActive ? { 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.div>

                  {/* Active indicator with pulse */}
                  {isActive && (
                    <motion.div
                      className="absolute -right-0.5 -top-0.5 w-2.5 h-2.5 bg-white rounded-full shadow-lg"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.2, 1],
                        opacity: 1
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.23, 1, 0.32, 1]
                      }}
                    >
                      <motion.div
                        className="w-full h-full bg-white rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Ripple effect on click */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={false}
                    animate={isActive ? {
                      boxShadow: [
                        "0 0 0 0 rgba(147, 51, 234, 0.7)",
                        "0 0 0 10px rgba(147, 51, 234, 0)",
                        "0 0 0 0 rgba(147, 51, 234, 0)"
                      ]
                    } : {}}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>

                {/* Enhanced Tooltip */}
                <AnimatePresence>
                  {hoveredItem === item.id && (
                    <motion.div
                      variants={tooltipVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute left-14 top-1/2 -translate-y-1/2 z-50"
                    >
                      <div className={`bg-gradient-to-r ${item.color} text-white px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shadow-2xl relative`}>
                        {item.label}
                        
                        {/* Tooltip arrow */}
                        <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gradient-to-r ${item.color} rotate-45`} />
                        
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-xl"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut"
                          }}
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Floating particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + i * 20}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 6s ease infinite;
        }
      `}</style>
    </>
  );
};

export default CenteredSidebar;
