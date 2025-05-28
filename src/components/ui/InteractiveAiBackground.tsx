import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme'; // Assuming you have a useTheme hook
import './InteractiveAiBackground.css';

// Declare VANTA globally or import if types are available
declare const VANTA: {
  NET: (options: Record<string, unknown>) => { destroy: () => void };
};

const InteractiveAiBackground: React.FC = () => {
  const { theme } = useTheme();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null); // To store the VANTA effect instance

  useEffect(() => {
    if (VANTA && vantaRef.current) {
      // Destroy previous instance if it exists
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }

      vantaEffect.current = VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: theme === 'dark' ? 0x61dafb : 0x0066cc, // Example: Use theme colors
        backgroundColor: theme === 'dark' ? 0x121212 : 0xffffff, // Example: Use theme colors
        points: 13.00,
        maxDistance: 18.00,
        spacing: 16.00
      });
    }

    // Cleanup function to destroy VANTA effect when component unmounts
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [theme]);

  return <div ref={vantaRef} className="interactive-ai-background" style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default InteractiveAiBackground;
