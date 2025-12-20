import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { Collections } from './components/Collections';
import { FeaturedProducts } from './components/FeaturedProducts';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Cursor />
      <Navigation scrolled={scrolled} />
      <Hero />
      <Collections />
      <FeaturedProducts />
      <About />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}
