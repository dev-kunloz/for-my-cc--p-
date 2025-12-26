import { motion } from 'framer-motion';
import './FloatingParticles.css';

const FloatingParticles = () => {
    const particles = [
        { emoji: '💕', top: '10%', left: '15%', delay: 0, duration: 6 },
        { emoji: '🌸', top: '25%', right: '20%', delay: 1, duration: 7 },
        { emoji: '✨', bottom: '20%', left: '10%', delay: 2, duration: 5 },
        { emoji: '💜', top: '40%', right: '15%', delay: 3, duration: 8 },
        { emoji: '🦋', bottom: '30%', right: '25%', delay: 4, duration: 6 },
        { emoji: '💖', top: '60%', left: '20%', delay: 0.5, duration: 7 },
        { emoji: '🌺', bottom: '50%', right: '10%', delay: 2.5, duration: 6 },
        { emoji: '🎀', top: '15%', left: '70%', delay: 1.5, duration: 5.5 },
    ];

    return (
        <div className="particles-container">
            {particles.map((particle, index) => (
                <motion.div
                    key={index}
                    className="particle"
                    style={{
                        top: particle.top,
                        bottom: particle.bottom,
                        left: particle.left,
                        right: particle.right,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        rotate: [-5, 5, -5],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut',
                    }}
                >
                    {particle.emoji}
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingParticles;
