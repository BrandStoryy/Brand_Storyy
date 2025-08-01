 

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Calendar,
//   Clock,
//   Bot,
//   Eye,
//   CheckCircle,
//   Sparkles,
//   MessageCircle,
//   Heart,
//   Share2,
//   MoreHorizontal,
//   Send,
//   Star,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// // Using the data.json structure from our previous conversation
// import mockData from "./data.json";

// const DynamicPage = ({ contentType: propContentType }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Get contentType from location state (from navigation) or props
//   const contentType = location.state?.contentType || propContentType || "Social Media";
  
//   const [activeTab, setActiveTab] = useState("generated");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [selectedOccasion, setSelectedOccasion] = useState(null);
//   const [showAIPopup, setShowAIPopup] = useState(false);
//   const [currentSuggestion, setCurrentSuggestion] = useState(0);
  
//   const aiPopupTimer = useRef(null);

//   const contentData = mockData.contentTypes[contentType];
  
//   if (!contentData) {
//     return <div className="text-sm text-red-500">Content type not found</div>;
//   }

//   const { generated, preview, icon, color } = contentData;

//   // AI Popup Logic with smoother animations
//   useEffect(() => {
//     if (activeTab === "generated") {
//       aiPopupTimer.current = setInterval(() => {
//         setShowAIPopup(true);
//         setCurrentSuggestion(
//           (prev) => (prev + 1) % mockData.aiSuggestions.length
//         );

//         setTimeout(() => {
//           setShowAIPopup(false);
//         }, 4000);
//       }, 6000);
//     }

//     return () => {
//       if (aiPopupTimer.current) {
//         clearInterval(aiPopupTimer.current);
//       }
//     };
//   }, [activeTab]);

//   const handleSchedule = () => {
//     if ((selectedDate && selectedTime) || selectedOccasion) {
//       navigate("/dashboard");
//     }
//   };

//   const handleOccasionSelect = (occasion) => {
//     setSelectedOccasion(occasion);
//     setSelectedDate(occasion.date);
//     setSelectedTime(occasion.time);
//   };

//   const isScheduleActive = (selectedDate && selectedTime) || selectedOccasion;

//   // Smooth page transitions
//   const pageVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -20 }
//   };

//   return (
//     <motion.div 
//       className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 pb-20"
//       variants={pageVariants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       transition={{ duration: 0.6 }}
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
//           {/* Left Section - 8 columns */}
//           <motion.div 
//             className="lg:col-span-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//           >
//             {/* Header */}
//             <div className="p-4 border-b border-gray-200/50">
//               <div className="flex items-center gap-3">
//                 <motion.div
//                   className={`w-10 h-10 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-lg`}
//                   whileHover={{ scale: 1.1, rotate: 5 }}
//                   transition={{ type: "spring", stiffness: 400 }}
//                 >
//                   {icon}
//                 </motion.div>
//                 <div>
//                   <h1 className="text-xl font-bold text-gray-800">
//                     {contentType}
//                   </h1>
//                   <p className="text-sm text-gray-600">Content Generator & Preview</p>
//                 </div>
//               </div>
//             </div>

//             {/* Tab Navigation */}
//             <div className="px-4 pt-3">
//               <div className="flex space-x-1 bg-gray-100/50 rounded-xl p-1">
//                 {["generated", "preview"].map((tab) => (
//                   <motion.button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all duration-300 capitalize
//                       ${
//                         activeTab === tab
//                           ? `bg-white shadow-md text-gray-800`
//                           : "text-gray-600 hover:text-gray-800"
//                       }`}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     transition={{ type: "spring", stiffness: 400 }}
//                   >
//                     {tab}
//                   </motion.button>
//                 ))}
//               </div>
//             </div>

//             {/* Content Area with better scrolling */}
//             <div className="h-[60vh] p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//               <AnimatePresence mode="wait">
//                 {activeTab === "generated" ? (
//                   <GeneratedContent
//                     key="generated"
//                     contentType={contentType}
//                     generated={generated}
//                     color={color}
//                   />
//                 ) : (
//                   <PreviewContent
//                     key="preview"
//                     contentType={contentType}
//                     preview={preview}
//                   />
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Bottom Actions - Fixed to prevent overlap */}
//             {activeTab === "generated" && (
//               <motion.div 
//                 className="p-4 border-t border-gray-200/50 bg-white/80 backdrop-blur-sm"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <div className="flex justify-between items-center">
//                   <AIBot
//                     showPopup={showAIPopup}
//                     currentSuggestion={currentSuggestion}
//                   />

//                   <motion.button
//                     onClick={() => setActiveTab("preview")}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className={`px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r ${color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
//                   >
//                     <Eye className="w-4 h-4 inline mr-2" />
//                     Preview
//                   </motion.button>
//                 </div>
//               </motion.div>
//             )}
//           </motion.div>

//           {/* Right Sidebar - 4 columns, sticky */}
//           <motion.div 
//             className="lg:col-span-4 space-y-4 lg:sticky lg:top-4 lg:h-fit"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//           >
//             {/* Trending Occasions */}
//             <motion.div 
//               className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4"
//               whileHover={{ y: -2 }}
//               transition={{ type: "spring", stiffness: 400 }}
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <Sparkles className="w-4 h-4 text-purple-500" />
//                 Trending Occasions
//               </h3>
//               <div className="space-y-2">
//                 {mockData.trendingOccasions.map((occasion, index) => (
//                   <motion.div
//                     key={occasion.id}
//                     onClick={() => handleOccasionSelect(occasion)}
//                     whileHover={{ scale: 1.02, x: 4 }}
//                     whileTap={{ scale: 0.98 }}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className={`p-3 rounded-xl cursor-pointer transition-all duration-300 border-2
//                       ${
//                         selectedOccasion?.id === occasion.id
//                           ? `bg-gradient-to-r ${occasion.color} text-white border-transparent shadow-lg`
//                           : "bg-white/50 hover:bg-white/80 border-gray-200 hover:border-gray-300 hover:shadow-md"
//                       }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg">{occasion.emoji}</span>
//                         <div>
//                           <div className="font-semibold text-sm">{occasion.name}</div>
//                           <div
//                             className={`text-xs ${
//                               selectedOccasion?.id === occasion.id
//                                 ? "text-white/80"
//                                 : "text-gray-500"
//                             }`}
//                           >
//                             {occasion.description}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div
//                       className={`mt-2 text-xs font-medium flex items-center gap-3 ${
//                         selectedOccasion?.id === occasion.id
//                           ? "text-white/90"
//                           : "text-gray-600"
//                       }`}
//                     >
//                       <span className="flex items-center gap-1">
//                         <Calendar className="w-3 h-3" />
//                         {occasion.date}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" />
//                         {occasion.time}
//                       </span>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Custom Date & Time */}
//             <motion.div 
//               className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4"
//               whileHover={{ y: -2 }}
//               transition={{ type: "spring", stiffness: 400 }}
//             >
//               <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <Calendar className="w-4 h-4 text-blue-500" />
//                 Custom Schedule
//               </h3>

//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date
//                   </label>
//                   <motion.input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => {
//                       setSelectedDate(e.target.value);
//                       setSelectedOccasion(null);
//                     }}
//                     whileFocus={{ scale: 1.02 }}
//                     className="w-full p-2.5 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Time
//                   </label>
//                   <motion.input
//                     type="time"
//                     value={selectedTime}
//                     onChange={(e) => {
//                       setSelectedTime(e.target.value);
//                       setSelectedOccasion(null);
//                     }}
//                     whileFocus={{ scale: 1.02 }}
//                     className="w-full p-2.5 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
//                   />
//                 </div>
//               </div>
//             </motion.div>

