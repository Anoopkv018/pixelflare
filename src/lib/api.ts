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

export async function submitQuote(
  data: QuoteSubmission
): Promise<{ success: boolean; error?: string }> {
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
      submitted_at: data.submittedAt
    });

    if (error) {
      console.error('Error submitting quote:', error);
      return { success: false, error: error.message };
    }

    // 🔔 Fire the email notification (server: /api/notify)
    // Keep it non-blocking but await so we can surface errors if needed.
    const notify = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'quote',
        to: 'reachpixelflare@gmail.com',
        cc: ['info@pixelflare.in', 'services@pixelflare.in'],
        subject: `New Quote Request — ${data.category} / ${data.service}`,
        payload: data
      })
    });

    if (!notify.ok) {
      const body = await notify.json().catch(() => ({}));
      console.error('notify failed', notify.status, body);
      // We still consider the submission saved; but return error if you want:
      // return { success: false, error: 'Saved but email failed' };
    }

    return { success: true };
  } catch (err) {
    console.error('Error submitting quote:', err);
    return { success: false, error: 'Failed to submit quote' };
  }
}

export async function submitContact(
  data: ContactSubmission
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('contact_submissions').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      message: data.message,
      submitted_at: data.submittedAt
    });

    if (error) {
      console.error('Error submitting contact:', error);
      return { success: false, error: error.message };
    }

    // 🔔 Email for contact as well
    const notify = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact',
        to: 'reachpixelflare@gmail.com',
        cc: ['info@pixelflare.in', 'services@pixelflare.in'],
        subject: `New Contact Message — ${data.name}`,
        payload: data
      })
    });

    if (!notify.ok) {
      const body = await notify.json().catch(() => ({}));
      console.error('notify failed', notify.status, body);
      // return { success: false, error: 'Saved but email failed' };
    }

    return { success: true };
  } catch (err) {
    console.error('Error submitting contact:', err);
    return { success: false, error: 'Failed to submit contact form' };
  }
}
