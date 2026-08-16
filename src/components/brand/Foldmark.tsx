import React from 'react';

interface FoldmarkProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Everfold "Foldmark" Brand Mark
 * Master Spec v0.3: Two long flexible ribbons approaching from opposite sides,
 * bending and overlapping visually with a hairline of negative space between them,
 * suggesting a lowercase 'e' or relational looping gesture.
 */
export const Foldmark: React.FC<FoldmarkProps> = ({
  size = 28,
  color = 'var(--accent-plum)',
  className = '',
  style = {},
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-label="Everfold Foldmark"
    >
      {/* Primary Left-to-Right Ribbon Loop (Outer Path forming the top arch and upper fold) */}
      <path
        d="M 8 22 C 8 13.5, 14.5 7, 23 7 C 30.5 7, 34.5 12, 34.5 17.5 C 34.5 22.5, 29.5 25.5, 21.5 25.5 C 15 25.5, 10.5 23.5, 9.5 22.5"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Secondary Right-to-Left Return Ribbon (Inner Path with hairline negative space separation) */}
      <path
        d="M 33 19 C 33 27, 26 33, 17.5 33 C 10.5 33, 6.5 28.5, 6.5 23.5 C 6.5 19.5, 10 16.8, 17 16.8 C 23.5 16.8, 28 18.5, 30.5 20.2"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0"
      />
      {/* Central negative space hairline separator marker */}
      <circle cx="20" cy="20" r="1.4" fill={color} opacity="0.9" />
    </svg>
  );
};
