// import './global.css';
import './style.css'
import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reviews from '@/components/Reviews';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Irela Aqua and Fitness',
  description:
    'Fitness, aquafitness, pilates, corporate wellness, swimming programs — functional, healthier, happier you.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-serif text-[#076873]">
        <Header />
        <main className="p-5">{children}</main>
        <ContactForm />
        <Reviews/>
        <Footer />
      </body>
    </html>
  );
}
