import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Layers,
  Zap,
  Box,
  Patch,
  Ruler,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

// ─── Use Aperture instead of Patch (lucide doesn't have Patch) ───
import { Aperture } from "lucide-react";

const SERVICES = [
  {
    icon: Layers,
    tag: "DTF",
    title: "Impresión DTF",
    subtitle: "Alta Resolución Fotográfica",
    description:
      "Transferencia directa al film con resolución de hasta 4K. Fidelidad fotográfica real: gradientes, sombras, detalles microscópicos. Resistencia industrial lavado tras lavado.",
    features: [
      "Resolución 4K",
      "Colores ilimitados",
      "Mínimo 1 unidad",
      "Entrega 48h",
    ],
    accent: "from-lime-400/20 to-transparent",
    border: "border-lime-400/30",
  },
  {
    icon: Zap,
    tag: "VINIL",
    title: "Vinil Textil",
    subtitle: "Colores Sólidos & Efectos Especiales",
    description:
      "Para diseños de colores sólidos con acabados que el DTF no puede igualar: glitter, reflectivos, holográfico y neones que brillan bajo luz UV. La opción premium para marcas que quieren impacto visual inmediato.",
    features: ["Glitter & Foil", "Reflectivo / HTV", "Neón UV", "Holográfico"],
    accent: "from-yellow-400/10 to-transparent",
    border: "border-yellow-400/20",
  },
  {
    icon: Box,
    tag: "PUFF",
    title: "Efecto Puff 3D",
    subtitle: "Relieve Térmico Premium",
    description:
      "Impresión con espuma termoadhesiva que se expande al calor, creando un relieve táctil y visual único. Textura premium que convierte cualquier diseño en una pieza de colección.",
    features: [
      "Relieve hasta 3mm",
      "Textura premium",
      "Diseños complejos",
      "Acabado mate/gloss",
    ],
    accent: "from-emerald-400/10 to-transparent",
    border: "border-emerald-400/20",
  },
  {
    icon: Aperture,
    tag: "PARCHES",
    title: "Parches Termoadhesivos",
    subtitle: "Bordados & Tejidos de Alta Resistencia",
    description:
      "Aplicaciones bordadas o tejidas con pegado termoadhesivo de alta resistencia industrial. Ideales para uniformes, streetwear y colecciones que requieren durabilidad extrema y estética artesanal.",
    features: [
      "Bordado computarizado",
      "Pegado industrial",
      "Todo tipo de prenda",
      "Cotización por puntadas",
    ],
    accent: "from-orange-400/10 to-transparent",
    border: "border-orange-400/20",
  },
];

