"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { feature } from "topojson-client";

export type CountryConfig = {
  name: string;
  clients: number;
  coordinates: [number, number];
  id: string; // numeric ISO 3166-1 code from world-atlas
};

// Placeholder set — swap with real OrbitWelve figures whenever they're ready.
// Keys should match the country slugs used in the Cloudinary `reviews/<slug>/` folders.
export const DEFAULT_COUNTRIES: Record<string, CountryConfig> = {
  "saudi-arabia": { name: "Saudi Arabia", clients: 10, coordinates: [45.0792, 23.8859], id: "682" },
  australia: { name: "Australia", clients: 4, coordinates: [133.7751, -25.2744], id: "036" },
  bahrain: { name: "Bahrain", clients: 1, coordinates: [50.5577, 26.0667], id: "048" },
  belgium: { name: "Belgium", clients: 1, coordinates: [4.4699, 50.5039], id: "056" },
  canada: { name: "Canada", clients: 11, coordinates: [-106.3468, 56.1304], id: "124" },
  france: { name: "France", clients: 2, coordinates: [2.2137, 46.2276], id: "250" },
  germany: { name: "Germany", clients: 4, coordinates: [10.4515, 51.1657], id: "276" },
  grenada: { name: "Grenada", clients: 1, coordinates: [-61.679, 12.1165], id: "308" },
  gyana: { name: "Gyana", clients: 2, coordinates: [-58.9302, 4.8604], id: "328" },
  "hong-kong": { name: "Hong Kong", clients: 1, coordinates: [114.1694, 22.3193], id: "344" },
  india: { name: "India", clients: 6, coordinates: [78.9629, 20.5937], id: "356" },
  italy: { name: "Italy", clients: 1, coordinates: [12.5674, 41.8719], id: "380" },
  jordan: { name: "Jordan", clients: 1, coordinates: [36.2384, 30.5852], id: "400" },
  netherlands: { name: "Netherlands", clients: 3, coordinates: [5.2913, 52.1326], id: "528" },
  pakistan: { name: "Pakistan", clients: 6, coordinates: [69.3451, 30.3753], id: "586" },
  panama: { name: "Panama", clients: 1, coordinates: [-80.7821, 8.5379], id: "591" },
  poland: { name: "Poland", clients: 2, coordinates: [19.1451, 51.9194], id: "616" },
  uae: { name: "UAE", clients: 7, coordinates: [54.3773, 24.4539], id: "784" },
  uk: { name: "UK", clients: 15, coordinates: [-3.435973, 55.378051], id: "826" },
  usa: { name: "USA", clients: 49, coordinates: [-95.7129, 37.0902], id: "840" },
  mexico: { name: "Mexico", clients: 5, coordinates: [-102.5528, 23.6345], id: "484" },
};

