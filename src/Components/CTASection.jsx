import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTASection = () => {
  return (
    <motion.section 
      className="py-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Let AI Do the Heavy Lifting?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of businesses that have transformed their marketing with BrandStoryy's AI agents. 
            Start your free trial today and experience the future of marketing automation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-medium text-lg hover:shadow-xl transition-all flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your BrandStoryy Today</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-4 rounded-lg text-gray-800 w-full sm:w-auto"
            />
          </div>
          <div className="flex flex-wrap justify-center items-center space-x-8 mt-8 text-sm text-purple-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTASection;