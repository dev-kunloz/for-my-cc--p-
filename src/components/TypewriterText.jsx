import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './TypewriterText.css';

const TypewriterText = ({ messages, startDelay = 1000 }) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            setStarted(true);
        }, startDelay);

        return () => clearTimeout(startTimer);
    }, [startDelay]);

    useEffect(() => {
        if (!started || currentMessageIndex >= messages.length) return;

        setIsTyping(true);
        const message = messages[currentMessageIndex];
        let charIndex = 0;

        const typingInterval = setInterval(() => {
            if (charIndex <= message.length) {
                setCurrentText(message.slice(0, charIndex));
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);

                // Move to next message after a pause
                setTimeout(() => {
                    setCurrentMessageIndex(prev => prev + 1);
                    setCurrentText('');
                }, 1000);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, [currentMessageIndex, messages, started]);

    if (!started) return null;

    return (
        <div className="typewriter-container">
            {messages.slice(0, currentMessageIndex).map((msg, index) => (
                <motion.div
                    key={index}
                    className="message-line completed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {msg}
                </motion.div>
            ))}
            {currentText && (
                <motion.div
                    className="message-line typing"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    {currentText}
                    {isTyping && <span className="cursor">|</span>}
                </motion.div>
            )}
        </div>
    );
};

export default TypewriterText;
