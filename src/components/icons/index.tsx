/** Shared SVG icons. */

import React from 'react';

interface IconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  stroke?: string;
}

/** GitHub icon - 16x16 viewBox */
export const GitHubIcon: React.FC<IconProps> = ({ 
  className, 
  width = 20, 
  height = 20, 
  fill = 'currentColor' 
}) => (
  <svg 
    className={className}
    width={width} 
    height={height} 
    viewBox="0 0 16 16" 
    fill={fill}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

/** LinkedIn icon - 24x24 viewBox */
export const LinkedInIcon: React.FC<IconProps> = ({ 
  className, 
  width = 20, 
  height = 20, 
  fill = 'currentColor' 
}) => (
  <svg 
    className={className}
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill={fill}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/** YouTube icon - 24x24 viewBox */
export const YouTubeIcon: React.FC<IconProps> = ({ 
  className, 
  width = 20, 
  height = 20, 
  fill = 'currentColor' 
}) => (
  <svg 
    className={className}
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill={fill}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

/** Email/Envelope icon - 24x24 viewBox */
export const EmailIcon: React.FC<IconProps> = ({ 
  className, 
  width = 20, 
  height = 20, 
  stroke = 'currentColor' 
}) => (
  <svg 
    className={className}
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={stroke}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
    />
  </svg>
);

/** Download/Document icon - 24x24 viewBox */
export const DownloadIcon: React.FC<IconProps> = ({ 
  className, 
  width = 20, 
  height = 20, 
  stroke = 'currentColor' 
}) => (
  <svg 
    className={className}
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={stroke}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
    />
  </svg>
);

/** Arrow Up icon - 24x24 viewBox */
export const ArrowUpIcon: React.FC<IconProps> = ({ 
  className, 
  width = 20, 
  height = 20, 
  stroke = 'currentColor' 
}) => (
  <svg 
    className={className}
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={stroke}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M5 10l7-7m0 0l7 7m-7-7v18" 
    />
  </svg>
);

/** Star icon - 16x16 viewBox */
export const StarIcon: React.FC<IconProps> = ({ 
  className, 
  width = 16, 
  height = 16, 
  fill = 'currentColor' 
}) => (
  <svg 
    className={className}
    width={width} 
    height={height} 
    viewBox="0 0 16 16" 
    fill={fill}
  >
    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
  </svg>
);

/** Fork/Branch icon - 16x16 viewBox */
export const ForkIcon: React.FC<IconProps> = ({ 
  className, 
  width = 16, 
  height = 16, 
  fill = 'currentColor' 
}) => (
  <svg 
    className={className}
    width={width} 
    height={height} 
    viewBox="0 0 16 16" 
    fill={fill}
  >
    <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z" />
  </svg>
);

/** Chevron Down icon - 20x20 viewBox */
export const ChevronDownIcon: React.FC<IconProps> = ({ 
  className, 
  width = 20, 
  height = 20, 
  fill = 'currentColor' 
}) => (
  <svg 
    className={className}
    width={width} 
    height={height} 
    viewBox="0 0 20 20" 
    fill={fill}
  >
    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
  </svg>
);

/** Google Scholar icon (Simple Icons) - 24x24 viewBox */
export const ScholarIcon: React.FC<IconProps> = ({
  className,
  width = 20,
  height = 20,
  fill = 'currentColor'
}) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
  </svg>
);

/** ORCID icon (Simple Icons) - 24x24 viewBox */
export const OrcidIcon: React.FC<IconProps> = ({
  className,
  width = 20,
  height = 20,
  fill = 'currentColor'
}) => (
  <svg className={className} width={width} height={height} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
  </svg>
);
