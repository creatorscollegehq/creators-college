// LP pages use a minimal distraction-free layout (no main nav / footer)
// to maximize enrollment conversion.
export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-grow flex flex-col min-h-screen">{children}</main>
  );
}