//             {/* Schedule Button */}
//             <motion.button
//               onClick={handleSchedule}
//               disabled={!isScheduleActive}
//               whileHover={isScheduleActive ? { scale: 1.05, y: -2 } : {}}
//               whileTap={isScheduleActive ? { scale: 0.95 } : {}}
//               className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300
//                 ${
//                   isScheduleActive
//                     ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl hover:shadow-2xl"
//                     : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 }`}
//             >
//               <CheckCircle className="w-4 h-4 inline mr-2" />
//               Schedule & Generate
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Generated Content Component with enhanced animations
// const GeneratedContent = ({ contentType, generated, color }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-4"
//     >
//       {contentType === "Social Media" && (
//         <SocialMediaGenerated generated={generated} color={color} />
//       )}
//       {contentType === "Email Marketing" && (
//         <EmailGenerated generated={generated} color={color} />
//       )}
//       {contentType === "Ad Copy" && (
//         <AdCopyGenerated generated={generated} color={color} />
//       )}
//     </motion.div>
//   );
// };

// // Enhanced Social Media Generated Component
// const SocialMediaGenerated = ({ generated }) => {
//   return (
//     <div className="space-y-6">
//       {/* Facebook Posts */}
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.1 }}
//       >
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
//             f
//           </div>
//           Facebook Posts
//         </h3>
//         <div className="space-y-3">
//           {generated.facebook?.map((post, index) => (
//             <motion.div
//               key={post.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 + index * 0.1 }}
//               whileHover={{ y: -2, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
//               className="bg-white/60 rounded-xl p-4 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300"
//             >
//               <p className="text-gray-800 mb-3 text-sm leading-relaxed">{post.content}</p>
//               {post.image && (
//                 <img
//                   src={post.image}
//                   alt="Post"
//                   className="w-full h-32 object-cover rounded-lg mb-3"
//                 />
//               )}
//               <div className="flex items-center gap-4 text-xs text-gray-600">
//                 <motion.span 
//                   className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <Heart className="w-3 h-3" /> {post.likes}
//                 </motion.span>
//                 <motion.span 
//                   className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <MessageCircle className="w-3 h-3" /> {post.comments}
//                 </motion.span>
//                 <motion.span 
//                   className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <Share2 className="w-3 h-3" /> {post.shares}
//                 </motion.span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Instagram Posts */}
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.3 }}
//       >
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
//             ig
//           </div>
//           Instagram Posts
//         </h3>
//         <div className="space-y-3">
//           {generated.instagram?.map((post, index) => (
//             <motion.div
//               key={post.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 + index * 0.1 }}
//               whileHover={{ y: -2, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
//               className="bg-white/60 rounded-xl p-4 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
//                   {post.type.toUpperCase()}
//                 </span>
//               </div>
//               <p className="text-gray-800 mb-3 text-sm whitespace-pre-line leading-relaxed">
//                 {post.content}
//               </p>
//               {post.image && (
//                 <img
//                   src={post.image}
//                   alt="Post"
//                   className="w-full h-32 object-cover rounded-lg mb-3"
//                 />
//               )}
//               <div className="flex items-center gap-4 text-xs text-gray-600">
//                 <motion.span 
//                   className="flex items-center gap-1 hover:text-pink-600 cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <Heart className="w-3 h-3" /> {post.likes}
//                 </motion.span>
//                 <motion.span 
//                   className="flex items-center gap-1 hover:text-pink-600 cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <MessageCircle className="w-3 h-3" /> {post.comments}
//                 </motion.span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Twitter Posts */}
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.5 }}
//       >
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">
//             𝕏
//           </div>
//           Twitter Posts
//         </h3>
//         <div className="space-y-3">
//           {generated.twitter?.map((post, index) => (
//             <motion.div
//               key={post.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 + index * 0.1 }}
//               whileHover={{ y: -2, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
//               className="bg-white/60 rounded-xl p-4 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300"
//             >
//               <p className="text-gray-800 mb-3 text-sm whitespace-pre-line leading-relaxed">
//                 {post.content}
//               </p>
//               <div className="flex items-center gap-4 text-xs text-gray-600">
//                 <motion.span 
//                   className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <MessageCircle className="w-3 h-3" /> {post.comments}
//                 </motion.span>
//                 <motion.span 
//                   className="flex items-center gap-1 hover:text-green-600 cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <Share2 className="w-3 h-3" /> {post.retweets}
//                 </motion.span>
//                 <motion.span 
//                   className="flex items-center gap-1 hover:text-red-600 cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <Heart className="w-3 h-3" /> {post.likes}
//                 </motion.span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Enhanced Email Generated Component
// const EmailGenerated = ({ generated }) => {
//   return (
//     <div className="space-y-6">
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.1 }}
//       >
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center text-white text-xs">
//             📧
//           </div>
//           Newsletter Campaigns
//         </h3>
//         <div className="space-y-3">
//           {generated.newsletters?.map((email, index) => (
//             <motion.div
//               key={email.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 + index * 0.1 }}
//               whileHover={{ y: -2, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
//               className="bg-white/60 rounded-xl p-4 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300"
//             >
//               <div className="mb-3">
//                 <h4 className="text-md font-semibold text-gray-800">
//                   {email.subject}
//                 </h4>
//                 <p className="text-xs text-gray-600 mt-1">{email.preheader}</p>
//               </div>
//               <div className="bg-gray-50/50 rounded-lg p-3 mb-3">
//                 <h5 className="font-medium text-gray-800 mb-2 text-sm">
//                   {email.content.header}
//                 </h5>
//                 <p className="text-gray-700 mb-3 text-sm">{email.content.mainText}</p>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-4 py-2 rounded-lg text-white font-medium text-sm"
//                   style={{ backgroundColor: email.content.cta.color }}
//                 >
//                   {email.content.cta.text}
//                 </motion.button>
//                 <p className="text-xs text-gray-500 mt-2">
//                   {email.content.footer}
//                 </p>
//               </div>
//               <div className="flex items-center gap-3 text-xs text-gray-600">
//                 <span>📊 {email.stats.openRate}</span>
//                 <span>👆 {email.stats.clickRate}</span>
//                 <span>✅ {email.stats.deliveryRate}</span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Enhanced Ad Copy Generated Component
// const AdCopyGenerated = ({ generated }) => {
//   return (
//     <div className="space-y-6">
//       {/* Google Ads */}
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.1 }}
//       >
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
//             G
//           </div>
//           Google Ads
//         </h3>
//         <div className="space-y-3">
//           {generated.googleAds?.map((ad, index) => (
//             <motion.div
//               key={ad.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 + index * 0.1 }}
//               whileHover={{ y: -2, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
//               className="bg-white/60 rounded-xl p-4 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
//                   {ad.type.toUpperCase()}
//                 </span>
//                 <span className="text-xs text-gray-600">{ad.campaign}</span>
//               </div>
//               <div className="space-y-1 mb-3">
//                 {ad.headlines?.map((headline, idx) => (
//                   <div key={idx} className="text-blue-600 font-medium text-sm">
//                     {headline}
//                   </div>
//                 ))}
//                 {ad.descriptions?.map((desc, idx) => (
//                   <div key={idx} className="text-gray-700 text-sm">
//                     {desc}
//                   </div>
//                 ))}
//               </div>
//               <div className="flex items-center gap-3 text-xs text-gray-600">
//                 <span>👁️ {ad.stats.impressions}</span>
//                 <span>👆 {ad.stats.clicks}</span>
//                 <span>📊 {ad.stats.ctr}</span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Facebook Ads */}
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.3 }}
//       >
//         <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
//             f
//           </div>
//           Facebook Ads
//         </h3>
//         <div className="space-y-3">
//           {generated.facebookAds?.map((ad, index) => (
//             <motion.div
//               key={ad.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 + index * 0.1 }}
//               whileHover={{ y: -2, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
//               className="bg-white/60 rounded-xl p-4 border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
//                   {ad.type.toUpperCase()}
//                 </span>
//               </div>
//               <p className="text-gray-800 mb-3 text-sm">{ad.creative.primaryText}</p>
//               {ad.creative.image && (
//                 <img
//                   src={ad.creative.image}
//                   alt="Ad"
//                   className="w-full h-32 object-cover rounded-lg mb-3"
//                 />
//               )}
//               <div className="bg-gray-50/50 rounded-lg p-2 mb-3">
//                 <div className="font-semibold text-gray-800 text-sm">
//                   {ad.creative.headline}
//                 </div>
//                 <div className="text-xs text-gray-600">
//                   {ad.creative.description}
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 text-xs text-gray-600">
//                 <span>👥 {ad.stats?.reach || 0}</span>
//                 <span>👁️ {ad.stats?.impressions || 0}</span>
//                 <span>👆 {ad.stats?.clicks || 0}</span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// // Enhanced Preview Content Component
// const PreviewContent = ({ contentType, preview }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-4"
//     >
//       <div className="text-center mb-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-1">Preview Mode</h2>
//         <p className="text-gray-600 text-sm">See how your content will actually look</p>
//       </div>

