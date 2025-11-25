"use client"

import React from "react";

interface TagProps {
  children: React.ReactNode;
  /** Additional tailwind classes to merge with defaults */
  className?: string;
  /** Render as a button, anchor or span */
  as?: "span" | "button" | "a";
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const defaultClasses =
  "inline-flex items-center px-3 py-1 rounded-full text-sm font-menu font-medium transition-colors";

const Tag: React.FC<TagProps> = ({ children, className = "", as = "span", href, onClick }) => {
  const classes = `${defaultClasses} ${className}`.trim();

  if (as === "a") {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  if (as === "button") {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
};

export default Tag;
