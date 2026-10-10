import './globals.css';

export const metadata = {
  title: 'VSync — a minimalistic way to browse VTOP',
  description:
    'A minimalistic, lightweight, unopinionated, open-source academic companion for VIT-AP students.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