//       {contentType === "Social Media" && (
//         <SocialMediaPreviews preview={preview} />
//       )}
//       {contentType === "Email Marketing" && <EmailPreviews preview={preview} />}
//       {contentType === "Ad Copy" && <AdCopyPreviews preview={preview} />}
//     </motion.div>
//   );
// };

// // Enhanced Social Media Previews
// const SocialMediaPreviews = ({ preview }) => {
//   return (
//     <div className="space-y-6">
//       {/* Facebook Preview */}
//       {preview.facebook?.map((post, index) => (
//         <motion.div
//           key={post.id}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: index * 0.1 }}
//           whileHover={{ y: -4, shadow: "0 15px 30px rgba(0,0,0,0.15)" }}
//           className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300"
//         >
//           <div className="bg-blue-600 text-white p-2 text-center font-semibold text-sm">
//             Facebook Post Preview
//           </div>
//           <div className="p-3">
//             <div className="flex items-center gap-2 mb-3">
//               <img
//                 src={post.mockup.profileImage}
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full"
//               />
//               <div>
//                 <div className="font-semibold text-sm">{post.mockup.profileName}</div>
//                 <div className="text-xs text-gray-500">
//                   {post.mockup.postTime}
//                 </div>
//               </div>
//             </div>
//             <p className="mb-3 text-sm">{post.mockup.postContent}</p>
//             {post.mockup.postImage && (
//               <img
//                 src={post.mockup.postImage}
//                 alt="Post"
//                 className="w-full rounded-lg mb-3"
//               />
//             )}
//             <div className="flex items-center gap-4 text-gray-600 border-t pt-2 text-xs">
//               <motion.button 
//                 className="flex items-center gap-1 hover:text-blue-600"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <Heart className="w-4 h-4" /> Like
//               </motion.button>
//               <motion.button 
//                 className="flex items-center gap-1 hover:text-blue-600"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <MessageCircle className="w-4 h-4" /> Comment
//               </motion.button>
//               <motion.button 
//                 className="flex items-center gap-1 hover:text-blue-600"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <Share2 className="w-4 h-4" /> Share
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       ))}

//       {/* Instagram Preview */}
//       {preview.instagram?.map((post, index) => (
//         <motion.div
//           key={post.id}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: index * 0.1 + 0.2 }}
//           whileHover={{ y: -4, shadow: "0 15px 30px rgba(0,0,0,0.15)" }}
//           className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-sm mx-auto transition-all duration-300"
//         >
//           <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 text-center font-semibold text-sm">
//             Instagram Post Preview
//           </div>
//           <div className="p-0">
//             <div className="flex items-center gap-2 p-3">
//               <img
//                 src={post.mockup.profileImage}
//                 alt="Profile"
//                 className="w-6 h-6 rounded-full"
//               />
//               <div className="flex-1">
//                 <div className="font-semibold flex items-center gap-1 text-sm">
//                   {post.mockup.profileName}
//                   {post.mockup.isVerified && (
//                     <span className="text-blue-500 text-xs">✓</span>
//                   )}
//                 </div>
//               </div>
//               <MoreHorizontal className="w-4 h-4" />
//             </div>
//             <img
//               src={post.mockup.postImage}
//               alt="Post"
//               className="w-full aspect-square object-cover"
//             />
//             <div className="p-3">
//               <div className="flex items-center gap-3 mb-2">
//                 <Heart className="w-5 h-5" />
//                 <MessageCircle className="w-5 h-5" />
//                 <Send className="w-5 h-5" />
//               </div>
//               <p className="text-sm">
//                 <span className="font-semibold">{post.mockup.profileName}</span>{" "}
//                 {post.mockup.caption}
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       ))}

//       {/* Twitter Preview */}
//       {preview.twitter?.map((post, index) => (
//         <motion.div
//           key={post.id}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: index * 0.1 + 0.4 }}
//           whileHover={{ y: -4, shadow: "0 15px 30px rgba(0,0,0,0.15)" }}
//           className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-md mx-auto transition-all duration-300"
//         >
//           <div className="bg-black text-white p-2 text-center font-semibold text-sm">
//             𝕏 (Twitter) Post Preview
//           </div>
//           <div className="p-3">
//             <div className="flex items-start gap-2">
//               <img
//                 src={post.mockup.profileImage}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full"
//               />
//               <div className="flex-1">
//                 <div className="flex items-center gap-1 mb-1 text-sm">
//                   <span className="font-bold">{post.mockup.profileName}</span>
//                   {post.mockup.isVerified && (
//                     <span className="text-blue-500 text-xs">✓</span>
//                   )}
//                   <span className="text-gray-500 text-xs">{post.mockup.username}</span>
//                   <span className="text-gray-500 text-xs">·</span>
//                   <span className="text-gray-500 text-xs">{post.mockup.timestamp}</span>
//                 </div>
//                 <p className="text-sm">{post.mockup.tweetContent}</p>
//                 <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs">
//                   <motion.button 
//                     className="flex items-center gap-1 hover:text-blue-500"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <MessageCircle className="w-4 h-4" />
//                     <span>{post.mockup.engagement.replies}</span>
//                   </motion.button>
//                   <motion.button 
//                     className="flex items-center gap-1 hover:text-green-500"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <Share2 className="w-4 h-4" />
//                     <span>{post.mockup.engagement.retweets}</span>
//                   </motion.button>
//                   <motion.button 
//                     className="flex items-center gap-1 hover:text-red-500"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <Heart className="w-4 h-4" />
//                     <span>{post.mockup.engagement.likes}</span>
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// // Enhanced Email Previews
// const EmailPreviews = ({ preview }) => {
//   return (
//     <div className="space-y-6">
//       {preview.newsletters?.map((email, index) => (
//         <motion.div
//           key={email.id}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: index * 0.1 }}
//           whileHover={{ y: -4, shadow: "0 15px 30px rgba(0,0,0,0.15)" }}
//           className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300"
//         >
//           <div className="bg-gray-100 p-3 border-b">
//             <div className="text-xs text-gray-600 mb-1">Gmail</div>
//             <div className="font-semibold text-sm">{email.mockup.subject}</div>
//             <div className="text-xs text-gray-600">
//               From: {email.mockup.from} To: {email.mockup.to}
//             </div>
//           </div>
//           <div
//             className="p-4 text-sm"
//             dangerouslySetInnerHTML={{ __html: email.mockup.htmlContent }}
//           />
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// // Enhanced Ad Copy Previews
// const AdCopyPreviews = ({ preview }) => {
//   return (
//     <div className="space-y-6">
//       {/* Google Ads Preview */}
//       {preview.googleAds?.map((ad, index) => (
//         <motion.div
//           key={ad.id}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: index * 0.1 }}
//           whileHover={{ y: -4, shadow: "0 15px 30px rgba(0,0,0,0.15)" }}
//           className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 transition-all duration-300"
//         >
//           <div className="bg-gray-50 p-3 rounded-lg">
//             <div className="text-xs text-gray-600 mb-1">
//               Ad · {ad.mockup.url}
//             </div>
//             <div className="text-md text-blue-600 hover:underline cursor-pointer">
//               {ad.mockup.headline1} | {ad.mockup.headline2}
//             </div>
//             <div className="text-green-600 text-xs mb-1">
//               {ad.mockup.breadcrumb}
//             </div>
//             <div className="text-gray-800 text-sm">{ad.mockup.description1}</div>
//             <div className="flex gap-3 mt-2 text-xs text-blue-600">
//               {ad.mockup.sitelinks?.map((link, idx) => (
//                 <motion.span 
//                   key={idx} 
//                   className="hover:underline cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   {link}
//                 </motion.span>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       ))}

