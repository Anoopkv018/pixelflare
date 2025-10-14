import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Service, getRelatedServices } from '../config/services';
import { useState } from 'react';

interface ServiceDetailProps {
  service: Service;
  onQuoteClick: (category?: string, service?: string) => void;
}

export function ServiceDetail({ service, onQuoteClick }: ServiceDetailProps) {
  const relatedServices = getRelatedServices(service.id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      <section className="bg-gradient-to-br from-[#f7f7fb] via-white to-[#fff0f6] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-[#14276d] mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {service.subhead}
            </p>
            <Button size="lg" onClick={() => onQuoteClick(service.category, service.id)}>
              Get a Quote
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-[#14276d] mb-6">Who it's for</h2>
                <ul className="space-y-3">
                  {service.whoItsFor.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-[#fe2681] mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-[#14276d] mb-6">What you get</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#fe2681] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold text-[#14276d] mb-6">Our Process</h2>
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <Card key={index}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fff0f6] flex items-center justify-center text-[#fe2681] font-bold text-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#14276d] mb-2">{step.step}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#14276d] mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <Card
                      key={index}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <HelpCircle className="w-5 h-5 text-[#fe2681] flex-shrink-0" />
                            <h3 className="text-lg font-semibold text-[#14276d]">{faq.question}</h3>
                          </div>
                          {openFaq === index && (
                            <p className="text-gray-600 mt-3 pl-8">{faq.answer}</p>
                          )}
                        </div>
                        <div className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <Card className="sticky top-24 mb-8">
                <h3 className="text-xl font-bold text-[#14276d] mb-4">Ready to get started?</h3>
                <p className="text-gray-600 mb-6">
                  Let's discuss your project and create a custom plan that fits your needs.
                </p>
                <Button fullWidth onClick={() => onQuoteClick(service.category, service.id)}>
                  Get a Quote
                </Button>
              </Card>

              {relatedServices.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-[#14276d] mb-4">Related Services</h3>
                  <div className="space-y-4">
                    {relatedServices.map((related) => (
                      <a
                        key={related.id}
                        href={`/services/${related.slug}`}
                        className="block group"
                      >
                        <Card hover>
                          <h4 className="font-semibold text-[#14276d] group-hover:text-[#fe2681] mb-2">
                            {related.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">{related.subhead}</p>
                          <span className="text-[#fe2681] text-sm font-medium inline-flex items-center">
                            Learn more
                            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Card>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
