import { CrmSidebar } from "@/components/crm/sidebar";

export const metadata = {
  title: "CRM Affida · Operação",
};

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-ivory">
      <CrmSidebar />
      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}
