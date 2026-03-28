"use client";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight, Zap, Shield, Clock } from "lucide-react";
import Calculator from "../components/Calculator";

const BADGES = [
  { icon: Zap, label: "Alta Resolución" },
  { icon: Shield, label: "Resistencia Industrial" },
  { icon: Clock, label: "Entrega Rápida" },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          Printo-Material — Impresión DTF de Alta Resolución | Santo Domingo, RD
        </title>
        <meta
          name="description"
          content="Laboratorio de impresión DTF y personalización de prendas en Santo Domingo. Alta resolución, resistencia industrial. Cotiza en línea."
        />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="min-h-screen pt-16 flex items-center relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(var(--color-primary) 1px, transparent 1px),
                linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />
          {/* Glow blobs */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-6 px-4 py-1.5 border border-primary/30 rounded-full bg-primary/5">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              High-Res Print Lab · Santo Domingo
            </p>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.05] tracking-tight">
              IMPRESIÓN <span className="text-primary">SIN LÍMITES</span>
              <br />
              <span className="text-foreground/40 text-3xl md:text-5xl lg:text-6xl">
                PARA MENTES CREATIVAS
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              Del píxel a la prenda con resistencia industrial. Elevamos tu
              marca con tecnología DTF de vanguardia.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground/70"
                >
                  <Icon size={14} className="text-primary" />
                  {label}
                </div>
              ))}
            </div>

            {/* Calculator */}
            <Calculator />

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
              >
                Solicitar Presupuesto Completo
                <ChevronRight size={20} />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-foreground font-medium rounded-lg border border-border hover:border-primary/50 transition-all"
              >
                Ver Galería de Trabajos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="py-10 border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50+", label: "Proyectos Completados" },
              { value: "48h", label: "Tiempo de Entrega" },
              { value: "85%", label: "Satisfacción Garantizada" },
              { value: "BUENA", label: "Resolución de Impresión" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-primary font-display">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground mt-1 tracking-wide uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
