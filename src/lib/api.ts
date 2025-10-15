// src/lib/api.ts
import { supabase } from './supabase';

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

// Point to the Vercel function correctly in dev/prod
const API_BASE = import.meta.env.DEV ? 'http://localhost:3000' : '';

async function notify(payload: unknown) {
  const res = await fetch(`${API_BASE}/api/notify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    console.error('notify failed', res.status, txt);
    throw new Error(txt || `notify failed with ${res.status}`);
  }
}

export async function submitQuote(data: QuoteSubmission): Promise<{ success: boolean; error?: string }> {
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

    // 🔔 Send the email
    await notify({
      kind: 'quote',
      ...data,
    });

    return { success: true };
  } catch (err: any) {
    console.error('Error submitting quote:', err);
    return { success: false, error: err?.message || 'Failed to submit quote' };
  }
}

export async function submitContact(data: ContactSubmission): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('contact_submissions').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      message: data.message,
      submitted_at: data.submittedAt,
    });
    if (error) {
      console.error('Error submitting contact:', error);
      return { success: false, error: error.message };
    }

    // 🔔 Send the email
    await notify({
      kind: 'contact',
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      submittedAt: data.submittedAt,
    });

    return { success: true };
  } catch (err: any) {
    console.error('Error submitting contact:', err);
    return { success: false, error: err?.message || 'Failed to submit contact form' };
  }
}
