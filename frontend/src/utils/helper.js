/**
 * Helper Utility Functions
 * 
 * This file contains various utility functions used throughout the Resume Maker application.
 * These functions handle common tasks like validation, image processing, DOM manipulation,
 * and data conversion for resume generation and PDF export functionality.
 * 
 * Key Features:
 * - Email validation
 * - Image color extraction and processing
 * - DOM element styling and manipulation
 * - Screenshot/image capture for PDF generation
 * - Color format conversion (OKLCH to RGB)
 * - Date formatting utilities
 * - File format conversion
 * 
 * Dependencies:
 * - html2canvas: For capturing DOM elements as images
 * - moment: For date formatting and manipulation
 */

// src/utils/helper.js
// External library imports
import html2canvas from "html2canvas";  // DOM to canvas/image conversion
import moment from "moment";            // Date manipulation and formatting

/**
 * Email Validation Function
 * 
 * Validates if a given string is a properly formatted email address.
 * Uses a standard regex pattern to check for valid email structure.
 * 
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if email format is valid, false otherwise
 * 
 * @example
 * validateEmail("user@example.com")     // returns true
 * validateEmail("invalid-email")        // returns false
 * validateEmail("test@domain")          // returns false
 */
export const validateEmail = (email) => {
  // Standard email regex: checks for text@domain.extension format
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Inline All Computed Styles
 * 
 * Walks through a DOM element and all its descendants, copying computed styles
 * to inline styles. This ensures that all CSS properties are explicitly set
 * as inline styles, which is crucial for html2canvas to render correctly.
 * 
 * Purpose: Fixes rendering issues with modern CSS features (like OKLCH colors)
 * that html2canvas doesn't support by converting them to inline styles.
 * 
 * @param {HTMLElement} rootElement - The root element to process
 * 
 * Process:
 * 1. Get all elements (root + descendants)
 * 2. For each element, get computed styles
 * 3. Convert computed styles to inline CSS text
 * 4. Skip unsupported color formats (OKLCH)
 * 5. Apply inline styles to ensure consistent rendering
 */
export function inlineAllComputedStyles(rootElement) {
  // Get root element and all its child elements
  const nodes = [rootElement, ...rootElement.querySelectorAll("*")];
  
  nodes.forEach((node) => {
    // Get computed styles from the browser
    const cs = window.getComputedStyle(node);
    let cssText = "";
    
    // Iterate through all computed style properties
    for (let i = 0; i < cs.length; i++) {
      const prop = cs[i];                    // Property name (e.g., 'color')
      const val = cs.getPropertyValue(prop); // Property value (e.g., 'rgb(0,0,0)')

      // ✂️ Skip unsupported OKLCH color functions that html2canvas can't handle
      if (val.includes("oklch(")) continue;

      // Build inline CSS string
      cssText += `${prop}:${val};`;
    }
    
    // Apply all computed styles as inline styles
    node.style.cssText = cssText;
  });
}

/**
 * Extract Light Color from Image
 * 
 * Analyzes an image and extracts the average color of the lighter pixels.
 * This is useful for generating theme colors or background colors based on
 * profile pictures or resume images.
 * 
 * @param {string} imageUrl - URL or data URL of the image to analyze
 * @returns {Promise<string>} - Promise that resolves to RGB color string
 * 
 * Algorithm:
 * 1. Load image into a canvas element
 * 2. Extract pixel data from the canvas
 * 3. Filter for bright pixels (brightness > 100)
 * 4. Calculate average RGB values of bright pixels
 * 5. Return as RGB string format
 * 
 * @example
 * getLightColorFromImage("path/to/image.jpg")
 *   .then(color => console.log(color)) // "rgb(245, 240, 235)"
 */
export const getLightColorFromImage = (imageUrl) => {
  return new Promise((resolve) => {
    // Validate input - return white as fallback for invalid inputs
    if (!imageUrl || typeof imageUrl !== "string") {
      return resolve("#ffffff");
    }

    // Create new image element for processing
    const img = new Image();
    
    // Handle successful image load
    img.onload = () => {
      // Create canvas for pixel data extraction
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image onto canvas
      ctx.drawImage(img, 0, 0);

      // Extract pixel data (RGBA values for each pixel)
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      
      // Initialize color accumulation variables
      let r = 0, g = 0, b = 0, count = 0;

      // Process pixel data (every 4 values = one pixel: R, G, B, A)
      for (let i = 0; i < data.length; i += 4) {
        const red = data[i];       // Red channel
        const green = data[i + 1]; // Green channel
        const blue = data[i + 2];  // Blue channel
        // data[i + 3] is alpha channel (transparency)
        
        // Calculate brightness (simple average of RGB)
        const brightness = (red + green + blue) / 3;

        // Only include bright pixels in color calculation
        if (brightness > 100) {
          r += red;
          g += green;
          b += blue;
          count++;
        }
      }

      // Calculate final color
      if (count === 0) {
        // No bright pixels found - fallback to white
        resolve("#ffffff");
      } else {
        // Calculate average RGB values
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        resolve(`rgb(${r}, ${g}, ${b})`);
      }
    };

    // Handle image load errors (CORS, 404, etc.)
    img.onerror = () => {
      // Fallback to white if image can't load
      resolve("#ffffff");
    };

    // Set CORS headers for external images (not data URLs)
    if (!imageUrl.startsWith("data:")) {
      img.crossOrigin = "anonymous";
    }
    
    // Start loading the image
    img.src = imageUrl;
  });
};

/**
 * Format Year-Month String
 * 
 * Converts a "YYYY-MM" formatted string to a human-readable "MMM YYYY" format.
 * Commonly used for displaying employment dates, education periods, etc.
 * 
 * @param {string} yearMonth - Date string in "YYYY-MM" format
 * @returns {string} - Formatted date string in "MMM YYYY" format
 * 
 * @example
 * formatYearMonth("2025-03")  // returns "Mar 2025"
 * formatYearMonth("2020-12")  // returns "Dec 2020"
 * formatYearMonth("")         // returns ""
 */
export function formatYearMonth(yearMonth) {
  return yearMonth ? moment(yearMonth, "YYYY-MM").format("MMM YYYY") : "";
}

/**
 * Fix Tailwind OKLCH Colors
 * 
 * Recursively processes a DOM element and its descendants to replace
 * unsupported OKLCH color values with standard colors. This is necessary
 * because html2canvas and PDF generators don't support modern OKLCH color format.
 * 
 * @param {HTMLElement} rootElement - The root element to process
 * 
 * Process:
 * 1. Find all descendant elements
 * 2. Check computed styles for OKLCH colors
 * 3. Replace OKLCH values with fallback colors
 * 4. Handle SVG elements with fill/stroke attributes
 * 
 * Properties handled:
 * - color (text color)
 * - backgroundColor
 * - borderColor
 * - SVG fill and stroke attributes
 */
export const fixTailwindColors = (rootElement) => {
  if (!rootElement) return;
  
  // Get all child elements
  const elements = rootElement.querySelectorAll("*");
  
  elements.forEach((el) => {
    // Get computed styles for the element
    const style = window.getComputedStyle(el);
    
    // Check and fix color properties that might contain OKLCH
    ["color", "backgroundColor", "borderColor"].forEach((prop) => {
      const val = style[prop] || "";
      
      // Replace OKLCH colors with black fallback
      if (val.includes("oklch")) {
        el.style[prop] = "#000";
      }
    });

    // Special handling for SVG elements with inline attributes
    if (el instanceof SVGElement) {
      // Fix fill attribute
      const fill = el.getAttribute("fill");
      if (fill && fill.includes("oklch")) {
        el.setAttribute("fill", "#000");
      }
      
      // Fix stroke attribute
      const stroke = el.getAttribute("stroke");
      if (stroke && stroke.includes("oklch")) {
        el.setAttribute("stroke", "#000");
      }
    }
  });
};

/**
 * Capture DOM Element as Image
 * 
 * Creates a high-quality PNG image from a DOM element. This is the core function
 * used for generating resume previews and PDF exports. Handles modern CSS features
 * and ensures compatibility with html2canvas.
 * 
 * @param {HTMLElement} element - The DOM element to capture
 * @returns {Promise<string>} - Promise that resolves to PNG data URL
 * 
 * Process:
 * 1. Clone the element to avoid modifying the original
 * 2. Position clone off-screen for processing
 * 3. Inject CSS overrides to ensure compatible colors
 * 4. Use html2canvas to generate image
 * 5. Clean up temporary elements
 * 
 * Features:
 * - High resolution (3x scale)
 * - CORS support for external images
 * - Automatic color compatibility fixes
 * - Clean white background
 * 
 * @example
 * const resumeElement = document.getElementById('resume');
 * captureElementAsImage(resumeElement)
 *   .then(dataUrl => {
 *     // Use dataUrl for PDF generation or preview
 *   });
 */
export async function captureElementAsImage(element) {
  if (!element) throw new Error("No element provided");

  // Step 1: Create invisible clone for processing
  const clone = element.cloneNode(true);
  clone.style.position = "absolute";
  clone.style.top = "-9999px";        // Move far off-screen
  clone.style.left = "0";
  clone.style.opacity = "0";          // Invisible but still renderable
  
  // Maintain original dimensions
  const { width, height } = element.getBoundingClientRect();
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  
  // Add to DOM temporarily (required for html2canvas)
  document.body.appendChild(clone);

  // Step 2: Inject global CSS override for color compatibility
  // This ensures all elements use safe colors that html2canvas can handle
  const override = document.createElement("style");
  override.id = "__html2canvas_override__";
  override.textContent = `
    * {
      color: #000 !important;                    /* Black text */
      background-color: #fff !important;        /* White backgrounds */
      border-color: #000 !important;            /* Black borders */
      box-shadow: none !important;              /* Remove shadows */
      background-image: none !important;        /* Remove background images */
    }
  `;
  document.head.appendChild(override);

  try {
    // Step 3: Generate high-quality image using html2canvas
    const canvas = await html2canvas(clone, {
      scale: 3,                    // 3x resolution for crisp images
      useCORS: true,              // Enable CORS for external images
      logging: false,             // Disable console logging
      backgroundColor: "#FFFFFF", // Clean white background
    });
    
    // Convert canvas to PNG data URL
    return canvas.toDataURL("image/png");
    
  } finally {
    // Step 4: Clean up temporary elements
    document.body.removeChild(clone);
    document.head.removeChild(override);
  }
}

/**
 * Convert Data URL to File Object
 * 
 * Converts a data URL string (like those from canvas.toDataURL()) into a
 * proper File object that can be uploaded or saved. Useful for converting
 * generated images into uploadable files.
 * 
 * @param {string} dataUrl - Data URL string (e.g., "data:image/png;base64,...")
 * @param {string} fileName - Desired file name for the resulting File object
 * @returns {File} - File object ready for upload or download
 * 
 * Process:
 * 1. Parse data URL to extract MIME type and base64 data
 * 2. Decode base64 string to binary data
 * 3. Convert binary data to Uint8Array
 * 4. Create File object with proper MIME type
 * 
 * @example
 * const canvas = document.getElementById('myCanvas');
 * const dataUrl = canvas.toDataURL('image/png');
 * const file = dataURLtoFile(dataUrl, 'resume-preview.png');
 * // Now 'file' can be uploaded via FormData
 */
export const dataURLtoFile = (dataUrl, fileName) => {
  // Split data URL into header and base64 content
  const [header, base64] = dataUrl.split(",");
  
  // Extract MIME type from header (e.g., "data:image/png;base64" -> "image/png")
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/png"; // Default to PNG
  
  // Decode base64 string to binary string
  const bstr = atob(base64);
  const len = bstr.length;
  
  // Convert binary string to Uint8Array (byte array)
  const u8arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  // Create and return File object
  return new File([u8arr], fileName, { type: mime });
};

/**
 * Usage Notes:
 * 
 * 1. Image Processing:
 *    - captureElementAsImage() is the main function for generating resume images
 *    - Always clean up temporary elements to prevent memory leaks
 *    - Use high scale factor (3x) for print-quality images
 * 
 * 2. Color Compatibility:
 *    - fixTailwindColors() should be called before using html2canvas
 *    - OKLCH colors are not supported by most PDF generators
 *    - Always test with various color combinations
 * 
 * 3. Performance:
 *    - Image processing functions are async and can be slow
 *    - Consider showing loading indicators for user feedback
 *    - Cache results when possible to avoid reprocessing
 * 
 * 4. Error Handling:
 *    - All image-related functions include fallbacks for errors
 *    - Network issues, CORS problems, and invalid URLs are handled gracefully
 *    - Always wrap in try-catch when using these functions
 */