export default function ClientMap({
  countries = DEFAULT_COUNTRIES,
  onSelectCountry,
}: {
  countries?: Record<string, CountryConfig>;
  onSelectCountry?: (slug: string | null) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    name: "",
    clients: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 960;
    const height = 500;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const projection = d3
      .geoMercator()
      .scale(150)
      .translate([width / 2, height / 1.55]);

    const path = d3.geoPath().projection(projection);
    const g = svg.append("g");

    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 8])
        .on("zoom", (event) => g.attr("transform", event.transform))
    );

    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(
      (worldData: any) => {
        const geojson: any = feature(worldData, worldData.objects.countries);
        const configList = Object.entries(countries);

        const countryPaths = g
          .selectAll("path")
          .data(geojson.features)
          .enter()
          .append("path")
          .attr("d", path as any)
          .attr("fill", "#d1d5db")
          .attr("stroke", "white")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0)
          .style("cursor", (d: any) => {
            const match = configList.find(([, c]) => c.id === String(d.id));
            return match ? "pointer" : "default";
          });

        // Entrance: fade countries in, staggered slightly by index so the
        // continents don't pop in as one flat block.
        countryPaths
          .transition()
          .delay((_d: any, i: number) => Math.min(i, 120) * 3)
          .duration(500)
          .ease(d3.easeCubicOut)
          .attr("opacity", 1)
          .attr("fill", (d: any) => {
            const match = configList.find(([, c]) => c.id === String(d.id));
            return match ? "#1098D5" : "#d1d5db";
          });

        countryPaths
          .on("mouseover", function (event: any, d: any) {
            const match = configList.find(([, c]) => c.id === String(d.id));
            if (!match) return;
            const [, c] = match;

            d3.select(this)
              .transition()
              .duration(150)
              .attr("fill", "#0c7fb0")
              .attr("opacity", 0.85)
              .attr("stroke-width", 1.2);

            const [x, y] = d3.pointer(event, svg.node());
            setTooltip({ show: true, name: c.name, clients: c.clients, x: x + 10, y: y - 10 });
          })
          .on("mousemove", function (event: any, d: any) {
            const match = configList.find(([, c]) => c.id === String(d.id));
            if (!match) return;
            const [x, y] = d3.pointer(event, svg.node());
            setTooltip((t) => ({ ...t, x: x + 10, y: y - 10 }));
          })
          .on("mouseout", function (_event: any, d: any) {
            const match = configList.find(([, c]) => c.id === String(d.id));
            if (!match) return;

            d3.select(this)
              .transition()
              .duration(150)
              .attr("fill", "#1098D5")
              .attr("opacity", 1)
              .attr("stroke-width", 0.5);

            setTooltip({ show: false, name: "", clients: 0, x: 0, y: 0 });
          })
          .on("click", function (_event: any, d: any) {
            const match = configList.find(([, c]) => c.id === String(d.id));
            if (!match) return;
            const [slug] = match;
            setSelected((prev) => {
              const next = prev === slug ? null : slug;
              onSelectCountry?.(next);
              return next;
            });
          });

        if (selected && countries[selected]) {
          const country = countries[selected];
          const coords = projection(country.coordinates);
          if (coords) {
            const markerGroup = g.append("g");

            // Pulsing halo loop
            const halo = markerGroup
              .append("circle")
              .attr("cx", coords[0])
              .attr("cy", coords[1])
              .attr("r", 8)
              .attr("fill", "#1098D5")
              .attr("opacity", 0.5);

            function pulse() {
              halo
                .attr("r", 8)
                .attr("opacity", 0.5)
                .transition()
                .duration(1400)
                .ease(d3.easeCubicOut)
                .attr("r", 28)
                .attr("opacity", 0)
                .on("end", pulse);
            }
            pulse();

            markerGroup
              .append("circle")
              .attr("cx", coords[0])
              .attr("cy", coords[1])
              .attr("r", 0)
              .attr("fill", "#1098D5")
              .attr("stroke", "white")
              .attr("stroke-width", 3)
              .transition()
              .duration(350)
              .ease(d3.easeBackOut)
              .attr("r", 18);

            markerGroup
              .append("text")
              .attr("x", coords[0])
              .attr("y", coords[1])
              .attr("text-anchor", "middle")
              .attr("dominant-baseline", "middle")
              .attr("fill", "white")
              .attr("font-weight", "bold")
              .attr("font-size", "13px")
              .attr("opacity", 0)
              .text(country.clients)
              .transition()
              .delay(150)
              .duration(250)
              .attr("opacity", 1);
          }
        }
      }
    );
  }, [selected, countries, onSelectCountry]);

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl border border-dark-panel/10 bg-background p-4 shadow-md">
      {tooltip.show && (
        <div
          className="pointer-events-none absolute z-50 rounded-md bg-gray-800 px-4 py-2 text-sm text-white shadow-lg transition-opacity duration-100"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translateY(-100%)",
          }}
        >
          <div className="font-semibold">{tooltip.name}</div>
          <div className="text-xs text-gray-300">{tooltip.clients} reviews</div>
        </div>
      )}
      <div className="w-full overflow-hidden rounded-lg">
        <svg
          ref={svgRef}
          viewBox="0 0 960 500"
          className="h-auto w-full"
          style={{ background: "#f9fbfc" }}
        />
      </div>
    </div>
  );
}