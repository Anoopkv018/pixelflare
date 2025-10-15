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

/* ========= Helpers ========= */
export async function postNotify(payload: unknown): Promise<boolean> {
  try {
    const res = await fetch(NOTIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
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
  recaptchaToken?: string
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

    // ✅ map `fullName` → `name` for email notification
    const emailSent = await postNotify({
      kind: 'quote',
      name: data.fullName,   // 👈 this is the critical fix
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
    });

    return { success: true, emailSent };
  } catch (err) {
    console.error('Error submitting quote:', err);
    return { success: false, error: 'Failed to submit quote' };
  }
}

export async function submitContact(
  data: ContactSubmission,
  recaptchaToken?: string
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

    const emailSent = await postNotify({
      kind: 'contact',
      ...data,
      recaptchaToken,
    });

    return { success: true, emailSent };
  } catch (err) {
    console.error('Error submitting contact:', err);
    return { success: false, error: 'Failed to submit contact form' };
  }
}
