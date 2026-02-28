export type Language = "es" | "en";

type Dictionary = Record<string, string>;

const es: Dictionary = {
  "nav.services": "Servicios",
  "nav.contact": "Contacto",
  "lang.es": "ES",
  "lang.en": "EN",

  "hero.badge": "#1 Servicio en el Mercado desde 2022",
  "hero.title": "AKOS SHOP",
  "hero.subtitle":
    "Servicios profesionales de alta calidad. Proxies, cuentas verificadas de megapersonals y soporte 24/7.",
  "hero.bullet.immediate": "Entrega Inmediata",
  "hero.bullet.support": "Soporte 24/7",
  "hero.bullet.warranty": "Garantía Incluida",
  "hero.cta.services": "Ver Servicios",
  "hero.cta.contact": "Contactar",

  "sections.services.title": "Nuestros Servicios",
  "sections.services.subtitle": "Selecciona el servicio que mejor te conviene",
  "sections.gallery.title": "Fotos del Bot",
  "sections.gallery.subtitle": "Mira nuestros paneles, plataformas y herramientas",
  "sections.payments.title": "Pagos que Aceptamos",
  "sections.payments.subtitle": "Opciones de pago seguras y flexibles a nivel mundial",
  "sections.footer.title": "¿Preguntas?",
  "sections.footer.subtitle":
    "Contáctanos y te ayudamos con todo lo que necesites.",

  "pages.services.badge": "Servicios",
  "pages.services.title": "Hecho para velocidad, escala y estabilidad",
  "pages.contact.badge": "Contacto",
  "pages.contact.title": "Contacta AKOSSHOP",
  "pages.contact.subtitle":
    "Escríbenos para precios, asesoría y planes. Respondemos rápido y damos soporte 24/7.",
  "pages.admin.badge": "/admin",
  "pages.admin.title": "Panel de Admin Próximamente",
  "pages.admin.subtitle":
    "Este frontend sigue 100% sin backend por ahora y está listo para integrar Node.js + Express + MongoDB Atlas + CMS.",

  "labels.price": "Precio",
  "labels.available": "Disponible",
  "labels.available_yes": "Disponible",
  "labels.available_no": "No Disponible",
  "labels.whatsapp": "WhatsApp",
  "labels.email": "Correo",
  "labels.copyright": "\u00A9 2026 AKOSSHOP. Todos los derechos reservados",

  "buttons.contact": "Contactar",
  "buttons.consult": "Consultar",
  "buttons.explore": "Ver Servicios",
  "buttons.text_telegram": "Text us on Telegram",
  "buttons.open_whatsapp": "Abrir WhatsApp",
  "buttons.send_email": "Enviar Correo",
  "buttons.close": "Cerrar",
  "buttons.watch_video": "Ver Video",
  "buttons.view_gallery": "Ver Galería",

  "service.premium.title": "Proxies Premium",
  "service.premium.tagline": "Los mejores del mercado",
  "service.premium.cta": "Obtener Proxies Premium",

  "service.sales.title": "Cuentas de Venta",
  "service.sales.tagline": "Verificadas y Seguras",
  "service.sales.cta": "Consultar por Telegram",
  "service.sales.info_title": "Confianza Comprobada",

  "service.rental.title": "¿Por qué vas a rentar con nosotros?",
  "service.rental.tagline": "2 planes disponibles",
  "service.rental.cta": "Rentar una Cuenta",

  "service.megaboost.title": "Bot MEGABOOSTV1",
  "service.megaboost.tagline": "Escala y controla desde un solo panel",
  "service.megaboost.cta": "Consultar por V1 Bot",
};

const en: Dictionary = {
  "nav.services": "Services",
  "nav.contact": "Contact",
  "lang.es": "ES",
  "lang.en": "EN",

  "hero.badge": "#1 Service in the Market since 2022",
  "hero.title": "AKOS SHOP",
  "hero.subtitle":
    "High-quality professional services. Proxies, verified accounts OF megapersonals, and 24/7 support",
  "hero.bullet.immediate": "Immediate Delivery",
  "hero.bullet.support": "24/7 Support",
  "hero.bullet.warranty": "Warranty Included",
  "hero.cta.services": "Explore Services",
  "hero.cta.contact": "Contact",

  "sections.services.title": "Our Services",
  "sections.services.subtitle": "Select the service that best suits your needs",
  "sections.gallery.title": "Bot Pictures",
  "sections.gallery.subtitle": "Preview our panels, platforms, and tools",
  "sections.payments.title": "Payments We Accept",
  "sections.payments.subtitle": "Secure and flexible payment options worldwide",
  "sections.footer.title": "Questions?",
  "sections.footer.subtitle":
    "Contact us and we'll help you with whatever you need.",

  "pages.services.badge": "Services",
  "pages.services.title": "Built for speed, scale, and reliability",
  "pages.contact.badge": "Contact",
  "pages.contact.title": "Contact AKOSSHOP",
  "pages.contact.subtitle":
    "Reach out for pricing, service consultation, and plan guidance. We reply quickly and support clients 24/7.",
  "pages.admin.badge": "/admin",
  "pages.admin.title": "Admin Dashboard Coming Soon",
  "pages.admin.subtitle":
    "This frontend is intentionally backend-free right now. It is structured for future Node.js + Express + MongoDB Atlas + CMS integration.",

  "labels.price": "Price",
  "labels.available": "Available",
  "labels.available_yes": "Available",
  "labels.available_no": "Unavailable",
  "labels.whatsapp": "WhatsApp",
  "labels.email": "Email",
  "labels.copyright": "\u00A9 2026 AKOSSHOP. All rights reserved",

  "buttons.contact": "Contact",
  "buttons.consult": "Consult",
  "buttons.explore": "Explore Services",
  "buttons.text_telegram": "Text us on Telegram",
  "buttons.open_whatsapp": "Open WhatsApp",
  "buttons.send_email": "Send Email",
  "buttons.close": "Close",
  "buttons.watch_video": "Watch Video",
  "buttons.view_gallery": "View Gallery",

  "service.premium.title": "Premium Proxies",
  "service.premium.tagline": "The best on the market",
  "service.premium.cta": "Get Premium Proxies",

  "service.sales.title": "Sales Accounts",
  "service.sales.tagline": "Verified and Secure",
  "service.sales.cta": "Consult on Telegram",
  "service.sales.info_title": "Proven Track Record",

  "service.rental.title": "Why you will rent from us?",
  "service.rental.tagline": "2 plans available",
  "service.rental.cta": "Rent an Account",

  "service.megaboost.title": "MEGABOOSTV1 bot",
  "service.megaboost.tagline": "Scale and control from one dashboard",
  "service.megaboost.cta": "Consult for V1 Bot",
};

export const translations: Record<Language, Dictionary> = { es, en };

export const translate = (
  lang: Language,
  key: string,
  fallback?: string,
): string => translations[lang][key] ?? translations.en[key] ?? fallback ?? key;
