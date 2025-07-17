/**
 * @fileoverview Step Progress Component for Resume Builder Application
 * 
 * This component renders an animated, visually stunning progress bar with multiple layers
 * of visual effects including gradients, shimmer animations, floating bubbles, and particles.
 * It provides real-time feedback on completion status with contextual messaging and icons.
 * 
 * Key Features:
 * - Multi-layered animated progress bar with glassmorphism design
 * - Dynamic gradient backgrounds with flowing animations
 * - Shimmer overlay effects for premium visual appeal
 * - Floating bubble animations that move across the progress bar
 * - Randomized particle system for enhanced visual depth
 * - Contextual status messages based on progress percentage
 * - Completion indicator with check icon and green gradient
 * - Glow effects and backdrop blur for modern aesthetics
 * - Smooth transitions with easing functions
 * - Responsive design with proper overflow handling
 * 
 * Design Characteristics:
 * - Glassmorphism background with backdrop blur and transparency
 * - Violet-to-fuchsia gradient theme with premium purple accents
 * - Multiple animation layers: pulse, flow, shimmer, bubbles, particles
 * - Progress stages: Getting Started, Making Progress, Almost There, Nearly Completed, Completed
 * - Height: 16px (h-4) with full width responsiveness
 * - Rounded full design with smooth edges and proper overflow control
 * 
 * Usage:
 * ```jsx
 * // Basic usage with percentage
 * <StepProgress progress={65} />
 * 
 * // With state management
 * const [completionPercentage, setCompletionPercentage] = useState(0);
 * <StepProgress progress={completionPercentage} />
 * ```
 * 
 * @version 1.0.0
 * @author Resume Builder Team
 * @since 2024
 */

import React from 'react';
import { shimmerStyle } from '../assets/dummystyle';
import { Check } from 'react-feather';

/**
 * StepProgress Component
 * 
 * A sophisticated animated progress bar component featuring multi-layered visual effects
 * and contextual feedback. This component provides an engaging user experience with
 * glassmorphism design, flowing animations, and dynamic status indicators.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} [props.progress=0] - Progress percentage (0-100)
 * 
 * @returns {JSX.Element} The rendered animated progress bar with status indicators
 * 
 * @example
 * ```jsx
 * // Basic progress bar
 * <StepProgress progress={45} />
 * 
 * // Dynamic progress with state
 * const [resumeProgress, setResumeProgress] = useState(0);
 * 
 * useEffect(() => {
 *   // Calculate progress based on form completion
 *   const completedFields = calculateCompletedFields();
 *   setResumeProgress(completedFields);
 * }, [formData]);
 * 
 * <StepProgress progress={resumeProgress} />
 * 
 * // In a multi-step form
 * const currentStep = 3;
 * const totalSteps = 5;
 * const progressPercentage = (currentStep / totalSteps) * 100;
 * 
 * <StepProgress progress={progressPercentage} />
 * ```
 * 
 * @description
 * **Visual Layers:**
 * 1. **Base Container:** Glassmorphism background with backdrop blur
 * 2. **Pulsing Background:** Animated gradient that pulses behind the progress
 * 3. **Main Progress Bar:** Flowing gradient with smooth width transitions
 * 4. **Shimmer Overlay:** Moving highlight effect across the progress
 * 5. **Bubble Animation:** Floating white circles that move across the bar
 * 6. **Particle System:** Random sparkle effects for visual depth
 * 7. **Glow Line:** Trailing light effect at the progress edge
 * 
 * **Status Messages:**
 * - 0-24%: "Getting Started"
 * - 25-49%: "Making Progress" 
 * - 50-74%: "Almost There"
 * - 75-99%: "Nearly Completed"
 * - 100%: "Completed" (with green check icon)
 */
const StepProgress = ({ progress = 0 }) => {
  return (
    <>
      {/* Inject shimmer animation styles */}
      <style>{shimmerStyle}</style>

      {/* Main progress container with glassmorphism design */}
      <div className="relative w-full h-4 bg-white/5 backdrop-blur-2xl rounded-full overflow-hidden border border-white/10">
        
        {/* Pulsing background layer for ambient animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 animate-pulse" />

        {/* Main Progress Bar with flowing gradient animation */}
        <div
          className="relative h-full bg-gradient-to-r from-violet-500 via-fuchsia-200 to-violet-600 animate-flow bg-[length:200%_100%] transition-all duration-700 ease-out rounded-full overflow-hidden animate-plus-glow"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer overlay effect moving across the progress bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />

          {/* Floating bubble animation layer */}
          <div className="absolute inset-0 flex opacity-80">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 w-2 h-2 bg-white rounded-full animate-bubble shadow-lg"
                style={{
                  left: `${i * 12}%`,
                  animationDelay: `${i * 0.25}s`, // Staggered animation timing
                  transform: 'translateY(-50%)', // Center vertically
                }}
              />
            ))}
          </div>

          {/* Particle system for sparkle effects */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`, // Random horizontal position
                  top: `${Math.random() * 100}%`, // Random vertical position
                  animationDelay: `${Math.random() * 2}s`, // Random start delay
                  animationDuration: `${Math.random() * 3 + 2}s`, // Random duration (2-5s)
                }}
              />
            ))}
          </div>
        </div>

        {/* Trailing glow line effect at progress edge */}
        {progress > 0 && (
          <div
            className="absolute top-0 h-full w-8 bg-gradient-to-br from-transparent via-white/60 to-white/30 blur-sm"
            style={{
              left: `${Math.max(0, progress - 4)}%`, // Position near the end of progress
            }}
          />
        )}
      </div>

      {/* Progress status and completion indicator */}
      <div className="flex justify-between items-center mt-3">
        
        {/* Dynamic status message based on progress percentage */}
        <div className="text-xs font-bold text-white/60">
          {progress < 25
            ? 'Getting Started' // 0-24%
            : progress < 50
            ? 'Making Progress' // 25-49%
            : progress < 75
            ? 'Almost There' // 50-74%
            : progress < 100
            ? 'Nearly Completed' // 75-99%
            : 'Completed'} {/* 100% */}
        </div>

        {/* Completion check icon (only shown at 100%) */}
        <div className="flex items-center gap-2">
          {progress === 100 && (
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center ">
              <Check size={12} className='text-white' />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StepProgress;
