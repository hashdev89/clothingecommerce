import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Shop } from './components/Shop';
import { ProductDetail } from './components/ProductDetail';
import { Cursor } from './components/Cursor';
import { ThemeProvider } from './components/ThemeProvider';

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
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Cursor />
          <Navigation scrolled={scrolled} />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Home />
              </>
            } />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
