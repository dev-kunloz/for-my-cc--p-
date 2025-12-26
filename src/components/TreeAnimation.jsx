import { useEffect, useRef } from 'react';
import './TreeAnimation.css';

const TreeAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let animationFrameId;

        // Set canvas size
        const updateSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Redraw if needed, but for now we'll just let the loop handle it relative to new size
            // Note: resizing clears canvas, so simple resize listener needs to restart or redraw
        };
        updateSize();

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Tree properties
        let centerX = canvas.width / 2;
        let centerY = canvas.height;
        let growthProgress = 0;

        // Draw tree branch
        const drawBranch = (x, y, length, angle, depth, progress) => {
            if (depth === 0 || progress <= 0) return;

            const currentLength = length * Math.min(progress, 1);
            const endX = x + currentLength * Math.cos(angle);
            const endY = y - currentLength * Math.sin(angle);

            // Branch color - pastel purple gradient
            const gradient = ctx.createLinearGradient(x, y, endX, endY);
            gradient.addColorStop(0, '#b395d3');
            gradient.addColorStop(1, '#d0b8e0');

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = depth * 2;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Draw flowers at branch ends
            if (depth <= 2 && progress >= 1) {
                drawFlower(endX, endY);
            }

            // Recursive branches
            if (progress > 1) {
                const newProgress = progress - 1;
                drawBranch(endX, endY, length * 0.67, angle - 0.4, depth - 1, newProgress);
                drawBranch(endX, endY, length * 0.67, angle + 0.4, depth - 1, newProgress);
            }
        };

        // Draw flower (pastel pink/purple)
        const drawFlower = (x, y) => {
            const petalCount = 5;
            const petalSize = 8;

            for (let i = 0; i < petalCount; i++) {
                const angle = (i / petalCount) * Math.PI * 2;
                const petalX = x + Math.cos(angle) * petalSize;
                const petalY = y + Math.sin(angle) * petalSize;

                ctx.beginPath();
                ctx.arc(petalX, petalY, petalSize / 1.5, 0, Math.PI * 2);

                const colors = ['#ffb6df', '#e0b3d4', '#d5b3ff', '#ffc8e8'];
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.fill();
            }

            // Center of flower
            ctx.beginPath();
            ctx.arc(x, y, petalSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = '#fff59d';
            ctx.fill();
        };

        // Animation loop
        const animate = () => {
            // Update centers in case of resize
            centerX = canvas.width / 2;
            centerY = canvas.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (growthProgress < 8) {
                growthProgress += 0.03; // Slightly slower for background ambience
            }

            // Base trunk size based on screen height
            const trunkSize = Math.min(canvas.height * 0.25, 180);

            drawBranch(centerX, centerY, trunkSize, Math.PI / 2, 10, growthProgress);

            if (growthProgress < 9) { // Keep animating a bit longer
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animate();

        // Handle resize - restart animation properly
        const handleResize = () => {
            updateSize();
            // Optional: reset progress or just letting it continue
            // for simplicity, we let it redraw next frame
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="tree-container">
            <canvas ref={canvasRef} className="tree-canvas" />
        </div>
    );
};

export default TreeAnimation;
