import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Discover Ethiopian food and place an order.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
