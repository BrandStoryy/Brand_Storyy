/*  CommandCenter.jsx
    -----------------------------------------------------------
    REQUIREMENTS
    1. TailwindCSS  (v3+)
    2. Framer-motion
    3. lucide-react  (icon set used here)
    -----------------------------------------------------------
*/
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Zap,
  Calendar,
  TrendingUp,
  ExternalLink,
  CheckCircle2,
  Clock,
  Share2,
  Sparkles,
  Bot,
  Activity,
  ChevronDown,
  Send,
  Image,
  Paperclip,
  X,
  FileText,
  Info,
  Menu,
  Bell,
  Search,
  Settings,
  User,
  Home,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const pendingItems = {
  ALL: [
    {
      type: "Social Media",
      platform: "LinkedIn",
      title: "Product launch announcement",
      color: "bg-blue-500",
      time: "2 min ago",
    },
    {
      type: "Email",
      platform: "Newsletter",
      title: "Weekly digest - Tech trends",
      color: "bg-purple-500",
      time: "5 min ago",
    },
    {
      type: "Ad Copy",
      platform: "Google Ads",
      title: "Holiday sale campaign",
      color: "bg-green-500",
      time: "10 min ago",
    },
  ],
  Content: [
    {
      type: "Blog Post",
      platform: "Website",
      title: "AI trends in 2025",
      color: "bg-indigo-500",
      time: "1 hour ago",
    },
  ],
  Agents: [
    {
      type: "Blog Post",
      platform: "Website",
      title: "AI trends in 2025",
      color: "bg-indigo-500",
      time: "1 hour ago",
    },
  ],
  Campaigns: [
    {
      type: "Marketing",
      platform: "Multi-channel",
      title: "Q1 Product Launch",
      color: "bg-orange-500",
      time: "3 hours ago",
    },
  ],
  Analytics: [
    {
      type: "Report",
      platform: "Dashboard",
      title: "Monthly performance review",
      color: "bg-pink-500",
      time: "1 day ago",
    },
  ],
};

const recentDeployments = {
  ALL: [
    {
      type: "Social Media",
      platform: "Instagram",
      result: "+12% likes",
      time: "2 hours ago",
      color: "text-pink-500",
    },
    {
      type: "Email",
      platform: "Campaign",
      result: "18% open rate",
      time: "1 day ago",
      color: "text-blue-500",
    },
    {
      type: "Blog Post",
      platform: "Website",
      result: "1.2k views",
      time: "3 days ago",
      color: "text-green-500",
    },
  ],
  Agents: [
    {
      type: "Article",
      platform: "Medium",
      result: "2.5k reads",
      time: "4 hours ago",
      color: "text-indigo-500",
    },
  ],
  Content: [
    {
      type: "Article",
      platform: "Medium",
      result: "2.5k reads",
      time: "4 hours ago",
      color: "text-indigo-500",
    },
  ],
  Campaigns: [
    {
      type: "Ad Campaign",
      platform: "Google Ads",
      result: "3.2% CTR",
      time: "6 hours ago",
      color: "text-orange-500",
    },
  ],
  Analytics: [
    {
      type: "Conversion",
      platform: "Website",
      result: "4.8% rate",
      time: "12 hours ago",
      color: "text-pink-500",
    },
  ],
};

// Enhanced StatCard with better animations and mobile design
const StatCard = ({ title, value, icon: Icon, color, suffix = "" }) => {
  const [display, setDisplay] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !isVisible) {
          setIsVisible(true);
          const duration = 1500;
          const steps = 60;
          const inc = value / steps;
          let step = 0;
          const t = setInterval(() => {
            step += 1;
            setDisplay(Math.min(Math.round(step * inc), value));
            if (step >= steps) clearInterval(t);
          }, duration / steps);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [value, isVisible]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative overflow-hidden"
    >
      <div
        className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6
                     bg-white/90 backdrop-blur-xl border border-white/30
                     rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300
                     hover:border-white/50 group"
      >
        <div
          className={`p-3 sm:p-3 rounded-xl bg-gradient-to-br ${color.replace(
            "text-",
            "from-"
          )} to-transparent`}
        >
          <Icon
            className={`w-5 h-5 sm:w-6 sm:h-6 ${color} group-hover:scale-110 transition-transform`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-gray-500 truncate mb-1">
            {title}
          </p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
            {display}
            {suffix}
          </p>
        </div>
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </motion.div>
  );
};

