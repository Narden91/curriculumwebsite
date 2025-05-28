import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import './InteractiveAiBackground.css';

const InteractiveAiBackground: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="interactive-ai-background">
      <svg
        className="background-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
            <stop 
              offset="0%" 
              stopColor={theme === 'dark' ? '#1e293b' : '#f1f5f9'} 
              stopOpacity="1" 
            />
            <stop 
              offset="100%" 
              stopColor={theme === 'dark' ? '#0f172a' : '#ffffff'} 
              stopOpacity="1" 
            />
          </radialGradient>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop 
              offset="0%" 
              stopColor={theme === 'dark' ? '#60a5fa' : '#3b82f6'} 
              stopOpacity="0.6" 
            />
            <stop 
              offset="100%" 
              stopColor={theme === 'dark' ? '#38bdf8' : '#0ea5e9'} 
              stopOpacity="0.8" 
            />
          </linearGradient>
        </defs>
        
        {/* Background */}
        <rect width="100%" height="100%" fill="url(#bgGradient)" />
        
        {/* Animated neural network nodes */}
        <g className="neural-network">
          {/* Network connections */}
          <g className="connections" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} strokeWidth="1" opacity="0.4">
            <line x1="200" y1="150" x2="400" y2="200" className="connection-line">
              <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="400" y1="200" x2="600" y2="180">
              <animate attributeName="stroke-opacity" values="0.6;0.2;0.6" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="600" y1="180" x2="800" y2="250">
              <animate attributeName="stroke-opacity" values="0.2;0.8;0.2" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="300" y1="350" x2="500" y2="400">
              <animate attributeName="stroke-opacity" values="0.4;0.2;0.4" dur="3.5s" repeatCount="indefinite" />
            </line>
            <line x1="500" y1="400" x2="700" y2="420">
              <animate attributeName="stroke-opacity" values="0.2;0.7;0.2" dur="4.5s" repeatCount="indefinite" />
            </line>
            <line x1="150" y1="500" x2="350" y2="550">
              <animate attributeName="stroke-opacity" values="0.5;0.2;0.5" dur="6s" repeatCount="indefinite" />
            </line>
            <line x1="350" y1="550" x2="550" y2="580">
              <animate attributeName="stroke-opacity" values="0.2;0.6;0.2" dur="3.8s" repeatCount="indefinite" />
            </line>
          </g>
          
          {/* Network nodes */}
          <g className="nodes">
            <circle cx="200" cy="150" r="6" fill="url(#nodeGradient)">
              <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="400" cy="200" r="5" fill="url(#nodeGradient)">
              <animate attributeName="r" values="5;7;5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="600" cy="180" r="4" fill="url(#nodeGradient)">
              <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="800" cy="250" r="6" fill="url(#nodeGradient)">
              <animate attributeName="r" values="4;8;4" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="350" r="5" fill="url(#nodeGradient)">
              <animate attributeName="r" values="4;7;4" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="400" r="4" fill="url(#nodeGradient)">
              <animate attributeName="r" values="3;6;3" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="700" cy="420" r="6" fill="url(#nodeGradient)">
              <animate attributeName="r" values="5;8;5" dur="2.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="150" cy="500" r="5" fill="url(#nodeGradient)">
              <animate attributeName="r" values="4;7;4" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="350" cy="550" r="4" fill="url(#nodeGradient)">
              <animate attributeName="r" values="3;6;3" dur="3.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="550" cy="580" r="6" fill="url(#nodeGradient)">
              <animate attributeName="r" values="4;8;4" dur="2.1s" repeatCount="indefinite" />
            </circle>
            
            {/* Additional floating nodes */}
            <circle cx="100" cy="300" r="3" fill="url(#nodeGradient)" opacity="0.7">
              <animate attributeName="cy" values="300;280;300" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="900" cy="400" r="4" fill="url(#nodeGradient)" opacity="0.6">
              <animate attributeName="cy" values="400;420;400" dur="5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="750" cy="100" r="3" fill="url(#nodeGradient)" opacity="0.5">
              <animate attributeName="cx" values="750;770;750" dur="6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
        
        {/* Floating particles */}
        <g className="particles">
          <circle cx="50" cy="100" r="2" fill={theme === 'dark' ? '#60a5fa' : '#3b82f6'} opacity="0.4">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 20,-10; 0,0"
              dur="8s"
              repeatCount="indefinite"
            />
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="1100" cy="200" r="1.5" fill={theme === 'dark' ? '#38bdf8' : '#0ea5e9'} opacity="0.5">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -15,15; 0,0"
              dur="10s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="300" cy="700" r="2.5" fill={theme === 'dark' ? '#60a5fa' : '#3b82f6'} opacity="0.3">
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 10,-20; 0,0"
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default InteractiveAiBackground;