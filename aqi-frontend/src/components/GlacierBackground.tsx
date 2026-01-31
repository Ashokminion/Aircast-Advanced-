import { motion } from 'framer-motion';

const GlacierBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                        opacity: Math.random() * 0.3 + 0.1,
                        scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{
                        y: [null, '-=100vh'],
                        opacity: [null, 0]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                    className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
                />
            ))}
        </div>
    );
};

export default GlacierBackground;
