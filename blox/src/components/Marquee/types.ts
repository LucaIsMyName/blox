import { BaseProps } from '../../types';
import React from 'react';

export type MarqueeDirection = 'left' | 'right' | 'up' | 'down';
export type MarqueeSpeed = 'slow' | 'normal' | 'fast';
export type MarqueeBehavior = 'scroll' | 'slide' | 'alternate';

export interface MarqueeProps extends BaseProps {
  /**
   * Content to be displayed inside the marquee
   */
  children: React.ReactNode;
  
  /**
   * Direction of the marquee animation
   * @default 'left'
   */
  direction?: MarqueeDirection;
  
  /**
   * Speed of the marquee animation
   * @default 'normal'
   */
  speed?: MarqueeSpeed;
  
  /**
   * Behavior of the marquee animation
   * @default 'scroll'
   */
  behavior?: MarqueeBehavior;
  
  /**
   * Whether to pause the animation on hover
   * @default true
   */
  pauseOnHover?: boolean;
  
  /**
   * Whether to pause the animation on focus
   * @default true
   */
  pauseOnFocus?: boolean;
  
  /**
   * Number of times to repeat the content to create a smooth loop
   * @default 2
   */
  repeat?: number;
  
  /**
   * Space between repeated elements (in px)
   * @default 40
   */
  gap?: number;
  
  /**
   * Duration of the animation in seconds (overrides speed)
   */
  duration?: number;
  
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  
  /**
   * Delay before the animation starts (in seconds)
   * @default 0
   */
  delay?: number;
}