'use client';

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'motion/react';
import React, { useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MagicSVGProps {
  children: React.ReactNode;
  width: number;
  height: number;
  className?: string;
  gradientSize?: number;
  gradientFrom?: string;
  gradientTo?: string;
  strokeWidth?: number;
  fill?: string;
  strokeColor?: string;
}

export function MagicSVG({
  children,
  width,
  height,
  className,
  gradientSize = 50,
  gradientFrom = '#9E7AFF',
  gradientTo = '#FE8BBB',
  strokeWidth = 1,
  fill = 'none',
  strokeColor = '#2C2C2C',
}: MagicSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const animatedX = useMotionValue(-gradientSize * 2);
  const animatedY = useMotionValue(-gradientSize * 2);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const svgX = (e.clientX - rect.left) * (width / rect.width);
        const svgY = (e.clientY - rect.top) * (height / rect.height);

        animate(animatedX, svgX, {
          type: 'spring',
          stiffness: 200,
          damping: 30,
          mass: 0.5,
        });

        animate(animatedY, svgY, {
          type: 'spring',
          stiffness: 200,
          damping: 30,
          mass: 0.5,
        });
      }
    },
    [animatedX, animatedY, width, height]
  );

  const handleMouseLeave = useCallback(() => {
    animate(animatedX, -gradientSize * 2, {
      type: 'spring',
      stiffness: 150,
      damping: 25,
    });

    animate(animatedY, -gradientSize * 2, {
      type: 'spring',
      stiffness: 150,
      damping: 25,
    });
  }, [animatedX, animatedY, gradientSize]);

  const handleMouseEnter = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      svgElement.addEventListener('mouseenter', handleMouseEnter);
      svgElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (svgElement) {
        svgElement.removeEventListener('mouseenter', handleMouseEnter);
        svgElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove]);

  useEffect(() => {
    animatedX.set(-gradientSize * 2);
    animatedY.set(-gradientSize * 2);
  }, [gradientSize, animatedX, animatedY]);

  const gradientId = `magic-gradient-${Math.random().toString(36).substr(2, 9)}`;
  const maskId = `magic-mask-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <motion.svg
      aria-label="Magic SVG"
      className={cn('cursor-pointer transition-all duration-300', className)}
      fill="none"
      height={height}
      ref={svgRef}
      style={{ maxWidth: '100%', height: 'auto' }}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Magic SVG</title>
      <defs>
        <motion.radialGradient
          cx={useMotionTemplate`${animatedX}`}
          cy={useMotionTemplate`${animatedY}`}
          gradientUnits="userSpaceOnUse"
          id={gradientId}
          r={gradientSize}
        >
          <stop offset="0%" stopColor={gradientFrom} />
          <stop offset="50%" stopColor={gradientTo} />
          <stop offset="100%" stopColor="transparent" />
        </motion.radialGradient>
        <mask id={maskId}>
          <rect fill="black" height="100%" width="100%" />
          <motion.circle
            cx={useMotionTemplate`${animatedX}`}
            cy={useMotionTemplate`${animatedY}`}
            fill="white"
            r={gradientSize}
          />
        </mask>
      </defs>

      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childType = (child as React.ReactElement).type;
          if (
            childType === 'defs' ||
            childType === 'mask' ||
            childType === 'clipPath'
          ) {
            return child;
          }
        }
        return null;
      })}

      <g>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const childType = (child as React.ReactElement).type;
            if (
              childType !== 'defs' &&
              childType !== 'mask' &&
              childType !== 'clipPath'
            ) {
              return React.cloneElement(child as React.ReactElement<React.SVGProps<SVGElement>>, {
                stroke: strokeColor,
                strokeWidth,
                fill,
              });
            }
          }
          return null;
        })}
      </g>

      <g mask={`url(#${maskId})`}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const childType = (child as React.ReactElement).type;
            if (
              childType !== 'defs' &&
              childType !== 'mask' &&
              childType !== 'clipPath'
            ) {
              return React.cloneElement(child as React.ReactElement<React.SVGProps<SVGElement>>, {
                stroke: `url(#${gradientId})`,
                strokeWidth: strokeWidth + 1,
                fill,
              });
            }
          }
          return null;
        })}
      </g>
    </motion.svg>
  );
}