// Enhanced Mobile Navigation
const MobileNav = ({ isOpen, onClose, activeTab, setActiveTab, TABS }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl border-r border-gray-200 z-50 lg:hidden shadow-2xl"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Bot className="w-8 h-8 text-purple-600" />
                <h2 className="text-xl font-bold">Command Center</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    onClose();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Enhanced Header Component
// const Header = ({ onMenuClick }) => (
//   <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-30">
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="flex items-center justify-between h-16 sm:h-20">
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={onMenuClick}
//             className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
//           >
//             <Menu size={20} />
//           </button>
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
//               <Bot className="w-6 h-6 text-white" />
//             </div>
//             <div className="hidden sm:block">
//               <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 Command Center
//               </h1>
//               <p className="text-xs text-gray-500">AI-Powered Dashboard</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center space-x-2 sm:space-x-4">
//           <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
//             <Search size={16} className="text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="bg-transparent text-sm focus:outline-none w-32 lg:w-48"
//             />
//           </div>
//           <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
//             <Bell size={18} />
//             <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
//           </button>
//           <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
//             <Settings size={18} />
//           </button>
//           <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
//             <User size={16} className="text-white" />
//           </div>
//         </div>
//       </div>
//     </div>
//   </header>
// );

// Enhanced AnimatedDots with better animation
const AnimatedDots = () => (
  <div className="flex ml-2 space-x-1">
    {[0, 0.2, 0.4].map((delay, index) => (
      <motion.div
        key={index}
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
        className="w-2 h-2 bg-purple-500 rounded-full"
      />
    ))}
  </div>
);

const LiveIndicator = () => (
  <div className="flex items-center space-x-2">
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-2 h-2 bg-green-500 rounded-full"
    />
    <span className="text-xs text-green-600 font-medium">LIVE</span>
  </div>
);

// Enhanced CreativeTaskPlanner with popup selection
const CreativeTaskPlanner = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]); // New state for multiple selections
  const [showPopup, setShowPopup] = useState(false); // New state for popup
  const [popupData, setPopupData] = useState(null); // Store popup content
  const [msg, setMsg] = useState("");
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [sticky, setSticky] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
 
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const categories = {
    "Social Media": {
      color: "from-purple-500 to-blue-500",
      options: [
        "Facebook",
        "Instagram", 
        "Twitter",
        "LinkedIn",
        "Reddit",
        "TikTok",
        "YouTube",
        "Pinterest",
      ],
    },
    "Email Marketing": {
      color: "from-green-500 to-teal-500",
      options: [
        "Newsletter",
        "Welcome Series",
        "Promotional",
        "Abandoned Cart",
        "Re-engagement",
        "Survey",
      ],
    },
    "Ad Copy": {
      color: "from-orange-500 to-red-500",
      options: [
        "Google Ads",
        "Facebook Ads",
        "Instagram Ads",
        "LinkedIn Ads",
        "Display Ads",
        "Video Ads",
      ],
    },
    "SEO Content": {
      color: "from-blue-500 to-indigo-500",
      options: [
        "Blog Posts",
        "Product Descriptions",
        "Meta Descriptions",
        "Landing Pages",
        "Category Pages",
      ],
    },
    "Website Funnel": {
      color: "from-pink-500 to-purple-500",
      options: [
        "Landing Page",
        "Sales Page",
        "Thank You Page",
        "Checkout Page",
        "About Page",
        "Contact Page",
      ],
    },
  };

  // Define detailed options for each category
  const detailedOptions = {
    "Google Ads": [
      "Search Ads",
      "Display Ads",
      "Shopping Ads",
      "Video Ads",
      "App Ads",
      "Smart Campaigns",
      "Performance Max",
      "Local Campaigns"
    ],
    "Facebook Ads": [
      "Photo Ads",
      "Video Ads",
      "Carousel Ads",
      "Collection Ads",
      "Instant Experience",
      "Lead Ads",
      "Dynamic Ads",
      "Messenger Ads"
    ],
    "Instagram Ads": [
      "Photo Ads",
      "Video Ads",
      "Stories Ads",
      "Reels Ads",
      "Carousel Ads",
      "Collection Ads",
      "Shopping Ads",
      "IGTV Ads"
    ],
    "LinkedIn Ads": [
      "Sponsored Content",
      "Message Ads",
      "Dynamic Ads",
      "Text Ads",
      "Video Ads",
      "Event Ads",
      "Document Ads",
      "Conversation Ads"
    ],
    "Display Ads": [
      "Banner Ads",
      "Rich Media Ads",
      "Interactive Ads",
      "Video Display",
      "Native Ads",
      "Popup Ads",
      "Interstitial Ads",
      "Expandable Ads"
    ],
    "Video Ads": [
      "YouTube Ads",
      "TikTok Ads",
      "Facebook Video",
      "Instagram Video",
      "LinkedIn Video",
      "Twitter Video",
      "Vimeo Ads",
      "Connected TV"
    ]
  };

  // Handle option click - open popup for Ad Copy, direct selection for others
  const handleOptionClick = (tab, option) => {
    if (tab === "Ad Copy" && detailedOptions[option]) {
      setPopupData({
        title: option,
        options: detailedOptions[option],
        category: tab
      });
      setShowPopup(true);
    } else {
      // Direct selection for other categories
      const newItem = {
        id: Date.now() + Math.random(),
        category: tab,
        option: option,
        type: 'single'
      };
      setSelectedItems(prev => [...prev, newItem]);
    }
    setActiveTab(null);
  };

  // Handle multiple selection from popup
  const handlePopupSelection = (selections) => {
    const newItems = selections.map(selection => ({
      id: Date.now() + Math.random() + Math.random(),
      category: popupData.category,
      option: popupData.title,
      subOption: selection,
      type: 'multiple'
    }));
    setSelectedItems(prev => [...prev, ...newItems]);
    setShowPopup(false);
    setPopupData(null);
  };

  // Remove selected item
  const removeSelectedItem = (id) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  const upload = (e, kind) => {
    const arr = [...e.target.files].map((f) => ({
      id: Date.now() + Math.random(),
      name: f.name,
      size: f.size,
      type: f.type,
    }));
    kind === "image"
      ? setImages((p) => [...p, ...arr])
      : setFiles((p) => [...p, ...arr]);
    e.target.value = "";
  };

  const remove = (id, kind) =>
    kind === "image"
      ? setImages((p) => p.filter((i) => i.id !== id))
      : setFiles((p) => p.filter((i) => i.id !== id));

  const send = () => {
    if (!msg.trim()) return;
    console.log({ 
      msg, 
      selectedItems, // Updated to include multiple selections
      images, 
      files 
    });
    setMsg("");
    setImages([]);
    setFiles([]);
    setSelectedItems([]); // Clear selected items
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setSticky(!entry.isIntersecting),
      { threshold: 0.1, rootMargin: "0px 0px -120px 0px" }
    );
    if (chatRef.current) io.observe(chatRef.current);
    return () => io.disconnect();
  }, []);

  const fmtSize = (b) => {
    if (!b) return "0 B";
    const k = 1024,
      sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return `${(b / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6">
      {/* Enhanced input section - same as before */}
      <div ref={chatRef} className="relative mb-6 sm:mb-8">
        <div className="relative bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <textarea
            className="w-full bg-transparent resize-none
                       px-4 sm:px-6 py-4 sm:py-5 pr-20 sm:pr-40 text-base sm:text-lg
                       placeholder-gray-500 focus:outline-none min-h-[60px] sm:min-h-[80px]"
            placeholder="✨ Start with a creative idea or task..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            style={{ resize: "none" }}
          />
          <div className="absolute right-3 bottom-3 flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg transition text-gray-400 hover:text-purple-600 hover:bg-purple-50"
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button
              onClick={() => imageInputRef.current?.click()}
              className="p-2 rounded-lg transition text-purple-600 hover:bg-purple-50"
            >
              <Image size={16} />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg transition text-blue-600 hover:bg-blue-50"
            >
              <Paperclip size={16} />
            </button>
            <button
              disabled={!msg.trim()}
              onClick={send}
              className={`p-2 rounded-lg transition ${
                msg.trim()
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
        onChange={(e) => upload(e, "file")}
      />
      <input
        ref={imageInputRef}
        type="file"
        multiple
        className="hidden"
        accept="image/*"
        onChange={(e) => upload(e, "image")}
      />

      {/* Enhanced attachments display - same as before */}
      {(images.length > 0 || files.length > 0) && (
        <div className="mb-6 space-y-4">
          {images.length > 0 && (
            <div className="bg-purple-50/80 rounded-2xl p-4">
              <h4 className="text-sm font-medium text-purple-700 mb-3">
                Images ({images.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {images.map((img) => (
                  <Attachment
                    key={img.id}
                    item={img}
                    icon={Image}
                    color="purple"
                    onRemove={() => remove(img.id, "image")}
                    fmtSize={fmtSize}
                  />
                ))}
              </div>
            </div>
          )}
          {files.length > 0 && (
            <div className="bg-blue-50/80 rounded-2xl p-4">
              <h4 className="text-sm font-medium text-blue-700 mb-3">
                Files ({files.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {files.map((file) => (
                  <Attachment
                    key={file.id}
                    item={file}
                    icon={FileText}
                    color="blue"
                    onRemove={() => remove(file.id, "file")}
                    fmtSize={fmtSize}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enhanced category tabs */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
          {Object.keys(categories).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab((p) => (p === tab ? null : tab))}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium
                          transition-all duration-300 relative overflow-hidden border
                          ${
                            activeTab === tab
                              ? `bg-gradient-to-r ${categories[tab].color} text-white shadow-lg border-transparent`
                              : "bg-white/90 border-gray-200 hover:bg-white hover:shadow-md"
                          }`}
            >
              <span className="flex items-center space-x-1 relative z-10">
                <span>{tab}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    activeTab === tab ? "rotate-180" : ""
                  }`}
                />
              </span>
            </motion.button>
          ))}
        </div>

        {/* Enhanced dropdown */}
        <AnimatePresence>
          {activeTab && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-4 sm:p-6 shadow-xl"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                {categories[activeTab].options.map((opt, index) => (
                  <motion.button
                    key={opt}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOptionClick(activeTab, opt)}
                    className="px-3 sm:px-4 py-2 sm:py-3 bg-white hover:bg-gray-50
                               border border-gray-200 rounded-xl text-xs sm:text-sm
                               transition-all duration-200 hover:shadow-md hover:border-gray-300"
                  >
                    {opt}
                    {activeTab === "Ad Copy" && detailedOptions[opt] && (
                      <span className="ml-1 text-xs text-purple-500">+</span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Items Tags */}
      {selectedItems.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Selected ({selectedItems.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10
                           border border-purple-500/20 rounded-full px-3 py-1 text-sm"
              >
                <span className="font-medium">
                  {item.category}: {item.option}
                  {item.subOption && ` - ${item.subOption}`}
                </span>
                <button
                  onClick={() => removeSelectedItem(item.id)}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <PopupModal
            data={popupData}
            onClose={() => {
              setShowPopup(false);
              setPopupData(null);
            }}
            onSelect={handlePopupSelection}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Popup Modal Component
const PopupModal = ({ data, onClose, onSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const handleConfirm = () => {
    if (selectedOptions.length > 0) {
      onSelect(selectedOptions);
      setSelectedOptions([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col" // Changed: removed overflow-hidden, added flex flex-col, increased max-h
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0"> {/* Added flex-shrink-0 */}
          <h3 className="text-xl font-semibold text-gray-800">
            Select {data?.title} Types
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1"> {/* Changed: removed max-h, added flex-1 */}
          <div className="grid grid-cols-1 gap-3">
            {data?.options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleOption(option)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200
                           ${selectedOptions.includes(option)
                             ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30'
                             : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                           }`}
              >
                <span className="font-medium">{option}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                               ${selectedOptions.includes(option)
                                 ? 'border-purple-500 bg-purple-500'
                                 : 'border-gray-300'
                               }`}>
                  {selectedOptions.includes(option) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 flex-shrink-0"> {/* Added flex-shrink-0 */}
          <span className="text-sm text-gray-600">
            {selectedOptions.length} selected
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedOptions.length === 0}
              className={`px-6 py-2 rounded-lg font-medium transition
                         ${selectedOptions.length > 0
                           ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg'
                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                         }`}
            >
              Add Selected ({selectedOptions.length})
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


 


// Enhanced Attachment component
const Attachment = ({ item, icon: Icon, color, onRemove, fmtSize }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`flex justify-between items-center p-3 rounded-xl
                   bg-${color}-50/80 border border-${color}-200/50 backdrop-blur-sm
                   hover:bg-${color}-100/80 transition-all duration-200`}
  >
    <div className="flex items-center space-x-3 min-w-0 flex-1">
      <Icon size={16} className={`text-${color}-600 flex-shrink-0`} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{item.name}</p>
        {item.size && (
          <span className="text-xs text-gray-500">{fmtSize(item.size)}</span>
        )}
      </div>
    </div>
    <button
      onClick={onRemove}
      className="p-1.5 rounded-lg transition text-red-600 hover:bg-red-100 flex-shrink-0"
    >
      <X size={14} />
    </button>
  </motion.div>
);

const SideBtn = ({
  icon: Icon,
  onClick,
  colored,
  disabled = false,
  small = false,
}) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.05 }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    disabled={disabled}
    onClick={onClick}
    className={`p-${
      small ? 2 : 3
    } rounded-xl transition-all duration-200 disabled:cursor-not-allowed
                ${
                  colored
                    ? disabled
                      ? "bg-gray-300 text-gray-500"
                      : "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-800 text-white hover:bg-gray-700 shadow-md hover:shadow-lg"
                }`}
  >
    <Icon size={16} />
  </motion.button>
);

const TABS = ["ALL", "Agents", "Content", "Campaigns", "Analytics"];

// Main CommandCenter component with enhanced features
const CommandCenter = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [stats, setStats] = useState({
    generated: 24,
    agents: 8,
    scheduled: 14,
    eng: 36,
  });
  const [pageIn, setPageIn] = useState(false);
  const [modalTab, setModalTab] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setIsLoading(true);
    const t = setTimeout(() => {
      setLoading(false);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, [activeTab]);

  useEffect(() => {
    setPageIn(true);
    setPageLoaded(true);
  }, []);

  const cardData = {
    ALL: {
      icon: Bot,
      color: "from-blue-500 to-purple-600",
      bg: "bg-blue-50",
      hover: "hover:bg-blue-100",
      title: "AI Agents",
      subtitle: "Manage your creative assistants",
      stats: "12 Active",
      content: {
        desc: "Monitor and control all your AI creative agents from one centralized dashboard.",
        features: [
          "Real-time monitoring",
          "Performance analytics",
          "Task scheduling",
          "Agent training",
        ],
        metrics: { active: 12, completed: 248, pending: 15, efficiency: "94%" },
      },
    },
    Agents: {
      icon: FileText,
      color: "from-green-500 to-teal-600",
      bg: "bg-green-50",
      hover: "hover:bg-green-100",
      title: "Content Library",
      subtitle: "Review and manage content",
      stats: "89 Items",
      content: {
        desc: "Centralized hub for all your AI-generated content.",
        features: [
          "Preview & edit",
          "Multi-channel publish",
          "Version control",
          "Collaborative reviews",
        ],
        metrics: { total: 89, published: 67, draft: 15, pending: 7 },
      },
    },
    Content: {
      icon: FileText,
      color: "from-green-500 to-teal-600",
      bg: "bg-green-50",
      hover: "hover:bg-green-100",
      title: "Content Library",
      subtitle: "Review and manage content",
      stats: "89 Items",
      content: {
        desc: "Centralized hub for all your AI-generated content.",
        features: [
          "Preview & edit",
          "Multi-channel publish",
          "Version control",
          "Collaborative reviews",
        ],
        metrics: { total: 89, published: 67, draft: 15, pending: 7 },
      },
    },
    Campaigns: {
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      bg: "bg-orange-50",
      hover: "hover:bg-orange-100",
      title: "Campaign Manager",
      subtitle: "Track campaign performance",
      stats: "5 Active",
      content: {
        desc: "Comprehensive campaign management and tracking system.",
        features: [
          "Campaign planning",
          "Multi-channel execution",
          "Performance tracking",
          "ROI optimization",
        ],
        metrics: { active: 5, completed: 23, conversion: "4.2%", roi: "312%" },
      },
    },
    Analytics: {
      icon: BarChart3,
      color: "from-purple-500 to-pink-600",
      bg: "bg-purple-50",
      hover: "hover:bg-purple-100",
      title: "Analytics Hub",
      subtitle: "Data-driven insights",
      stats: "↑ 23.5%",
      content: {
        desc: "Comprehensive analytics and reporting dashboard.",
        features: [
          "Real-time metrics",
          "Custom reports",
          "Predictive analytics",
          "Export tools",
        ],
        metrics: {
          impressions: "2.4M",
          engagement: "23.5%",
          conversion: "4.2%",
          revenue: "$12,450",
        },
      },
    },
  };

  const Skeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-6 bg-gray-200/60 rounded-2xl h-40 sm:h-48" />
      ))}
    </div>
  );

  const cards = Array.from({ length: 4 }, (_, i) => {
    const base = cardData[activeTab];
    return {
      ...base,
      id: `${activeTab}-${i}`,
      title: `${base.title} ${i + 1}`,
    };
  });

    const handleExternalLinkClick = (item, e) => {
    e.stopPropagation(); // Prevent card click if you have one
    
    // Navigate to PageDetails with the item type as state
    navigate('/PageDetails', { 
      state: { contentType: item.type } 
    });
  };

  const renderCard = (item, index, isPending = true) => (
    <motion.div
      key={`${item.type}-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="flex items-center justify-between p-3 sm:p-4 bg-white/80 rounded-2xl 
                 hover:bg-white/90 transition-all duration-300 group cursor-pointer 
                 border border-gray-100 hover:border-gray-200 hover:shadow-md"
    >
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div
            className={`w-3 h-3 ${item.color} rounded-full animate-pulse`}
          ></div>
          {!isPending && <LiveIndicator />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-gray-900 truncate">
              {item.type}
            </span>
            <span className="text-xs text-gray-500 truncate hidden sm:inline">
              {item.platform}
            </span>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors truncate">
            {isPending ? item.title : item.time}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        {isPending ? (
          <>
              <motion.button 
              onClick={(e) => handleExternalLinkClick(item, e)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-purple-600 transition-all duration-300 rounded-lg hover:bg-purple-50"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.button>
            <button className="p-2 text-gray-400 hover:text-green-600 transition-all duration-300 hover:scale-110 rounded-lg hover:bg-green-50">
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <span
              className={`text-sm font-medium ${item.color} hidden sm:inline`}
            >
              {item.result}
            </span>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110 rounded-lg hover:bg-blue-50">
              <Share2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );

  const renderEmpty = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-12 text-gray-400"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <Info size={24} />
      </div>
      <p className="text-sm">No data available for this section.</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50">
      {/* Enhanced Header */}

      {/* Mobile Navigation */}

      {/* Hero Section */}
      <section className="text-center py-8 sm:py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
              AI Command Center
            </h1>
            <AnimatedDots />
          </div>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Orchestrate your AI agents, manage content creation, and monitor
            performance from one unified dashboard.
          </p>
        </motion.div>
      </section>

      {/* Creative Task Planner */}
      <CreativeTaskPlanner />

      {/* Main Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Desktop Tab Navigation */}
        {/* Desktop Tab Navigation */}
        <div className="hidden lg:flex justify-center gap-4 mb-8 sticky top-16 z-50 bg-white/95 backdrop-blur-sm py-4 -mx-4 px-4">
          {TABS.map((t) => (
            <motion.button
              key={t}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(t)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 border-2
                  ${
                    activeTab === t
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg"
                      : "text-gray-600 border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-md bg-white/80"
                  }`}
            >
              {t}
            </motion.button>
          ))}
        </div>

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-6 sticky top-0 z-50 bg-white/95 backdrop-blur-sm py-4 -mx-4 px-4">
          <div className="bg-white/80 rounded-2xl p-2 border border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                      ${
                        activeTab === t
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <StatCard
            title="Content Generated"
            value={stats.generated}
            icon={BarChart3}
            color="text-blue-500"
          />
          <StatCard
            title="Active Agents"
            value={stats.agents}
            icon={Zap}
            color="text-green-500"
          />
          <StatCard
            title="Scheduled Posts"
            value={stats.scheduled}
            icon={Calendar}
            color="text-purple-500"
          />
          <StatCard
            title="Engagement Rate"
            value={stats.eng}
            icon={TrendingUp}
            color="text-orange-500"
            suffix="%"
          />
        </div>

        {/* Enhanced Cards Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Skeleton />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
            >
              {cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setModalTab(activeTab)}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${c.bg} ${c.hover} cursor-pointer border-2 border-white/50
                                  rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-2xl 
                                  transition-all duration-300 backdrop-blur-sm group relative overflow-hidden`}
                  >
                    {/* Background gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div
                          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${c.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <span className="bg-white/90 px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-md">
                          {c.stats}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                        {c.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{c.subtitle}</p>
                      <div className="flex items-center text-xs sm:text-sm text-gray-500 group-hover:text-purple-600 transition-colors">
                        <span>Click to explore</span>
                        <ExternalLink
                          size={12}
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Main Grid - Pending & Deployments */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Pending Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 
                       border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="p-2 bg-orange-100 rounded-xl">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Pending Review
              </h3>
              <div className="flex-1" />
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
                {pendingItems[activeTab]?.length || 0} items
              </span>
            </div>
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-14 sm:h-16 bg-gray-200/60 rounded-2xl"
                  ></div>
                ))}
              </div>
            ) : pendingItems[activeTab]?.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {pendingItems[activeTab].map((item, index) =>
                  renderCard(item, index, true)
                )}
              </div>
            ) : (
              renderEmpty()
            )}
          </motion.div>

          {/* Deployments Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 
                       border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="p-2 bg-green-100 rounded-xl">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Recent Deployments
              </h3>
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 animate-pulse" />
              <div className="flex-1" />
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                {recentDeployments[activeTab]?.length || 0} deployed
              </span>
            </div>
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-14 sm:h-16 bg-gray-200/60 rounded-2xl"
                  ></div>
                ))}
              </div>
            ) : recentDeployments[activeTab]?.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {recentDeployments[activeTab].map((item, index) =>
                  renderCard(item, index, false)
                )}
              </div>
            ) : (
              renderEmpty()
            )}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {modalTab && (
          <motion.div
            onClick={() => setModalTab(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] 
                         overflow-y-auto p-6 sm:p-8 shadow-2xl border-2 border-white/50"
            >
              {(() => {
                const data = cardData[modalTab];
                const Icon = data.icon;
                return (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${data.color} text-white shadow-lg`}
                        >
                          <Icon size={28} className="sm:w-8 sm:h-8" />
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-bold">
                            {data.title}
                          </h2>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {data.subtitle}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setModalTab(null)}
                        className="p-3 rounded-xl transition text-gray-600 hover:bg-gray-100"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <p className="text-gray-700 mb-8 text-sm sm:text-base leading-relaxed">
                      {data.content.desc}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
                      <div>
                        <h3 className="font-semibold text-lg mb-4">
                          Key Features
                        </h3>
                        <div className="space-y-3">
                          {data.content.features.map((f, index) => (
                            <motion.div
                              key={f}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center p-3 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors"
                            >
                              <CheckCircle2
                                size={16}
                                className="text-green-500 mr-3 flex-shrink-0"
                              />
                              <span className="text-sm sm:text-base">{f}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-4">
                          Performance Metrics
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(data.content.metrics).map(
                            ([k, v], index) => (
                              <motion.div
                                key={k}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl text-center
                                         hover:shadow-md transition-all duration-200 border border-gray-100/50"
                              >
                                <p className="text-xl sm:text-2xl font-bold mb-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                  {v}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 capitalize font-medium">
                                  {k.replace(/([A-Z])/g, " $1").trim()}
                                </p>
                              </motion.div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 px-6 py-4 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl
                                  bg-gradient-to-r ${data.color} transition-all duration-200`}
                      >
                        View Detailed Analytics
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setModalTab(null)}
                        className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-2xl font-medium transition-all duration-200"
                      >
                        Close
                      </motion.button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideInFromBottom {
          animation: slideInFromBottom 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }

        /* Enhanced glass effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default CommandCenter;
