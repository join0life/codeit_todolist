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
        <header className="h-full w-full border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-15 max-w-300 items-center p-4 sm:p-6 xl:p-6">
            <GNB />
          </div>
        </header>

        <main className="mx-auto max-w-300 p-4 sm:p-6 xl:p-6">{children}</main>
      </body>
    </html>
  );
}
