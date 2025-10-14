export function Privacy() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#14276d] mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              When you submit a quote request or contact form, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Name and contact information (email, phone)</li>
              <li>Company or brand name</li>
              <li>Project details and requirements</li>
              <li>Any additional information you provide</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Respond to your inquiries and quote requests</li>
              <li>Provide our services and support</li>
              <li>Send project updates and communications</li>
              <li>Improve our services and user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">Data Security</h2>
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information.
              Your data is stored securely and we never share it with third parties without your consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:info@pixelflare.in" className="text-[#fe2681] hover:underline">
                info@pixelflare.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
