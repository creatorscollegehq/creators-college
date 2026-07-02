import Header from "@/components/Header";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
      {/* Landing pages do not have a footer to maximize enrollment focus */}
    </>
  );
}
