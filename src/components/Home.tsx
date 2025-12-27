import { Collections } from './Collections';
import { FeaturedProducts } from './FeaturedProducts';
import { About } from './About';
import { Testimonials } from './Testimonials';
import { Newsletter } from './Newsletter';
import { Footer } from './Footer';

export function Home() {
  return (
    <>
      <Collections />
      <FeaturedProducts />
      <About />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}

