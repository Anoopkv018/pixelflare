import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { QuoteModal } from './components/QuoteModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ServiceDetail } from './pages/ServiceDetail';
import { NotFound } from './pages/NotFound';
import { ThankYou } from './pages/ThankYou';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { getServiceBySlug } from './config/services';

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [preSelectedCategory, setPreSelectedCategory] = useState<string>();
  const [preSelectedService, setPreSelectedService] = useState<string>();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      setCurrentPath(window.location.pathname);
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      setCurrentPath(window.location.pathname);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href.startsWith(window.location.origin)) {
        const url = new URL(anchor.href);
        if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
          e.preventDefault();
          window.history.pushState({}, '', anchor.href);
          setCurrentPath(url.pathname);
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleQuoteClick = (category?: string, service?: string) => {
    setPreSelectedCategory(category);
    setPreSelectedService(service);
    setQuoteModalOpen(true);
  };

  const renderPage = () => {
    if (currentPath === '/') {
      return <Home onQuoteClick={handleQuoteClick} />;
    }

    if (currentPath === '/pricing') {
      return <Pricing onQuoteClick={handleQuoteClick} />;
    }

    if (currentPath === '/about') {
      return <About onQuoteClick={handleQuoteClick} />;
    }

    if (currentPath === '/contact') {
      return <Contact />;
    }

    if (currentPath === '/thank-you') {
      return <ThankYou />;
    }

    if (currentPath === '/privacy') {
      return <Privacy />;
    }

    if (currentPath === '/terms') {
      return <Terms />;
    }

    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      const service = getServiceBySlug(slug);

      if (service) {
        return <ServiceDetail service={service} onQuoteClick={handleQuoteClick} />;
      }
    }

    return <NotFound />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onQuoteClick={() => handleQuoteClick()} currentPath={currentPath} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <WhatsAppButton />
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => {
          setQuoteModalOpen(false);
          setPreSelectedCategory(undefined);
          setPreSelectedService(undefined);
        }}
        preSelectedCategory={preSelectedCategory}
        preSelectedService={preSelectedService}
      />
    </div>
  );
}
