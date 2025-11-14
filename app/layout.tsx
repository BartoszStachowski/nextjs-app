import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

import ThemeProvider from '@/context/Theme';
import Navbar from '@/components/navigation/navbar';

const inter = localFont({
  src: './fonts/InterVF.ttf',
  variable: '--font-inter',
  weight: '100 200 300 400 500 700 800 900',
});

const spaceGrotesk = localFont({
  src: './fonts/SpaceGroteskVF.ttf',
  variable: '--font-space-grotesk',
  weight: '300 400 500 700',
});

export const metadata: Metadata = {
  title: 'DevFlow',
  description:
    'A community platform where you can ask questions and find answers about programming. Get help, share your experience, and collaborate with developers from around the world. Explore topics in web development, mobile applications, algorithms, data structures, and many more.',
  icons: {
    icon: '/images/site-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
