import { Navbar } from "@/components/layout/navbar";
import { LeftSidebar } from "@/components/layout/left-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PageTransition } from "@/components/ui/page-transition";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-4 px-3 pt-4 pb-28 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-6 lg:px-6 lg:pb-8 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
        <LeftSidebar />
        <main className="min-w-0">
          <PageTransition>{children}</PageTransition>
        </main>
        <RightSidebar />
      </div>
      <MobileNav />
    </div>
  );
}
