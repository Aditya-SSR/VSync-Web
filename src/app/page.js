import SmoothScroll from '@/components/SmoothScroll';
import CursorBubble from '@/components/CursorBubble';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import './home.css';

export const metadata = {
  title: 'VSync — a minimalistic way to browse VTOP',
  description:
    'A minimalistic, lightweight, unopinionated, open-source academic companion for VIT-AP students.',
};

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CursorBubble />
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
