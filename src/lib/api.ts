// src/lib/api.ts
import { supabase } from './supabase';

/* ---------- Types ---------- */

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


/* ---------- Helpers ---------- */

/**
 * POST JSON to our serverless function and return whether it succeeded.
 * Never throws — returns false on any failure.
 */
async function postNotify(payload: unknown): Promise<boolean> {
  try {
    const res = await fetch('/api/notify', {
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
  } catch (err) {
    console.error('notify error', err);
    return false;
  }
}

/* ---------- Public API ---------- */

export async function submitQuote(data: QuoteSubmission): Promise<ApiResult> {
  try {
    const { error } = await supabase.from('quote_submissions').insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company || '',
      category: data.category,
      service: data.service,
      budget: data.budget || '',
      timeline: data.timeline || '',
      brief: data.brief,
      goals: data.goals || [],
      reference_links: data.references || '',
      submitted_at: data.submittedAt,
    });

    if (error) {
      console.error('Error submitting quote:', error);
      return { success: false, error: error.message };
    }

    // Send notification email (non-blocking for UX, but we still await to know result)
    const emailSent = await postNotify({ kind: 'quote', ...data });

    return { success: true, emailSent };
  } catch (err) {
    console.error('Error submitting quote:', err);
    return { success: false, error: 'Failed to submit quote' };
  }
}
type ApiResult = { success: boolean; emailSent?: boolean; error?: string };

export async function submitContact(
  data: ContactSubmission,
  recaptchaToken?: string
): Promise<ApiResult> {
  try {
    const { error } = await supabase.from('contact_submissions').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      message: data.message,
      submitted_at: data.submittedAt,
    });
    if (error) return { success: false, error: error.message };

    // Try to send the email and report whether it worked
    let emailSent = false;
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'contact', ...data, recaptchaToken }),
      });

      if (res.ok) {
        // Our /api/notify returns { success: true, messageId: ... }
        const json = await res.json().catch(() => null);
        emailSent = !!json?.success;
      }
    } catch (e) {
      // swallow; we still saved to DB
      emailSent = false;
    }

    return { success: true, emailSent };
  } catch (err) {
    console.error('Error submitting contact:', err);
    return { success: false, error: 'Failed to submit contact form' };
  }
}
