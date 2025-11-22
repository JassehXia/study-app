// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "StudyApp",
  description: "AI-powered learning platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API!}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