//       {/* Facebook Ads Preview */}
//       {preview.facebookAds?.map((ad, index) => (
//         <motion.div
//           key={ad.id}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: index * 0.1 + 0.2 }}
//           whileHover={{ y: -4, shadow: "0 15px 30px rgba(0,0,0,0.15)" }}
//           className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300"
//         >
//           <div className="p-3">
//             <div className="flex items-center gap-2 mb-2">
//               <img
//                 src={ad.mockup.profileImage}
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full"
//               />
//               <div>
//                 <div className="font-semibold text-sm">{ad.mockup.profileName}</div>
//                 <div className="text-xs text-gray-500">Sponsored</div>
//               </div>
//             </div>
//             <p className="mb-3 text-sm">{ad.mockup.primaryText}</p>
//             <img
//               src={ad.mockup.image}
//               alt="Ad"
//               className="w-full rounded-lg mb-3"
//             />
//             <div className="bg-gray-50 p-2 rounded-lg mb-2">
//               <div className="font-semibold text-sm">{ad.mockup.headline}</div>
//               <div className="text-xs text-gray-600">
//                 {ad.mockup.description}
//               </div>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full py-2 rounded-lg font-medium text-white text-sm"
//               style={{ backgroundColor: ad.mockup.ctaButton.color }}
//             >
//               {ad.mockup.ctaButton.text}
//             </motion.button>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// // Enhanced AI Bot Component
// const AIBot = ({ showPopup, currentSuggestion }) => {
//   const currentMsg = mockData.aiSuggestions[currentSuggestion];

//   return (
//     <div className="relative">
//       <motion.div
//         className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer"
//         animate={{
//           scale: showPopup ? [1, 1.1, 1] : 1,
//           rotate: showPopup ? [0, 10, -10, 0] : 0,
//         }}
//         whileHover={{ scale: 1.1, rotate: 5 }}
//         transition={{ duration: 0.5, type: "spring", stiffness: 400 }}
//       >
//         <Bot className="w-5 h-5" />
//       </motion.div>

//       <AnimatePresence>
//         {showPopup && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8, y: 10 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, y: 10 }}
//             className="absolute bottom-12 left-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-3 w-56 z-50"
//           >
//             <div className="flex items-center gap-2 mb-1">
//               <span className="text-lg">{currentMsg.icon}</span>
//               <span className="font-semibold text-gray-800 text-sm">AI Assistant</span>
//             </div>
//             <p className="text-gray-700 text-xs">{currentMsg.message}</p>
//             <div className="absolute -bottom-1 left-4 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default DynamicPage;

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Bot,
  Eye,
  CheckCircle,
  Sparkles,
  MessageCircle,
  Heart,
  Share2,
  MoreHorizontal,
  Send,
  Star,
  Zap,
  RefreshCw,
  Wand ,
  Lightbulb,
  Target,
  Smile,
  TrendingUp,
  Activity
} from "lucide-react";

