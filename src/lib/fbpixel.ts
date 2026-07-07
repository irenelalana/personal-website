// lib/fbpixel.ts

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID as string;

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

// Dispara un PageView manual (usado en cambios de ruta client-side)
export const pageview = () => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
};

// Dispara cualquier evento estándar o personalizado de Meta
// Ejemplos de name: 'ViewContent', 'InitiateCheckout', 'Purchase', 'Lead'
export const fbEvent = (name: string, options: Record<string, any> = {}) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', name, options);
  }
};
