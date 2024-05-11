import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({subsets: ['latin'], weight: ['400','500','700']})

export const metadata = {
  title: "multi-step-form",
  description: "challenge by frontendmentor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
