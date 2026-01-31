import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Cloud, Thermometer, Droplets, Wind, 
  Gauge, FlaskConical, Sun, CloudRain,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const features = [
  {
    icon: Cloud,
    name: 'PM2.5',
    unit: 'µg/m³',
    description: 'Fine particulate matter less than 2.5 micrometers in diameter.',
    impact: 'Primary contributor to AQI. Penetrates deep into lungs and bloodstream.',
    importance: 28,
  },
  {
    icon: Cloud,
    name: 'PM10',
    unit: 'µg/m³',
    description: 'Coarse particulate matter between 2.5 and 10 micrometers.',
    impact: 'Causes respiratory issues and visibility reduction.',
    importance: 18,
  },
  {
    icon: FlaskConical,
    name: 'NO₂',
    unit: 'ppb',
    description: 'Nitrogen dioxide from vehicle emissions and power plants.',
    impact: 'Respiratory irritant, contributes to smog formation.',
    importance: 12,
  },
  {
    icon: FlaskConical,
    name: 'SO₂',
    unit: 'ppb',
    description: 'Sulfur dioxide from industrial processes and fossil fuels.',
    impact: 'Causes acid rain and respiratory problems.',
    importance: 8,
  },
  {
    icon: Sun,
    name: 'O₃',
    unit: 'ppb',
    description: 'Ground-level ozone formed by chemical reactions.',
    impact: 'Major component of smog, triggers asthma attacks.',
    importance: 15,
  },
  {
    icon: Gauge,
    name: 'CO',
    unit: 'ppm',
    description: 'Carbon monoxide from incomplete combustion.',
    impact: 'Reduces oxygen delivery in blood, harmful at high levels.',
    importance: 5,
  },
  {
    icon: Thermometer,
    name: 'Temperature',
    unit: '°C',
    description: 'Ambient air temperature measurement.',
    impact: 'Affects pollutant dispersion and chemical reactions.',
    importance: 6,
  },
  {
    icon: Droplets,
    name: 'Humidity',
    unit: '%',
    description: 'Relative humidity in the atmosphere.',
    impact: 'Influences particulate matter behavior and ozone formation.',
    importance: 4,
  },
  {
    icon: Wind,
    name: 'Wind Speed',
    unit: 'm/s',
    description: 'Horizontal wind velocity measurement.',
    impact: 'Higher speeds disperse pollutants, improving air quality.',
    importance: 3,
  },
  {
    icon: CloudRain,
    name: 'Rainfall',
    unit: 'mm',
    description: 'Precipitation amount in the measurement period.',
    impact: 'Washes out particulates, temporarily improving AQI.',
    importance: 1,
  },
];

const DatasetSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % Math.ceil(features.length / 3));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + Math.ceil(features.length / 3)) % Math.ceil(features.length / 3));
  };

  return (
    <section id="dataset" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--border)) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div ref={ref} className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-4">
            Input Features
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Dataset & Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our model utilizes 10 carefully selected features including pollutant concentrations 
            and meteorological parameters for comprehensive AQI prediction.
          </p>
        </motion.div>

        {/* Carousel Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-3 rounded-full bg-card shadow-soft border border-border hover:shadow-card transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.ceil(features.length / 3) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === carouselIndex ? 'bg-primary w-8' : 'bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-3 rounded-full bg-card shadow-soft border border-border hover:shadow-card transition-all"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </motion.button>
        </div>

        {/* Feature Cards Grid with Carousel */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: `-${carouselIndex * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex"
          >
            {Array.from({ length: Math.ceil(features.length / 3) }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
                  {features.slice(pageIndex * 3, (pageIndex + 1) * 3).map((feature, idx) => {
                    const globalIndex = pageIndex * 3 + idx;
                    return (
                      <motion.div
                        key={feature.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        onMouseEnter={() => setHoveredCard(globalIndex)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="group"
                      >
                        <div className={`
                          bg-card rounded-xl p-6 border border-border/50 h-full
                          shadow-soft hover:shadow-elevated transition-all duration-500
                          ${hoveredCard === globalIndex ? '-translate-y-2' : ''}
                        `}>
                          {/* Header */}
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 rounded-lg bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                              <feature.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-serif font-semibold text-foreground">{feature.name}</h4>
                              <span className="text-xs text-muted-foreground">{feature.unit}</span>
                            </div>
                            <div className="ml-auto text-right">
                              <div className="text-lg font-bold text-primary">{feature.importance}%</div>
                              <div className="text-xs text-muted-foreground">importance</div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>

                          {/* Impact - Visible on hover */}
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ 
                              height: hoveredCard === globalIndex ? 'auto' : 0,
                              opacity: hoveredCard === globalIndex ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-border">
                              <span className="text-xs font-medium text-accent">Impact on AQI:</span>
                              <p className="text-sm text-muted-foreground mt-1">{feature.impact}</p>
                            </div>
                          </motion.div>

                          {/* Importance Bar */}
                          <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${feature.importance * 3}%` } : {}}
                              transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Data Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-card rounded-2xl p-8 shadow-card border border-border/50"
        >
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { value: '50,000+', label: 'Data Points', sublabel: 'Hourly records collected' },
              { value: '10', label: 'Input Features', sublabel: 'Pollutants & weather' },
              { value: '3 Years', label: 'Time Period', sublabel: 'Historical coverage' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.15, duration: 0.5, type: 'spring' }}
              >
                <div className="text-4xl font-serif font-bold text-primary mb-2">{stat.value}</div>
                <div className="font-medium text-foreground">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DatasetSection;
