import { motion } from 'framer-motion';
import { ArrowDown, Brain, BarChart3, Wind, Snowflake } from 'lucide-react';
import GlacierBackground from '../GlacierBackground';

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Floating icons for pollution/AQI visualization
  const floatingIcons = [
    { Icon: Wind, delay: 0, x: '10%', y: '20%' },
    { Icon: Snowflake, delay: 0.5, x: '85%', y: '15%' },
    { Icon: Brain, delay: 1, x: '75%', y: '70%' },
    { Icon: BarChart3, delay: 1.5, x: '15%', y: '75%' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Glacier Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Animated Glacier Particles */}
      <GlacierBackground />
      
      {/* Decorative gradient orbs - Glacier blues */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/20 rounded-full blur-3xl" 
      />

      {/* Floating AQI Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            y: [0, -20, 0],
            scale: 1
          }}
          transition={{ 
            opacity: { duration: 4, repeat: Infinity, delay },
            y: { duration: 5, repeat: Infinity, delay },
            scale: { duration: 0.5, delay: delay + 0.5 }
          }}
          className="absolute hidden md:block"
          style={{ left: x, top: y }}
        >
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <Icon className="w-8 h-8 text-white/70" />
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 section-container text-center text-white">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
        >
          <Snowflake className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium tracking-wide">B.Tech AI Research Project</span>
        </motion.div>

        {/* Main Title - Slide in animation */}
        <motion.h1
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="block">Hybrid Deep Learning</span>
          <motion.span 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="block mt-3"
          >
            for{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">AQI Forecasting</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-1 left-0 right-0 h-3 bg-white/20 -z-10 origin-left rounded"
              />
            </span>
          </motion.span>
        </motion.h1>

        {/* Subtitle - Fade in */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-white/90 mb-6 italic"
        >
          CNN-LSTM Neural Network Architecture
        </motion.p>

        {/* Project Summary */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base sm:text-lg text-white/75 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Leveraging Convolutional Neural Networks for spatial pollutant interactions 
          and Long Short-Term Memory networks for temporal air quality pattern recognition.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
        >
          {[
            { icon: Wind, label: 'Pollutant Analysis' },
            { icon: Brain, label: 'Deep Learning' },
            { icon: BarChart3, label: '96% Accuracy' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.15 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors cursor-default"
            >
              <item.icon className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          onClick={scrollToAbout}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(59, 189, 213, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-primary font-semibold text-lg shadow-elevated hover:shadow-frost transition-all duration-300"
        >
          Explore Research
          <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], height: ['6px', '12px', '6px'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-1 rounded-full bg-white/60"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
