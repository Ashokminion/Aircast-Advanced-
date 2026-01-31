import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Search, Clock, Zap } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const points = [
    {
      icon: Search,
      title: "Data Fidelity",
      text: "Mining high-dimensional AQI datasets across 20+ Indian urban centers.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Brain,
      title: "Neural Fusion",
      text: "Integrating 1D-CNN for feature extraction and LSTM for temporal sequences.",
      color: "from-violet-500 to-fuchsia-400"
    },
    {
      icon: Zap,
      title: "Hyper-Inference",
      text: "Delivering sub-second predictions for critical environmental metrics.",
      color: "from-orange-500 to-amber-400"
    }
  ];

  return (
    <section id="about" className="py-32 bg-[#080808] relative overflow-hidden">
      <div ref={ref} className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tight">
              REDEFINING <span className="text-primary italic">ENVIRONMENTAL</span> SUSTAINABILITY
            </h2>
            <p className="text-white/40 text-xl leading-relaxed mb-12 font-light">
              Our project tackles the complexity of urban air pollution using a custom-engineered
              Hybrid CNN-LSTM network. By capturing both the spatial pollutant relationships
              and their temporal evolution, we provide accuracy that old models can't match.
            </p>

            <div className="space-y-8">
              {points.map((point, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${point.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <point.icon className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{point.title}</h4>
                    <p className="text-white/30 text-base">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/20 border border-white/5 flex items-center justify-center overflow-hidden">
              {/* Visual placeholder for model art */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover opacity-20" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative z-10 w-64 h-64 border-2 border-white/10 rounded-full flex items-center justify-center"
              >
                <div className="w-48 h-48 border-2 border-primary/30 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-primary/20 backdrop-blur-3xl rounded-full flex items-center justify-center shadow-[0_0_50px_#7c3aed44]">
                    <Brain size={60} className="text-white animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Glossy Metric Tag */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 px-8 py-6 rounded-3xl bg-black/60 backdrop-blur-3xl border border-white/10 shadow-2xl"
            >
              <div className="text-primary text-4xl font-black mb-1">0.96</div>
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Model R² Accuracy</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