// Mock data structure
const mockData = {
  "trendingOccasions": [
    {
      "id": 1,
      "name": "Christmas",
      "date": "2024-12-25",
      "time": "10:00 AM",
      "emoji": "🎄",
      "color": "from-red-500 to-green-500",
      "description": "Celebrate the festive season"
    },
    {
      "id": 2,
      "name": "Diwali",
      "date": "2024-11-12",
      "time": "6:00 PM",
      "emoji": "🪔",
      "color": "from-orange-500 to-yellow-500",
      "description": "Festival of lights"
    },
    {
      "id": 3,
      "name": "Rakshabandhan",
      "date": "2024-08-19",
      "time": "11:00 AM",
      "emoji": "🎁",
      "color": "from-pink-500 to-purple-500",
      "description": "Bond of protection"
    }
  ],
  "contentTypes": {
    "Social Media": {
      "icon": "📱",
      "color": "from-purple-500 to-blue-500",
      "generated": {
        "facebook": [
          {
            "id": 1,
            "type": "post",
            "content": "🎄 This Christmas, spread joy and warmth with your loved ones! ✨ Create memories that last a lifetime with our special holiday collection. #Christmas2024 #HolidayJoy #FamilyTime",
            "image": "https://images.unsplash.com/photo-1512389098783-66b81f86e495?w=500",
            "likes": 245,
            "comments": 32,
            "shares": 18,
            "timestamp": "2 hours ago"
          },
          {
            "id": 2,
            "type": "post",
            "content": "✨ Light up your life this Diwali! 🪔 May the festival of lights bring prosperity, happiness, and endless joy to your home. Share your Diwali moments with us! #Diwali2024 #FestivalOfLights #Celebration",
            "image": "https://images.unsplash.com/photo-1605538883669-825200433431?w=500",
            "likes": 189,
            "comments": 27,
            "shares": 15,
            "timestamp": "4 hours ago"
          }
        ],
        "instagram": [
          {
            "id": 1,
            "type": "post",
            "content": "Christmas Wand  is in the air! ✨🎄\n\n#ChristmasVibes #HolidayWand  #ChristmasDecor #FestiveSeason #HolidaySpirit #ChristmasJoy",
            "image": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500",
            "likes": 1247,
            "comments": 89,
            "timestamp": "3 hours ago",
            "hashtags": ["#ChristmasVibes", "#HolidayWand ", "#ChristmasDecor"]
          }
        ],
        "twitter": [
          {
            "id": 1,
            "type": "tweet",
            "content": "The best part about Christmas isn't the presents under the tree, it's the people around the table. 🎄❤️ #ChristmasWisdom #FamilyTime #HolidayLove",
            "likes": 456,
            "retweets": 123,
            "comments": 67,
            "timestamp": "2h",
            "verified": true
          }
        ]
      },
      "preview": {
        "facebook": [
          {
            "id": 1,
            "mockup": {
              "profileName": "Your Brand",
              "profileImage": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
              "postTime": "Just now",
              "postContent": "🎄 This Christmas, spread joy and warmth with your loved ones! ✨ Create memories that last a lifetime with our special holiday collection. #Christmas2024 #HolidayJoy #FamilyTime",
              "postImage": "https://images.unsplash.com/photo-1512389098783-66b81f86e495?w=600"
            }
          }
        ],
        "instagram": [
          {
            "id": 1,
            "mockup": {
              "profileName": "yourbrand",
              "profileImage": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
              "isVerified": true,
              "postImage": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600",
              "caption": "Christmas Wand  is in the air! ✨🎄\n\n#ChristmasVibes #HolidayWand  #ChristmasDecor #FestiveSeason #HolidaySpirit #ChristmasJoy",
              "timestamp": "Just now"
            }
          }
        ],
        "twitter": [
          {
            "id": 1,
            "mockup": {
              "profileName": "Your Brand",
              "username": "@yourbrand",
              "profileImage": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
              "isVerified": true,
              "tweetContent": "The best part about Christmas isn't the presents under the tree, it's the people around the table. 🎄❤️ #ChristmasWisdom #FamilyTime #HolidayLove",
              "timestamp": "now"
            }
          }
        ]
      }
    },
    "Email Marketing": {
      "icon": "📧",
      "color": "from-green-500 to-teal-500",
      "generated": {
        "newsletters": [
          {
            "id": 1,
            "subject": "🎄 Christmas Sale: Up to 70% Off Everything!",
            "preheader": "Don't miss our biggest holiday sale of the year",
            "sender": "Your Store <no-reply@yourstore.com>",
            "content": {
              "header": "Merry Christmas from Our Family to Yours!",
              "mainText": "Get ready for the most wonderful time of the year with our exclusive Christmas collection.",
              "cta": {
                "text": "Shop Christmas Sale",
                "color": "#dc2626"
              },
              "footer": "Valid until December 31st, 2024"
            }
          }
        ]
      },
      "preview": {
        "newsletters": [
          {
            "id": 1,
            "mockup": {
              "from": "Your Store <no-reply@yourstore.com>",
              "to": "customer@email.com",
              "subject": "🎄 Christmas Sale: Up to 70% Off Everything!",
              "htmlContent": "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'><header style='background: linear-gradient(135deg, #dc2626, #059669); color: white; padding: 20px; text-align: center;'><h1>🎄 Merry Christmas!</h1></header><div style='padding: 30px 20px;'><h2>Up to 70% OFF Everything!</h2><p>Get ready for the most wonderful time of the year with our exclusive Christmas collection.</p><div style='text-align: center; margin: 30px 0;'><a href='#' style='background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;'>Shop Christmas Sale</a></div></div></div>"
            }
          }
        ]
      }
    },
    "Ad Copy": {
      "icon": "🎯",
      "color": "from-orange-500 to-red-500",
      "generated": {
        "googleAds": [
          {
            "id": 1,
            "type": "search",
            "campaign": "Christmas Sale 2024",
            "headlines": [
              "Christmas Sale - Up to 70% Off",
              "Holiday Deals | Free Shipping",
              "Christmas Gifts | Shop Now"
            ],
            "descriptions": [
              "Discover amazing Christmas deals on everything you love. Free shipping on orders over $50. Shop now!",
              "Make this Christmas special with our exclusive collection. Limited time offers available."
            ]
          }
        ],
        "facebookAds": [
          {
            "id": 1,
            "type": "feed",
            "campaign": "Christmas Shopping Campaign",
            "creative": {
              "primaryText": "Make this Christmas unforgettable! 🎄✨ Discover our exclusive holiday collection with up to 70% off everything.",
              "headline": "Christmas Sale - Up to 70% Off",
              "description": "Shop now and get free shipping on orders over $50",
              "image": "https://images.unsplash.com/photo-1512389098783-66b81f86e495?w=400",
              "cta": "Shop Now"
            }
          }
        ]
      },
      "preview": {
        "googleAds": [
          {
            "id": 1,
            "mockup": {
              "adLabel": "Ad",
              "url": "yourstore.com",
              "breadcrumb": "yourstore.com › christmas-sale",
              "headline1": "Christmas Sale - Up to 70% Off",
              "headline2": "Holiday Deals | Free Shipping",
              "description1": "Discover amazing Christmas deals on everything you love. Free shipping on orders over $50. Shop now!",
              "sitelinks": ["Christmas Gifts", "Holiday Decor", "Winter Clothing", "Gift Cards"]
            }
          }
        ],
        "facebookAds": [
          {
            "id": 1,
            "mockup": {
              "profileName": "Your Store",
              "profileImage": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
              "isSponsored": true,
              "primaryText": "Make this Christmas unforgettable! 🎄✨ Discover our exclusive holiday collection with up to 70% off everything.",
              "image": "https://images.unsplash.com/photo-1512389098783-66b81f86e495?w=500",
              "headline": "Christmas Sale - Up to 70% Off",
              "description": "Shop now and get free shipping on orders over $50",
              "ctaButton": {
                "text": "Shop Now",
                "color": "#1877f2"
              }
            }
          }
        ]
      }
    }
  },
  "aiSuggestions": [
    {
      "id": 1,
      "message": "Want to change any content?",
      "type": "general",
      "icon": "💡"
    },
    {
      "id": 2,
      "message": "I can help improve your headlines!",
      "type": "headline",
      "icon": "✨"
    },
    {
      "id": 3,
      "message": "Need better call-to-actions?",
      "type": "cta",
      "icon": "🎯"
    },
    {
      "id": 4,
      "message": "Want to adjust the tone?",
      "type": "tone",
      "icon": "🎭"
    },
    {
      "id": 5,
      "message": "Should we add more emojis?",
      "type": "emoji",
      "icon": "😊"
    }
  ]
};

