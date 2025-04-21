'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer'; // ⬅️ Adicionado aqui

export default function Home() {
  return (
    <div className="relative min-h-screen text-white">
      <Navbar />
      <Hero />
      <Footer /> {/* ⬅️ Footer renderizado aqui no final */}
    </div>
  );
}
