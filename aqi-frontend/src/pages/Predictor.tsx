import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Activity, Cpu, Eye, Zap } from 'lucide-react';

const Predictor = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-200 selection:text-sky-900 pb-20">
            <Navigation />

            <main className="relative pt-32 overflow-hidden min-h-screen">
                {/* Clean Light Mesh Gradient Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px] animate-pulse-slow"></div>
                    <div className="absolute bottom-[0%] right-[0%] w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[100px] animate-pulse-slow"></div>
                </div>

                <div className="relative z-10 section-container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1 rounded-full glass-panel text-sky-600 text-xs font-bold uppercase tracking-[0.25em] mb-6 border border-sky-100 shadow-sm">
                            System Online
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl font-black text-slate-900 mb-6">
                            SKYPLUS <span className="text-gradient-animate">INTELLIGENCE</span>
                        </h1>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            Interfacing with the SkyPlus-7B Neural Engine for hyper-local telemetry and pollution forecasting.
                        </p>
                    </motion.div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                        {/* Sidebar / Info Panel */}
                        <div className="lg:col-span-1 space-y-6">
                            {[
                                { title: "Sky Vision", icon: <Eye size={20} />, value: "Active", desc: "Spatial feature extraction enabled" },
                                { title: "Temporal Flow", icon: <Zap size={20} />, value: "0.8s", desc: "Latency optimized for LSTM" },
                                { title: "Proxy Node", icon: <Cpu size={20} />, value: "Coimbatore", desc: "High-fidelity data bridging" },
                                { title: "Status", icon: <Activity size={20} />, value: "Optimal", desc: "All sensors operational" },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="glass-panel p-6 rounded-2xl bg-white/60 hover:bg-white transition-colors border border-white/50 hover:border-sky-300 shadow-sm hover:shadow-md group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-slate-500 text-xs uppercase tracking-widest font-bold">{item.title}</h3>
                                        <div className="text-sky-500/70 group-hover:text-sky-600 transition-colors">{item.icon}</div>
                                    </div>
                                    <div className="text-2xl font-serif font-bold text-slate-800 mb-1">{item.value}</div>
                                    <div className="text-slate-500 text-xs">{item.desc}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Main Iframe Display */}
                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="relative rounded-3xl overflow-hidden glass-panel bg-white border border-white/60 shadow-xl h-[800px]"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-30"></div>

                                <iframe
                                    src={import.meta.env.VITE_STREAMLIT_URL || "http://localhost:8501"}
                                    className="w-full h-full border-0 relative z-10"
                                    title="SkyPlus Dashboard"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Predictor;
