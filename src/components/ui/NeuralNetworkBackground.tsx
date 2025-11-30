import React, { useEffect, useRef } from 'react';
import './NeuralNetworkBackground.css';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface NeuralNetworkBackgroundProps {
  nodeCount?: number;
  connectionDistance?: number;
  className?: string;
}

const NeuralNetworkBackground: React.FC<NeuralNetworkBackgroundProps> = ({
  nodeCount = 50,
  connectionDistance = 150,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes
    const initNodes = () => {
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initNodes();

    // Get theme colors
    const getColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return {
        nodeColor: isDark ? 'rgba(96, 165, 250, 0.8)' : 'rgba(59, 130, 246, 0.7)',
        lineColor: isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(59, 130, 246, 0.1)',
        glowColor: isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(59, 130, 246, 0.3)',
        pulseColor: isDark ? 'rgba(56, 189, 248, 0.6)' : 'rgba(14, 165, 233, 0.5)',
      };
    };

    // Animation loop
    let time = 0;
    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const colors = getColors();
      
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // Update and draw nodes
      nodesRef.current.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Draw connections
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const other = nodesRef.current[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            
            // Create gradient for connection
            const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.5 + 0.5;
            
            gradient.addColorStop(0, colors.lineColor.replace('0.15', String(0.05 + opacity * 0.15)));
            gradient.addColorStop(0.5, colors.pulseColor.replace('0.6', String(pulse * opacity * 0.3)));
            gradient.addColorStop(1, colors.lineColor.replace('0.15', String(0.05 + opacity * 0.15)));

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 1.5;
            ctx.stroke();
          }
        }
      });

      // Draw nodes on top
      nodesRef.current.forEach((node) => {
        const pulse = Math.sin(time * 3 + node.pulsePhase) * 0.5 + 0.5;
        const currentRadius = node.radius + pulse * 1.5;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, currentRadius * 4
        );
        gradient.addColorStop(0, colors.glowColor);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = colors.nodeColor;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodeCount, connectionDistance]);

  return (
    <div className={`neural-network-background ${className}`}>
      <canvas ref={canvasRef} className="neural-canvas" />
      <div className="neural-grid-overlay" />
    </div>
  );
};

export default NeuralNetworkBackground;
