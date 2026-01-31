import { motion } from 'framer-motion';
import { ArrowDown, LayoutDashboard, Brain, Activity, Droplets, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Mesh Gradient Background */}
      <div
        className="absolute inset-0 opacity-40 blur-[80px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle at 20% 30%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 80% 70%, #d946ef 0%, transparent 50%)'
        }}
      />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground">
            B.Tech Research Edition
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-serif text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter"
        >
          AI-POWERED <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-violet-400">AIRCAST FORECASTING</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-white/40 max-w-2xl mx-auto text-xl md:text-2xl font-light mb-12 leading-relaxed"
        >
          Unifying CNN-LSTM architectures with high-fidelity environmental data
          for a safer, smarter future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <button
            onClick={scrollToAbout}
            className="px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
          >
            Explore Data
          </button>

          <Link
            to="/predictor"
            className="px-10 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_rgba(124,58,237,0.3)] flex items-center gap-3 group"
          >
            Launch Predictor
            <LayoutDashboard className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -40, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-[20%] left-[15%] text-primary/50"
        >
          <Wind size={120} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 40, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[20%] right-[10%] text-accent/50"
        >
          <Activity size={100} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
