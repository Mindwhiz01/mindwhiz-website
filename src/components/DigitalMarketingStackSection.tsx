"use client";

import { Target, Search, Mail, LineChart } from "lucide-react";
import { type LucideIcon } from "lucide-react";

const iconConfigs: Array<{
  Icon: LucideIcon;
  color: string;
  label: string;
}> = [
  { Icon: Target, color: "#ed1164", label: "Performance" },
  { Icon: Search, color: "#9CCC3C", label: "SEO" },
  { Icon: Mail, color: "#0088ff", label: "CRM" },
  { Icon: LineChart, color: "#ff6b35", label: "Analytics" },
  { Icon: Target, color: "#ed1164", label: "Performance" },
  { Icon: Search, color: "#9CCC3C", label: "SEO" },
];

interface Channel {
  title: string;
  desc: string;
  Icon: LucideIcon;
}

export default function DigitalMarketingStackSection({
  channels,
}: {
  channels: Channel[];
}) {
  const orbitCount = 2;
  const orbitGap = 6;
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section className="relative max-w-7xl mx-auto my-32 flex items-center justify-between gap-16 overflow-hidden rounded-3xl">
      {/* Left side: Heading and Cards */}
      <div className="w-1/2 z-10">
        <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ed1164]">
          What we operate
        </span>
        <h2
          className="mt-5 text-4xl font-extrabold uppercase leading-[1.02] text-[#3f3f3d] sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A complete digital marketing desk, built for execution.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#3f3f3d]/75">
          The work is not split across disconnected specialists. Strategy,
          creative, media buying, technical SEO, automation, and reporting run
          from one operating cadence, so every channel is tied to the same
          commercial goal.
        </p>

        {/* Feature cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {channels.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="group rounded-xl border border-[#3f3f3d]/15 bg-[#fff8ed] p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#ed1164] hover:text-white hover:border-[#ed1164]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ed1164] transition-colors duration-300 group-hover:bg-white">
                <Icon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#ed1164]" />
              </span>
              <h3 className="mt-4 text-sm font-extrabold uppercase">{title}</h3>
              <p className="mt-2 text-xs leading-5 opacity-75">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Orbit animation */}
      <div className="relative w-1/2 h-[30rem] flex items-center justify-center overflow-hidden">
        <div className="relative w-[45rem] h-[45rem] flex items-center justify-center">
          {/* Center Circle */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ed1164]/20 to-[#9CCC3C]/20 border border-[#ed1164]/30 shadow-lg flex items-center justify-center z-10">
            <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
              <span className="text-2xl font-extrabold text-[#ed1164]">DM</span>
            </div>
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${10 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;
            const speed = 12 + orbitIdx * 4;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border border-[#ed1164]/20"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${speed}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);

                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                          border: `2px solid ${cfg.color}`,
                        }}
                        title={cfg.label}
                      >
                        <cfg.Icon
                          className="w-6 h-6"
                          style={{ color: cfg.color }}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ed1164]/5 to-[#9CCC3C]/5 blur-3xl -z-10" />
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
