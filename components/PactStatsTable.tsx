"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface StatystykiResponse {
  schoolVoivodship: string;
  schoolDistrict?: string;
  schoolCounty?: string;
  schoolName?: string;
  numberOfChildren: number;
}

interface PactStatsTableProps {
  voivodship?: string | null;
  district?: string | null;
  county?: string | null;
}

/**
 * Component that fetches and displays pact statistics by voivodeship or district in a table format.
 */
const PactStatsTable: React.FC<PactStatsTableProps> = ({ voivodship, district, county }) => {
  const [stats, setStats] = useState<StatystykiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (voivodship) params.append('voivodship', voivodship);
        if (district) params.append('district', district);
        if (county) params.append('county', county);

        const queryString = params.toString();
        const url = `/api/statystyki${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }

        const data: StatystykiResponse[] = await response.json();
        if (isMounted) {
          setStats(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching statistics:", err);
        if (isMounted) {
          setError("Nie udało się pobrać statystyk");
          setIsLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [voivodship, district, county]);

  // Polish voivodeship names mapping
  const voivodeshipNames: { [key: string]: string } = {
    "DOLNOŚLĄSKIE": "Dolnośląskie",
    "KUJAWSKO-POMORSKIE": "Kujawsko-Pomorskie",
    "LUBELSKIE": "Lubelskie",
    "LUBUSKIE": "Lubuskie",
    "ŁÓDZKIE": "Łódzkie",
    "MAŁOPOLSKIE": "Małopolskie",
    "MAZOWIECKIE": "Mazowieckie",
    "OPOLSKIE": "Opolskie",
    "PODKARPACKIE": "Podkarpackie",
    "PODLASKIE": "Podlaskie",
    "POMORSKIE": "Pomorskie",
    "ŚLĄSKIE": "Śląskie",
    "ŚWIĘTOKRZYSKIE": "Świętokrzyskie",
    "WARMiŃSKO-MAZURSKIE": "Warmińsko-Mazurskie",
    "WIELKOPOLSKIE": "Wielkopolskie",
    "ZACHODNIOPOMORSKIE": "Zachodniopomorskie",
  };

  const formatVoivodeshipName = (name: string): string => {
    return voivodeshipNames[name] || name;
  };

  const formatDistrictName = (name: string): string => {
    if (!name) return 'Brak danych';
    
    // Convert to lowercase and capitalize first letter of each word
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatCountyName = (name: string): string => {
    if (!name) return 'Brak danych';
    
    // Convert to lowercase and capitalize first letter of each word
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatSchoolName = (name: string): string => {
    if (!name) return 'Brak danych';
    
    // Convert to lowercase and capitalize first letter of each word
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString("pl-PL");
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <p className="text-xl font-menu">Ładowanie statystyk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-xl font-menu text-red-500">{error}</p>
      </div>
    );
  }

  if (stats.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-xl font-menu">Brak dostępnych statystyk.</p>
      </div>
    );
  }

  const handleRowClick = (stat: StatystykiResponse) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (!voivodship) {
      // Clicking on voivodship row - drill down to district level
      newParams.set('voivodship', stat.schoolVoivodship);
      router.push(`/pakt-rodzicow-wyniki?${newParams.toString()}`);
    } else if (!district) {
      // Clicking on district row - drill down to county level
      newParams.set('district', stat.schoolDistrict || '');
      router.push(`/pakt-rodzicow-wyniki?${newParams.toString()}`);
    } else if (!county) {
      // Clicking on county row - drill down to school level
      newParams.set('county', stat.schoolCounty || '');
      router.push(`/pakt-rodzicow-wyniki?${newParams.toString()}`);
    }
    // No further drill-down if already at school level
  };

  const getTableTitle = () => {
    if (!voivodship) {
      return "Województwo";
    } else if (!district) {
      return "Powiat";
    } else if (!county) {
      return "Gmina";
    } else {
      return "Szkoła";
    }
  };

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-transparent">
            <th className="py-4 px-4 text-lg lg:text-4xl font-title border-b-2 border-(--foreground) text-left">
              {getTableTitle()}
            </th>
            <th className="py-4 px-4 text-lg lg:text-4xl font-title border-b-2 border-(--foreground) text-right">
              Pakty
            </th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <tr
              key={stat.schoolVoivodship + (stat.schoolDistrict || '')}
              className={`${index % 2 === 0 ? "bg-transparent" : "bg-transparent"
                } hover:bg-(--foreground) hover:text-(--background) transition-colors cursor-pointer`}
              onClick={() => handleRowClick(stat)}
            >
              <td className="py-3 px-4 text-base lg:text-2xl font-sans font-bold border-b border-(--foreground) text-left">
                {voivodship 
                  ? (district 
                      ? (county 
                          ? (stat.schoolName || 'Brak danych') 
                          : formatCountyName(stat.schoolCounty || 'Brak danych')) 
                      : formatDistrictName(stat.schoolDistrict || 'Brak danych')) 
                  : formatVoivodeshipName(stat.schoolVoivodship)}
              </td>
              <td className="py-3 px-4 text-base lg:text-2xl font-menu font-bold border-b border-(--foreground) text-right">
                {formatNumber(stat.numberOfChildren)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PactStatsTable;
