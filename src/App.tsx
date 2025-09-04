import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicProvider } from "@/context/MusicContext";
import Layout from "@/components/layout/Layout";
import Home from "./pages/Home";

import Library from "./pages/Library";
import Playlist from "./pages/Playlist";
import Favorites from "./pages/Favorites";
import Recent from "./pages/Recent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MusicProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              
              <Route path="/library" element={<Library />} />
              <Route path="/playlist/:playlistId" element={<Playlist />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/recent" element={<Recent />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </MusicProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
