import { Service } from "@/app/types/service";

// This static data is shaped like a future API response from Node/Express + MongoDB.
export const services: Service[] = [
  {
    id: "premium-proxies",
    title: "Premium Proxies",
    tagline: "The best on the market",
    description:
      "Proxies rapidos y confiables para tus necesidades. Solo vendemos IPs reales ISP de USA: Comcast, AT&T y T-Mobile, todas residenciales. Menor fraud score porque son IPs de usuarios reales.",
    features: [
      "High Speed",
      "Dedicated IPs",
      "24/7 Support",
      "99.9% Uptime",
    ],
    priceText: "$20/month",
    availableCount: 15,
    mediaType: "video",
    mediaSrc: "/assets/IP.mp4",
    ctaText: "Get Premium Proxies",
  },
  {
    id: "sales-accounts",
    title: "Sales Accounts",
    tagline: "Verified and Secure",
    description: "Verified accounts ready to use immediately.",
    extraText:
      "We also sell: tryst.link, bedpages, skip the games, adult search",
    highlightInfo:
      "Llevamos 2 anos vendiendo cuentas.\n\nTenemos reseñas de mas de 50 clientes activos.\nTambien tenemos un grupo de disponibilidad diaria de cuentas donde publicamos las cuentas disponibles cada dia.\nEscribenos por Telegram y te agregamos: @akosrentproxies",
    highlightHandle: "@akosrentproxies",
    highlightCtaHref: "https://t.me/akosrentproxies",
    features: [
      "100% Verified",
      "No restrictions",
      "Immediate delivery",
      "Warranty included",
    ],
    logos: [
      {
        id: "tryst-link",
        name: "Tryst.link",
        src: "/assets/tryst-logo.png",
      },
      {
        id: "bedpages",
        name: "Bedpages",
        src: "/assets/bedpages.svg",
      },
      {
        id: "skipthegames",
        name: "Skipthegames",
        src: "/assets/skipthegames-logo.png",
      },
      {
        id: "adultsearch",
        name: "Adult Search",
        src: "/assets/adultsearch.svg",
      },
    ],
    priceText: "Consult ON telegram",
    availableCount: 0,
    mediaType: "image",
    mediaSrc: "/assets/sales-accounts.jpg",
    ctaText: "Consult on Telegram",
  },
  {
    id: "account-rental",
    title: "Why you will rent from us?",
    tagline: "2 plans available",
    description:
      "Plan Básico ($125/semana): republicación cada 30 min. Plan Premium ($200/semana): republicación cada 15 min con panel web privado.",
    detailPoints: [
      "No solo alquilamos.",
      "Le damos al cliente acceso a nuestro bot de Telegram.",
      "Pueden manejar sus cuentas fácilmente cuando quieran.",
      "El control del bumping de cuentas queda en sus manos.",
      "Solo usan un grupo de Telegram para usar su IP.",
    ],
    features: [
      "Plan Básico: $125",
      "Plan Premium: $200",
      "Atención personalizada",
      "Control total",
    ],
    priceText: "Desde $125",
    availableCount: 2,
    mediaType: "none",
    mediaSrc: "",
    ctaText: "Rentar una Cuenta",
  },
  {
    id: "megaboostv1-bot",
    title: "MEGABOOSTV1 bot",
    tagline: "Scale and control from one dashboard",
    description:
      "Flujo de trabajo centrado en automatización para correr múltiples cuentas con operaciones más limpias y menos trabajo manual.",
    features: [
      "hasta 5-100 cuentas corriendo desde un solo dashboard",
      "operaciones en lote",
      "intervalos de bump personalizados",
      "Experiencia fluida: agregar cuentas, monitorear y detener automáticamente",
      "Pausar y reanudar anuncios",
      "Editar detalles del anuncio directamente en la web",
      "Notificaciones de Telegram en bump / stop / pause",
      "Totalmente headless, sin navegador",
      "Correr todas las cuentas desde un solo dashboard",
      "CERO SHADOW BANNED",
      "USADO POR MÁS DE 20 CLIENTES",
      "SERVICIO FLUIDO, SIN PROBLEMAS HASTA AHORA",
    ],
    priceText: "Consultar",
    availableCount: 5,
    mediaType: "image",
    mediaSrc: "/assets/megaboostv1.png",
    mediaGallery: [
      "/assets/megaboostv1.png",
      "/assets/bot-dashboard.png",
      "/assets/megaboost-telegram-1.png",
      "/assets/megaboost-telegram-2.jpg",
    ],
    ctaText: "Consultar por V1 Bot",
  },
];
