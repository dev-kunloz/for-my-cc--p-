import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import TreeAnimation from '../components/TreeAnimation';
import TypewriterText from '../components/TypewriterText';
import FloatingParticles from '../components/FloatingParticles';
import AudioPlayer from '../components/AudioPlayer';
import './ComfortPage.css';

const ComfortPage = () => {
    const { user, logout } = useAuth();

    const messages = [
        `Hey ${user?.displayName || 'sis'} 💕`,
        "I know you're not feeling great right now 🌸",
        "But I want you to know you're incredibly strong 💪",
        "This too shall pass, and I'm here for you 🤗",
        "You deserve all the comfort and rest 🛌",
        "Hot chocolate? Heating pad? Just say the word! ☕",
        "Remember: You're a warrior, even on tough days 👑",
        "Sending you all my love and positive vibes 💖✨",
        "You've got this! 💪❤️"
    ];

    return (
        <div className="comfort-page">
            <FloatingParticles />

            {/* Background Tree Animation */}
            <TreeAnimation />

            <motion.button
                className="logout-button"
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Logout
            </motion.button>

            {/* Foreground Content Overlay */}
            <div className="content-overlay">
                <motion.div
                    className="messages-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <TypewriterText messages={messages} startDelay={1000} />
                </motion.div>
            </div>

            <AudioPlayer />
        </div>
    );
};

export default ComfortPage;
