import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Predictor = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-white">
            <Navigation />

            <main className="relative pt-20 overflow-hidden">
                {/* Modern Mesh Gradient Background */}
                <div
                    className="absolute inset-0 z-0 opacity-60 bg-cover bg-center bg-no-repeat blur-[60px] animate-pulse-slow"
                    style={{ backgroundImage: 'url("/assets/images/nebula_bg.png")' }}
                />
                <div className="absolute inset-0 z-0 bg-neutral-950/40" />

                <div className="relative z-10 section-container pb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="mb-12 text-center pt-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-primary-foreground text-xs font-bold uppercase tracking-[0.2em] mb-8"
                        >
                            <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_15px_#d946ef] animate-ping" />
                            AI Predictor Unleashed
                        </motion.div>

                        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-primary to-accent mb-8 drop-shadow-2xl">
                            Next-Gen <br />
                            <span className="text-white drop-shadow-none">AQI Intelligence</span>
                        </h1>

                        <p className="text-white/60 max-w-2xl mx-auto text-xl leading-relaxed font-light">
                            Blurring the lines between data and art. Our CNN-LSTM hybrid engine
                            redefines how we perceive and predict our environment.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1, type: "spring", bounce: 0.3 }}
                        className="relative w-full aspect-[16/9] min-h-[900px] rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(124,58,237,0.2)] border border-white/5 bg-black/40 backdrop-blur-2xl"
                    >
                        {/* Gloss Header for Widget */}
                        <div className="absolute top-0 left-0 right-0 h-16 bg-white/[0.03] backdrop-blur-3xl border-b border-white/5 flex items-center px-8 z-20">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="mx-auto text-white/30 text-xs font-mono uppercase tracking-widest">
                                Real-Time Neural Processing
                            </div>
                        </div>

                        <iframe
                            src="https://aircast1.streamlit.app/?embedded=true"
                            title="AQI Predictor Dashboard"
                            className="absolute inset-0 w-full h-full border-none pt-16"
                            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
                        />
                    </motion.div>

                    <div className="mt-20 grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Neural Vision",
                                desc: "Convolutional layers process pollutant densities as high-dimensional interactions.",
                                color: "bg-violet-500/20"
                            },
                            {
                                title: "Temporal Drift",
                                desc: "LSTM memory cells capture the rhythmic pulse of urban pollution cycles.",
                                color: "bg-fuchsia-500/20"
                            },
                            {
                                title: "Hyper-Synthesis",
                                desc: "Instantaneous city-wide forecasting driven by regional sensor fusion.",
                                color: "bg-blue-500/20"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-primary/50 transition-all duration-500 backdrop-blur-sm"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${feature.color} mb-6 flex items-center justify-center`}>
                                    <div className="w-4 h-4 rounded-full bg-white/80" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-white/40 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Predictor;
