/**
 * Color Utility Functions
 * 
 * This file provides utilities for handling Tailwind CSS color compatibility issues,
 * specifically for converting modern OKLCH color format to RGB for better browser support.
 * 
 * Purpose:
 * - Fix color format compatibility issues in PDF generation
 * - Convert OKLCH colors to RGB format for older browsers
 * - Ensure consistent color rendering across different outputs
 * 
 * Use Case:
 * Primarily used when generating PDFs or printing resumes where OKLCH colors
 * might not be properly supported by the rendering engine.
 */

/**
 * Fix Tailwind CSS OKLCH Colors for PDF/Print Compatibility
 * 
 * Creates a clone of the given element and converts all OKLCH color values
 * to RGB format for better compatibility with PDF generators and older browsers.
 * 
 * Process:
 * 1. Creates an invisible clone of the element
 * 2. Positions it off-screen to avoid visual interference
 * 3. Converts all OKLCH color values to RGB format
 * 4. Returns the processed clone ready for PDF generation
 * 
 * @param {HTMLElement} element - The DOM element to process for color fixes
 * @returns {HTMLElement} - Cloned element with RGB colors instead of OKLCH
 * 
 * @example
 * // Usage in PDF generation
 * const resumeElement = document.getElementById('resume');
 * const pdfReadyElement = fixTailwindColors(resumeElement);
 * // Now use pdfReadyElement for PDF generation
 */
export const fixTailwindColors = (element) => {
  // Create a deep clone of the element to avoid modifying the original
  const clone = element.cloneNode(true);
  
  // Position clone off-screen to prevent visual interference
  clone.style.position = 'absolute';      // Remove from document flow
  clone.style.left = '-9999px';           // Move far left off-screen
  clone.style.width = `${element.offsetWidth}px`; // Maintain original width
  
  // Temporarily add to DOM to access computed styles
  document.body.appendChild(clone);

  /**
   * Convert OKLCH Color Format to RGB
   * 
   * OKLCH (Oklab Lightness Chroma Hue) is a modern color space that provides
   * better perceptual uniformity but isn't supported in all contexts.
   * 
   * Note: This is a placeholder implementation. In production, you should use
   * a proper color conversion library like 'culori' or 'color-convert'.
   * 
   * @param {string} value - CSS color value that may contain OKLCH
   * @returns {string} - Color value with OKLCH converted to RGB
   */
  const convertOklch = (value) => {
    // Regular expression to find OKLCH color functions
    const oklchRegex = /oklch\(([^)]+)\)/g;
    
    return value.replace(oklchRegex, (match) => {
      // TODO: Implement actual OKLCH to RGB conversion
      // For production, replace with actual oklch to rgb conversion logic
      // This is a placeholder - in a real app you'd use a color conversion library
      // 
      // Recommended libraries:
      // - culori: npm install culori
      // - color-convert: npm install color-convert
      // 
      // Example with culori:
      // import { oklch, rgb, formatRgb } from 'culori';
      // const rgbColor = rgb(oklch(match));
      // return formatRgb(rgbColor);
      
      return match.replace('oklch', 'rgb'); // Temporary placeholder
    });
  };

  /**
   * Process All Elements for Color Conversion
   * 
   * Iterates through all child elements and converts OKLCH colors
   * in various CSS properties to RGB format.
   * 
   * Properties handled:
   * - background-color
   * - color (text color)
   * - border-color
   */
  const allElements = clone.querySelectorAll('*');
  
  allElements.forEach(el => {
    // Get computed styles to access actual color values
    const computed = window.getComputedStyle(el);

    // Convert background colors from OKLCH to RGB
    if (computed.backgroundColor.includes('oklch')) {
      el.style.backgroundColor = convertOklch(computed.backgroundColor);
    }

    // Convert text colors from OKLCH to RGB
    if (computed.color.includes('oklch')) {
      el.style.color = convertOklch(computed.color);
    }

    // Convert border colors from OKLCH to RGB
    if (computed.borderColor.includes('oklch')) {
      el.style.borderColor = convertOklch(computed.borderColor);
    }

    // Additional properties that might need conversion:
    // - outline-color
    // - box-shadow colors
    // - gradient colors
    // Add more as needed for comprehensive coverage
  });

  // Return the processed clone ready for PDF generation
  return clone;
};

/**
 * Usage Notes:
 * 
 * 1. Remember to remove the clone from DOM after PDF generation:
 *    document.body.removeChild(processedElement);
 * 
 * 2. For production use, implement proper OKLCH to RGB conversion:
 *    - Install a color conversion library
 *    - Replace the placeholder conversion logic
 *    - Test with various color values
 * 
 * 3. Consider extending this function to handle:
 *    - CSS custom properties (variables)
 *    - Gradient colors
 *    - Box-shadow colors
 *    - Other modern color formats (lab, lch, etc.)
 */