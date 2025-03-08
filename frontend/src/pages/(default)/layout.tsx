'use client';

import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from '@/components/theme/ui/header';
import Footer from '@/components/theme/ui/footer';
import { Outlet } from 'react-router';

export default function DefaultLayout() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 1000,
      easing: 'ease-out-cubic',
    });
  });

  return (
    <>
      <Header />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
