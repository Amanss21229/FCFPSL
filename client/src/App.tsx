import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LocationQRPopup } from "@/components/LocationQRPopup";

import Landing from "@/pages/Landing";
import ProgramDetails from "@/pages/ProgramDetails";
import Register from "@/pages/Register";
import ThankYou from "@/pages/ThankYou";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/program" component={ProgramDetails} />
      <Route path="/register" component={Register} />
      <Route path="/thank-you/:id" component={ThankYou} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <LocationQRPopup />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
