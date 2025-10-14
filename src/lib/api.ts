// src/lib/api.ts
import dotenv from 'dotenv';
dotenv.config();

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

/** Try multiple backends so it works locally + on Vercel/Netlify */
const EMAIL_ENDPOINTS = [
  '/api/notify',                 // Vercel
  '/.netlify/functions/notify',  // Netlify
];

/** Fire-and-forget email notifier (returns boolean success) */
async function notify(kind: 'quote' | 'contact', payload: any): Promise<boolean> {
  for (const url of EMAIL_ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, payload }),
      });
      if (res.ok) return true;
    } catch {
      // try next endpoint
    }
  }
  console.warn('Email notify failed (no endpoint reachable).');
  return false;
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
      submitted_at: data.submittedAt,
    });

    if (error) {
      console.error('Error submitting quote:', error);
      return { success: false, error: error.message };
    }

    // Send notification email (non-blocking, but awaited here to surface errors if you want)
    await notify('quote', data);
    return { success: true };
  } catch (error) {
    console.error('Error submitting quote:', error);
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
      submitted_at: data.submittedAt,
    });

    if (error) {
      console.error('Error submitting contact:', error);
      return { success: false, error: error.message };
    }

    // Send notification email
    await notify('contact', data);
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact:', error);
    return { success: false, error: 'Failed to submit contact form' };
  }
}
