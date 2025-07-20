import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart3, Zap, Calendar, TrendingUp, Eye, CheckCircle2, Clock,
  ExternalLink, Share2, Play, Sparkles, Bot, Activity
} from 'lucide-react';

// Enhanced StatCard with counting animation
const StatCard = ({ title, value, icon: Icon, color, suffix = "", shouldAnimate }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && shouldAnimate) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [shouldAnimate]);

  useEffect(() => {
    if (isVisible && shouldAnimate) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setDisplayValue(Math.min(Math.floor(increment * currentStep), value));
        
        if (currentStep >= steps) {
          clearInterval(timer);
          setDisplayValue(value);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    } else if (!shouldAnimate) {
      setDisplayValue(value);
    }
  }, [isVisible, value, shouldAnimate]);

  return (
    <div 
      ref={cardRef}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-md border border-white/20 flex items-center space-x-3 sm:space-x-4 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:bg-white/90"
    >
      <div className={`p-2 sm:p-3 rounded-full bg-gray-100 ${color} transform transition-transform duration-300 hover:rotate-12`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs sm:text-sm text-gray-500 truncate">{title}</div>
        <div className="text-lg sm:text-xl font-bold text-gray-900">
          {displayValue}
          {suffix}
        </div>
      </div>
    </div>
  );
};