const DynamicPage = ({ contentType: propContentType = "Social Media" }) => {
  const [contentType] = useState(propContentType);
  const [activeTab, setActiveTab] = useState("generated");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const aiPopupTimer = useRef(null);
  const contentData = mockData.contentTypes[contentType];

  if (!contentData) {
    return <div className="text-sm text-red-500">Content type not found</div>;
  }

  const { generated, preview, icon, color } = contentData;

  // Enhanced AI Popup Logic
  useEffect(() => {
    if (activeTab === "generated") {
      aiPopupTimer.current = setInterval(() => {
        setShowAIPopup(true);
        setCurrentSuggestion(prev => (prev + 1) % mockData.aiSuggestions.length);
        setTimeout(() => setShowAIPopup(false), 3500);
      }, 7000);
    }
    return () => clearInterval(aiPopupTimer.current);
  }, [activeTab]);

  const handleSchedule = () => {
    if ((selectedDate && selectedTime) || selectedOccasion) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        alert("Content scheduled successfully!");
      }, 2000);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleOccasionSelect = (occasion) => {
    setSelectedOccasion(occasion);
    setSelectedDate(occasion.date);
    setSelectedTime(occasion.time);
  };

  const isScheduleActive = (selectedDate && selectedTime) || selectedOccasion;

  const pageVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      scale: 0.95,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      y: -8, 
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 pb-24"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Section - Enhanced */}
          <motion.div 
            className="lg:col-span-8"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden">
              {/* Enhanced Header */}
              <div className="relative p-6 bg-gradient-to-r from-white/80 to-white/60 border-b border-gray-200/30">
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center text-2xl shadow-lg`}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -10, 10, 0],
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {icon}
                  </motion.div>
                  <div>
                    <motion.h1 
                      className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {contentType}
                    </motion.h1>
                    <motion.p 
                      className="text-gray-600 font-medium"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      AI-Powered Content Generator
                    </motion.p>
                  </div>
                </div>
                
                {/* Animated Status Indicators */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.div 
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div 
                    className="w-3 h-3 bg-purple-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>
              </div>

              {/* Enhanced Tab Navigation */}
              <div className="px-6 pt-6">
                <div className="flex space-x-2 bg-gray-100/60 rounded-2xl p-2 backdrop-blur-sm">
                  {["generated", "preview"].map((tab) => (
                    <motion.button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-500 capitalize relative overflow-hidden
                        ${activeTab === tab
                          ? "bg-white shadow-xl text-gray-800"
                          : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                        }`}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {activeTab === tab && (
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${color} opacity-10 rounded-xl`}
                          layoutId="activeTab"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {tab === "generated" ? <Zap className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {tab}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Enhanced Content Area */}
              <div className="h-[65vh] p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent">
                <AnimatePresence mode="wait">
                  {activeTab === "generated" ? (
                    <GeneratedContent
                      key="generated"
                      contentType={contentType}
                      generated={generated}
                      color={color}
                    />
                  ) : (
                    <PreviewContent
                      key="preview"
                      contentType={contentType}
                      preview={preview}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Enhanced Bottom Actions */}
              {activeTab === "generated" && (
                <motion.div 
                  className="p-6 border-t border-gray-200/30 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex justify-between items-center">
                    <AIBot
                      showPopup={showAIPopup}
                      currentSuggestion={currentSuggestion}
                    />

                    <motion.button
                      onClick={() => setActiveTab("preview")}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                        y: -2
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-8 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r ${color} text-white shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Preview Wand 
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Enhanced Right Sidebar */}
          <motion.div 
            className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:h-fit"
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            {/* Enhanced Trending Occasions */}
            <motion.div 
              className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/40 p-6 relative overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
              
              <motion.h3 
                className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </motion.div>
                Trending Occasions
                <motion.div
                  className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  HOT
                </motion.div>
              </motion.h3>
              
              <div className="space-y-3 relative z-10">
                {mockData.trendingOccasions.map((occasion, index) => (
                  <motion.div
                    key={occasion.id}
                    onClick={() => handleOccasionSelect(occasion)}
                    whileHover={{ 
                      scale: 1.03, 
                      x: 8,
                      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-500 border-2 relative overflow-hidden group
                      ${selectedOccasion?.id === occasion.id
                        ? `bg-gradient-to-r ${occasion.color} text-white border-transparent shadow-xl`
                        : "bg-white/60 hover:bg-white/80 border-gray-200/50 hover:border-gray-300/50 hover:shadow-lg"
                      }`}
                  >
                    {/* Animated background for selected state */}
                    {selectedOccasion?.id === occasion.id && (
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        animate={{ 
                          background: [
                            "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                            "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    )}
                    
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        <motion.span 
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {occasion.emoji}
                        </motion.span>
                        <div>
                          <div className="font-bold text-base">{occasion.name}</div>
                          <div className={`text-sm ${
                            selectedOccasion?.id === occasion.id
                              ? "text-white/80"
                              : "text-gray-500"
                          }`}>
                            {occasion.description}
                          </div>
                        </div>
                      </div>
                      {selectedOccasion?.id === occasion.id && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="text-white"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </motion.div>
                      )}
                    </div>
                    
                    <div className={`mt-3 text-sm font-medium flex items-center gap-4 ${
                      selectedOccasion?.id === occasion.id
                        ? "text-white/90"
                        : "text-gray-600"
                    }`}>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {occasion.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {occasion.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Custom Schedule */}
            <motion.div 
              className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/40 p-6 relative overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl"></div>
              
              <motion.h3 
                className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 relative z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Calendar className="w-6 h-6 text-blue-500" />
                </motion.div>
                Custom Schedule
              </motion.h3>

              <div className="space-y-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Select Date
                  </label>
                  <motion.input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedOccasion(null);
                    }}
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)"
                    }}
                    className="w-full p-4 text-sm rounded-2xl border-2 border-gray-200/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Select Time
                  </label>
                  <motion.input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => {
                      setSelectedTime(e.target.value);
                      setSelectedOccasion(null);
                    }}
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)"
                    }}
                    className="w-full p-4 text-sm rounded-2xl border-2 border-gray-200/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Schedule Button */}
            <motion.button
              onClick={handleSchedule}
              disabled={!isScheduleActive || isGenerating}
              whileHover={isScheduleActive && !isGenerating ? { 
                scale: 1.05, 
                y: -4,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
              } : {}}
              whileTap={isScheduleActive && !isGenerating ? { scale: 0.95 } : {}}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-500 relative overflow-hidden
                ${isScheduleActive
                  ? "bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white shadow-2xl"
                  : "bg-gray-200/60 text-gray-500 cursor-not-allowed"
                }`}
              variants={cardVariants}
              initial="initial"
              animate="animate"
            >
              {isScheduleActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-purple-400/20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
              
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-5 h-5" />
                    </motion.div>
                    Generating...
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={isScheduleActive ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </motion.div>
                    Schedule & Generate
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Generated Content Component
const GeneratedContent = ({ contentType, generated, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="space-y-8"
    >
      {contentType === "Social Media" && (
        <SocialMediaGenerated generated={generated} color={color} />
      )}
      {contentType === "Email Marketing" && (
        <EmailGenerated generated={generated} color={color} />
      )}
      {contentType === "Ad Copy" && (
        <AdCopyGenerated generated={generated} color={color} />
      )}
    </motion.div>
  );
};

// Enhanced Social Media Generated Component
const SocialMediaGenerated = ({ generated }) => {
  return (
    <div className="space-y-8">
      {/* Facebook Posts */}
      {generated.facebook && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <motion.div 
              className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              f
            </motion.div>
            Facebook Posts
            <motion.div 
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {generated.facebook.length} posts
            </motion.div>
          </motion.h3>
          
          <div className="space-y-4">
            {generated.facebook.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="bg-gradient-to-br from-white/80 to-white/60 rounded-2xl p-5 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div 
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-bold"
                      whileHover={{ scale: 1.05 }}
                    >
                      POST
                    </motion.div>
                    <span className="text-xs text-gray-500 font-medium">{post.timestamp}</span>
                  </div>
                  
                  <p className="text-gray-800 mb-4 text-sm leading-relaxed font-medium">{post.content}</p>
                  
                  {post.image && (
                    <motion.img
                      src={post.image}
                      alt="Post"
                      className="w-full h-40 object-cover rounded-xl mb-4 shadow-md"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <div className="flex items-center gap-6 text-sm">
                    <motion.span 
                      className="flex items-center gap-2 text-gray-600 hover:text-red-500 cursor-pointer font-medium"
                      whileHover={{ scale: 1.05, x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Heart className="w-4 h-4" /> {post.likes}
                    </motion.span>
                    <motion.span 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-500 cursor-pointer font-medium"
                      whileHover={{ scale: 1.05, x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <MessageCircle className="w-4 h-4" /> {post.comments}
                    </motion.span>
                    <motion.span 
                      className="flex items-center gap-2 text-gray-600 hover:text-green-500 cursor-pointer font-medium"
                      whileHover={{ scale: 1.05, x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Share2 className="w-4 h-4" /> {post.shares}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Instagram Posts */}
      {generated.instagram && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              ig
            </motion.div>
            Instagram Posts
            <motion.div 
              className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              {generated.instagram.length} posts
            </motion.div>
          </motion.h3>
          
          <div className="space-y-4">
            {generated.instagram.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="bg-gradient-to-br from-white/80 to-white/60 rounded-2xl p-5 border border-gray-200/50 hover:border-purple-300/50 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-bold"
                      whileHover={{ scale: 1.05 }}
                    >
                      {post.type.toUpperCase()}
                    </motion.div>
                    <span className="text-xs text-gray-500 font-medium">{post.timestamp}</span>
                  </div>
                  
                  <p className="text-gray-800 mb-4 text-sm whitespace-pre-line leading-relaxed font-medium">
                    {post.content}
                  </p>
                  
                  {post.image && (
                    <motion.img
                      src={post.image}
                      alt="Post"
                      className="w-full h-40 object-cover rounded-xl mb-4 shadow-md"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <div className="flex items-center gap-6 text-sm">
                    <motion.span 
                      className="flex items-center gap-2 text-gray-600 hover:text-red-500 cursor-pointer font-medium"
                      whileHover={{ scale: 1.05, x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Heart className="w-4 h-4" /> {post.likes}
                    </motion.span>
                    <motion.span 
                      className="flex items-center gap-2 text-gray-600 hover:text-purple-500 cursor-pointer font-medium"
                      whileHover={{ scale: 1.05, x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <MessageCircle className="w-4 h-4" /> {post.comments}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Twitter Posts */}
      {generated.twitter && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <motion.div 
              className="w-8 h-8 bg-black rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              𝕏
            </motion.div>
            Twitter Posts
            <motion.div 
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              {generated.twitter.length} posts
            </motion.div>
          </motion.h3>
          
          <div className="space-y-4">
            {generated.twitter.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="bg-gradient-to-br from-white/80 to-white/60 rounded-2xl p-5 border border-gray-200/50 hover:border-gray-400/50 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div 
                      className="bg-black text-white px-2 py-1 rounded-lg text-xs font-bold"
                      whileHover={{ scale: 1.05 }}
                    >
                      TWEET
                    </motion.div>
                    {post.verified && (
                      <motion.div 
                        className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-bold"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        ✓ VERIFIED
                      </motion.div>
                    )}
                    <span className="text-xs text-gray-500 font-medium">{post.timestamp}</span>
                  </div>
                  
                  <p className="text-gray-800 mb-4 text-sm whitespace-pre-line leading-relaxed font-medium">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <motion.span 
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-500 cursor-pointer font-medium"
                      whileHover={{ scale: 1.05, x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <MessageCircle className="w-4 h-4" /> {post.comments}
                    </motion.span>
                    <motion.span 
                      className="flex items-center gap-2 text-gray-600 hover:text-green-500 cursor-pointer font-medium"
                      whileHover={{ scale: 1.05, x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Share2 className="w-4 h-4" /> {post.retweets}
                    </motion.span>
                    <motion.span 
                      className="flex items-center gap-2 text-gray-600 hover:text-red-500 cursor-pointer font-medium"
                      whileHover={{ scale: 1.05, x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Heart className="w-4 h-4" /> {post.likes}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Enhanced Email Generated Component
const EmailGenerated = ({ generated }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="space-y-8"
    >
      <motion.h3 
        className="text-xl font-bold mb-4 flex items-center gap-3"
        whileHover={{ x: 5 }}
      >
        <motion.div 
          className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center text-white text-sm shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          📧
        </motion.div>
        Newsletter Campaigns
        <motion.div 
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {generated.newsletters?.length || 0} campaigns
        </motion.div>
      </motion.h3>
      
      <div className="space-y-4">
        {generated.newsletters?.map((email, index) => (
          <motion.div
            key={email.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            whileHover={{ 
              y: -4, 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            className="bg-gradient-to-br from-white/80 to-white/60 rounded-2xl p-6 border border-gray-200/50 hover:border-green-300/50 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="mb-4">
                <motion.h4 
                  className="text-lg font-bold text-gray-800 mb-2"
                  whileHover={{ x: 2 }}
                >
                  {email.subject}
                </motion.h4>
                <p className="text-sm text-gray-600 font-medium">{email.preheader}</p>
                <p className="text-xs text-gray-500 mt-1">{email.sender}</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 rounded-xl p-4 mb-4 backdrop-blur-sm">
                <h5 className="font-bold text-gray-800 mb-3 text-base">
                  {email.content.header}
                </h5>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  {email.content.mainText}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ backgroundColor: email.content.cta.color }}
                >
                  {email.content.cta.text}
                </motion.button>
                <p className="text-xs text-gray-500 mt-3 font-medium">
                  {email.content.footer}
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <motion.span 
                  className="flex items-center gap-1 text-gray-600 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  📊 Open Rate: 0%
                </motion.span>
                <motion.span 
                  className="flex items-center gap-1 text-gray-600 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  👆 Click Rate: 0%
                </motion.span>
                <motion.span 
                  className="flex items-center gap-1 text-gray-600 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  ✅ Delivery: 0%
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Enhanced Ad Copy Generated Component
const AdCopyGenerated = ({ generated }) => {
  return (
    <div className="space-y-8">
      {/* Google Ads */}
      {generated.googleAds && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <motion.div 
              className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              G
            </motion.div>
            Google Ads
            <motion.div 
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {generated.googleAds.length} ads
            </motion.div>
          </motion.h3>
          
          <div className="space-y-4">
            {generated.googleAds.map((ad, index) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="bg-gradient-to-br from-white/80 to-white/60 rounded-2xl p-5 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div 
                      className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold"
                      whileHover={{ scale: 1.05 }}
                    >
                      {ad.type.toUpperCase()}
                    </motion.div>
                    <span className="text-xs text-gray-600 font-medium">{ad.campaign}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {ad.headlines?.map((headline, idx) => (
                      <motion.div 
                        key={idx} 
                        className="text-blue-600 font-bold text-base hover:text-blue-700 cursor-pointer"
                        whileHover={{ x: 2 }}
                      >
                        {headline}
                      </motion.div>
                    ))}
                    {ad.descriptions?.map((desc, idx) => (
                      <motion.div 
                        key={idx} 
                        className="text-gray-700 text-sm leading-relaxed"
                        whileHover={{ x: 2 }}
                      >
                        {desc}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <motion.span 
                      className="flex items-center gap-1 text-gray-600 font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      👁️ Impressions: 0
                    </motion.span>
                    <motion.span 
                      className="flex items-center gap-1 text-gray-600 font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      👆 Clicks: 0
                    </motion.span>
                    <motion.span 
                      className="flex items-center gap-1 text-gray-600 font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      💰 Cost: $0
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Facebook Ads */}
      {generated.facebookAds && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <motion.div 
              className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              f
            </motion.div>
            Facebook Ads
            <motion.div 
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              {generated.facebookAds.length} ads
            </motion.div>
          </motion.h3>
          
          <div className="space-y-4">
            {generated.facebookAds.map((ad, index) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -4, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="bg-gradient-to-br from-white/80 to-white/60 rounded-2xl p-5 border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300 backdrop-blur-sm group relative overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div 
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-bold"
                      whileHover={{ scale: 1.05 }}
                    >
                      {ad.type.toUpperCase()}
                    </motion.div>
                    <span className="text-xs text-gray-600 font-medium">{ad.campaign}</span>
                  </div>
                  
                  <p className="text-gray-800 mb-4 text-sm leading-relaxed font-medium">
                    {ad.creative.primaryText}
                  </p>
                  
                  {ad.creative.image && (
                    <motion.img
                      src={ad.creative.image}
                      alt="Ad Creative"
                      className="w-full h-40 object-cover rounded-xl mb-4 shadow-md"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <div className="mb-4">
                    <motion.h4 
                      className="font-bold text-gray-800 mb-1"
                      whileHover={{ x: 2 }}
                    >
                      {ad.creative.headline}
                    </motion.h4>
                    <p className="text-gray-600 text-sm">{ad.creative.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {ad.creative.cta}
                    </motion.button>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <motion.span 
                        className="flex items-center gap-1 text-gray-600 font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        👁️ Reach: 0
                      </motion.span>
                      <motion.span 
                        className="flex items-center gap-1 text-gray-600 font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        💰 Spent: $0
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Enhanced Preview Content Component
const PreviewContent = ({ contentType, preview }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="space-y-8"
    >
      {contentType === "Social Media" && (
        <SocialMediaPreview preview={preview} />
      )}
      {contentType === "Email Marketing" && (
        <EmailPreview preview={preview} />
      )}
      {contentType === "Ad Copy" && (
        <AdCopyPreview preview={preview} />
      )}
    </motion.div>
  );
};

// Enhanced Social Media Preview Component
const SocialMediaPreview = ({ preview }) => {
  return (
    <div className="space-y-8">
      {/* Facebook Preview */}
      {preview.facebook && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <motion.div 
              className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              f
            </motion.div>
            Facebook Preview
          </motion.h3>
          
          <div className="space-y-4">
            {preview.facebook.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-md mx-auto"
              >
                {/* Facebook Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.mockup.profileImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-bold text-gray-800">{post.mockup.profileName}</div>
                      <div className="text-xs text-gray-500">{post.mockup.postTime}</div>
                    </div>
                  </div>
                </div>
                
                {/* Facebook Content */}
                <div className="p-4">
                  <p className="text-gray-800 mb-4 text-sm leading-relaxed">
                    {post.mockup.postContent}
                  </p>
                </div>
                
                {/* Facebook Image */}
                {post.mockup.postImage && (
                  <img
                    src={post.mockup.postImage}
                    alt="Post"
                    className="w-full h-48 object-cover"
                  />
                )}
                
                {/* Facebook Actions */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-gray-600">
                    <motion.button 
                      className="flex items-center gap-2 hover:text-red-500"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Heart className="w-5 h-5" />
                      Like
                    </motion.button>
                    <motion.button 
                      className="flex items-center gap-2 hover:text-blue-500"
                      whileHover={{ scale: 1.05 }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Comment
                    </motion.button>
                    <motion.button 
                      className="flex items-center gap-2 hover:text-green-500"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Instagram Preview */}
      {preview.instagram && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              ig
            </motion.div>
            Instagram Preview
          </motion.h3>
          
          <div className="space-y-4">
            {preview.instagram.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-md mx-auto"
              >
                {/* Instagram Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.mockup.profileImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-gray-800">{post.mockup.profileName}</span>
                        {post.mockup.isVerified && (
                          <span className="text-blue-500">✓</span>
                        )}
                      </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.1 }}>
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Instagram Image */}
                {post.mockup.postImage && (
                  <img
                    src={post.mockup.postImage}
                    alt="Post"
                    className="w-full h-80 object-cover"
                  />
                )}
                
                {/* Instagram Actions */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <motion.button whileHover={{ scale: 1.1 }}>
                        <Heart className="w-6 h-6 text-gray-700" />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }}>
                        <MessageCircle className="w-6 h-6 text-gray-700" />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1 }}>
                        <Send className="w-6 h-6 text-gray-700" />
                      </motion.button>
                    </div>
                    <motion.button whileHover={{ scale: 1.1 }}>
                      <Star className="w-6 h-6 text-gray-700" />
                    </motion.button>
                  </div>
                  
                  <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                    <span className="font-bold">{post.mockup.profileName}</span> {post.mockup.caption}
                  </p>
                  
                  <p className="text-xs text-gray-500 mt-2">{post.mockup.timestamp}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Twitter Preview */}
      {preview.twitter && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <motion.div 
              className="w-8 h-8 bg-black rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              𝕏
            </motion.div>
            Twitter Preview
          </motion.h3>
          
          <div className="space-y-4">
            {preview.twitter.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-md mx-auto"
              >
                {/* Twitter Header */}
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={post.mockup.profileImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-800">{post.mockup.profileName}</span>
                      {post.mockup.isVerified && (
                        <span className="text-blue-500">✓</span>
                      )}
                      <span className="text-gray-500">{post.mockup.username}</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-500">{post.mockup.timestamp}</span>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.1 }}>
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
                
                {/* Twitter Content */}
                <p className="text-gray-800 mb-3 text-sm leading-relaxed">
                  {post.mockup.tweetContent}
                </p>
                
                {/* Twitter Actions */}
                <div className="flex items-center justify-between text-gray-600">
                  <motion.button 
                    className="flex items-center gap-1 hover:text-blue-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">0</span>
                  </motion.button>
                  <motion.button 
                    className="flex items-center gap-1 hover:text-green-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs">0</span>
                  </motion.button>
                  <motion.button 
                    className="flex items-center gap-1 hover:text-red-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">0</span>
                  </motion.button>
                  <motion.button 
                    className="hover:text-blue-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Enhanced Email Preview Component
const EmailPreview = ({ preview }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className="space-y-8"
    >
      <motion.h3 
        className="text-xl font-bold mb-4 flex items-center gap-3"
        whileHover={{ x: 5 }}
      >
        <motion.div 
          className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center text-white text-sm shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          📧
        </motion.div>
        Email Preview
      </motion.h3>
      
      <div className="space-y-4">
        {preview.newsletters?.map((email, index) => (
          <motion.div
            key={email.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-2xl mx-auto"
          >
            {/* Email Header */}
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="text-sm text-gray-600 space-y-1">
                <div><span className="font-semibold">From:</span> {email.mockup.from}</div>
                <div><span className="font-semibold">To:</span> {email.mockup.to}</div>
                <div><span className="font-semibold">Subject:</span> {email.mockup.subject}</div>
              </div>
            </div>
            
            {/* Email Content */}
            <div 
              className="p-6"
              dangerouslySetInnerHTML={{ __html: email.mockup.htmlContent }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Enhanced Ad Copy Preview Component
const AdCopyPreview = ({ preview }) => {
  return (
    <div className="space-y-8">
      {/* Google Ads Preview */}
      {preview.googleAds && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <motion.div 
              className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              G
            </motion.div>
            Google Ads Preview
          </motion.h3>
          
          <div className="space-y-4">
            {preview.googleAds.map((ad, index) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 max-w-2xl mx-auto"
              >
                {/* Google Ad Header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                    {ad.mockup.adLabel}
                  </span>
                  <div className="text-green-600 text-sm font-medium">{ad.mockup.url}</div>
                </div>
                
                {/* Google Ad Content */}
                <div className="space-y-3">
                  <div>
                    <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                      {ad.mockup.headline1}
                    </div>
                    <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                      {ad.mockup.headline2}
                    </div>
                  </div>
                  
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {ad.mockup.description1}
                  </div>
                  
                  <div className="text-gray-500 text-xs">
                    {ad.mockup.breadcrumb}
                  </div>
                  
                  {/* Sitelinks */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {ad.mockup.sitelinks?.map((link, idx) => (
                      <motion.a
                        key={idx}
                        href="#"
                        className="text-blue-600 text-sm hover:underline"
                        whileHover={{ scale: 1.05 }}
                      >
                        {link}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Facebook Ads Preview */}
      {preview.facebookAds && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-4 flex items-center gap-3"
            whileHover={{ x: 5 }}
          >
            <motion.div 
              className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              f
            </motion.div>
            Facebook Ads Preview
          </motion.h3>
          
          <div className="space-y-4">
            {preview.facebookAds.map((ad, index) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-md mx-auto"
              >
                {/* Facebook Ad Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={ad.mockup.profileImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">{ad.mockup.profileName}</div>
                      {ad.mockup.isSponsored && (
                        <div className="text-xs text-gray-500">Sponsored</div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Facebook Ad Content */}
                <div className="p-4">
                  <p className="text-gray-800 mb-4 text-sm leading-relaxed">
                    {ad.mockup.primaryText}
                  </p>
                </div>
                
                {/* Facebook Ad Image */}
                {ad.mockup.image && (
                  <img
                    src={ad.mockup.image}
                    alt="Ad Creative"
                    className="w-full h-48 object-cover"
                  />
                )}
                
                {/* Facebook Ad Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="mb-2">
                    <div className="font-bold text-gray-800">{ad.mockup.headline}</div>
                    <div className="text-gray-600 text-sm">{ad.mockup.description}</div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 rounded-lg font-bold text-sm text-white shadow-lg"
                    style={{ backgroundColor: ad.mockup.ctaButton.color }}
                  >
                    {ad.mockup.ctaButton.text}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Enhanced AI Bot Component
const AIBot = ({ showPopup, currentSuggestion }) => {
  const currentSugg = mockData.aiSuggestions[currentSuggestion];
  
  return (
    <div className="relative">
      <motion.div
        className="flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            boxShadow: showPopup 
              ? ["0 10px 20px rgba(147, 51, 234, 0.3)", "0 20px 40px rgba(147, 51, 234, 0.5)", "0 10px 20px rgba(147, 51, 234, 0.3)"]
              : "0 10px 20px rgba(147, 51, 234, 0.3)"
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: showPopup ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Bot className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
        
        <div>
          <div className="font-bold text-gray-800">AI Assistant</div>
          <div className="text-sm text-gray-600">Ready to help!</div>
        </div>
      </motion.div>

      {/* AI Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-full left-0 mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-64 z-50"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{currentSugg.icon}</span>
              <div className="font-bold text-gray-800 text-sm">AI Suggestion</div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {currentSugg.message}
            </p>
            
            {/* Popup tail */}
            <div className="absolute top-full left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynamicPage;
