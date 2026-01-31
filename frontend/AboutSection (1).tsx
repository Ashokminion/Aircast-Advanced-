import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AlertTriangle, TrendingUp, Brain, Target, Heart, Factory, Car, Leaf } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const slideInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const problemPoints = [
    {
      icon: Factory,
      title: 'Industrial Emissions',
      description: 'Rapid industrialization releases harmful pollutants into the atmosphere daily.',
    },
    {
      icon: Car,
      title: 'Vehicle Pollution',
      description: 'Urban traffic contributes significantly to NO₂ and particulate matter levels.',
    },
    {
      icon: Heart,
      title: 'Health Impact',
      description: 'Poor air quality causes respiratory diseases affecting millions worldwide.',
    },
    {
      icon: Leaf,
      title: 'Environmental Damage',
      description: 'Ecosystem degradation and climate change accelerated by air pollution.',
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-frost opacity-50" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div ref={ref} className="section-container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={slideInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              Introduction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              About the Research
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              This research develops a sophisticated hybrid CNN-LSTM deep learning model 
              to accurately forecast Air Quality Index, enabling proactive measures for 
              public health protection in urban environments.
            </p>
          </motion.div>

          {/* Problem Statement Cards - Slide from alternating sides */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {problemPoints.map((point, index) => (
              <motion.div
                key={point.title}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                className="group relative bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-all duration-500 border border-border/50 glacier-card"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <point.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                  </div>
                </div>
                {/* Hover shimmer effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          {/* AQI Categories - Animated infographic */}
          <motion.div variants={slideInUp} className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border/50">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
              Air Quality Index Categories & Health Impact
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { label: 'Good', range: '0-50', color: 'bg-aqi-good', health: 'Minimal impact' },
                { label: 'Moderate', range: '51-100', color: 'bg-aqi-moderate', health: 'Acceptable' },
                { label: 'Sensitive', range: '101-150', color: 'bg-aqi-unhealthy-sensitive', health: 'Risk for sensitive' },
                { label: 'Unhealthy', range: '151-200', color: 'bg-aqi-unhealthy', health: 'Health effects' },
                { label: 'Very Unhealthy', range: '201-300', color: 'bg-aqi-very-unhealthy', health: 'Serious effects' },
                { label: 'Hazardous', range: '301+', color: 'bg-aqi-hazardous', health: 'Emergency' },
              ].map((category, index) => (
                <motion.div
                  key={category.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5, type: 'spring' }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`${category.color} text-white rounded-xl p-4 text-center cursor-default shadow-soft hover:shadow-elevated transition-all duration-300`}
                >
                  <div className="text-2xl font-bold mb-1">{category.range}</div>
                  <div className="text-sm font-medium opacity-95">{category.label}</div>
                  <div className="text-xs mt-2 opacity-80">{category.health}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
