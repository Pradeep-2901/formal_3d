import React, { useState } from 'react';
import { Lightbulb, PenTool, Printer, PackageCheck, Layers, ChevronRight } from 'lucide-react';

export const HowItIsMade: React.FC = () => {
  const [activeStage, setActiveStage] = useState(2); // default to 03 PRINT (active printing)

  const stages = [
    {
      id: 0,
      step: '01',
      title: 'IMAGINE',
      subtitle: 'Conceptual Spark',
      icon: Lightbulb,
      description: 'Your vision begins with an idea, sketch, or custom name request. We interpret spatial proportions, structural balance, and color combinations.',
      specs: 'INPUT: VECTOR / SKETCH · 2D TO 3D'
    },
    {
      id: 1,
      step: '02',
      title: 'DESIGN',
      subtitle: 'Parametric CAD & Slicing',
      icon: PenTool,
      description: 'Every geometry is modeled in precision CAD and digitally sliced into hundreds of microscopic 0.16mm horizontal toolpaths with optimal infill geometry.',
      specs: 'SLICER: G-CODE GENERATION · GYROID INFILL'
    },
    {
      id: 2,
      step: '03',
      title: 'PRINT',
      subtitle: 'Precision Layer Extrusion',
      icon: Printer,
      description: 'Heated to 210°C, direct-drive nozzles lay down melted renewable PLA filament strand by strand onto textured build plates at millimeter tolerances.',
      specs: 'TEMP: 210°C · 0.4MM NOZZLE · NON-TOXIC PLA'
    },
    {
      id: 3,
      step: '04',
      title: 'YOURS',
      subtitle: 'Inspection & Express Dispatch',
      icon: PackageCheck,
      description: 'Each finished piece is hand-deburred, quality checked, nestled into custom foam and tissue within an obsidian gift box, and sent across India.',
      specs: 'PACKING: SHOCK-PROOF · TRACKED EXPRESS'
    }
  ];

  return (
    <section id="craft" className="py-24 bg-[#080A0A] border-b border-[#252927] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#252927]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#D6B477] uppercase tracking-[0.25em] mb-3">
              <Layers className="w-3.5 h-3.5 text-[#D6B477]" />
              THE CRAFTSMANSHIP JOURNEY
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F4F0E7]">
              How It Is Made
            </h2>
          </div>
          <p className="text-sm font-mono-tech text-[#A6A69F] max-w-sm mt-4 md:mt-0">
            A seamless bridge between digital computational design and physical artisanal finishing.
          </p>
        </div>

        {/* Studio Craft Visual Showcase */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl bg-[#111413] border border-[#252927] overflow-hidden p-6 sm:p-8">
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden aspect-[16/10] bg-[#0D100F] border border-[#D6B477]/20 group">
            <img
              src="/images/bts_printing_craft.jpg"
              alt="High precision 3D printer hotend extruding gold filament"
              className="w-full h-full object-cover transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080A0A] via-transparent to-transparent opacity-60"></div>
            <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#080A0A]/85 backdrop-blur-md border border-[#D6B477]/30 text-[10px] font-mono-tech text-[#D6B477]">
              WORKSHOP MACRO CAM · 0.16MM PASS
            </div>
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded bg-[#080A0A]/85 backdrop-blur-md text-[10px] font-mono-tech text-[#A6A69F]">
              MATERIAL: CHAMPAGNE GOLD PLA
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-mono-tech text-[#D6B477] uppercase tracking-widest block mb-2">
              ACTIVE STAGE HIGHLIGHT · STAGE {stages[activeStage].step}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F4F0E7] mb-2">
              {stages[activeStage].title} — {stages[activeStage].subtitle}
            </h3>
            <p className="text-sm text-[#A6A69F] leading-relaxed mb-6 font-light">
              {stages[activeStage].description}
            </p>
            <div className="p-3.5 rounded-xl bg-[#080A0A] border border-[#252927] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#D6B477] animate-pulse"></span>
              <span className="text-xs font-mono-tech text-[#D6B477]">
                {stages[activeStage].specs}
              </span>
            </div>
          </div>
        </div>

        {/* Four-Stage Visual Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isActive = activeStage === stage.id;

            return (
              <div
                key={stage.step}
                onClick={() => setActiveStage(stage.id)}
                className={`relative p-6 rounded-2xl bg-[#111413] border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                  isActive
                    ? 'border-[#D6B477] shadow-xl shadow-[#D6B477]/10 bg-[#141816]'
                    : 'border-[#252927] hover:border-[#D6B477]/40'
                }`}
              >
                <div>
                  {/* Top Step & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-heading font-extrabold text-[#D6B477]/40 group-hover:text-[#D6B477] transition-colors font-mono-tech">
                      {stage.step}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        isActive
                          ? 'bg-[#D6B477] text-[#080A0A] border-[#D6B477]'
                          : 'bg-[#080A0A] text-[#D6B477] border-[#252927] group-hover:border-[#D6B477]/40'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="font-heading text-lg font-bold text-[#F4F0E7] mb-1 group-hover:text-[#D6B477] transition-colors">
                    {stage.title}
                  </h4>
                  <p className="text-xs font-mono-tech text-[#D6B477] uppercase tracking-wider mb-3">
                    {stage.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-[#A6A69F] leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Bottom Active Indicator Line */}
                <div className="pt-6 mt-6 border-t border-[#252927]">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-[#D6B477] w-full' : 'bg-[#252927] w-8 group-hover:w-16'
                    }`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