// Enhanced TypeWriter component for animated text
const TypeWriter = ({ text, speed = 100, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Animated dots component
const AnimatedDots = () => (
  <div className="flex space-x-1 ml-2">
    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
  </div>
);

// Live indicator component
const LiveIndicator = () => (
  <div className="flex items-center space-x-2">
    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    <span className="text-xs text-green-600 font-medium">LIVE</span>
  </div>
);

const tabs = ["AI Agents", "Content", "Campaigns", "Analytics"];

const CommandCenter = () => {
  const [activeTab, setActiveTab] = useState("AI Agents");
  const [isLoading, setIsLoading] = useState(true);
  const [pulseEffect, setPulseEffect] = useState(true);
  const [shouldAnimateStats, setShouldAnimateStats] = useState(true);
  const [currentStats, setCurrentStats] = useState({
    contentGenerated: 24,
    activeAgents: 8,
    scheduledPosts: 14,
    engagementRate: 36
  });
  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  const baseStats = {
    contentGenerated: 24,
    activeAgents: 8,
    scheduledPosts: 14,
    engagementRate: 36
  };

  const statMessages = [
    `Your AI agents generated ${currentStats.contentGenerated} pieces of content this week.`,
    `You have ${currentStats.activeAgents} active agents working for you right now.`,
    `${currentStats.scheduledPosts} posts are scheduled for publication this week.`,
    `Your engagement rate has reached ${currentStats.engagementRate}% this month.`
  ];

  const pendingItems = {
    "AI Agents": [
      {
        type: "Social Media",
        platform: "LinkedIn",
        title: "Product launch announcement",
        color: "bg-blue-500",
        time: "2 min ago"
      },
      {
        type: "Email",
        platform: "Newsletter",
        title: "Weekly digest - Tech trends",
        color: "bg-purple-500",
        time: "5 min ago"
      },
      {
        type: "Ad Copy",
        platform: "Google Ads",
        title: "Holiday sale campaign",
        color: "bg-green-500",
        time: "10 min ago"
      }
    ],
    "Content": [],
    "Campaigns": [],
    "Analytics": []
  };

  const recentDeployments = {
    "AI Agents": [
      {
        type: "Social Media",
        platform: "Instagram",
        result: "+12% likes",
        time: "2 hours ago",
        color: "text-pink-500"
      },
      {
        type: "Email",
        platform: "Campaign",
        result: "18% open rate",
        time: "1 day ago",
        color: "text-blue-500"
      },
      {
        type: "Blog Post",
        platform: "Website",
        result: "1.2k views",
        time: "3 days ago",
        color: "text-green-500"
      }
    ],
    "Content": [],
    "Campaigns": [],
    "Analytics": []
  };

  useEffect(() => {
    // Initial page load animation
    setTimeout(() => {
      setPageLoaded(true);
    }, 500);

    // Disable stats animation after initial load
    setTimeout(() => {
      setShouldAnimateStats(false);
    }, 3000);

    // Cycle through stat messages every 3 seconds
    const messageInterval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % statMessages.length);
    }, 3000);

    // Stats update interval (every 3 seconds)
    const statsInterval = setInterval(() => {
      setCurrentStats(prev => ({
        contentGenerated: prev.contentGenerated + Math.floor(Math.random() * 3),
        activeAgents: prev.activeAgents + Math.floor(Math.random() * 2),
        scheduledPosts: prev.scheduledPosts + Math.floor(Math.random() * 2),
        engagementRate: Math.min(100, prev.engagementRate + Math.floor(Math.random() * 5))
      }));
    }, 3000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(statsInterval);
    };
  }, [statMessages.length]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [activeTab]);

  const renderCard = (item, index, isPending = true) => (
    <div
      key={index}
      className={`flex items-center justify-between p-3 sm:p-4 bg-gray-50/80 rounded-2xl hover:bg-gray-100/80 transition-all duration-300 group cursor-pointer transform hover:scale-[1.02] ${
        pageLoaded ? 'animate-fadeInUp' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
          {!isPending && <LiveIndicator />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-gray-900 truncate">{item.type}</span>
            <span className="text-xs text-gray-500 truncate">{item.platform}</span>
          </div>
          <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors truncate">
            {isPending ? item.title : item.time}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        {isPending ? (
          <>
            <button className="p-2 text-gray-400 hover:text-purple-600 transition-all duration-300 hover:scale-110">
              <ExternalLink className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-green-600 transition-all duration-300 hover:scale-110">
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <span className={`text-sm font-medium ${item.color} hidden sm:inline`}>{item.result}</span>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110">
              <Share2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  const renderEmpty = () => (
    <div
      className={`text-center py-10 text-gray-400 text-sm italic ${
        pageLoaded ? 'animate-fadeIn' : 'opacity-0'
      }`}
    >
      No data available for this tab.
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-pink-300/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 ${pageLoaded ? 'animate-fadeInDown' : 'opacity-0'}`}>
          <div className="flex items-center justify-center space-x-3 mb-4 flex-wrap">
            <Bot className={`w-6 h-6 sm:w-8 sm:h-8 text-purple-600 ${pulseEffect ? 'animate-pulse scale-110' : ''} transition-all duration-300`} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Your Command Center
            </h1>
            <AnimatedDots />
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Monitor all your AI agents, review content before it goes live, and deploy directly to
            your channels – all from one unified dashboard.
          </p>
        </div>

        {/* Welcome Section */}
        <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-4 sm:p-8 mb-6 sm:mb-8 border border-white/20 shadow-xl ${pageLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 flex items-center flex-wrap">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2 animate-pulse" />
                Welcome back, Sarah!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                <span className="font-semibold text-purple-600">
                  <TypeWriter 
                  text={statMessages[currentStatIndex]}
                  speed={50}
                />
                </span>
              </p>
             
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-3 rounded-2xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 flex items-center space-x-2 active:scale-95 w-full sm:w-auto justify-center">
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Trigger All Agents</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8 ${pageLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <StatCard 
            title="Content Generated" 
            value={currentStats.contentGenerated} 
            icon={BarChart3} 
            color="text-blue-500" 
            shouldAnimate={shouldAnimateStats}
          />
          <StatCard 
            title="Active Agents" 
            value={currentStats.activeAgents} 
            icon={Zap} 
            color="text-green-500" 
            shouldAnimate={shouldAnimateStats}
          />
          <StatCard 
            title="Scheduled Posts" 
            value={currentStats.scheduledPosts} 
            icon={Calendar} 
            color="text-purple-500" 
            shouldAnimate={shouldAnimateStats}
          />
          <StatCard 
            title="Engagement Rate" 
            value={currentStats.engagementRate} 
            icon={TrendingUp} 
            color="text-orange-500" 
            suffix="%" 
            shouldAnimate={shouldAnimateStats}
          />
        </div>

        {/* Tab Filters */}
        <div className={`flex justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2 ${pageLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
          {tabs.map(tab => (
            <button
              key={tab}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border whitespace-nowrap ${
                activeTab === tab
                  ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              } transition-all duration-300 transform hover:scale-105 active:scale-95`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Pending */}
          <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-4 sm:p-8 border border-white/20 shadow-xl ${pageLoaded ? 'animate-fadeInLeft' : 'opacity-0'}`}>
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Pending Review</h3>
            </div>
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 sm:h-14 bg-gray-200/60 rounded-2xl"></div>
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
          </div>

          {/* Deployments */}
          <div className={`bg-white/80 backdrop-blur-lg rounded-3xl p-4 sm:p-8 border border-white/20 shadow-xl ${pageLoaded ? 'animate-fadeInRight' : 'opacity-0'}`}>
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Recent Deployments</h3>
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 animate-pulse" />
            </div>
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 sm:h-14 bg-gray-200/60 rounded-2xl"></div>
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
          </div>
        </div>
      </div>

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
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CommandCenter;