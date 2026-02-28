"use client";

import React, { useEffect, useState, useRef } from "react";

interface PactCounterProps {
  /** Font family to use (e.g., 'font-menu', 'font-sans', 'font-title') */
  font?: string;
  /** Size of the font (e.g., 'text-4xl', '6xl', etc.) */
  fontSize?: string;
  /** Font for the subtext */
  subtextFont?: string;
  /** Background color class */
  background?: string;
  /** Foreground/text color class */
  foreground?: string;
  /** Subtext to display under the counter */
  subtext?: string;
  /** Type of count to display: 'children' for number of children (from pakty-count), 'schools' for number of schools (from szkoly-count) */
  type?: 'children' | 'schools';
  /** Drill-down level parameters */
  voivodship?: string;
  district?: string;
  county?: string;
}

interface PaktyCountResponse {
  numberOfParents: number;
  numberOfChildren: number;
}

interface SzkolyCountResponse {
  numberOfSchools: number;
}

/**
 * Component that displays the number of children or schools based on the type prop.
 * 
 * Animation behavior:
 * - While loading from API: counts up slowly from 0
 * - When data arrives: speeds up to reach the target number
 */
const PactCounter: React.FC<PactCounterProps> = ({
  font = "font-menu",
  subtextFont = "font-sans",
  fontSize = "text-6xl",
  background = "bg-[#0A6880]",
  foreground = "text-white",
  subtext,
  type = "children",
  voivodship,
  district,
  county,
}) => {
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const animationRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const isLoadingRef = useRef<boolean>(true);

  // Keep the ref in sync with isLoading state
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchCount = async () => {
      try {
        // Build query parameters for drill-down
        const params = new URLSearchParams();
        if (voivodship) params.append('voivodship', voivodship);
        if (district) params.append('district', district);
        if (county) params.append('county', county);
        
        const queryString = params.toString();
        const apiEndpoint = type === "schools" 
          ? `/api/szkoly-count${queryString ? '?' + queryString : ''}`
          : `/api/pakty-count${queryString ? '?' + queryString : ''}`;
        
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch count");
        }
        
        if (type === "schools") {
          const data: SzkolyCountResponse = await response.json();
          if (isMounted) {
            setTargetCount(data.numberOfSchools);
            setIsLoading(false);
          }
        } else {
          const data: PaktyCountResponse = await response.json();
          if (isMounted) {
            setTargetCount(data.numberOfChildren);
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error("Error fetching pact count:", err);
        if (isMounted) {
          setError("Nie udało się pobrać liczby");
          setIsLoading(false);
        }
      }
    };

    fetchCount();

    return () => {
      isMounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [type, voivodship, district, county]);

  // Animation effect for counting
  useEffect(() => {
    if (targetCount === null) return;

    const targetRef = { current: targetCount };
    let isCancelled = false;

    const animate = (timestamp: number) => {
      if (isCancelled) return;
      
      if (timestamp - lastUpdateTimeRef.current >= 16) { // ~60fps
        lastUpdateTimeRef.current = timestamp;
        
        setDisplayCount((prev) => {
          if (prev >= targetRef.current) {
            return targetRef.current;
          }
          
          const remaining = targetRef.current - prev;
          let increment: number;
          
          if (isLoadingRef.current) {
            // Slow counting while loading (200ms interval)
            if (remaining > 1000) {
              increment = Math.max(1, Math.floor(remaining * 0.02));
            } else if (remaining > 100) {
              increment = Math.max(1, Math.floor(remaining * 0.05));
            } else {
              increment = 1;
            }
          } else {
            // Fast counting when data is loaded (30ms interval equivalent)
            if (remaining > 100) {
              increment = Math.max(1, Math.floor(remaining * 0.15));
            } else {
              increment = 1;
            }
          }
          
          return Math.min(prev + increment, targetRef.current);
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    lastUpdateTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetCount]);



  // Format number with spaces as thousand separator (Polish format)
  const formatNumber = (num: number): string => {
    return num.toLocaleString("pl-PL");
  };

  const containerClasses = `
    ${background}
    ${foreground}
    ${font}
    ${fontSize}
    font-bold
    rounded-2xl
    px-8
    py-6
    flex
    flex-col
    items-center
    justify-center
    min-w-[200px]
    lg:min-w-[400px]
  `.trim();

  return (
    <div className={containerClasses}>
      {error ? (
        <span className="text-sm">{error}</span>
      ) : (
        <span className="tabular-nums">{formatNumber(displayCount)}</span>
      )}
      {subtext && (
        <span className={`${subtextFont} text-base mt-2 text-center`}>
          {subtext}
        </span>
      )}
    </div>
  );
};

export default PactCounter;
