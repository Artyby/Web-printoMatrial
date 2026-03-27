"use client";

import { useState } from "react";
import { Calculator as CalculatorIcon, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

// ── Pricing config per technique ──
// ── Pricing config per technique ──
const TECHNIQUES = [
  {
    value: "dtf",
    label: "DTF — Alta Resolución (Ancho 30cm)",
    pricePerUnit: 900, // RD$ 90 cada 10cm
    inputLabel: "Largo en Metros (0.1 = 10cm)",
    inputPlaceholder: "Ej: 0.5 (50cm)",
    inputStep: "0.1",
    inputMin: "0.1",
    note: (val: number) =>
      `${(val * 100).toFixed(0)}cm x 30cm de área • RD$ ${(val * 800).toFixed(0)}`,
    isQuoteOnly: false,
  },
  {
    value: "vinil",
    label: "Vinil Textil (Hasta 12in por diseño)",
    pricePerUnit: 290,
    inputLabel: "Cantidad de Diseños",
    inputPlaceholder: "Ej: 10",
    inputStep: "1",
    inputMin: "1",
    note: (val: number) =>
      `${val} diseño${val !== 1 ? "s" : ""} estándar • RD$ ${(290).toLocaleString()} (Aprox. 10x10cm )`,
    isQuoteOnly: false,
  },
  {
    value: "puff",
    label: "Vinil con Efecto Puff 3D (Relieve Premium)",
    pricePerUnit: 400,
    inputLabel: "Cantidad de Aplicaciones",
    inputPlaceholder: "Ej: 5",
    inputStep: "1",
    inputMin: "1",
    note: (val: number) =>
      `${val} logo${val !== 1 ? "s" : ""} con volumen • RD$ ${(400).toLocaleString()} (Aprox. 10x10cm - acabado táctil 3D)`,
    isQuoteOnly: false,
  },
  {
    value: "parches",
    label: "Parches Termoadhesivos",
    pricePerUnit: 0,
    inputLabel: "Cantidad de Unidades",
    inputPlaceholder: "Ej: 24",
    inputStep: "1",
    inputMin: "12", // Mínimo sugerido por setup de bordado
    note: (val: number) =>
      val < 12
        ? "Mínimo 12 unidades para producción"
        : "Sujeto a digitalización y puntadas",
    isQuoteOnly: true,
  },
];

const VINIL_EFFECTS = [
  { value: "solid", label: "Color Sólido", multiplier: 1.0 },
  { value: "glitter", label: "Glitter", multiplier: 1.3 },
  { value: "neon", label: "Neón UV", multiplier: 1.4 },
  { value: "reflective", label: "Reflectivo", multiplier: 1.6 },
  { value: "holo", label: "Holográfico", multiplier: 1.7 },
];

export default function Calculator() {
  const [selectedTech, setSelectedTech] = useState(TECHNIQUES[0]);
  const [inputValue, setInputValue] = useState<string>("");
  const [vinilEffect, setVinilEffect] = useState(VINIL_EFFECTS[0]);

  const handleTechChange = (value: string) => {
    const tech = TECHNIQUES.find((t) => t.value === value)!;
    setSelectedTech(tech);
    setInputValue("");
    setVinilEffect(VINIL_EFFECTS[0]);
  };

  const parsedVal = parseFloat(inputValue);
  const isValid = inputValue !== "" && !isNaN(parsedVal) && parsedVal > 0;

  const totalPrice = (() => {
    if (!isValid || selectedTech.isQuoteOnly) return 0;
    let base = parsedVal * selectedTech.pricePerUnit;
    if (selectedTech.value === "vinil") base *= vinilEffect.multiplier;
    return base;
  })();

  const formattedPrice = new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalPrice);

  return (
    <div className="bg-card border-2 border-primary/30 rounded-xl p-6 md:p-8 max-w-xl mx-auto mb-8 relative overflow-hidden">
      {/* Glow accent */}
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-6">
        <CalculatorIcon className="text-primary" size={28} />
        <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
          CALCULADORA DE PRODUCCIÓN
        </h2>
      </div>

      <div className="space-y-4">
        {/* ── Technique selector ── */}
        <div>
          <label className="block text-sm text-foreground/70 mb-2 text-left tracking-wide">
            Técnica de Impresión
          </label>
          <div className="relative">
            <select
              value={selectedTech.value}
              onChange={(e) => handleTechChange(e.target.value)}
              className="w-full appearance-none px-4 py-3 bg-input border-2 border-primary/40 rounded-lg text-foreground text-base focus:outline-none focus:border-primary transition-colors pr-10"
            >
              {TECHNIQUES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
        </div>

        {/* ── Vinil effect pills ── */}
        {selectedTech.value === "vinil" && (
          <div>
            <label className="block text-sm text-foreground/70 mb-2 text-left tracking-wide">
              Efecto / Acabado
            </label>
            <div className="flex flex-wrap gap-2">
              {VINIL_EFFECTS.map((ef) => (
                <button
                  key={ef.value}
                  type="button"
                  onClick={() => setVinilEffect(ef)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    vinilEffect.value === ef.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-foreground/60 border-primary/30 hover:border-primary/60"
                  }`}
                >
                  {ef.label}
                  {ef.multiplier > 1 && (
                    <span
                      className={`ml-1 ${vinilEffect.value === ef.value ? "opacity-70" : "text-primary"}`}
                    >
                      ×{ef.multiplier}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Main input ── */}
        <div>
          <label
            htmlFor="calc-input"
            className="block text-sm text-foreground/70 mb-2 text-left tracking-wide"
          >
            {selectedTech.inputLabel}
          </label>
          <input
            id="calc-input"
            type="number"
            min={selectedTech.inputMin}
            step={selectedTech.inputStep}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={selectedTech.inputPlaceholder}
            className="w-full px-4 py-3 bg-input border-2 border-primary/40 rounded-lg text-foreground text-lg focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* ── Result box ── */}
        <div className="bg-background/50 rounded-lg p-4 border border-primary/20">
          <p className="text-xs text-foreground/60 mb-1 tracking-widest uppercase">
            Precio Total Estimado
          </p>

          {selectedTech.isQuoteOnly ? (
            <>
              <p className="text-2xl md:text-3xl font-bold text-primary font-display">
                Cotización Personalizada
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Los parches se cotizan según diseño, tamaño y número de
                puntadas.
              </p>
            </>
          ) : (
            <>
              <p className="text-3xl md:text-4xl font-bold text-primary font-display">
                {isValid ? formattedPrice : "— DOP"}
              </p>
              {isValid && (
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedTech.note(parsedVal)}
                  {selectedTech.value === "vinil" &&
                    vinilEffect.multiplier > 1 && (
                      <span className="text-primary ml-1">
                        · Recargo {vinilEffect.label} ×{vinilEffect.multiplier}
                      </span>
                    )}
                </p>
              )}
            </>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Precio referencial. Para grandes volúmenes o proyectos especiales,{" "}
          <Link to="/contact" className="text-primary hover:underline">
            contáctanos
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
