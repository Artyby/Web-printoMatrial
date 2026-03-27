"use client";

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const SERVICES = [
  "Impresión DTF",
  "Vinil Textil",
  "Efecto Puff 3D",
  "Parches Termoadhesivos",
  "Otro / Consulta General",
];

// ── WhatsApp number (replace with real number, digits only) ──
const WA_NUMBER = "18097167077";

function buildWhatsAppText(form: FormData): string {
  return encodeURIComponent(
    `Hola Printo-Material! 👋\n\n` +
      `*Nombre:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      (form.phone ? `*Teléfono:* ${form.phone}\n` : "") +
      (form.service ? `*Servicio:* ${form.service}\n` : "") +
      `\n*Mensaje:*\n${form.message}`,
  );
}

function buildMailtoLink(form: FormData): string {
  const subject = encodeURIComponent(
    `Cotización: ${form.service || "Consulta General"} — ${form.name}`,
  );
  const body = encodeURIComponent(
    `Nombre: ${form.name}\n` +
      `Email: ${form.email}\n` +
      (form.phone ? `Teléfono: ${form.phone}\n` : "") +
      (form.service ? `Servicio: ${form.service}\n` : "") +
      `\nMensaje:\n${form.message}`,
  );
  return `mailto:printomatrial@gmail.com?subject=${subject}&body=${body}`;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState<"email" | "whatsapp" | null>(null);

  const isValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.message.trim() !== "";

  const handleEmailSend = () => {
    if (!isValid) return;
    window.location.href = buildMailtoLink(form);
    setSubmitted("email");
    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    }, 500);
  };

  const handleWhatsAppSend = () => {
    if (!isValid) return;
    const url = `https://wa.me/${WA_NUMBER}?text=${buildWhatsAppText(form)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted("whatsapp");
    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    }, 500);
  };

  return (
    <>
      <Helmet>
        <title>
          Contacto — Printo-Material | Cotiza tu Impresión en Santo Domingo
        </title>
        <meta
          name="description"
          content="Contáctanos por Email o WhatsApp para cotizar DTF, Vinil, Puff o Parches en Santo Domingo. Respuesta en menos de 24h."
        />
      </Helmet>

      <div className="min-h-screen pt-24 pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Contacto
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
              HABLEMOS DE TU <span className="text-primary">PROYECTO</span>
            </h1>
            <p className="text-foreground/60 text-base leading-relaxed">
              ¿Tienes una idea? Cuéntanosla. Respondemos en menos de 24 horas
              con una cotización personalizada.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* ── Left: Info ── */}
            <div className="lg:col-span-2 space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "Ubicación",
                  value: "Santo Domingo, República Dominicana",
                  sub: "Visítanos con cita previa",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "PrintoMatrial@gmail.com",
                  sub: "Respondemos en < 24h",
                },
                {
                  icon: Phone,
                  label: "Teléfono / WhatsApp",
                  value: "+1 (809) 716-7077",
                  sub: "Lun–Vie, 8am–6pm",
                },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors group"
                >
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors shrink-0">
                    <Icon className="text-primary" size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
                      {label}
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}

              {/* Quick note */}
              <div className="p-5 bg-primary/5 border border-primary/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <MessageSquare
                    className="text-primary shrink-0 mt-0.5"
                    size={18}
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      Tip para cotizar más rápido
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Incluye: técnica deseada (DTF / Vinil / Puff / Parches),
                      tipo de prenda, cantidad, dimensiones del diseño y fecha
                      límite.
                    </p>
                  </div>
                </div>
              </div>

              {/* Send options explainer */}
              <div className="p-5 bg-card border border-border rounded-xl">
                <p className="text-sm font-semibold text-foreground mb-3">
                  ¿Cómo prefieres enviarlo?
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail size={15} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      <span className="text-foreground font-medium">Email</span>{" "}
                      — Abre tu cliente de correo con el mensaje listo. Ideal
                      para adjuntar archivos de diseño.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    {/* WhatsApp icon via SVG */}
                    <svg
                      className="shrink-0 mt-0.5"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: "#25D366" }}
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-foreground font-medium">
                        WhatsApp
                      </span>{" "}
                      — Abre WhatsApp con el mensaje prellenado. Respuesta más
                      rápida.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="lg:col-span-3 bg-card border border-border rounded-xl p-6 md:p-8">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 bg-primary/10 border-2 border-primary/40 rounded-full flex items-center justify-center mb-5">
                    {submitted === "whatsapp" ? (
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        style={{ color: "#25D366" }}
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    ) : (
                      <Send className="text-primary" size={28} />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {submitted === "whatsapp"
                      ? "¡Abriendo WhatsApp!"
                      : "¡Abriendo tu correo!"}
                  </h3>
                  <p className="text-muted-foreground max-w-xs">
                    {submitted === "whatsapp"
                      ? "Tu mensaje está listo en WhatsApp. Solo presiona Enviar."
                      : "Tu mensaje está listo en tu cliente de correo. Adjunta tu diseño si lo tienes."}
                  </p>
                  <button
                    onClick={() => setSubmitted(null)}
                    className="mt-8 px-6 py-2.5 border border-border rounded-lg text-sm text-foreground/70 hover:text-foreground hover:border-primary/40 transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-foreground/60 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-foreground/60 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-foreground/60 mb-2">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="+1 (809) ..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-foreground/60 mb-2">
                        Servicio
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) =>
                          setForm({ ...form, service: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Seleccionar...</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-foreground/60 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Cuéntanos: técnica deseada, tipo de prenda, cantidad, dimensiones y fecha límite..."
                    />
                  </div>

                  {/* ── Dual Send Buttons ── */}
                  <div className="pt-1 space-y-3">
                    <p className="text-xs text-muted-foreground text-center">
                      Elige cómo enviarnos tu mensaje:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Email */}
                      <button
                        type="button"
                        disabled={!isValid}
                        onClick={handleEmailSend}
                        className="flex items-center justify-center gap-2 px-4 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 shadow-lg shadow-primary/20 text-sm"
                      >
                        <Mail size={17} />
                        Enviar por Email
                      </button>

                      {/* WhatsApp */}
                      <button
                        type="button"
                        disabled={!isValid}
                        onClick={handleWhatsAppSend}
                        className="flex items-center justify-center gap-2 px-4 py-3.5 font-semibold rounded-lg transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 text-sm border"
                        style={{
                          backgroundColor: "#25D366",
                          borderColor: "#1ebe5d",
                          color: "#fff",
                          boxShadow: "0 4px 14px rgba(37,211,102,0.25)",
                        }}
                      >
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Enviar por WhatsApp
                      </button>
                    </div>
                    {!isValid && (
                      <p className="text-xs text-muted-foreground text-center">
                        Completa Nombre, Email y Mensaje para habilitar el
                        envío.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
