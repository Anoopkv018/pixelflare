import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Card } from '../components/ui/Card';
import { siteConfig } from '../config/site';

type Status = { type: 'idle' | 'success' | 'error'; message?: string };

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<Status>({ type: 'idle' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // spam bot
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus({ type: 'idle' });

    try {
      // 1) Save to DB
      const { submitContact } = await import('../lib/api');
      const dbPromise = submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        submittedAt: new Date().toISOString()
      });

      // 2) Send email (via /api/notify which uses Nodemailer + your .env)
      const mailPromise = fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const [dbRes, mailRes] = await Promise.allSettled([dbPromise, mailPromise]);

      const dbOK = dbRes.status === 'fulfilled' && dbRes.value?.success;
      const mailOK =
        mailRes.status === 'fulfilled' && (mailRes.value as Response).ok;

      if (dbOK && mailOK) {
        setStatus({
          type: 'success',
          message: 'Thanks! Your message has been sent. We’ll get back to you soon.'
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message:
            'We saved your message, but email notification failed. We’ll still reach out soon.'
        });
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again in a moment.'
      });
    } finally {
      setIsSubmitting(false);
      // Auto-hide status after a bit
      setTimeout(() => setStatus({ type: 'idle' }), 6000);
    }
  };

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#fe2681]/10 via-white to-[#14276d]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-[#14276d] mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Have a question or ready to start your project? Let’s connect and bring your ideas to life.
          </motion.p>
        </div>
      </section>

      {/* ===== CONTACT CARDS ===== */}
      <section className="relative -mt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[
            { icon: MapPin, label: 'Location', text: siteConfig.address },
            { icon: Phone, label: 'Phone', text: siteConfig.phone },
            { icon: Mail, label: 'Email', text: siteConfig.email }
          ].map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="text-center backdrop-blur-xl bg-white/80 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#fe2681] to-[#14276d] mb-4 mx-auto">
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#14276d] mb-2">{info.label}</h3>
                <p className="text-gray-600">{info.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-[#14276d] mb-6">Send us a message</h2>

            {/* inline toast/status */}
            <div aria-live="polite" className="min-h-[28px] mb-2">
              {status.type === 'success' && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">{status.message}</span>
                </div>
              )}
              {status.type === 'error' && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">{status.message}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ position: 'absolute', left: '-9999px' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                error={errors.name}
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                error={errors.email}
              />
              <Input
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              <Textarea
                label="Message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                rows={6}
                required
                error={errors.message}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                fullWidth
                className="rounded-2xl bg-gradient-to-r from-[#fe2681] to-[#14276d] text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </span>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-[#14276d] mb-6">Find us</h2>
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                title="PixelFlare Office — Mysuru"
                src="https://maps.google.com/maps?q=Mysuru%2C%20Karnataka%2C%20India&z=12&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
