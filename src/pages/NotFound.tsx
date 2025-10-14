import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-[#fe2681] text-8xl font-bold mb-4">404</div>
        <h1 className="text-4xl font-bold text-[#14276d] mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => window.location.href = '/'}>
            <Home className="mr-2 w-5 h-5" />
            Go Home
          </Button>
          <Button size="lg" variant="outline" onClick={() => window.location.href = '/services'}>
            <Search className="mr-2 w-5 h-5" />
            Browse Services
          </Button>
        </div>
      </div>
    </div>
  );
}
