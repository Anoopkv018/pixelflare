// src/components/QuoteModal.tsx
import { useEffect, useMemo, useRef, useState, FormEvent, KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Paperclip, Trash2 } from 'lucide-react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCategory?: string;
  preSelectedService?: string;
}

const categoryOptions = [
  { value: '', label: 'Select a category' },
  { value: 'website', label: 'Website' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'videos', label: 'Videos' },
  { value: 'branding', label: 'Branding' }
];

const servicesByCategory: Record<string, { value: string; label: string }[]> = {
  website: [
    { value: '', label: 'Select a service' },
    { value: 'website-designing', label: 'Website Designing' },
    { value: 'website-development', label: 'Website Development' },
    { value: 'website-migration', label: 'Website Migration' },
    { value: 'wordpress-website', label: 'WordPress Website' }
  ],
  marketing: [
    { value: '', label: 'Select a service' },
    { value: 'on-page-seo', label: 'On-page SEO' },
    { value: 'google-ads', label: 'Google Ads' },
    { value: 'meta-ads', label: 'Meta Ads' },
    { value: 'link-building', label: 'Link Building' }
  ],
  videos: [
    { value: '', label: 'Select a service' },
    { value: 'video-editing', label: 'Video Editing' },
    { value: 'explainer-video', label: 'Explainer Video' },
    { value: 'testimonial-video', label: 'Testimonial Video' },
    { value: 'product-explainer-video', label: 'Product Explainer Video' }
  ],
  branding: [
    { value: '', label: 'Select a service' },
    { value: 'logo-designing', label: 'Logo Designing' },
    { value: 'business-brochures', label: 'Business Brochures' },
    { value: 'product-label', label: 'Product Label' },
    { value: 'business-profile', label: 'Business Profile' }
  ]
};

const budgetOptions = [
  { value: '', label: 'Select your budget' },
  { value: 'under-2k', label: 'Under $2,000' },
  { value: '2k-5k', label: '$2,000 - $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-plus', label: '$25,000+' }
];

const timelineOptions = [
  { value: '', label: 'Select timeline' },
  { value: '2-4-weeks', label: '2-4 weeks' },
  { value: '1-2-months', label: '1-2 months' },
  { value: '2-plus-months', label: '2+ months' },
  { value: 'flexible', label: 'Flexible' }
];

const goalOptions = [
  'Increase website traffic',
  'Generate more leads',
  'Improve brand awareness',
  'Launch new product/service',
  'Modernize existing platform',
  'Improve conversion rate'
];

type FormDataT = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  service: string;
  budget: string;
  timeline: string;
  brief: string;
  goals: string[];
  references: string;
  consent: boolean;
};

const DRAFT_KEY = 'pf_quote_draft_v2';

