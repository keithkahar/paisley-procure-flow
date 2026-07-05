import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "./components/shell/AppShell";
import Dashboard from "./pages/Dashboard";
import PurchaseIntake from "./pages/PurchaseIntake";
import SupplierDiscovery from "./pages/SupplierDiscovery";
import CandidateReview from "./pages/CandidateReview";
import FirstContact from "./pages/FirstContact";
import RFQ from "./pages/RFQ";
import QuoteReview from "./pages/QuoteReview";
import BuyerQuotation from "./pages/BuyerQuotation";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={150}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/intake" element={<PurchaseIntake />} />
            <Route path="/discovery" element={<SupplierDiscovery />} />
            <Route path="/candidates" element={<CandidateReview />} />
            <Route path="/first-contact" element={<FirstContact />} />
            <Route path="/rfq" element={<RFQ />} />
            <Route path="/quote-review" element={<QuoteReview />} />
            <Route path="/buyer-quotation" element={<BuyerQuotation />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
