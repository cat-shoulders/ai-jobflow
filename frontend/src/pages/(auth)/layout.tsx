import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <main className="grow">
      <section className="relative">
        {/* Illustration */}
        <div
          className="md:block absolute left-1/2 -translate-x-1/2 -mt-36 blur-2xl opacity-70 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <img
            src="/images/auth-illustration.svg"
            className="max-w-none"
            width={1440}
            height={450}
            alt="Page Illustration"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
}
