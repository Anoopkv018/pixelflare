// src/lib/recaptcha.ts
declare global {
  interface Window {
    grecaptcha?: {
      ready(cb: () => void): void;
      execute(siteKey: string, opts: { action: string }): Promise<string>;
    };
  }
}

let loader: Promise<void> | null = null;

function loadScript(siteKey: string) {
  if (loader) return loader;
  loader = new Promise<void>((resolve, reject) => {
    const id = 'recaptcha-v3';
    if (document.getElementById(id)) return resolve();
    const s = document.createElement('script');
    s.id = id;
    s.async = true;
    s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('reCAPTCHA failed to load'));
    document.head.appendChild(s);
  });
  return loader;
}

/** Get a v3 token for a given action (e.g., 'contact', 'quote') */
export async function getRecaptchaToken(action: string) {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;
  if (!siteKey) return ''; // soft-bypass in local if key not set
  await loadScript(siteKey);
  return new Promise<string>((resolve) => {
    window.grecaptcha?.ready(async () => {
      const t = await window.grecaptcha!.execute(siteKey, { action });
      resolve(t || '');
    });
  });
}
