import { motion } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'lg',
  showText = true,
  className = '',
  onComplete = null,
  customText = null,
  // Animation speed controls - you can adjust these values
  containerDuration = 4.0,        // Container entrance animation
  pulseDuration = 6.0,            // Pulse ring animation
  orbitDuration = 20.0,           // Orbital rotation speed
  spinDuration = 25.0,            // Main spinner rotation
  colorChangeDuration = 12.0,     // Background color transition
  breatheDuration = 5.0,          // Icon breathing effect
  statusPulseDuration = 4.0,      // Status dot pulse
  orbitalDotDuration = 5.0,       // Orbital dots animation
  sparkleDuration = 8.0,          // Sparkle effects
  sparkleRotationDuration = 30.0, // Sparkle rotation speed
  textFadeDuration = 4.0,         // Text fade animation
  dotBounceDuration = 3.0         // Loading dots bounce
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16 min-w-[64px] min-h-[64px]',
    md: 'w-20 h-20 min-w-[80px] min-h-[80px]',
    lg: 'w-24 h-24 min-w-[96px] min-h-[96px]',
    xl: 'w-32 h-32 min-w-[128px] min-h-[128px]'
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Container animation variants - slower entrance
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 30,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 80,
        duration: containerDuration,
        delayChildren: containerDuration * 0.4,
        staggerChildren: containerDuration * 0.15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -15,
      transition: { duration: containerDuration * 0.5 }
    }
  };

  // Slower pulse ring animation
  const pulseVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: [0.9, 1.3, 0.9],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: pulseDuration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Slower orbital dots animation
  const orbitalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      rotate: 360,
      transition: {
        rotate: {
          duration: orbitDuration,
          repeat: Infinity,
          ease: "linear"
        },
        opacity: { duration: containerDuration * 0.4 }
      }
    }
  };

  // Text animation - slower
  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: containerDuration * 0.6,
        duration: containerDuration * 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={`flex flex-col items-center justify-center space-y-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onAnimationComplete={onComplete}
    >
      {/* Main spinner container */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulse ring - light glossy transparent */}
        <motion.div
          className={`absolute ${sizeClasses[size]} bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-lg`}
          variants={pulseVariants}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        />
        
        {/* Secondary pulse ring - light glossy transparent */}
        <motion.div
          className={`absolute ${sizeClasses[size]} bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-md`}
          variants={pulseVariants}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 15px rgba(0, 0, 0, 0.05)',
            transition: {
              ...pulseVariants.visible.transition,
              delay: pulseDuration * 0.25
            }
          }}
        />

        {/* Main spinning circle - light glossy with subtle gradient */}
        <motion.div
          className={`relative ${sizeClasses[size]} rounded-full flex items-center justify-center border border-white/40`}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
            backdropFilter: 'blur(15px)',
            boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.15)'
          }}
          animate={{ 
            rotate: 360,
            background: [
              "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(240, 240, 255, 0.2))",
              "linear-gradient(225deg, rgba(240, 240, 255, 0.2), rgba(255, 240, 255, 0.3))",
              "linear-gradient(315deg, rgba(255, 240, 255, 0.3), rgba(240, 255, 255, 0.2))",
              "linear-gradient(45deg, rgba(240, 255, 255, 0.2), rgba(255, 255, 255, 0.4))"
            ]
          }}
          transition={{ 
            rotate: { duration: spinDuration, repeat: Infinity, ease: 'linear' },
            background: { duration: colorChangeDuration, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          {/* Main icon with slower glow effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              filter: [
                "drop-shadow(0 0 4px rgba(100,100,100,0.6))",
                "drop-shadow(0 0 8px rgba(120,120,120,0.8))",
                "drop-shadow(0 0 4px rgba(100,100,100,0.6))"
              ]
            }}
            transition={{ duration: breatheDuration, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap className={`${iconSizes[size]} text-gray-700`} />
          </motion.div>

          {/* Animated status dot - light glossy */}
          <motion.div
            className="absolute w-4 h-4 rounded-full top-2 right-2 border border-white/50"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.6))',
              backdropFilter: 'blur(4px)',
              boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 2px 8px rgba(34, 197, 94, 0.3)'
            }}
            animate={{ 
              scale: [1, 1.15, 1],
              boxShadow: [
                "inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 2px 8px rgba(34, 197, 94, 0.3)",
                "inset 0 1px 2px rgba(255, 255, 255, 0.6), 0 4px 12px rgba(34, 197, 94, 0.5)",
                "inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 2px 8px rgba(34, 197, 94, 0.3)"
              ]
            }}
            transition={{ duration: statusPulseDuration, repeat: Infinity }}
          />
        </motion.div>

        {/* Orbital elements - slower and glossy */}
        <motion.div
          className={`absolute ${sizeClasses[size]} pointer-events-none`}
          variants={orbitalVariants}
        >
          {/* Orbital dots - light glossy */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full border border-white/40"
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.8), rgba(251, 146, 60, 0.6))',
                backdropFilter: 'blur(4px)',
                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.5), 0 2px 6px rgba(245, 158, 11, 0.3)',
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${angle}deg) translateX(${size === 'xl' ? '75px' : size === 'lg' ? '60px' : size === 'md' ? '50px' : '40px'}) translateY(-50%)`
              }}
              animate={{
                scale: [0.7, 1.2, 0.7],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: orbitalDotDuration,
                repeat: Infinity,
                delay: i * (orbitalDotDuration * 0.15),
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Sparkle effects - slower and glossy */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ duration: sparkleRotationDuration, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 90, 180, 270].map((angle, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translateX(${size === 'xl' ? '85px' : size === 'lg' ? '70px' : size === 'md' ? '60px' : '50px'}) translateY(-50%)`
              }}
              animate={{
                scale: [0, 1.1, 0],
                opacity: [0, 0.9, 0],
                rotate: [0, 90]
              }}
              transition={{
                duration: sparkleDuration,
                repeat: Infinity,
                delay: i * (sparkleDuration * 0.2),
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-4 h-4 text-amber-600 drop-shadow-sm" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Loading text with slower animations */}
      {showText && (
        <motion.div
          className="text-center space-y-3"
          variants={textVariants}
        >
          <motion.h3 
            className="text-lg font-semibold text-gray-700"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: textFadeDuration, repeat: Infinity, ease: "easeInOut" }}
          >
            {customText || "Loading..."}
          </motion.h3>
          <motion.div 
            className="flex items-center justify-center space-x-2"
            variants={textVariants}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-white/30"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.8), rgba(160, 82, 45, 0.6))',
                  backdropFilter: 'blur(2px)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 1px 3px rgba(0, 0, 0, 0.2)'
                }}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: dotBounceDuration,
                  repeat: Infinity,
                  delay: i * (dotBounceDuration * 0.15),
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoadingSpinner;