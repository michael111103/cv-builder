import TopNav from "@/components/layout/TopNav";
import BottomNav from "@/components/layout/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-950">
      <TopNav />
      <main className="pt-16 pb-24 max-w-lg mx-auto px-4 min-h-screen">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
