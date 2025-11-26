import { supabase } from './supabase';

/* ========= Types ========= */
export interface QuoteSubmission {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  category: string;
  service: string;
  budget?: string;
  timeline?: string;
  brief: string;
  goals?: string[];
  references?: string;
  submittedAt: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
}

/* ========= Config ========= */
const NOTIFY_URL = 'https://pixelflare-2zw4.vercel.app/api/notify';

type NotifyPayload = Record<string, any>;

/* ========= Helpers ========= */
/**
 * Send payload to the Vercel notify function.
 * If `attachment` is provided, we send multipart/form-data
 * (to match your formidable-based notify.ts).
 */
export async function postNotify(
  payload: NotifyPayload,
  attachment?: File | null
): Promise<boolean> {
  try {
    let options: RequestInit;

    // --- always use FormData so backend parsing is consistent ---
    const form = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((v) => form.append(key, String(v)));
      } else {
        form.append(key, String(value));
      }
    });

    if (attachment) {
      // field name must match `files.attachment` in notify.ts
      form.append('attachment', attachment);
    }

    options = {
      method: 'POST',
      body: form,
      // do NOT set Content-Type – browser will set proper multipart boundary
    };

    const res = await fetch(NOTIFY_URL, options);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error('notify failed', res.status, body);
      return false;
    }

    return true;
  } catch (e) {
    console.error('notify error', e);
    return false;
  }
}

/* ========= Public API ========= */
export async function submitQuote(
  data: QuoteSubmission,
  recaptchaToken?: string,
  attachment?: File | null   // 👈 optional file (backwards-compatible)
): Promise<{ success: boolean; error?: string; emailSent?: boolean }> {
  try {
    const { error } = await supabase.from('quote_submissions').insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company ?? '',
      category: data.category,
      service: data.service,
      budget: data.budget ?? '',
      timeline: data.timeline ?? '',
      brief: data.brief,
      goals: data.goals ?? [],
      reference_links: data.references ?? '',
      submitted_at: data.submittedAt,
    });

    if (error) {
      console.error('Error submitting quote:', error);
      return { success: false, error: error.message };
    }

    // map fullName → name for email template
    const emailSent = await postNotify(
      {
        kind: 'quote',
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        category: data.category,
        service: data.service,
        budget: data.budget,
        timeline: data.timeline,
        brief: data.brief,
        goals: data.goals,
        references: data.references,
        recaptchaToken,
        submittedAt: data.submittedAt,
      },
      attachment ?? undefined
    );

    return { success: true, emailSent };
  } catch (err) {
    console.error('Error submitting quote:', err);
    return { success: false, error: 'Failed to submit quote' };
  }
}

export async function submitContact(
  data: ContactSubmission,
  recaptchaToken?: string,
  attachment?: File | null   // 👈 optional file
): Promise<{ success: boolean; error?: string; emailSent?: boolean }> {
  try {
    const { error } = await supabase.from('contact_submissions').insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? '',
      message: data.message,
      submitted_at: data.submittedAt,
    });

    if (error) {
      console.error('Error submitting contact:', error);
      return { success: false, error: error.message };
    }

    const emailSent = await postNotify(
      {
        kind: 'contact',
        ...data,
        recaptchaToken,
      },
      attachment ?? undefined
    );

    return { success: true, emailSent };
  } catch (err) {
    console.error('Error submitting contact:', err);
    return { success: false, error: 'Failed to submit contact form' };
  }
}