export function QuoteModal({
  isOpen,
  onClose,
  preSelectedCategory,
  preSelectedService
}: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<1 | -1>(1); // for slide direction
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormDataT>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    category: preSelectedCategory || '',
    service: preSelectedService || '',
    budget: '',
    timeline: '',
    brief: '',
    goals: [],
    references: '',
    consent: false
  });

  // Sync preselected props when they change (e.g., opened from a service page)
  useEffect(() => {
    if (!isOpen) return;
    setFormData(prev => ({
      ...prev,
      category: preSelectedCategory || prev.category,
      service: preSelectedService || (preSelectedCategory ? '' : prev.service)
    }));
  }, [isOpen, preSelectedCategory, preSelectedService]);

  // Autosave to localStorage
  useEffect(() => {
    if (!isOpen) return;
    const payload = { step, formData };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  }, [isOpen, step, formData]);

  // Restore draft on open
  useEffect(() => {
    if (!isOpen) return;
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) {
      try {
        const { step: s, formData: fd } = JSON.parse(raw);
        // Respect preselected inputs (if provided now)
        setFormData(prev => ({
          ...fd,
          category: preSelectedCategory || fd.category || '',
          service: preSelectedService || fd.service || ''
        }));
        if (typeof s === 'number') setStep(Math.min(Math.max(s, 1), 4));
      } catch {
        // ignore parse errors
      }
    }
    // Reset scroll to top of modal content
    requestAnimationFrame(() => {
      containerRef.current?.scrollTo({ top: 0 });
    });
  }, [isOpen, preSelectedCategory, preSelectedService]);

  const handleInputChange = (field: keyof FormDataT, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    }
    if (currentStep === 2) {
      if (!formData.category) newErrors.category = 'Please select a category';
      if (!formData.service) newErrors.service = 'Please select a service';
    }
    if (currentStep === 3) {
      if (!formData.brief.trim()) newErrors.brief = 'Project brief is required';
    }
    if (currentStep === 4) {
      if (!formData.consent) newErrors.consent = 'Please agree to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    setDir(1);
    setStep(prev => Math.min(prev + 1, 4));
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setDir(-1);
    setStep(prev => Math.max(prev - 1, 1));
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
    if (e.key === 'Enter' && tag !== 'textarea') {
      e.preventDefault();
      step < 4 ? handleNext() : null;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    try {
      const { submitQuote } = await import('../lib/api');

      // Preferred: send JSON (backwards compatible)
      const result = await submitQuote({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        category: formData.category,
        service: formData.service,
        budget: formData.budget,
        timeline: formData.timeline,
        brief: formData.brief,
        goals: formData.goals,
        references: formData.references,
        // You can handle files in your API later (FormData)
        submittedAt: new Date().toISOString()
      });

      if (result?.success) {
        localStorage.removeItem(DRAFT_KEY);
        window.location.href = '/thank-you';
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting quote:', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      category: preSelectedCategory || '',
      service: preSelectedService || '',
      budget: '',
      timeline: '',
      brief: '',
      goals: [],
      references: '',
      consent: false
    });
    setAttachments([]);
    setErrors({});
    onClose();
  };

  const serviceOptions = useMemo(() => {
    return formData.category
      ? servicesByCategory[formData.category] || [{ value: '', label: 'Select a service' }]
      : [{ value: '', label: 'Select a category first' }];
  }, [formData.category]);

  const stepTitles = ['Contact', 'Project', 'Details', 'Review'];
  const progress = ((step - 1) / (stepTitles.length - 1)) * 100;

  // File handling (UI only; wire API later if desired)
  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const max = 10 * 1024 * 1024; // 10 MB
    const accepted = Array.from(files).filter(f => f.size <= max);
    setAttachments(prev => [...prev, ...accepted].slice(0, 5)); // cap 5 files
  };
  const removeAttachment = (idx: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== idx));
  };

  // Animations between steps
  const slideVariants = {
    enter: (d: 1 | -1) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
    exit:  (d: 1 | -1) => ({ x: d > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } })
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title="Get a Quote"
      size="xl"
      initialFocusSelector="[data-autofocus]"
      footer={
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              localStorage.removeItem(DRAFT_KEY);
              setStep(1);
              setFormData(f => ({ ...f, brief: '', goals: [], references: '' }));
              setAttachments([]);
            }}
          >
            Start Over
          </Button>

          <div className="ml-auto flex items-center gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" loading={isSubmitting} onClick={(e: any) => e.preventDefault()}>
                {/* Prevent default here; actual submit is on form element */}
                Submitting…
              </Button>
            )}
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        {/* Top progress bar */}
        <div className="px-6 pt-4">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#fe2681] via-[#bf1c60] to-[#14276d]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div ref={containerRef} className="p-6 space-y-6 overflow-y-auto max-h-[calc(88vh-8rem)]">
          {/* Stepper Pills */}
          <div className="flex items-center justify-between">
            {stepTitles.map((label, i) => {
              const n = i + 1;
              const active = n <= step;
              return (
                <div key={label} className="flex items-center flex-1 min-w-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
                    ${active ? 'bg-[#fe2681] text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {n < step ? <Check size={16} /> : n}
                  </div>
                  {i < stepTitles.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded-full ${n < step ? 'bg-[#fe2681]' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-[11px] uppercase tracking-wide text-gray-500">
            {stepTitles.map((label) => <span key={label}>{label}</span>)}
          </div>

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

          {/* Steps */}
          <AnimatePresence mode="popLayout" custom={dir}>
            {step === 1 && (
              <motion.div
                key="step-1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={dir}
              >
                <h3 className="text-xl font-bold text-[#14276d] mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    error={errors.fullName}
                    data-autofocus
                  />
                  <Input
                    label="Phone / WhatsApp"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    error={errors.phone}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    error={errors.email}
                  />
                  <Input
                    label="Company / Brand Name"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={dir}
              >
                <h3 className="text-xl font-bold text-[#14276d] mb-4">Project Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    label="Category"
                    options={categoryOptions}
                    value={formData.category}
                    onChange={(e) => {
                      handleInputChange('category', e.target.value);
                      handleInputChange('service', '');
                    }}
                    required
                    error={errors.category}
                  />
                  <Select
                    label="Specific Service"
                    options={serviceOptions}
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    required
                    error={errors.service}
                    disabled={!formData.category}
                  />
                  <Select
                    label="Budget"
                    options={budgetOptions}
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                  />
                  <Select
                    label="Timeline"
                    options={timelineOptions}
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                  />
                </div>

                {/* Quick service chips */}
                {formData.category && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Popular in {categoryOptions.find(c=>c.value===formData.category)?.label}:</p>
                    <div className="flex flex-wrap gap-2">
                      {(servicesByCategory[formData.category] || []).slice(1,5).map(s => (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => handleInputChange('service', s.value)}
                          className={`px-3 py-1.5 rounded-full text-sm border
                            ${formData.service === s.value ? 'bg-[#fe2681] text-white border-[#fe2681]' : 'bg-white text-[#14276d] border-gray-200 hover:border-[#fe2681]'}`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={dir}
              >
                <h3 className="text-xl font-bold text-[#14276d] mb-4">Tell us more</h3>
                <Textarea
                  label="Project Brief"
                  value={formData.brief}
                  onChange={(e) => handleInputChange('brief', e.target.value)}
                  rows={6}
                  placeholder="Describe your project, requirements, and what you want to achieve..."
                  required
                  error={errors.brief}
                />

                {/* Goals as selectable chips */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#14276d] mb-3">
                    Goals (select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {goalOptions.map(goal => {
                      const active = formData.goals.includes(goal);
                      return (
                        <button
                          type="button"
                          key={goal}
                          onClick={() => handleGoalToggle(goal)}
                          className={`px-3 py-1.5 rounded-full text-sm border transition-colors
                            ${active ? 'bg-[#fe2681] text-white border-[#fe2681]' : 'bg-white text-[#14276d] border-gray-200 hover:border-[#fe2681]'}`}
                        >
                          {goal}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Textarea
                  className="mt-4"
                  label="Competitor / Reference Links"
                  value={formData.references}
                  onChange={(e) => handleInputChange('references', e.target.value)}
                  rows={3}
                  placeholder="Share any websites, competitors, or examples you like..."
                />

                {/* Attachments (UI only) */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#14276d] mb-2">
                    Attachments (PDF/Images, up to 10MB each)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-[#fe2681] cursor-pointer">
                      <Paperclip className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-[#14276d]">Add files</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg,.webp"
                        multiple
                        onChange={(e) => onFiles(e.target.files)}
                      />
                    </label>
                    <span className="text-xs text-gray-500">Max 5 files</span>
                  </div>
                  {attachments.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {attachments.map((f, i) => (
                        <li key={i} className="flex items-center justify-between rounded-lg border border-gray-100 p-2">
                          <span className="text-sm text-[#14276d] truncate max-w-[70%]">{f.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(i)}
                            className="text-gray-400 hover:text-gray-600 p-1"
                            aria-label={`Remove ${f.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step-4"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={dir}
              >
                <h3 className="text-xl font-bold text-[#14276d] mb-4">Review Your Submission</h3>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#14276d] mb-1">Contact</h4>
                    <p className="text-sm text-gray-600">{formData.fullName}</p>
                    <p className="text-sm text-gray-600">{formData.email}</p>
                    <p className="text-sm text-gray-600">{formData.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#14276d] mb-1">Project</h4>
                    {formData.company && <p className="text-sm text-gray-600">{formData.company}</p>}
                    <p className="text-sm text-gray-600">
                      {categoryOptions.find(c => c.value === formData.category)?.label} →{' '}
                      {serviceOptions.find(s => s.value === formData.service)?.label}
                    </p>
                    {formData.budget && (
                      <p className="text-sm text-gray-600">
                        Budget: {budgetOptions.find(b => b.value === formData.budget)?.label}
                      </p>
                    )}
                    {formData.timeline && (
                      <p className="text-sm text-gray-600">
                        Timeline: {timelineOptions.find(t => t.value === formData.timeline)?.label}
                      </p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#14276d] mb-1">Brief</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{formData.brief}</p>
                  </div>
                  {formData.goals.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-[#14276d] mb-1">Goals</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {formData.goals.map(goal => <li key={goal}>{goal}</li>)}
                      </ul>
                    </div>
                  )}
                  {attachments.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-[#14276d] mb-1">Attachments</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {attachments.map((f, i) => <li key={i}>{f.name}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                <label className="mt-6 flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => handleInputChange('consent', e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#fe2681] border-gray-300 rounded focus:ring-[#fe2681]"
                  />
                  <span className="text-sm text-[#14276d]">
                    I agree to be contacted about this project and understand that my information will be handled according to the{' '}
                    <a className="text-[#fe2681] underline" href="/privacy" target="_blank" rel="noreferrer">privacy policy</a>.
                  </span>
                </label>
                {errors.consent && <p className="text-sm text-red-500">{errors.consent}</p>}

                {/* Submit row for keyboard users (button in footer handles click UX) */}
                <div className="sr-only">
                  <button type="submit">Submit</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* We keep the actual submit on form to respect Enter key on step 4 */}
        {step === 4 && (
          <div className="px-6 pb-4 flex justify-end">
            <Button type="submit" loading={isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Submit Quote Request'}
            </Button>
          </div>
        )}
      </form>
    </Modal>
  );
}
