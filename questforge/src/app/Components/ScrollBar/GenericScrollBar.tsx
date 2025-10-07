"use client";

import React from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import "./genericScrollBar.css";

interface GenericScrollbarProps {
  title?: string;
  children: React.ReactNode;
  height?: string | number;
  width?: string | number;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'custom';
}

export default function GenericScrollbar({
  title,
  children,
  height = "200px",
  width = "100%",
  className = "",
  size,
}: GenericScrollbarProps) {
  
  // Determine CSS class based on size prop or custom dimensions
  const getSizeClass = () => {
    if (size) return size;
    
    // If custom dimensions are provided, use custom-size class
    if (height !== "200px" || width !== "100%") {
      return 'custom-size';
    }
    
    return ''; // Use default sizing
  };

  const sizeClass = getSizeClass();
  
  // Only add CSS custom properties if using custom-size class
  const customProps = sizeClass === 'custom-size' ? {
    '--scrollbar-width': typeof width === 'number' ? `${width}px` : width,
    '--scrollbar-height': typeof height === 'number' ? `${height}px` : height,
  } : {};

  return (
    <div className="generic-scrollbar-wrapper">
      {title && <h3 className="scrollbar-title">{title}</h3>}
      <ScrollPanel
        className={`generic-scrollbar ${sizeClass} ${className}`.trim()}
        style={Object.keys(customProps).length > 0 ? customProps as React.CSSProperties : undefined}
      >
        <div className="scroll-content">
          {children}
        </div>
      </ScrollPanel>
    </div>
  );
}
