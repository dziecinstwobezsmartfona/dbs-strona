"use client";

import React, { useEffect, useState } from "react";

interface StatystykiResponse {
  schoolVoivodship: string;
  numberOfChildren: number;
}

/**
 * Component that fetches and displays pact statistics by voivodeship in a table format.
 */
const PactStatsTable: React.FC = () => {
  const [stats, setStats] = useState<StatystykiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/statystyki");
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
  }, []);

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

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-transparent">
            <th className="py-4 px-4 text-lg lg:text-4xl font-title border-b-2 border-(--foreground) text-left">
              Województwo
            </th>
            <th className="py-4 px-4 text-lg lg:text-4xl font-title border-b-2 border-(--foreground) text-right">
              Pakty
            </th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <tr
              key={stat.schoolVoivodship}
              className={`${index % 2 === 0 ? "bg-transparent" : "bg-transparent"
                } hover:bg-(--foreground) hover:text-(--background) transition-colors`}
            >
              <td className="py-3 px-4 text-base lg:text-2xl font-sans font-bold border-b border-(--foreground) text-left">
                {formatVoivodeshipName(stat.schoolVoivodship)}
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
