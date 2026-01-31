import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Layers, Grid3X3, Repeat, ArrowRight, Target, Database, Zap } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const ModelArchitecture = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState([50]);

  const architectureSteps = [
    {
      icon: Database,
      title: 'Input Layer',
      subtitle: 'Time-series data',
      description: 'Multivariate time-series input with pollutant concentrations and meteorological features.',
      details: 'Shape: (24 timesteps × 10 features)',
      tooltip: 'Normalized data from the past 24 hours is fed into the network.',
    },
    {
      icon: Grid3X3,
      title: 'CNN Layers',
      subtitle: 'Spatial extraction',
      description: 'Convolutional layers capture spatial correlations between different pollutants.',
      details: '1D Conv(64) → Conv(128) → MaxPool',
      tooltip: 'CNNs detect patterns in pollutant interactions and their combined effects.',
    },
    {
      icon: Repeat,
      title: 'LSTM Layers',
      subtitle: 'Temporal modeling',
      description: 'Stacked LSTM layers model long-term temporal dependencies in air quality.',
      details: 'LSTM(128) → LSTM(64) → Dropout',
      tooltip: 'LSTMs remember patterns over time, capturing seasonal and daily variations.',
    },
    {
      icon: Layers,
      title: 'Dense Layers',
      subtitle: 'Feature aggregation',
      description: 'Fully connected layers aggregate learned representations for prediction.',
      details: 'Dense(64) → Dense(32) → ReLU',
      tooltip: 'Dense layers combine all learned features into final prediction inputs.',
    },
    {
      icon: Target,
      title: 'Output Layer',
      subtitle: 'AQI prediction',
      description: 'Single neuron output provides continuous AQI value prediction.',
      details: 'Dense(1) → Linear',
      tooltip: 'Final layer outputs the predicted AQI value for the forecast period.',
    },
  ];

  return (
    <section id="model" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />

      <div ref={ref} className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            CNN-LSTM Model Design
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our hybrid architecture combines CNN's spatial feature extraction with LSTM's
            temporal sequence modeling for accurate air quality forecasting.
          </p>
        </motion.div>

        {/* Architecture Flow Diagram */}
        <div className="relative mb-16">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[8%] right-[8%] h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full -translate-y-1/2 z-0 opacity-30" />

          {/* Animated data flow */}
          <motion.div
            className="hidden lg:block absolute top-1/2 left-[8%] h-1 bg-accent rounded-full -translate-y-1/2 z-0"
            initial={{ width: 0 }}
            animate={isInView ? { width: '84%' } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          />

          {/* Architecture Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {architectureSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
                className="relative z-10"
              >
                <div className={`
                  bg-card rounded-xl p-6 border shadow-soft
                  transition-all duration-500 cursor-default h-full
                  ${activeStep === index
                    ? 'shadow-elevated -translate-y-3 border-accent'
                    : 'border-border/50 hover:border-border'
                  }
                `}>
                  {/* Step number */}
                  <motion.div
                    className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-soft"
                    whileHover={{ scale: 1.1 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300
                    ${activeStep === index
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-primary'
                    }
                  `}>
                    <step.icon className="w-6 h-6" />
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="font-serif font-semibold text-foreground mb-1">{step.title}</h4>
                  <p className="text-xs text-accent font-medium mb-3">{step.subtitle}</p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

                  {/* Technical details */}
                  <div className="text-xs font-mono bg-muted/50 rounded-lg px-3 py-2 text-muted-foreground">
                    {step.details}
                  </div>

                  {/* Tooltip on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: activeStep === index ? 1 : 0,
                      y: activeStep === index ? 0 : 10
                    }}
                    className="absolute -bottom-2 left-4 right-4 p-3 bg-foreground text-background text-xs rounded-lg shadow-elevated z-20"
                  >
                    {step.tooltip}
                  </motion.div>
                </div>

                {/* Arrow connector for mobile */}
                {index < architectureSteps.length - 1 && (
                  <div className="flex justify-center lg:hidden my-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <ArrowRight className="w-6 h-6 text-accent rotate-90 lg:rotate-0" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Slider Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-card rounded-2xl p-8 md:p-12 shadow-card border border-border/50"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="font-serif text-xl font-bold text-foreground">
              Model Capability Balance
            </h3>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between mb-4 text-sm font-medium">
              <span className="text-primary">Spatial Pattern Recognition (CNN)</span>
              <span className="text-accent">Temporal Dependency Modeling (LSTM)</span>
            </div>

            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
              className="mb-8"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                className="p-5 rounded-xl bg-primary/10 border border-primary/20"
                animate={{ scale: sliderValue[0] > 50 ? 1.02 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl font-serif font-bold text-primary mb-2">
                  {sliderValue[0]}%
                </div>
                <div className="text-sm text-muted-foreground">
                  CNN captures pollutant interactions, detecting how different
                  pollutants combine to affect air quality.
                </div>
              </motion.div>
              <motion.div
                className="p-5 rounded-xl bg-accent/10 border border-accent/20"
                animate={{ scale: sliderValue[0] < 50 ? 1.02 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl font-serif font-bold text-accent mb-2">
                  {100 - sliderValue[0]}%
                </div>
                <div className="text-sm text-muted-foreground">
                  LSTM models temporal sequences, learning daily cycles,
                  weekly patterns, and seasonal trends.
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModelArchitecture;
