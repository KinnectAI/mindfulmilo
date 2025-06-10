import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import '../styles.css'; // Assuming your global styles are in styles.css at the root

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mindful Milo - Your AI Companion for Mindfulness', // You can customize this
  description: 'Discover mindfulness with Milo, your personal AI guide. Join the waitlist!', // You can customize this
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
