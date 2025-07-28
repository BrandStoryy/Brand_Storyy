import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, Image, Paperclip, X } from 'lucide-react';

const CreativeTaskPlanner = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [attachedImages, setAttachedImages] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const chatBoxRef = useRef(null);
  const containerRef = useRef(null);

  const tabs = {
    'Social Media': {
      color: 'from-purple-500 to-blue-500',
      options: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'Reddit', 'TikTok', 'YouTube', 'Pinterest']
    },
    'Email Marketing': {
      color: 'from-green-500 to-teal-500',
      options: ['Newsletter', 'Welcome Series', 'Promotional', 'Abandoned Cart', 'Re-engagement', 'Survey']
    },
    'Ad Copy': {
      color: 'from-orange-500 to-red-500',
      options: ['Google Ads', 'Facebook Ads', 'Instagram Ads', 'LinkedIn Ads', 'Display Ads', 'Video Ads']
    },
    'SEO Content': {
      color: 'from-blue-500 to-indigo-500',
      options: ['Blog Posts', 'Product Descriptions', 'Meta Descriptions', 'Landing Pages', 'Category Pages']
    },
    'Website Funnel': {
      color: 'from-pink-500 to-purple-500',
      options: ['Landing Page', 'Sales Page', 'Thank You Page', 'Checkout Page', 'About Page', 'Contact Page']
    }
  };

  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
      setSelectedOption(null);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption({ tab: activeTab, option });
    setActiveTab(null);
  };

  const handleFileAttach = (type) => {
    // Simulate file attachment
    const fileName = `${type === 'image' ? 'image' : 'file'}_${Date.now()}.${type === 'image' ? 'jpg' : 'pdf'}`;
    if (type === 'image') {
      setAttachedImages([...attachedImages, fileName]);
    } else {
      setAttachedFiles([...attachedFiles, fileName]);
    }
  };

  const removeAttachment = (fileName, type) => {
    if (type === 'image') {
      setAttachedImages(attachedImages.filter(img => img !== fileName));
    } else {
      setAttachedFiles(attachedFiles.filter(file => file !== fileName));
    }
  };

  const handleSend = () => {
    console.log({
      userMessage: userInput,
      category: selectedOption?.tab || 'None',
      focus: selectedOption?.option || 'None',
      attachedImages,
      attachedFiles,
      timestamp: new Date().toISOString()
    });
    
    // Reset form
    setUserInput('');
    setAttachedFiles([]);
    setAttachedImages([]);
  };

  // Intersection Observer for sticky behavior
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (chatBoxRef.current) {
      observer.observe(chatBoxRef.current);
    }

    return () => {
      if (chatBoxRef.current) {
        observer.unobserve(chatBoxRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 bg-transparent" ref={containerRef}>
      {/* Header Input */}
      <div className="mb-6 sm:mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Start with a creative idea or task"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <button className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <span className="text-lg sm:text-xl">+</span>
            </button>
            <button className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <span className="text-lg sm:text-xl">🌐</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
          {Object.keys(tabs).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-gray-800 text-sm sm:text-base font-medium transition-all duration-300 relative overflow-hidden ${
                activeTab === tab 
                  ? 'bg-gradient-to-r ' + tabs[tab].color + ' text-white shadow-lg' 
                  : 'bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-1 sm:space-x-2">
                <span className="whitespace-nowrap">{tab}</span>
                <motion.div
                  animate={{ rotate: activeTab === tab ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={14} className="sm:w-4 sm:h-4" />
                </motion.div>
              </span>
            </motion.button>
          ))}
        </div>

        {/* Dropdown Options */}
        <AnimatePresence>
          {activeTab && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-3 sm:p-6 mb-4 sm:mb-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {tabs[activeTab].options.map((option, index) => (
                  <motion.button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className="px-3 sm:px-4 py-2 sm:py-3 bg-white/90 hover:bg-white/80 rounded-xl text-gray-800 text-sm sm:text-base font-medium transition-all duration-300 border border-gray-200 hover:border-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sample Suggestions */}
      <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
        {[
          'A Luxury Logo for an Artisanal Gelato Brand.',
          'A Takeout Packaging for a Italian Restaurant.',
          'A Watercolor-Style Digital Presence for a Smoothie Brand.',
          'A Cohesive Store Interior Design Based on Brand Identity'
        ].map((suggestion, index) => (
          <motion.div
            key={suggestion}
            className="flex items-center justify-between p-3 sm:p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white/90 transition-all duration-300 cursor-pointer group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setUserInput(suggestion)}
          >
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm sm:text-base pr-2">{suggestion}</span>
            <motion.div
              className="text-gray-500 group-hover:text-gray-700 transition-colors flex-shrink-0"
              whileHover={{ x: 5 }}
            >
              ↗
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Selected Option Display */}
      <AnimatePresence>
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r ${tabs[selectedOption.tab].color} flex-shrink-0`}></div>
                <span className="text-gray-800 font-medium text-sm sm:text-base truncate">
                  {selectedOption.tab} - {selectedOption.option}
                </span>
              </div>
              <button
                onClick={() => setSelectedOption(null)}
                className="text-gray-600 hover:text-gray-800 transition-colors ml-2 flex-shrink-0"
              >
                <X size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <div 
        ref={chatBoxRef}
        className={`transition-all duration-300 ${
          isSticky 
            ? 'fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-4xl px-3 sm:px-6 pb-3 sm:pb-6' 
            : 'relative'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-3 sm:p-6">
          {/* Attachments Display */}
          <AnimatePresence>
            {(attachedImages.length > 0 || attachedFiles.length > 0) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 sm:mb-4 space-y-2"
              >
                {attachedImages.map((img, index) => (
                  <motion.div
                    key={img}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-2 bg-blue-500/20 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <Image size={14} className="text-blue-600 flex-shrink-0 sm:w-4 sm:h-4" />
                      <span className="text-gray-700 text-xs sm:text-sm truncate">{img}</span>
                    </div>
                    <button
                      onClick={() => removeAttachment(img, 'image')}
                      className="text-gray-500 hover:text-gray-700 transition-colors ml-2 flex-shrink-0"
                    >
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  </motion.div>
                ))}
                {attachedFiles.map((file, index) => (
                  <motion.div
                    key={file}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-2 bg-green-500/20 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <Paperclip size={14} className="text-green-600 flex-shrink-0 sm:w-4 sm:h-4" />
                      <span className="text-gray-700 text-xs sm:text-sm truncate">{file}</span>
                    </div>
                    <button
                      onClick={() => removeAttachment(file, 'file')}
                      className="text-gray-500 hover:text-gray-700 transition-colors ml-2 flex-shrink-0"
                    >
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <div className="flex items-end space-x-2 sm:space-x-3">
            <div className="flex-1">
              <textarea
                placeholder="Describe your creative task in detail..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
                rows="2"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-1 sm:space-y-2">
              <motion.button
                onClick={() => handleFileAttach('image')}
                className="p-2 sm:p-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition-all duration-300 border border-gray-600 hover:border-gray-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image size={16} className="sm:w-[18px] sm:h-[18px]" />
              </motion.button>
              
              <motion.button
                onClick={() => handleFileAttach('file')}
                className="p-2 sm:p-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition-all duration-300 border border-gray-600 hover:border-gray-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Paperclip size={16} className="sm:w-[18px] sm:h-[18px]" />
              </motion.button>
              
              <motion.button
                onClick={handleSend}
                disabled={!userInput.trim()}
                className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                  userInput.trim()
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                whileHover={userInput.trim() ? { scale: 1.05 } : {}}
                whileTap={userInput.trim() ? { scale: 0.95 } : {}}
              >
                <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTaskPlanner;