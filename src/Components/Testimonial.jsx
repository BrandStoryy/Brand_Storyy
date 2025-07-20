import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: `BrandStory's AI agents have completely transformed our marketing workflow. What used to take our team 20 hours per week now happens automatically in the background.`,
    name: 'Sarah Chen',
    title: 'Marketing Director at TechFlow Solutions',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    text: `The quality of content these AI agents produce is incredible. They understand our brand voice perfectly and create content that actually converts.`,
    name: 'Michael Rodriguez',
    title: 'Founder at GrowthLab',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    text: `We've seen a 5x increase in content production and a 3x improvement in engagement rates since implementing BrandStory. Game-changer!`,
    name: 'Emily Thompson',
    title: 'CMO at InnovateCorp',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return ( 
    <div className="w-full px-4  mt-16 sm:px-6 lg:px-8 mb-20 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Loved by <span className="text-indigo-600">Marketing Teams Worldwide</span>
      </h2>
      <p className="text-gray-500 mb-10">
        Join thousands of businesses that have transformed their marketing with AI agents.
      </p>

      <div className="relative w-full max-w-4xl mx-auto min-h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="absolute w-full"
          >
            <div className="bg-white shadow-md rounded-2xl p-6 md:p-8 text-left">
              <div className="flex items-center mb-4 text-yellow-500">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
              </div>
              <p className="text-gray-700 text-lg italic mb-6">"{testimonials[currentIndex].text}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[currentIndex].title}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Star size={16} fill="currentColor" className="text-yellow-500" /> 4.9/5 average rating
        </div>
        <div>•</div>
        <div>10,000+ active users</div>
        <div>•</div>
        <div>99.9% uptime</div>
        <div>•</div>
        <div>24/7 support</div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
