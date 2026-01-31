import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Info, TrendingUp } from 'lucide-react';

const featureImportanceData = [
  { 
    feature: 'PM2.5', 
    importance: 0.28, 
    description: 'Fine particulate matter is the strongest predictor of AQI due to its direct health impact.',
    recommendation: 'Primary focus for air quality monitoring and control measures.'
  },
  { 
    feature: 'PM10', 
    importance: 0.18, 
    description: 'Coarse particles contribute significantly, especially in dusty and industrial areas.',
    recommendation: 'Important for construction site and road dust management.'
  },
  { 
    feature: 'O₃', 
    importance: 0.15, 
    description: 'Ground-level ozone shows strong seasonal patterns and photochemical activity.',
    recommendation: 'Critical during summer months with high UV radiation.'
  },
  { 
    feature: 'NO₂', 
    importance: 0.12, 
    description: 'Traffic-related emissions make NO₂ a key indicator in urban environments.',
    recommendation: 'Focus on vehicle emission controls and traffic management.'
  },
  { 
    feature: 'Temperature', 
    importance: 0.08, 
    description: 'Temperature affects chemical reactions and pollutant dispersion patterns.',
    recommendation: 'Consider seasonal adjustments in forecasting models.'
  },
  { 
    feature: 'Humidity', 
    importance: 0.06, 
    description: 'Moisture levels influence particulate matter behavior and ozone formation.',
    recommendation: 'Important for coastal and tropical region predictions.'
  },
  { 
    feature: 'Wind Speed', 
    importance: 0.05, 
    description: 'Higher wind speeds typically disperse pollutants, lowering AQI.',
    recommendation: 'Key factor for ventilation corridor planning.'
  },
  { 
    feature: 'CO', 
    importance: 0.04, 
    description: 'Carbon monoxide from combustion sources affects local air quality.',
    recommendation: 'Monitor near traffic hotspots and industrial areas.'
  },
  { 
    feature: 'SO₂', 
    importance: 0.03, 
    description: 'Industrial emissions of sulfur dioxide impact regional air quality.',
    recommendation: 'Focus on power plant and factory emission controls.'
  },
  { 
    feature: 'Rainfall', 
    importance: 0.01, 
    description: 'Precipitation temporarily improves air quality by washing out particulates.',
    recommendation: 'Use weather forecasts for short-term AQI predictions.'
  },
];

// Glacier blue color palette for bars
const COLORS = [
  'hsl(210, 80%, 35%)',
  'hsl(205, 75%, 40%)',
  'hsl(200, 70%, 45%)',
  'hsl(195, 85%, 45%)',
  'hsl(190, 75%, 50%)',
  'hsl(185, 70%, 55%)',
  'hsl(180, 65%, 55%)',
  'hsl(175, 60%, 50%)',
  'hsl(170, 55%, 45%)',
  'hsl(165, 50%, 45%)',
];

const FeatureImportance = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedFeature, setSelectedFeature] = useState<typeof featureImportanceData[0] | null>(null);

  return (
    <section id="features" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div ref={ref} className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Interpretability
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Feature Importance Analysis
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Understanding which features contribute most to AQI predictions enables 
            targeted pollution control strategies and policy decisions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-xl font-bold text-foreground">
                Relative Feature Contribution
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Click on a bar to see detailed information about each feature
            </p>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={featureImportanceData}
                  layout="vertical"
                  margin={{ left: 0, right: 20 }}
                  onClick={(data) => {
                    if (data && data.activePayload) {
                      setSelectedFeature(data.activePayload[0].payload);
                    }
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    type="number"
                    domain={[0, 0.3]}
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis
                    dataKey="feature"
                    type="category"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card border border-border rounded-xl p-3 shadow-elevated">
                            <p className="font-serif font-semibold text-foreground">{payload[0].payload.feature}</p>
                            <p className="text-primary font-mono">
                              {(payload[0].payload.importance * 100).toFixed(1)}% contribution
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="importance"
                    radius={[0, 8, 8, 0]}
                    cursor="pointer"
                  >
                    {featureImportanceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index]}
                        opacity={selectedFeature?.feature === entry.feature ? 1 : 0.85}
                        stroke={selectedFeature?.feature === entry.feature ? 'hsl(var(--foreground))' : 'none'}
                        strokeWidth={2}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Feature Detail Panel */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Selected Feature Info */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50 min-h-[280px]">
              {selectedFeature ? (
                <motion.div
                  key={selectedFeature.feature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[featureImportanceData.findIndex(f => f.feature === selectedFeature.feature)] }}
                    />
                    <h3 className="font-serif text-2xl font-bold text-foreground">{selectedFeature.feature}</h3>
                    <span className="ml-auto text-2xl font-mono text-primary">
                      {(selectedFeature.importance * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-2">Description</h4>
                      <p className="text-foreground leading-relaxed">{selectedFeature.description}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-2">Recommendation</h4>
                      <p className="text-accent">{selectedFeature.recommendation}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <Info className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-center">Click on a feature in the chart<br />to see detailed information</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -3 }}
                className="bg-card rounded-xl p-6 shadow-soft border border-border/50 text-center glacier-card"
              >
                <div className="text-3xl font-serif font-bold text-primary mb-1">46%</div>
                <div className="text-sm font-medium text-foreground">Particulate Matter</div>
                <div className="text-xs text-muted-foreground mt-1">PM2.5 + PM10 combined</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                whileHover={{ y: -3 }}
                className="bg-card rounded-xl p-6 shadow-soft border border-border/50 text-center glacier-card"
              >
                <div className="text-3xl font-serif font-bold text-accent mb-1">19%</div>
                <div className="text-sm font-medium text-foreground">Weather Factors</div>
                <div className="text-xs text-muted-foreground mt-1">Temperature, Humidity, Wind</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureImportance;
