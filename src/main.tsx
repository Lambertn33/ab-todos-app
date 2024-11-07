import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import "./i18n.ts";

const queryClient = new QueryClient();

import { ThemeProvider } from "./context/ThemeContext.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";
import { LanguageProvider } from "./context/LanguageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
