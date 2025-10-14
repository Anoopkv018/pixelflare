import { CheckCircle, Home, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function ThankYou() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-[#14276d] mb-4">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-8">
          We have received your submission and will get back to you within 24 hours. Check your email for a confirmation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => window.location.href = '/'}>
            <Home className="mr-2 w-5 h-5" />
            Go Home
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.location.href = `mailto:hello@pixelflare.agency`}
          >
            <Mail className="mr-2 w-5 h-5" />
            Email Us
          </Button>
        </div>
      </div>
    </div>
  );
}
