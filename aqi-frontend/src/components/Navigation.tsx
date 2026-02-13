import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Predictor', path: '/predictor' },
        { name: 'About', path: '#about' },
        { name: 'Contact', path: '#contact' }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className={`mx-4 md:mx-auto max-w-7xl rounded-2xl transition-all duration-500 ${scrolled ? 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-sm px-6 py-3' : 'px-6 py-3'
                }`}>
                <div className="flex justify-between items-center">
                    <Link to="/" className="relative z-50 group flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center p-2 shadow-sm group-hover:rotate-12 transition-transform duration-500">
                            <Wind className="w-full h-full text-white" />
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="font-serif text-2xl font-black tracking-tighter text-slate-900"
                        >
                            AIR<span className="text-sky-500">CAST</span>
                        </motion.div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-12">
                        <div className="flex items-center gap-10">
                            {navLinks.map((link) => (
                                <MagneticButton key={link.name}>
                                    {link.path.startsWith('#') ? (
                                        <a href={link.path} className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors uppercase tracking-widest relative group">
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    ) : (
                                        <Link to={link.path} className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors uppercase tracking-widest relative group">
                                            {link.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                    )}
                                </MagneticButton>
                            ))}
                        </div>

                        <Link to="/predictor">
                            <MagneticButton>
                                <button className="px-8 py-2.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100 text-xs font-bold uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all duration-300 shadow-sm active:scale-95">
                                    Launch App
                                </button>
                            </MagneticButton>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden relative z-50 text-slate-800"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-4 right-4 p-6 rounded-2xl bg-white/95 backdrop-blur-3xl border border-white/40 md:hidden flex flex-col gap-6 items-center shadow-xl"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path.startsWith('#') ? '/' : link.path}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium text-slate-800 hover:text-sky-600 uppercase tracking-widest"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navigation;
