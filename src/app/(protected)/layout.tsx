import Navbar from "@/components/client/navbar";
import Sidebar from "@/components/client/sidebar";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "NextJS App",
  description: "A NextJS app with shadcn/ui components",
};

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
