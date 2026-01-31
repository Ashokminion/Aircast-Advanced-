import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';

// Placeholder data - Actual vs Predicted AQI
const predictionData = [
  { day: 'Day 1', actual: 78, predicted: 75 },
  { day: 'Day 2', actual: 92, predicted: 89 },
  { day: 'Day 3', actual: 85, predicted: 88 },
  { day: 'Day 4', actual: 110, predicted: 107 },
  { day: 'Day 5', actual: 145, predicted: 142 },
  { day: 'Day 6', actual: 132, predicted: 138 },
  { day: 'Day 7', actual: 98, predicted: 95 },
  { day: 'Day 8', actual: 76, predicted: 79 },
  { day: 'Day 9', actual: 88, predicted: 85 },
  { day: 'Day 10', actual: 102, predicted: 105 },
  { day: 'Day 11', actual: 125, predicted: 121 },
  { day: 'Day 12', actual: 118, predicted: 122 },
  { day: 'Day 13', actual: 95, predicted: 92 },
  { day: 'Day 14', actual: 82, predicted: 85 },
];

// Model comparison data
const modelComparisonData = [
  { model: 'Linear Regression', rmse: 28.5, r2: 72 },
  { model: 'Random Forest', rmse: 19.2, r2: 84 },
  { model: 'LSTM Only', rmse: 14.8, r2: 89 },
  { model: 'CNN Only', rmse: 16.1, r2: 87 },
  { model: 'CNN-LSTM (Ours)', rmse: 8.6, r2: 96 },
];

const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="results" className="py-24 md:py-32 bg-black/20 relative">
      <div ref={ref} className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-aqi-good text-white text-sm font-medium mb-4">
            Performance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Results & Predictions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive evaluation demonstrates our CNN-LSTM model's superior
            forecasting accuracy compared to baseline approaches.
          </p>
        </motion.div>

        {/* Actual vs Predicted Chart */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50 mb-8"
        >
          <h3 className="font-serif text-xl font-bold text-foreground mb-2">
            Actual vs Predicted AQI (14-Day Forecast)
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Close alignment demonstrates high prediction accuracy
          </p>
          <div className="h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(210, 80%, 35%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(210, 80%, 35%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(195, 85%, 45%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(195, 85%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    fontFamily: 'Georgia, serif',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(210, 80%, 35%)"
                  strokeWidth={2}
                  fill="url(#actualGradient)"
                  name="Actual AQI"
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="hsl(195, 85%, 45%)"
                  strokeWidth={2}
                  fill="url(#predictedGradient)"
                  name="Predicted AQI"
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center italic">
            * Placeholder visualization. Replace with actual model predictions for deployment.
          </p>
        </motion.div>

        {/* Model Comparison & Metrics Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* R² Score Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50"
          >
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
              Model Comparison (R² Score)
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Higher R² indicates better variance explanation
            </p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelComparisonData} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis dataKey="model" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={110} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                    }}
                    formatter={(value: any) => [`${value}%`, 'R² Score']}
                  />
                  <Bar
                    dataKey="r2"
                    name="R² Score (%)"
                    radius={[0, 8, 8, 0]}
                    fill="hsl(195, 85%, 45%)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50"
          >
            <h3 className="font-serif text-xl font-bold text-foreground mb-6">
              CNN-LSTM Performance Metrics
            </h3>
            <div className="space-y-6">
              {[
                { metric: 'R² Score', value: '0.96', desc: 'Variance explained', pct: 96 },
                { metric: 'RMSE', value: '8.6', desc: 'Root Mean Square Error', pct: 85 },
                { metric: 'MAE', value: '6.4', desc: 'Mean Absolute Error', pct: 90 },
                { metric: 'MAPE', value: '5.2%', desc: 'Mean Absolute % Error', pct: 95 },
              ].map((item, index) => (
                <motion.div
                  key={item.metric}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <span className="font-serif font-medium text-foreground">{item.metric}</span>
                      <span className="text-sm text-muted-foreground ml-2">({item.desc})</span>
                    </div>
                    <span className="text-2xl font-serif font-bold text-primary">{item.value}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.pct}%` } : {}}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AQI Category Distribution Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50"
        >
          <h3 className="font-serif text-xl font-bold text-foreground mb-6 text-center">
            Predicted AQI Category Distribution
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { category: 'Good', pct: 49, color: 'bg-aqi-good' },
              { category: 'Moderate', pct: 26, color: 'bg-aqi-moderate' },
              { category: 'Unhealthy', pct: 15, color: 'bg-aqi-unhealthy' },
              { category: 'Very Unhealthy', pct: 7, color: 'bg-aqi-very-unhealthy' },
              { category: 'Hazardous', pct: 3, color: 'bg-aqi-hazardous' },
            ].map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1 + index * 0.1, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center cursor-default"
              >
                <div
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-2 shadow-soft hover:shadow-elevated transition-shadow ${item.color}`}
                >
                  <span className="text-xl md:text-2xl font-serif font-bold text-white">
                    {item.pct}%
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">{item.category}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
