export function Terms() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#14276d] mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">Agreement to Terms</h2>
            <p className="text-gray-700">
              By accessing and using PixelFlare's services, you agree to be bound by these Terms of Service.
              If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">Services</h2>
            <p className="text-gray-700 mb-4">
              PixelFlare provides digital services including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Website design and development</li>
              <li>Digital marketing services</li>
              <li>Video production and editing</li>
              <li>Branding and design services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">Project Terms</h2>
            <p className="text-gray-700 mb-4">
              Each project will be governed by a specific agreement detailing:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Scope of work and deliverables</li>
              <li>Timeline and milestones</li>
              <li>Payment terms and schedule</li>
              <li>Revision and approval process</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">Payment</h2>
            <p className="text-gray-700">
              Payment terms are specified in individual project agreements. Generally, we require a deposit
              to begin work, with remaining payments tied to project milestones or completion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">Intellectual Property</h2>
            <p className="text-gray-700">
              Upon full payment, clients receive ownership of final deliverables. PixelFlare retains the
              right to showcase completed work in our portfolio unless otherwise agreed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">Limitation of Liability</h2>
            <p className="text-gray-700">
              PixelFlare shall not be liable for any indirect, incidental, or consequential damages arising
              from the use of our services. Our total liability is limited to the amount paid for services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-[#14276d] mb-4">Contact</h2>
            <p className="text-gray-700">
              Questions about these terms? Contact us at{' '}
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
