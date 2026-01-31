import { Wind, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isPredictorPage = location.pathname === '/predictor';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '/#about' },
        { name: 'Architecture', href: '/#model' },
        { name: 'Results', href: '/#results' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled || isPredictorPage ? 'bg-black/20 backdrop-blur-2xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
            <div className="section-container flex items-center justify-between">
                <Link to="/" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center p-2.5 shadow-[0_0_20px_#7c3aed44] group-hover:rotate-12 transition-transform duration-500">
                        <Wind className="w-full h-full text-white" />
                    </div>
                    <span className="font-serif font-black text-2xl tracking-tighter text-white">Air<span className="text-primary">Cast</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold uppercase tracking-[0.1em] text-white/60 hover:text-white transition-all"
                        >
                            {link.name}
                        </a>
                    ))}

                    <Link
                        to="/predictor"
                        className={`group relative px-8 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest overflow-hidden transition-all ${isPredictorPage
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'bg-primary text-white shadow-[0_10px_30px_#7c3aed66] hover:scale-105'
                            }`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <LayoutDashboard className="w-4 h-4" />
                            Predictor
                        </span>
                        {!isPredictorPage && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
