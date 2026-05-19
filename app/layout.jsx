import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    template: 'Legaliant — %s',
    default: 'Legaliant — The Law in Plain English',
  },
  description: 'AI-powered legal tools including wrongful termination calculators and demand letter generators. Free, fast, and built for people who need real help.',
};

export const viewport = {
  themeColor: '#1a2744',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