const MATERIALS = [
  { name: "Algodón 100%", gsm: "100–320 gsm", rating: 5 },
  { name: "Poliéster", gsm: "Tejido técnico", rating: 5 },
  { name: "Denim", gsm: "8–14 oz", rating: 4 },
  { name: "Mezclas (CO/PES)", gsm: "Cualquier composición", rating: 5 },
  { name: "Nylon", gsm: "Deportivo y moda", rating: 4 },
  { name: "Canvas", gsm: "Bolsos y accesorios", rating: 4 },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Envía tu Diseño",
    desc: "PDF, PNG o AI en alta resolución.",
  },
  {
    step: "02",
    title: "Revisión Técnica",
    desc: "Optimizamos colores y perfiles para cada técnica.",
  },
  {
    step: "03",
    title: "Producción",
    desc: "Producción en nuestra planta en Santo Domingo.",
  },
  {
    step: "04",
    title: "Prensado & QC",
    desc: "Aplicación y control de calidad visual.",
  },
  {
    step: "05",
    title: "Entrega",
    desc: "Recoge en local o envío a domicilio.",
  },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>
          Servicios — Printo-Material | DTF, Vinil, Puff & Parches | Santo
          Domingo
        </title>
        <meta
          name="description"
          content="DTF alta resolución, Vinil Textil con glitter y neones, Efecto Puff 3D y Parches Termoadhesivos. Impresión profesional en Santo Domingo, República Dominicana."
        />
      </Helmet>

      <div className="min-h-screen pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <div className="max-w-3xl mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Servicios
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
              4 TÉCNICAS.{" "}
              <span className="text-primary">UN SOLO LABORATORIO.</span>
            </h1>
            <p className="text-foreground/60 text-lg leading-relaxed">
              No somos solo DTF. Dominamos cada tecnología de personalización
              textil para que elijas la que mejor se adapta a tu proyecto.
            </p>
          </div>

          {/* ── Services Grid ── */}
          <div className="grid md:grid-cols-2 gap-5 mb-20">
            {SERVICES.map(
              ({
                icon: Icon,
                tag,
                title,
                subtitle,
                description,
                features,
                accent,
                border,
              }) => (
                <div
                  key={tag}
                  className={`bg-card border ${border} rounded-xl p-6 hover:border-primary/50 transition-all group relative overflow-hidden`}
                >
                  {/* BG accent */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${accent} pointer-events-none`}
                  />

                  <div className="relative z-10">
                    {/* Tag pill */}
                    <span className="inline-block px-3 py-0.5 bg-primary/10 border border-primary/30 text-primary text-xs font-bold tracking-widest rounded-full mb-4">
                      {tag}
                    </span>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors shrink-0">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-0.5">
                          {title}
                        </h3>
                        <p className="text-xs text-primary/70 font-medium uppercase tracking-wider">
                          {subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {description}
                    </p>

                    <ul className="grid grid-cols-2 gap-2">
                      {features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-xs text-foreground/70"
                        >
                          <CheckCircle2
                            size={12}
                            className="text-primary shrink-0"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* ── Vinil Special Effects callout ── */}
          <div className="mb-20 bg-card border border-primary/20 rounded-xl p-7 relative overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-64 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Vinil Textil — Efectos Exclusivos
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              Lo que ninguna impresora DTF puede hacer
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: "Glitter & Foil",
                  desc: "Acabados metálicos y brillantes que capturan la luz.",
                },
                {
                  name: "Reflectivo HTV",
                  desc: "Brilla en la oscuridad bajo luz de vehículos o flash.",
                },
                {
                  name: "Neón UV",
                  desc: "Colores fluorescentes que explotan bajo luz negra.",
                },
                {
                  name: "Holográfico",
                  desc: "Efecto arcoíris iridiscente que cambia con el ángulo.",
                },
              ].map(({ name, desc }) => (
                <div
                  key={name}
                  className="p-4 bg-background/60 border border-border rounded-lg"
                >
                  <p className="font-semibold text-primary text-sm mb-1">
                    {name}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Materials ── */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
              MATERIALES <span className="text-primary">COMPATIBLES</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Si tiene fibra, lo imprimimos.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MATERIALS.map(({ name, gsm, rating }) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {gsm}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-6 rounded-sm ${i < rating ? "bg-primary" : "bg-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Process ── */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight">
              EL <span className="text-primary">PROCESO</span>
            </h2>
            <div className="relative">
              <div className="hidden md:block absolute top-8 left-[2.25rem] right-[2.25rem] h-px bg-border" />
              <div className="grid md:grid-cols-5 gap-6">
                {PROCESS_STEPS.map(({ step, title, desc }) => (
                  <div key={step} className="relative text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center relative z-10">
                      <span className="text-primary font-bold text-lg">
                        {step}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="bg-card border border-primary/30 rounded-xl p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/[0.03] pointer-events-none" />
            <Ruler className="mx-auto text-primary mb-4 opacity-40" size={40} />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
              ¿Listo para comenzar tu proyecto?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Cotización personalizada en menos de 24 horas. Elige la técnica,
              cuéntanos tu idea.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
            >
              Solicitar Cotización <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
