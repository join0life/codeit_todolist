import GNB from "../components/gnb";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-[#F9FAFB]">
        <header className="h-15 w-full border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-full max-w-300 items-center p-4 sm:p-6 xl:p-6">
            <GNB />
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
