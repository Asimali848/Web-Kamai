import { ReactNode } from "react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "@/store";

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light">
        <BrowserRouter>
          <Toaster />
          <TooltipProvider>{children}</TooltipProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
